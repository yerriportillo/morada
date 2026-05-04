# Morada Deployment & Integration Guide

This guide covers deploying Morada to production and integrating external services (Phases 11-22).

## 📋 API Setup Audit

**IMPORTANT**: This project is in **Proof of Concept** phase. Priority is testing with **$0/month cost**.

Read [`API-SETUP-AUDIT.md`](./API-SETUP-AUDIT.md) for complete details on:
- POC vs Production deployment strategies
- Free tier vs paid plan comparisons
- Detailed breakdown of manual vs automated tasks
- Time estimates and approval wait times
- Automation recommendations and scripts

**POC Quick Summary** (RECOMMENDED):
- **Setup time**: ~2 hours (create free accounts)
- **Integration work**: 20-30 hours (code)
- **Total POC time**: 1-2 weeks
- **POC cost**: **$0/month** (all free tiers)
- **No approvals needed**: Skip Stripe production verification and WhatsApp Business API

**Production Quick Summary** (After POC Validation):
- **Manual work**: 11-19 hours (account creation, configuration, approvals)
- **Migration time**: 5-10 hours (switch from test to production mode)
- **Approval wait times**: 1-3 days (Stripe) to 2-4 weeks (WhatsApp Business API)
- **Production cost**: $20-70/month

## Prerequisites

### For POC (Proof of Concept) - $0/month
**RECOMMENDED**: Start here to test viability before spending money.

- [x] Completed UI scaffolding (Phases 0-10 ✓)
- [x] Completed testing infrastructure (Phase 20 ✓)
- [ ] Read API-SETUP-AUDIT.md
- [ ] Neon Postgres FREE account (10 min)
- [ ] Vercel Hobby (FREE) account (10 min)
- [ ] Cal.com FREE account (15 min)
- [ ] Stripe account in TEST mode only (15 min - skip verification)
- [ ] Twilio SANDBOX only (15 min - skip WhatsApp Business API application)
- [ ] Google Cloud FREE tier (15 min)
- [ ] Umami self-hosted (1-2 hours)
- [ ] Resend FREE tier (10 min)

**Total POC setup**: ~2 hours, **$0 cost** ✅

**POC Limitations (acceptable for testing)**:
- ❌ No custom domains (use `morada.vercel.app/puro-surf`)
- ❌ WhatsApp sandbox only
- ❌ Stripe test mode only
- ✅ Can test entire flow end-to-end
- ✅ Can demo to operators
- ✅ Can validate concept

### For Production (After POC Validation Only)

- [ ] Purchase domain name(s) ($10-15/year per operator)
- [ ] Upgrade Vercel to Pro ($20/month for custom domains)
- [ ] Enable Stripe production mode (1-3 day approval)
- [ ] Apply for WhatsApp Business API (2-4 week approval)
- [ ] Optional: Upgrade other services as needed

**Total production cost**: $20-70/month + domain fees

---

## Phase 11: Cal.com Integration

### Setup Steps

1. **Create Cal.com Account**
   - Sign up at https://cal.com
   - Create event types for each bookable item type
   - Note your Cal.com username

2. **Install Dependencies**
   ```bash
   npm install @calcom/embed-react
   ```

3. **Environment Variables**
   Add to `.env.local`:
   ```
   NEXT_PUBLIC_CALCOM_USERNAME=your-username
   ```

4. **Integration Points**
   - `components/booking/CalendarWidget.tsx` - Create Cal.com embed
   - `app/[locale]/[operatorSlug]/book/page.tsx` - Replace mock booking with Cal widget
   - Store `calBookingUid` in Bookings collection when user books

5. **Testing**
   - Test booking flow end-to-end
   - Verify booking confirmation emails from Cal.com
   - Test calendar availability syncing

**Estimated Time**: 4-6 hours

---

## Phase 12: Stripe Connect Integration

### Setup Steps

1. **Create Stripe Account**
   - Sign up at https://stripe.com
   - Enable Stripe Connect
   - Get API keys (test + production)

2. **Install Dependencies**
   ```bash
   npm install stripe @stripe/stripe-js @stripe/react-stripe-js
   ```

3. **Environment Variables**
   ```
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

4. **API Routes to Create**
   - `app/api/stripe/create-payment-intent/route.ts` - Create payment intent for deposit
   - `app/api/stripe/webhooks/route.ts` - Handle payment status updates
   - `app/api/stripe/connect-account/route.ts` - Operator onboarding to Stripe Connect

5. **Key Features**
   - **Deposits**: Calculate 30% deposit (from `depositPercent` in BookableItems)
   - **Connect**: Each operator gets their own Stripe Connect account
   - **Tips**: Add tip option for Comunidad operators (configurable)
   - **Webhooks**: Listen for `payment_intent.succeeded`, `payment_intent.payment_failed`

6. **Update Bookings Collection**
   ```typescript
   {
     stripePaymentIntentId: string
     depositAmount: number
     remainingBalance: number
     paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
   }
   ```

7. **Testing**
   - Use Stripe test cards: `4242 4242 4242 4242`
   - Test successful payment
   - Test declined payment
   - Test webhook delivery

**Estimated Time**: 8-12 hours

---

## Phase 13: WhatsApp Notifications (Twilio)

### Setup Steps

1. **Create Twilio Account**
   - Sign up at https://twilio.com
   - Set up WhatsApp sandbox (free for testing)
   - Apply for production WhatsApp Business API access

2. **Install Dependencies**
   ```bash
   npm install twilio
   ```

3. **Environment Variables**
   ```
   TWILIO_ACCOUNT_SID=AC...
   TWILIO_AUTH_TOKEN=...
   TWILIO_WHATSAPP_FROM=whatsapp:+14155238886
   ```

4. **API Route to Create**
   - `app/api/notifications/whatsapp/route.ts` - Send WhatsApp messages

5. **Notification Templates**
   Create bilingual templates for:
   - Booking confirmation (to guest)
   - Booking notification (to operator)
   - Booking reminder (24 hours before)
   - Payment confirmation

6. **Integration Points**
   - Trigger after successful Stripe payment
   - Trigger after Cal.com booking
   - Schedule reminders (use Vercel Cron or external service)

7. **Example Template**
   ```typescript
   const templates = {
     bookingConfirmation: {
       es: `¡Hola {name}! Tu reserva en {operatorName} está confirmada para {date}. ID: {bookingId}. Te esperamos 🇸🇻`,
       en: `Hi {name}! Your booking at {operatorName} is confirmed for {date}. ID: {bookingId}. See you soon 🇸🇻`
     }
   }
   ```

**Estimated Time**: 6-8 hours

---

## Phase 14: Google Places & Reviews API

### Setup Steps

1. **Google Cloud Setup**
   - Create project at https://console.cloud.google.com
   - Enable Places API
   - Create API key
   - Restrict API key to Places API + your domain

2. **Environment Variables**
   ```
   GOOGLE_PLACES_API_KEY=AIza...
   ```

3. **API Route to Create**
   - `app/api/reviews/google/route.ts` - Fetch reviews for operator

4. **Cache Strategy**
   - Cache reviews in Redis or database
   - Refresh every 24 hours
   - Display cached reviews to reduce API calls

5. **Integration Points**
   - Add reviews section to operator landing pages
   - Show star rating in operator cards
   - Link to Google Maps for full review list

**Estimated Time**: 4-6 hours

---

## Phase 15: Vercel Deployment & Custom Domains

### Setup Steps

1. **Database Setup (Neon Postgres)**
   - Create database at https://neon.tech
   - Get connection string
   - Run Payload migrations

2. **Vercel Deployment**
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy
   vercel

   # Set environment variables in Vercel dashboard
   ```

3. **Environment Variables (Vercel)**
   Set all required env vars in Vercel dashboard:
   - `DATABASE_URL` - Neon Postgres connection string
   - `PAYLOAD_SECRET` - Generate secure random string
   - `NEXT_PUBLIC_SITE_URL` - Your production URL
   - All API keys from previous phases

4. **Custom Domains**
   - Purchase domain for each operator (e.g., `purosurf.com`)
   - Add domain in Vercel dashboard
   - Configure DNS (A record or CNAME)
   - Enable auto-SSL

5. **Multi-Domain Strategy**
   - Option A: Separate Vercel project per operator (more isolation)
   - Option B: Single Vercel project with domain routing (more efficient)
   - Recommended: Option B with middleware domain detection

6. **Build Configuration**
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": ".next",
     "installCommand": "npm install --legacy-peer-deps"
   }
   ```

**Estimated Time**: 6-8 hours (first deployment)

---

## Phase 16: Subscription System (Stripe Billing)

### Setup Steps

1. **Create Stripe Products**
   - **Comunidad** tier: $29/month
   - **Operator** tier: $79/month
   - **Partner** tier: $149/month

2. **API Routes to Create**
   - `app/api/stripe/create-subscription/route.ts` - Start subscription
   - `app/api/stripe/billing-portal/route.ts` - Customer portal link
   - Update webhook route to handle subscription events

3. **Webhook Events**
   ```typescript
   'customer.subscription.created'
   'customer.subscription.updated'
   'customer.subscription.deleted'
   'invoice.payment_succeeded'
   'invoice.payment_failed'
   ```

4. **Update Operators Collection**
   ```typescript
   {
     stripeCustomerId: string
     stripeSubscriptionId: string
     subscriptionStatus: 'active' | 'past_due' | 'canceled' | 'incomplete'
     currentPeriodEnd: Date
   }
   ```

5. **Access Control**
   - Disable operator site if subscription lapses
   - Show billing alerts in admin dashboard
   - Grace period: 7 days past due

**Estimated Time**: 8-10 hours

---

## Phase 17: Analytics & Tracking

### Setup Steps

1. **Umami Analytics**
   - Self-host or use Umami Cloud
   - Create website for each operator
   - Get tracking script

2. **Environment Variables**
   ```
   NEXT_PUBLIC_UMAMI_WEBSITE_ID=...
   NEXT_PUBLIC_UMAMI_SRC=https://analytics.morada.sv/script.js
   ```

3. **Integration**
   - Add Umami script to `app/[locale]/layout.tsx`
   - Track custom events:
     - `regreso-page-view` - Track /regreso visits
     - `booking-started` - User clicked "Book Now"
     - `booking-completed` - Payment succeeded

4. **Analytics Dashboard**
   - Create `app/[locale]/admin/analytics/page.tsx`
   - Embed Umami iframe or use Umami API
   - Show operator-specific metrics

5. **Key Metrics**
   - Total visitors
   - Regreso page conversion rate
   - Booking funnel: Landing → Form → Payment
   - Revenue per operator

**Estimated Time**: 4-6 hours

---

## Phase 18: Email System (Resend)

### Setup Steps

1. **Create Resend Account**
   - Sign up at https://resend.com
   - Verify domain
   - Get API key

2. **Install Dependencies**
   ```bash
   npm install resend react-email
   ```

3. **Environment Variables**
   ```
   RESEND_API_KEY=re_...
   RESEND_FROM_EMAIL=noreply@morada.sv
   ```

4. **Email Templates**
   Create in `emails/` directory:
   - `BookingConfirmation.tsx` - React Email template
   - `BookingReceipt.tsx` - Payment receipt
   - `BookingReminder.tsx` - 24h reminder

5. **API Route**
   - `app/api/emails/send/route.ts` - Send emails

6. **Bilingual Emails**
   - Detect guest language preference from booking
   - Send email in correct language
   - Include both languages in subject line

**Estimated Time**: 6-8 hours

---

## Phase 19: Advanced Features

### Bitcoin Payments (El Salvador Chivo)
- Research Chivo Wallet API
- Add Bitcoin payment option
- Display BTC equivalent price

### Surfline Swell Forecast
- Integrate Surfline API
- Show forecast widget on surf spot pages
- Update every 6 hours

### Multi-Operator Packages
- Allow bundling multiple operators
- Example: Surf lesson + eco-lodge stay
- Split revenue between operators

### Gift Cards/Vouchers
- Stripe voucher codes
- Redeemable across operators
- Expiration dates

**Estimated Time**: 20-30 hours total

---

## Phase 20: Testing & QA

### Unit Tests
```bash
npm install -D jest @testing-library/react @testing-library/jest-dom
npm install -D @testing-library/user-event
```

Test coverage for:
- Validation utilities (`lib/validation.ts`)
- Form validation (`lib/formValidation.ts`)
- UI components (Button, Input, Card, etc.)

### Integration Tests
- Booking flow (end-to-end)
- Payment flow (with Stripe test mode)
- WhatsApp notifications (with Twilio sandbox)

### E2E Tests (Playwright)
```bash
npm install -D @playwright/test
npx playwright install
```

Test scenarios:
- User books surf lesson (full flow)
- Operator creates new program
- Language switching works
- Regreso tracking works

### Accessibility Audit
```bash
npm install -D @axe-core/playwright
```

Run automated accessibility tests

**Estimated Time**: 15-20 hours

---

## Phase 21: Documentation

### Operator Onboarding Guide
Create `docs/OPERATOR_GUIDE.md`:
- How to add programs/rooms/tours
- How to upload photos
- How to connect Cal.com
- How to set up Stripe
- How to customize Regreso page

### Video Tutorials
- Loom or YouTube videos
- 5-minute quickstart
- Full 30-minute walkthrough

### Style Guide
- Brand guidelines (colors, fonts, tone)
- Photo specifications (dimensions, formats)
- Content best practices

**Estimated Time**: 10-15 hours

---

## Phase 22: Launch & Marketing

### Pre-Launch Checklist
- [ ] All environment variables set
- [ ] Database migrations run
- [ ] SSL certificates active
- [ ] Custom domains configured
- [ ] Stripe Connect tested
- [ ] WhatsApp notifications working
- [ ] Email templates tested
- [ ] Analytics tracking verified
- [ ] Accessibility audit passed
- [ ] Mobile testing complete

### Launch Strategy
1. **Soft Launch**: Onboard first 5 operators
   - 1 Moradas Costeras (surf camp)
   - 1 Refugio (eco-lodge)
   - 1 Guía (tour operator)
   - 1 Comunidad (cooperative)
   - 1 additional (any type)

2. **Marketing Campaign**
   - Create press kit
   - Reach out to Salvadoran tourism blogs
   - Social media (Instagram, TikTok)
   - Target diaspora communities

3. **Outreach**
   - Email Salvadoran tourism associations
   - Contact surf shops in La Libertad
   - Reach out to eco-lodges
   - Connect with community cooperatives

**Estimated Time**: Ongoing

---

## Environment Variables Reference

Complete `.env.local` template:

```bash
# Database
DATABASE_URL="postgresql://..."

# Payload CMS
PAYLOAD_SECRET="your-secret-key-min-32-chars"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

# Cal.com
NEXT_PUBLIC_CALCOM_USERNAME="your-username"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Twilio WhatsApp
TWILIO_ACCOUNT_SID="AC..."
TWILIO_AUTH_TOKEN="..."
TWILIO_WHATSAPP_FROM="whatsapp:+14155238886"

# Google Places
GOOGLE_PLACES_API_KEY="AIza..."

# Umami Analytics
NEXT_PUBLIC_UMAMI_WEBSITE_ID="..."
NEXT_PUBLIC_UMAMI_SRC="https://analytics.morada.sv/script.js"

# Resend Email
RESEND_API_KEY="re_..."
RESEND_FROM_EMAIL="noreply@morada.sv"
```

Copy to `.env.example` (without values) for git tracking.

---

## Deployment Commands

### Initial Deployment
```bash
# Build locally first
npm run build

# Deploy to Vercel
vercel --prod

# Run database migrations
# (Connect to Vercel deployment, then run)
npm run payload migrate
```

### Subsequent Deployments
```bash
# Commit changes
git add .
git commit -m "Your changes"

# Push to main (triggers auto-deploy)
git push origin main
```

---

## Monitoring & Maintenance

### Daily
- Check Stripe dashboard for failed payments
- Monitor Umami analytics for traffic spikes
- Review WhatsApp delivery status

### Weekly
- Review error logs in Vercel
- Check operator feedback
- Update content as needed

### Monthly
- Review subscription renewals
- Analyze conversion funnel
- Update documentation

---

## Support & Resources

- **Payload Docs**: https://payloadcms.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Stripe Connect**: https://stripe.com/docs/connect
- **Twilio WhatsApp**: https://www.twilio.com/docs/whatsapp
- **Cal.com Embed**: https://cal.com/docs/integrations/embed

---

## Estimated Total Time for Phases 11-22

- Phase 11 (Cal.com): 4-6 hours
- Phase 12 (Stripe): 8-12 hours
- Phase 13 (WhatsApp): 6-8 hours
- Phase 14 (Reviews): 4-6 hours
- Phase 15 (Deployment): 6-8 hours
- Phase 16 (Subscriptions): 8-10 hours
- Phase 17 (Analytics): 4-6 hours
- Phase 18 (Email): 6-8 hours
- Phase 19 (Advanced): 20-30 hours
- Phase 20 (Testing): 15-20 hours
- Phase 21 (Docs): 10-15 hours
- Phase 22 (Launch): Ongoing

**Total**: ~100-140 hours of development work

With a dedicated developer, this represents **3-4 weeks** of full-time work.

---

## Automation & Setup Scripts

### Recommended Automation Scripts

To streamline deployment, create the following scripts in `scripts/` directory:

#### 1. **`scripts/deploy.sh`** - Automated Vercel Deployment
```bash
#!/bin/bash
# Deploys to Vercel with all environment variables
vercel --prod \
  --env DATABASE_URL="$DATABASE_URL" \
  --env PAYLOAD_SECRET="$PAYLOAD_SECRET" \
  # ... all other env vars
```

#### 2. **`scripts/stripe-setup.sh`** - Stripe Configuration
```bash
#!/bin/bash
# Creates Stripe products and webhooks via CLI
stripe products create --name "Comunidad" --description "Tier básico"
stripe prices create --product xxx --unit-amount 2900 --currency usd --recurring interval=month
# ... etc
```

#### 3. **`scripts/db-setup.sh`** - Database Setup
```bash
#!/bin/bash
# Creates Neon database and runs migrations
neonctl projects create --name morada
neonctl branches create --name production
npm run payload migrate
```

#### 4. **`scripts/gcp-setup.sh`** - Google Cloud Setup
```bash
#!/bin/bash
# Enables Google Cloud APIs and creates credentials
gcloud services enable places-backend.googleapis.com
gcloud alpha services api-keys create --display-name="Morada"
```

#### 5. **`scripts/check-env.sh`** - Environment Validation
```bash
#!/bin/bash
# Validates all required environment variables are set
required_vars=(
  "DATABASE_URL"
  "PAYLOAD_SECRET"
  "STRIPE_SECRET_KEY"
  # ... all required vars
)
for var in "${required_vars[@]}"; do
  if [[ -z "${!var}" ]]; then
    echo "❌ Missing: $var"
  else
    echo "✅ Set: $var"
  fi
done
```

#### 6. **`scripts/generate-dns.sh`** - DNS Configuration Helper
```bash
#!/bin/bash
# Generates DNS records for Resend and Vercel
echo "Add these DNS records to your registrar:"
echo ""
echo "Resend SPF:"
echo "TXT @ v=spf1 include:_spf.resend.com ~all"
echo ""
echo "Vercel CNAME:"
echo "CNAME www cname.vercel-dns.com"
```

### Automation Potential Summary

| Task | Automation Level | Time Saved |
|------|------------------|------------|
| Vercel deployment | ✅ Fully automated (CLI) | 2-3h per deploy |
| Stripe product setup | ✅ Fully automated (CLI) | 1-2h |
| Database setup | ✅ Fully automated (CLI) | 1-2h |
| Google Cloud setup | ✅ Fully automated (gcloud) | 1h |
| Environment variables | ✅ Scriptable | 30min-1h |
| DNS records | ⚠️ Semi-automated (copy/paste) | 30min |
| Cal.com event types | ❌ Manual only (no API) | - |
| WhatsApp Business API | ❌ Manual approval | - |
| Stripe verification | ❌ Manual approval | - |

**Total Automation Savings**: ~6-10 hours per deployment

### POC Deployment Timeline (RECOMMENDED)

**Goal**: Working demo in 1-2 weeks with $0 cost

#### Day 1: Create Free Accounts (~2 hours)
1. ✅ Neon Postgres (free tier) - 10 min
2. ✅ Vercel (Hobby plan) - 10 min
3. ✅ Stripe (test mode only, skip verification) - 15 min
4. ✅ Twilio (sandbox only, skip Business API) - 15 min
5. ✅ Cal.com (free plan) - 15 min
6. ✅ Resend (free tier) - 10 min
7. ✅ Google Cloud (free tier) - 15 min

#### Week 1: Build Integrations (~20-30 hours)
1. 🔧 Cal.com widget integration (3-4h)
2. 🔧 Stripe test mode payments (6-8h)
3. 🔧 WhatsApp sandbox notifications (4-5h)
4. 🔧 Google Places reviews with caching (3-4h)
5. 🔧 Resend email templates (5-6h)

#### Week 2: Deploy & Test (~10-20 hours)
1. 🔧 Deploy to Vercel (1-2h)
2. 🔧 Self-host Umami analytics (1-2h)
3. 🔧 End-to-end testing (4-6h)
4. 🧪 Share with operators for feedback (4-8h)
5. 📝 Document POC results (2-4h)

**POC Total Time**: 1-2 weeks, **$0 cost** ✅

### Production Deployment Timeline (After POC Validation)

**Only proceed here if POC proves concept**

#### Week 1: Start Approvals
1. ✅ Enable Stripe production mode → Submit verification (1-3 day wait)
2. ✅ Apply for WhatsApp Business API (2-4 week wait) - **OPTIONAL**
3. ✅ Purchase operator domains ($10-15 each)
4. ✅ Upgrade Vercel to Pro ($20/month)

#### Week 2-3: Migration (while waiting for approvals)
1. 🔧 Switch Stripe from test to live mode (1-2h)
2. 🔧 Configure custom domains on Vercel (2-3h per operator)
3. 🔧 Set up DNS for domains (1-2h)
4. 🔧 Optional: Upgrade other services as needed (1-2h)

#### Week 4: Go Live
1. ✅ Stripe production approval should be complete
2. 🔧 Final production testing (4-6h)
3. 🧪 Soft launch with first operator (ongoing)
4. 📝 Documentation and operator onboarding (10-15h)

**Production Total Time**: 2-4 weeks (mostly waiting for approvals)
**Production Active Work**: 15-30 hours

---

## Cost Analysis

### POC Phase Costs (RECOMMENDED)

**Goal**: Test concept with $0/month

| Service | POC Plan | Monthly Cost | Limitations |
|---------|----------|--------------|-------------|
| Neon Postgres | Free tier (0.5GB) | **$0** | 3 projects, 100h compute |
| Vercel | Hobby | **$0** | No custom domains |
| Stripe | Test mode | **$0** | No real payments |
| Twilio WhatsApp | Sandbox | **$0** | Recipients must join |
| Cal.com | Free | **$0** | Single user |
| Google Places | Free tier + cache | **$0** | $200 credit |
| Umami Analytics | Self-hosted | **$0** | Deploy to Vercel |
| Resend | Free tier | **$0** | 3K emails/month |

**POC Total**: **$0/month** 🎉

**POC URL Format**: `morada.vercel.app/puro-surf` (no custom domain needed)

### Production Phase Costs (After POC Validation)

| Service | Production Plan | Monthly Cost | When to Upgrade |
|---------|-----------------|--------------|-----------------|
| Neon Postgres | Free or Pro | $0 or $19 | If exceed 0.5GB storage |
| Vercel | Pro | **$20** | For custom domains |
| Stripe | Live mode | 2.9% + 30¢/tx | Accept real payments |
| Twilio WhatsApp | Business API | ~$0.005/msg | Message customers |
| Cal.com | Free or Teams | $0 or $12-29 | Need team features |
| Google Places | Pay per use | ~$0-5 | High traffic (rare) |
| Umami Analytics | Self-hosted | **$0** | Keep free |
| Resend | Free or Pro | $0 or $20 | Exceed 3K emails/month |

**Production Minimum**: $20/month (Vercel Pro for custom domains)
**Production Typical**: $40-70/month (depends on transaction volume)

### One-Time Costs
- **POC**: $0 (no domains, no fees)
- **Production**: $10-15 per operator per year (domain names)

---

## Next Steps

1. ✅ **Read API-SETUP-AUDIT.md** for detailed breakdown
2. 📝 **Create automation scripts** in `scripts/` directory
3. 🚀 **Start critical path items** (Stripe, WhatsApp) immediately
4. 📋 **Create operator setup checklist** based on audit
5. 🧪 **Test each integration** with Phase 20 test suite

For detailed automation recommendations and time-saving strategies, see [`API-SETUP-AUDIT.md`](./API-SETUP-AUDIT.md).
