# External API Setup Audit

This document audits all external services required for Morada deployment, categorizing tasks as **Manual** (human required) vs **Automated** (CLI/script possible).

## 🧪 POC vs Production Strategy

**IMPORTANT**: This project is in **Proof of Concept** phase. Priority is testing viability with **free tiers and open source options only**.

### POC Deployment Strategy (Recommended)

| Service | POC Solution | Cost | Production Upgrade Path |
|---------|--------------|------|-------------------------|
| **Database** | Neon Free Tier | **FREE** | $19/month Pro when needed |
| **Hosting** | Vercel Hobby | **FREE** | $20/month Pro for custom domains |
| **Payments** | Stripe Test Mode | **FREE** | Enable production mode (no monthly fee) |
| **WhatsApp** | Twilio Sandbox | **FREE** | Apply for Business API ($0.005/msg) |
| **Calendar** | Cal.com Free | **FREE** | Cal.com Teams ($12-29/month) optional |
| **Email** | Resend Free Tier | **FREE** (3K/month) | $20/month for 50K emails |
| **Analytics** | Umami Self-Hosted | **FREE** | Umami Cloud $9/month (optional) |
| **Reviews** | Google Places Free | **FREE** ($200 credit) | Pay per use after credit |

**Total POC Cost**: **$0/month** 🎉

### POC Limitations to Accept

1. **No Custom Domains** - Use `morada.vercel.app/puro-surf` instead of `purosurf.com`
2. **WhatsApp Sandbox Only** - Can only send to numbers that "joined" the sandbox
3. **Stripe Test Mode** - Can't process real payments (use test cards)
4. **Single Deployment** - One shared deployment for all operators
5. **Basic Analytics** - Self-hosted Umami (no paid dashboards)
6. **Limited Email** - 3,000 emails/month (sufficient for testing)

### When to Upgrade to Production

Upgrade when you have:
- ✅ Validated concept with real operators
- ✅ Confirmed booking flow works end-to-end
- ✅ First paying customer committed
- ✅ Revenue projections justify monthly costs
- ✅ Need for production WhatsApp API (2-4 week approval)

**Don't spend money until the concept is validated.**

---

## Summary Table

| Service | Phase | Manual Time | Automated Time | Approval Wait | Total Time |
|---------|-------|-------------|----------------|---------------|------------|
| Cal.com | 11 | 1-2h | 3-4h | None | 4-6h |
| Stripe | 12 | 2-4h | 6-8h | 1-3 days (test) | 8-12h + wait |
| Twilio WhatsApp | 13 | 2-3h | 4-5h | 2-4 weeks (prod) | 6-8h + approval |
| Google Places | 14 | 1-2h | 3-4h | None | 4-6h |
| Neon Postgres | 15 | 30m | 2-3h | None | 2.5-3.5h |
| Vercel | 15 | 2-3h | 3-5h | None | 5-8h |
| Umami | 17 | 1-2h | 3-4h | None | 4-6h |
| Resend | 18 | 1-2h | 5-6h | DNS verification | 6-8h |

**Total Manual**: 11-19 hours
**Total Automated**: 29-43 hours
**Critical Path Blockers**: Stripe verification (1-3 days), WhatsApp Business API (2-4 weeks)

---

## Phase 11: Cal.com

### 🧪 POC Strategy
- **Use**: Cal.com Free plan
- **Cost**: $0/month
- **Limitations**: Single user, basic features only
- **Sufficient for**: Testing booking flow with 1 operator
- **Upgrade when**: Need team features or multiple calendars

### 🔴 Manual Steps (1-2 hours)
1. **Account Creation** (15 min)
   - Sign up at https://cal.com (free plan)
   - Verify email
   - Choose username (becomes part of booking URL)

2. **Event Type Configuration** (45-90 min)
   - Create event types for each bookable category:
     - Surf lessons (1hr, 2hr, 3hr, week-long)
     - Accommodation (check-in/check-out)
     - Tours (half-day, full-day)
   - Set availability windows
   - Configure buffer times
   - Add custom questions (bilingual)

### 🟢 Automated Steps (3-4 hours)
1. **Dependencies** (5 min)
   ```bash
   npm install @calcom/embed-react
   ```

2. **Integration Code** (3-4 hours)
   - Create `components/booking/CalendarWidget.tsx`
   - Embed Cal.com widget in booking flow
   - Handle booking callbacks
   - Store `calBookingUid` in database

3. **Environment Setup** (5 min)
   ```bash
   echo "NEXT_PUBLIC_CALCOM_USERNAME=your-username" >> .env.local
   ```

### ⚠️ Approval/Verification
- None required
- Instant activation

### 📋 Automation Potential
- Event type creation: **No API available** - must be done manually via Cal.com dashboard
- Widget integration: **Fully automatable**

---

## Phase 12: Stripe Connect

### 🧪 POC Strategy
- **Use**: Stripe Test Mode (never leave test mode for POC)
- **Cost**: $0 (no fees in test mode)
- **Limitations**: Can't process real payments, must use test cards
- **Sufficient for**: Testing entire payment flow, webhooks, UI
- **Upgrade when**: Ready to accept real payments (no monthly fee, just transaction fees)
- **Test Cards**: `4242 4242 4242 4242` (success), `4000 0000 0000 9995` (decline)

**POC Note**: You can skip business verification for test mode. Only provide minimal info.

### 🔴 Manual Steps (2-4 hours + wait time)
1. **Account Creation** (20 min)
   - Sign up at https://stripe.com
   - Verify email
   - Add minimal business details (can use personal info for POC)

2. **Identity Verification** (30-60 min + wait)
   - Upload business documents
   - Personal ID verification
   - **Wait time**: 1-3 days for test mode approval
   - **Wait time**: 1-2 weeks for production approval

3. **Stripe Connect Setup** (30 min)
   - Enable Connect in dashboard
   - Configure Connect settings
   - Set up platform fee structure

4. **Product Creation** (30 min)
   - Create subscription products:
     - Comunidad: $29/month
     - Operator: $79/month
     - Partner: $149/month
   - Configure billing intervals

5. **Webhook Configuration** (15 min)
   - Add webhook endpoint URL
   - Select events to listen for
   - Note webhook secret

### 🟢 Automated Steps (6-8 hours)
1. **Dependencies** (5 min)
   ```bash
   npm install stripe @stripe/stripe-js @stripe/react-stripe-js
   ```

2. **API Routes** (4-6 hours)
   - `app/api/stripe/create-payment-intent/route.ts`
   - `app/api/stripe/webhooks/route.ts`
   - `app/api/stripe/connect-account/route.ts`
   - `app/api/stripe/create-subscription/route.ts`
   - `app/api/stripe/billing-portal/route.ts`

3. **Database Schema Updates** (1 hour)
   - Add Stripe fields to Bookings collection
   - Add Stripe fields to Operators collection

4. **Testing** (1 hour)
   - Test with Stripe test cards
   - Verify webhook delivery

### ⚠️ Approval/Verification
- **Test mode**: 1-3 days (business verification)
- **Production**: 1-2 weeks (full KYC/AML review)
- **Connect approval**: May require additional documents for platform model

### 📋 Automation Potential
- Product creation: **Can use Stripe CLI** - `stripe products create`
- Webhook setup: **Can use Stripe CLI** - `stripe webhooks create`
- Identity verification: **Manual only** - human review required
- Connect onboarding (for operators): **Can automate with Stripe.js**

### 🚨 Critical Blocker
Stripe approval is on the critical path. Start this ASAP.

---

## Phase 13: Twilio WhatsApp

### 🧪 POC Strategy
- **Use**: Twilio WhatsApp Sandbox (FREE)
- **Cost**: $0 (sandbox is completely free)
- **Limitations**: Recipients must send "join [code]" to your sandbox number first
- **Sufficient for**: Testing notification templates and flow with team/friends
- **Upgrade when**: Need to send to real customers (requires 2-4 week WhatsApp Business API approval)

**POC Note**: Skip Business API application entirely for POC. Sandbox is instant and free.

### 🔴 Manual Steps (30 min for POC, not 2-3 hours)
1. **Account Creation** (15 min)
   - Sign up at https://twilio.com
   - Verify email and phone
   - **Skip payment method for POC** (sandbox doesn't require billing)

2. **WhatsApp Sandbox Setup** (30 min)
   - Navigate to WhatsApp sandbox
   - Send "join" message to activate
   - Test sending messages
   - **Limitation**: Can only send to numbers that joined sandbox

3. **WhatsApp Business API Application** (1-2 hours + wait)
   - Apply for WhatsApp Business API access
   - Provide business details
   - Submit Facebook Business Manager info
   - **Wait time**: 2-4 weeks for approval
   - **Note**: Required for production use

4. **Phone Number Configuration** (30 min - after approval)
   - Purchase Twilio phone number
   - Enable WhatsApp on the number
   - Configure sender profile

### 🟢 Automated Steps (4-5 hours)
1. **Dependencies** (5 min)
   ```bash
   npm install twilio
   ```

2. **API Route** (2 hours)
   - `app/api/notifications/whatsapp/route.ts`

3. **Message Templates** (2-3 hours)
   - Create bilingual templates
   - Booking confirmation
   - Payment confirmation
   - Reminders
   - Operator notifications

### ⚠️ Approval/Verification
- **Sandbox**: Instant (for testing only)
- **Production**: 2-4 weeks (WhatsApp Business API approval)
- **Requirements**:
  - Facebook Business Manager account
  - Business verification documents
  - WhatsApp Business Profile

### 📋 Automation Potential
- Message sending: **Fully automatable**
- Template creation: **Partially automatable** (templates stored in code, but WhatsApp template approval needed for some regions)
- Business API application: **Manual only**

### 🚨 Critical Blocker
WhatsApp Business API approval takes 2-4 weeks. This is the longest approval wait.

**Workaround**: Use sandbox for initial testing and soft launch, apply for production early.

---

## Phase 14: Google Places & Reviews API

### 🧪 POC Strategy
- **Use**: Google Cloud Free Tier
- **Cost**: $0 ($200/month credit for 90 days, then free tier)
- **Limitations**: After credits, $17/1000 requests (but we cache, so minimal usage)
- **Sufficient for**: Testing reviews with caching (24h refresh = ~30 requests/month)
- **Upgrade when**: High traffic (unlikely in POC with caching)

**POC Note**: Free tier $200 credit lasts 90 days. With caching, POC won't exceed free limits.

### 🔴 Manual Steps (1-2 hours)
1. **Google Cloud Account** (15 min)
   - Sign up at https://console.cloud.google.com
   - Verify email
   - Add billing information (required for free tier, but won't be charged)

2. **Project Setup** (15 min)
   - Create new project
   - Enable Places API
   - Enable Maps JavaScript API (if using map embeds)

3. **API Key Configuration** (30 min)
   - Create API key
   - Restrict key to Places API
   - Add domain restrictions (production domains)
   - Set up daily quota limits

4. **Billing Alerts** (15 min)
   - Set up budget alerts
   - Configure spending limits
   - **Note**: Places API costs $17/1000 requests

### 🟢 Automated Steps (3-4 hours)
1. **API Route** (2 hours)
   - `app/api/reviews/google/route.ts`
   - Fetch reviews by place ID
   - Transform to Morada format

2. **Cache Implementation** (1-2 hours)
   - Cache reviews in database
   - Refresh every 24 hours
   - Reduce API costs

3. **UI Integration** (1 hour)
   - Add reviews section to operator pages
   - Display star ratings
   - Link to Google Maps

### ⚠️ Approval/Verification
- None required
- Instant activation

### 📋 Automation Potential
- API key creation: **Can use gcloud CLI**
  ```bash
  gcloud services enable places-backend.googleapis.com
  gcloud alpha services api-keys create --display-name="Morada"
  ```
- Domain restrictions: **Can script via gcloud**
- Project creation: **Can use gcloud CLI**

### 💰 Cost Considerations
- Free tier: $200/month credit
- After free tier: $17/1000 requests
- With caching (24h refresh), minimal cost

---

## Phase 15a: Neon Postgres

### 🧪 POC Strategy
- **Use**: Neon Free Tier
- **Cost**: $0/month
- **Limitations**: 3 projects, 0.5 GB storage per branch, 100 hours compute
- **Sufficient for**: POC with 1-2 operators, testing all features
- **Upgrade when**: Need more storage or compute hours (rarely needed for POC)

**POC Note**: Free tier is generous. You likely won't need to upgrade during POC phase.

### 🔴 Manual Steps (30 minutes)
1. **Account Creation** (10 min)
   - Sign up at https://neon.tech
   - Verify email
   - **Choose Free tier** (don't add payment method)

2. **Database Creation** (10 min)
   - Create new project
   - Choose region (us-east-1 recommended for Vercel)
   - Note connection string

3. **Branching Strategy** (10 min - optional)
   - Create production branch
   - Create staging branch
   - Set up branch protection

### 🟢 Automated Steps (2-3 hours)
1. **Neon CLI Setup** (10 min)
   ```bash
   npm install -g neonctl
   neonctl auth
   ```

2. **Database Migration** (1-2 hours)
   - Run Payload migrations
   - Seed initial data
   - Verify schema

3. **Connection Pooling** (30 min)
   - Configure connection pooling
   - Set pool size limits
   - Test connections

4. **Backup Configuration** (30 min)
   - Set up automatic backups
   - Configure retention policy

### ⚠️ Approval/Verification
- None required
- Instant activation

### 📋 Automation Potential
- Database creation: **Can use Neon CLI**
  ```bash
  neonctl projects create --name morada
  neonctl branches create --project-id xxx --name production
  ```
- Migrations: **Fully automatable** via Payload CLI
- Branching: **Can use Neon CLI**

### 💰 Cost Considerations
- Free tier: 3 projects, 0.5 GB storage per branch
- Pro: $19/month + usage
- Recommended: Start free, upgrade when needed

---

## Phase 15b: Vercel Deployment

### 🧪 POC Strategy
- **Use**: Vercel Hobby (Free)
- **Cost**: $0/month
- **Limitations**: No custom domains (use `.vercel.app`), basic analytics
- **Sufficient for**: Testing with URL like `morada.vercel.app/puro-surf`
- **Upgrade when**: Need custom domains (`purosurf.com`) - requires Pro ($20/month)

**POC Note**: Skip domain purchase entirely for POC. Use free `.vercel.app` subdomain.

### 🔴 Manual Steps (30 min for POC, not 2-3 hours)
1. **Account Creation** (10 min)
   - Sign up at https://vercel.com (Hobby plan - FREE)
   - Connect GitHub account
   - Verify email

2. **Domain Purchase** (**SKIP FOR POC**)
   - Not needed for POC
   - Use `your-project.vercel.app` instead
   - Purchase domains later when validated ($10-15/year per operator)

3. **DNS Configuration** (1-2 hours - per operator)
   - Add domain to Vercel
   - Update DNS records:
     - A record → Vercel IP
     - CNAME → cname.vercel-dns.com
   - Wait for DNS propagation (15 min - 48 hours)
   - Enable auto-SSL

4. **Environment Variables** (30 min)
   - Add all env vars in Vercel dashboard
   - Configure for production/preview
   - Sensitive values (API keys, secrets)

### 🟢 Automated Steps (3-5 hours)
1. **Vercel CLI Setup** (10 min)
   ```bash
   npm i -g vercel
   vercel login
   ```

2. **Initial Deployment** (30 min)
   ```bash
   vercel --prod
   ```

3. **Build Configuration** (1 hour)
   - Create `vercel.json`
   - Configure build command
   - Set environment variables via CLI
   ```bash
   vercel env add DATABASE_URL production
   vercel env add PAYLOAD_SECRET production
   ```

4. **CI/CD Setup** (2-3 hours)
   - GitHub integration (auto-deploy on push)
   - Preview deployments for PRs
   - Production deployment on main branch

5. **Domain Routing** (1 hour)
   - Middleware for multi-domain detection
   - Route to correct operator based on domain

### ⚠️ Approval/Verification
- None required
- DNS propagation: 15 min - 48 hours

### 📋 Automation Potential
- Deployment: **Fully automatable** via Vercel CLI
- Environment variables: **Can use vercel CLI**
  ```bash
  vercel env add KEY value production
  ```
- Domain setup: **Partially automatable**
  - Adding domain to Vercel: Can use Vercel API
  - DNS configuration: Manual (depends on registrar)
- Build configuration: **Fully automatable** (vercel.json)

### 💰 Cost Considerations
- Vercel Hobby: Free for personal projects
- Vercel Pro: $20/month per user
- Domains: $10-15/year each
- Recommended: Pro plan ($20/month) for production

---

## Phase 16: Stripe Subscriptions

### 🔴 Manual Steps (Covered in Phase 12)
All Stripe setup done in Phase 12. Only new manual task:

1. **Product Configuration** (30 min)
   - Already covered in Phase 12 product creation
   - No additional manual work

### 🟢 Automated Steps (8-10 hours)
1. **API Routes** (4-6 hours)
   - `app/api/stripe/create-subscription/route.ts`
   - `app/api/stripe/billing-portal/route.ts`
   - Update webhook route for subscription events

2. **Database Schema** (1 hour)
   - Add subscription fields to Operators collection
   - Migration script

3. **Access Control** (2-3 hours)
   - Middleware to check subscription status
   - Disable operator site if lapsed
   - Grace period logic

4. **Billing Portal** (1 hour)
   - Link to Stripe Customer Portal
   - Allow operators to manage billing

### ⚠️ Approval/Verification
- None (uses existing Stripe account)

### 📋 Automation Potential
- Fully automatable (builds on Phase 12)

---

## Phase 17: Umami Analytics

### 🧪 POC Strategy
- **Use**: Umami Self-Hosted (100% free and open source)
- **Cost**: $0 (deploy to free Vercel, use existing Neon DB)
- **Limitations**: None (full features)
- **Sufficient for**: All analytics needs, unlimited tracking
- **Alternative**: Umami Cloud $9/month (optional, easier setup)

**POC Note**: Self-hosting is recommended to keep POC at $0. Deploy to your existing Vercel account.

### 🔴 Manual Steps (1-2 hours)
**Option A: Self-Hosted** (1-2 hours) - **RECOMMENDED FOR POC**
1. Deploy Umami to Vercel (free)
2. Connect to your Neon database (free)
3. Create admin account
4. Create website entries

**Option B: Umami Cloud** (15 min) - Skip for POC (costs $9/month)
1. ~~Sign up at https://umami.is~~
2. ~~Create website entries~~
3. ~~Get tracking code~~

### 🟢 Automated Steps (3-4 hours)
1. **Script Integration** (1 hour)
   - Add Umami script to layout
   - Configure environment variables

2. **Custom Events** (2-3 hours)
   - Track regreso page views
   - Track booking funnel
   - Track conversions

3. **Dashboard Embed** (1 hour)
   - Create analytics dashboard page
   - Embed Umami iframe

### ⚠️ Approval/Verification
- None required

### 📋 Automation Potential
- Self-hosting: **Can use deployment templates**
- Website creation: **Can use Umami API**
- Script integration: **Fully automatable**

### 💰 Cost Considerations
- Self-hosted: Free (uses existing Vercel/database)
- Umami Cloud: $9/month (100K events)

---

## Phase 18: Resend Email

### 🧪 POC Strategy
- **Use**: Resend Free Tier
- **Cost**: $0 (3,000 emails/month)
- **Limitations**: 3K emails/month (plenty for POC with 1-2 operators)
- **Sufficient for**: All transactional emails (confirmations, receipts, reminders)
- **Upgrade when**: Exceed 3K emails/month (unlikely in POC)

**POC Note**: Free tier is generous. Can send 100 emails/day which is sufficient for testing.

### 🔴 Manual Steps (1-2 hours)
1. **Account Creation** (10 min)
   - Sign up at https://resend.com (Free tier)
   - Verify email

2. **Domain Verification** (1-2 hours)
   - Add domain (e.g., morada.sv)
   - Configure DNS records:
     - SPF record
     - DKIM record
     - DMARC record (optional)
   - Wait for DNS propagation
   - **Verification time**: 15 min - 24 hours

3. **API Key Generation** (5 min)
   - Create API key
   - Note key for environment variables

### 🟢 Automated Steps (5-6 hours)
1. **Dependencies** (5 min)
   ```bash
   npm install resend react-email
   ```

2. **Email Templates** (3-4 hours)
   - Create React Email templates:
     - BookingConfirmation.tsx
     - BookingReceipt.tsx
     - BookingReminder.tsx
   - Bilingual support
   - Responsive design

3. **API Route** (1 hour)
   - `app/api/emails/send/route.ts`
   - Template rendering
   - Error handling

4. **Integration** (1 hour)
   - Send after Stripe payment
   - Send after Cal.com booking
   - Schedule reminders

### ⚠️ Approval/Verification
- Domain verification: 15 min - 24 hours (DNS propagation)

### 📋 Automation Potential
- Template creation: **Fully automatable**
- API integration: **Fully automatable**
- Domain verification: **Semi-automatable**
  - DNS records can be scripted if using Vercel DNS or Cloudflare API
  - Most registrars don't have APIs

### 💰 Cost Considerations
- Free tier: 3,000 emails/month
- Pro: $20/month for 50,000 emails
- Recommended: Start free

---

## Recommendations for Automation

### High Priority (Can Save Significant Time)
1. ✅ **Use Vercel CLI for deployment**
   - Saves ~2 hours per deployment
   - Script: `scripts/deploy.sh`

2. ✅ **Use Stripe CLI for testing**
   - Local webhook testing
   - Product creation via CLI
   - Script: `scripts/stripe-setup.sh`

3. ✅ **Use Neon CLI for database**
   - Branch creation
   - Migration automation
   - Script: `scripts/db-setup.sh`

4. ✅ **Use gcloud CLI for Google Cloud**
   - API key creation
   - Service enablement
   - Script: `scripts/gcp-setup.sh`

### Medium Priority (Moderate Time Savings)
1. ⚠️ **Environment variable management**
   - Use `.env.example` template
   - Script to validate required vars
   - Script: `scripts/check-env.sh`

2. ⚠️ **DNS configuration helper**
   - Generate DNS records for copy/paste
   - Script: `scripts/generate-dns.sh`

### Low Priority (Minimal Time Savings)
1. 📋 **Cal.com event types**
   - No API available
   - Must be done manually

2. 📋 **WhatsApp Business API application**
   - Human review required
   - Cannot automate

### Automation Scripts to Create

Create `scripts/` directory with:

1. **`scripts/deploy.sh`**
   ```bash
   #!/bin/bash
   # Automated Vercel deployment with env vars
   ```

2. **`scripts/stripe-setup.sh`**
   ```bash
   #!/bin/bash
   # Create Stripe products and webhooks via CLI
   ```

3. **`scripts/db-setup.sh`**
   ```bash
   #!/bin/bash
   # Set up Neon database and run migrations
   ```

4. **`scripts/gcp-setup.sh`**
   ```bash
   #!/bin/bash
   # Enable Google Cloud APIs and create credentials
   ```

5. **`scripts/check-env.sh`**
   ```bash
   #!/bin/bash
   # Validate all required environment variables are set
   ```

6. **`scripts/generate-dns.sh`**
   ```bash
   #!/bin/bash
   # Generate DNS record configurations for Resend, Vercel
   ```

---

## Critical Path Analysis

### POC Critical Path (RECOMMENDED - No Approval Waits)

**Goal**: Get to working POC in 1-2 weeks with $0 cost

1. **Day 1**: Create accounts (all instant, ~2 hours)
   - ✅ Neon database (free tier)
   - ✅ Vercel (hobby plan)
   - ✅ Stripe (test mode only - skip verification)
   - ✅ Twilio (sandbox only - skip Business API)
   - ✅ Cal.com (free plan)
   - ✅ Resend (free tier)
   - ✅ Google Cloud (free tier)

2. **Week 1** (Build integrations - ~20-30 hours):
   - Cal.com widget integration
   - Stripe test mode payments
   - WhatsApp sandbox notifications
   - Google Places reviews (cached)
   - Resend email templates

3. **Week 2** (Deploy & test - ~10-20 hours):
   - Deploy to Vercel
   - Self-host Umami analytics
   - End-to-end testing
   - Share with operators for feedback

**Total POC Time**: 1-2 weeks, $0 cost ✅

### Production Critical Path (After POC Validation)

**Only start this after POC proves concept**

1. **Week 1**: Start approvals
   - Create Stripe account → Submit for production verification (1-3 day wait)
   - Apply for WhatsApp Business API (2-4 week wait)
   - Purchase operator domains ($10-15 each)

2. **Week 2-3** (while waiting for approvals):
   - Already done in POC!
   - Minor updates to switch from test to production mode

3. **Week 4** (approvals should be ready):
   - Enable Stripe production mode
   - Complete WhatsApp Business API setup (or continue with sandbox)
   - Configure custom domains
   - Upgrade Vercel to Pro ($20/month)

**Production Total Time**: 2-4 weeks (most time is waiting for approvals)

---

## Total Time Estimate

### Manual Tasks: 11-19 hours
- Account creation: 2-3 hours
- Configuration: 4-6 hours
- Domain/DNS setup: 3-5 hours
- Verification/approval submission: 2-5 hours

### Automated Tasks: 29-43 hours
- Code integration: 20-30 hours
- Testing: 5-8 hours
- Documentation: 4-5 hours

### Approval Wait Times (Not Work Hours)
- Stripe: 1-3 days (test) to 1-2 weeks (production)
- WhatsApp: 2-4 weeks
- DNS propagation: 15 min - 48 hours

### Grand Total
- **Active work**: 40-62 hours (1-1.5 weeks full-time)
- **Calendar time**: 4-6 weeks (including approval waits)

---

## Cost Summary

### POC Phase Costs (RECOMMENDED)
**Goal**: Test concept with $0/month

| Service | POC Plan | Monthly Cost | Limitations |
|---------|----------|--------------|-------------|
| Neon Postgres | Free tier | **$0** | 0.5GB storage, 100h compute |
| Vercel | Hobby | **$0** | No custom domains (use `.vercel.app`) |
| Stripe | Test mode | **$0** | No real payments |
| Twilio WhatsApp | Sandbox | **$0** | Recipients must join sandbox |
| Cal.com | Free | **$0** | Single user only |
| Google Places | Free tier | **$0** | $200 credit + caching |
| Umami | Self-hosted | **$0** | Deploy to free Vercel |
| Resend | Free tier | **$0** | 3K emails/month |

**POC Total**: **$0/month** 🎉

**What you CAN'T do in POC**:
- ❌ Use custom domains (must use `.vercel.app/operator-slug`)
- ❌ Send WhatsApp to anyone (they must join sandbox first)
- ❌ Accept real payments (Stripe test mode only)
- ❌ Send >3,000 emails/month
- ❌ Use >0.5GB database storage

**What you CAN do in POC**:
- ✅ Test entire booking flow end-to-end
- ✅ Validate UI/UX with real users
- ✅ Test all integrations (payments, calendar, notifications)
- ✅ Deploy to production-like environment
- ✅ Demo to potential operators
- ✅ Collect feedback and iterate

### Production Costs (After POC Validation)

| Service | Production Plan | Monthly Cost | When to Upgrade |
|---------|-----------------|--------------|-----------------|
| Neon Postgres | Pro | $19 | Storage >0.5GB or compute >100h |
| Vercel | Pro | $20 | Need custom domains |
| Stripe | Live mode | $0 + 2.9% + 30¢/tx | Ready for real payments |
| Twilio WhatsApp | Business API | ~$0.005/msg | Need to message customers |
| Cal.com | Teams (optional) | $12-29 | Need multiple calendars |
| Google Places | Pay per use | ~$0-5 | Rare with caching |
| Umami | Self-hosted or Cloud | $0 or $9 | Optional upgrade |
| Resend | Pro (optional) | $20 (50K) | Exceed 3K emails/month |
| **Domains** | Per operator | $10-15/year | When ready to launch |

**Production Minimum**: $20/month (Vercel Pro for custom domains)
**Production Typical**: $40-70/month (depends on usage)

### One-Time Costs
- **POC**: $0 (no domains, no setup fees)
- **Production**: $10-15 per operator per year (domain names only)

---

## Next Steps

1. **Update DEPLOYMENT.md** with automation notes
2. **Create automation scripts** in `scripts/` directory
3. **Start critical path items** (Stripe, WhatsApp) immediately
4. **Create setup checklist** for operators
