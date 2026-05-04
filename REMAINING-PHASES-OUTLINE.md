# Morada - Remaining Phases Outline

This document provides a detailed outline of the remaining implementation phases (15-22) for Morada POC.

## Current Status

**Completed**: 16 phases + Marketing Page
- ✅ Phases 0-10: UI Scaffolding (complete with mock data)
- ✅ Phase 11: Cal.com Integration (POC ready)
- ✅ Phase 12: Stripe Payments (POC ready, test mode)
- ✅ Phase 13: WhatsApp Notifications (POC ready, sandbox)
- ✅ Phase 14: Google Places Reviews (POC ready, free tier)
- ✅ Phase 20: Testing Infrastructure (101 tests passing)
- ✅ Marketing Landing Page

**Remaining**: 7 phases (15-19, 21-22)

**POC Total Cost**: $0/month (all free tiers)

---

## Phase 14.5: GitHub Repository Setup (NEW)

**Priority**: CRITICAL - Must be done before deployment
**Time Estimate**: 30-45 minutes
**POC Cost**: $0 (GitHub free tier)

### Tasks:

1. **Initialize Git Repository** (5 min)
   - `git init`
   - Create `.gitignore` (already exists)
   - Verify sensitive files excluded (.env.local, node_modules, .next)
   - Initial commit

2. **Create GitHub Repository** (5 min)
   - Create new repo: `morada-platform` (private)
   - Add description: "White-label tourism platform for El Salvador"
   - Initialize with README
   - Add topics: `nextjs`, `typescript`, `payload-cms`, `el-salvador`, `tourism`

3. **Push Code to GitHub** (5 min)
   - Add remote: `git remote add origin https://github.com/yourusername/morada-platform.git`
   - Push main branch: `git push -u origin main`
   - Verify all files pushed correctly

4. **Set Up Branch Protection** (10 min)
   - Create `development` branch
   - Set up branch protection rules for `main`:
     - Require pull request reviews
     - Require status checks (tests) to pass
     - No force pushes
   - Create `.github/workflows` directory for CI/CD

5. **Add Repository Secrets** (5 min)
   - Add secrets for GitHub Actions:
     - `PAYLOAD_SECRET`
     - `DATABASE_URL` (will be Neon URL)
     - Other API keys (added in Phase 15)

6. **Create Initial Documentation** (10 min)
   - Update README.md with:
     - Project overview
     - Tech stack
     - Quick start guide
     - Link to DEPLOYMENT.md
   - Add LICENSE (MIT or your choice)
   - Add CONTRIBUTING.md (if open source)

7. **Optional: Set Up GitHub Actions** (deferred to Phase 15)
   - CI workflow for running tests
   - Automatic Vercel deployment
   - Code quality checks (ESLint, TypeScript)

**Deliverable**: GitHub repository with code, documentation, and branch protection

**Files to Create**:
- `.github/workflows/ci.yml` (optional, Phase 15)
- `README.md` (updated)
- `LICENSE`
- `CONTRIBUTING.md` (optional)

---

## Phase 15: Vercel Deployment & Neon Database

**Priority**: HIGH - Required for POC testing
**Time Estimate**: 2-3 hours
**POC Cost**: $0/month (Vercel Hobby + Neon Free Tier)

### Part A: Neon Database Setup (45-60 min)

1. **Create Neon Account** (5 min)
   - Sign up at neon.tech with GitHub
   - Select free tier (0.5GB storage, 3 projects)
   - Create project: "morada-poc"

2. **Create Database** (5 min)
   - Database name: `morada`
   - Region: `us-east-1` (or closest to target users)
   - Copy connection string
   - Add to `.env.local` and Vercel env vars

3. **Run Payload Migrations** (10 min)
   - Update `payload.config.ts` to use Neon DATABASE_URL
   - Run: `npx payload migrate:create initial-schema`
   - Run: `npx payload migrate`
   - Verify tables created in Neon dashboard

4. **Seed Production Data** (20 min)
   - Create minimal seed script for production
   - Seed 1 operator (Puro Surf)
   - Seed essential data (surf spots, pickup locations)
   - Test locally with Neon database

5. **Set Up Backups** (10 min)
   - Enable point-in-time recovery (free tier: 7 days)
   - Set up database backup alerts
   - Document restore process

### Part B: Vercel Deployment (60-90 min)

1. **Connect GitHub to Vercel** (10 min)
   - Sign up/login to Vercel
   - Import GitHub repository
   - Select framework preset: Next.js
   - Configure build settings

2. **Configure Environment Variables** (20 min)
   - Add all environment variables from `.env.local`:
     - `PAYLOAD_SECRET`
     - `DATABASE_URL` (Neon)
     - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
     - `STRIPE_SECRET_KEY`
     - `TWILIO_ACCOUNT_SID`
     - `TWILIO_AUTH_TOKEN`
     - `GOOGLE_PLACES_API_KEY`
     - `NEXT_PUBLIC_CAL_NAMESPACE`
   - Set for Production, Preview, and Development environments

3. **Configure Build Settings** (10 min)
   - Build command: `npm run build`
   - Output directory: `.next`
   - Install command: `npm install --legacy-peer-deps`
   - Node version: 18.x

4. **Deploy and Test** (20 min)
   - Trigger first deployment
   - Monitor build logs for errors
   - Test deployed URL: `https://morada-platform.vercel.app`
   - Verify:
     - Homepage loads
     - Operator page loads
     - Booking form works
     - API routes respond

5. **Set Up Custom Domain (Optional for POC)** (10 min)
   - Purchase domain: `morada.sv` (skip for POC)
   - Or use free `.vercel.app` subdomain
   - Configure DNS if using custom domain
   - Wait for SSL certificate

6. **Configure Webhooks** (10 min)
   - Update Stripe webhook URL to production
   - Update Twilio WhatsApp callback URL
   - Test webhook delivery

**Deliverable**: Live production environment at Vercel + Neon database

**POC Configuration**:
- Use `.vercel.app` domain (free)
- Neon Free Tier (0.5GB, 3 projects)
- Vercel Hobby Plan (free)
- No custom domains
- Total: $0/month

---

## Phase 16: Subscription System (Stripe Billing)

**Priority**: MEDIUM - Required for production, not POC
**Time Estimate**: 6-8 hours
**POC Cost**: $0 (test mode only)

### Tasks:

1. **Create Stripe Products** (30 min)
   - Create 3 products in Stripe Dashboard:
     - Comunidad: $29/month (or free/subsidized)
     - Operator: $79/month
     - Partner: $149/month
   - Add product descriptions and metadata

2. **Build Subscription Checkout** (2 hours)
   - Create `app/[locale]/subscribe/page.tsx`
   - Display pricing tiers with features
   - Stripe Checkout integration
   - Redirect to Stripe hosted checkout

3. **Handle Subscription Webhooks** (2 hours)
   - `subscription.created` - Activate operator
   - `subscription.updated` - Update tier
   - `subscription.canceled` - Deactivate operator
   - `invoice.paid` - Record payment
   - `invoice.payment_failed` - Send reminder

4. **Update Operator Status** (1 hour)
   - Add subscription status to Operators collection
   - Show subscription tier in admin dashboard
   - Restrict features based on tier

5. **Create Billing Portal** (1 hour)
   - Add "Manage Subscription" link
   - Redirect to Stripe Customer Portal
   - Allow plan changes and cancellation

6. **Test Subscription Flow** (1-2 hours)
   - Test each tier signup
   - Test plan upgrades/downgrades
   - Test cancellation
   - Test failed payment handling

**Deliverable**: Recurring revenue subscription system

**POC Approach**: Skip for now, implement when ready to onboard paying operators

---

## Phase 17: Analytics & Tracking

**Priority**: MEDIUM - Useful for POC metrics
**Time Estimate**: 4-6 hours
**POC Cost**: $0 (Umami self-hosted on Vercel)

### Tasks:

1. **Deploy Umami Analytics** (2 hours)
   - Deploy Umami to separate Vercel project
   - Connect to Neon database (separate DB)
   - Create website entries for each operator
   - Get tracking scripts

2. **Add Tracking Code** (1 hour)
   - Add Umami script to `app/[locale]/layout.tsx`
   - Track page views automatically
   - Add custom events:
     - `booking_started`
     - `booking_completed`
     - `regreso_visitor` (from /regreso page)

3. **Create Analytics Dashboard** (2 hours)
   - Build analytics view in Payload admin
   - Show key metrics per operator:
     - Page views
     - Unique visitors
     - Conversion rate
     - Regreso visitor percentage
   - Fetch data from Umami API

4. **Track Regreso Conversions** (1 hour)
   - Add UTM parameters to /regreso links
   - Track visitors from /regreso page
   - Display regreso metrics in admin

**Deliverable**: Privacy-focused analytics with regreso tracking

**POC Benefits**:
- Free (self-hosted)
- No cookies (GDPR compliant)
- Track POC user engagement
- Measure regreso conversion

---

## Phase 18: Email System (Resend)

**Priority**: MEDIUM - Enhances notifications
**Time Estimate**: 4-5 hours
**POC Cost**: $0 (Resend free tier: 3K emails/month)

### Tasks:

1. **Set Up Resend** (30 min)
   - Create Resend account
   - Verify domain (or use resend.dev for testing)
   - Get API key
   - Add to environment variables

2. **Create Email Templates** (2 hours)
   - Booking confirmation (ES/EN)
   - Payment receipt (ES/EN)
   - Pre-arrival reminder (ES/EN)
   - Balance due reminder (ES/EN)
   - Review request (ES/EN)
   - Use React Email for templates

3. **Build Email Sending Function** (1 hour)
   - Create `lib/emails/sendEmail.ts`
   - Helper functions for each email type
   - Bilingual template selection
   - Error handling and logging

4. **Integrate with Booking Flow** (1 hour)
   - Send confirmation email after booking
   - Send receipt email after payment
   - Queue reminder emails (pre-arrival, balance)

5. **Test Email Templates** (30 min)
   - Test in different email clients
   - Test Spanish and English versions
   - Test on mobile devices

**Deliverable**: Professional email notifications

**POC Limits**:
- 3,000 emails/month (Resend free tier)
- Use resend.dev domain (or verify operator domains)
- Sufficient for POC testing

---

## Phase 19: Advanced Features (Nice-to-Have)

**Priority**: LOW - Future enhancements
**Time Estimate**: 10-15 hours (spread across multiple features)
**POC Cost**: $0 (all optional)

### Feature 1: Bitcoin Payments (3-4 hours)

- Integrate El Salvador's Chivo wallet
- Add Bitcoin as payment option
- Handle BTC price volatility
- Show USD equivalent

### Feature 2: Surfline Integration (2-3 hours)

- Fetch surf forecasts for each spot
- Display wave height, period, wind
- Show best days to surf
- Link to full Surfline forecast

### Feature 3: Multi-Operator Packages (3-4 hours)

- Create "package deals" collection
- Combine multiple operators
- Special pricing for packages
- Example: "Surf + Eco-Lodge Package"

### Feature 4: Gift Cards / Vouchers (2-3 hours)

- Create voucher codes
- Apply discounts at checkout
- Track voucher usage
- Expiration dates

### Feature 5: Waitlist System (2-3 hours)

- Add "Join Waitlist" button for sold-out dates
- Email notification when spot opens
- Waitlist priority ordering

**Deliverable**: Enhanced platform features

**POC Approach**: Skip for now, focus on core features

---

## Phase 21: Documentation & Operator Onboarding

**Priority**: HIGH - Required before launch
**Time Estimate**: 6-8 hours
**POC Cost**: $0

### Tasks:

1. **Create Operator Onboarding Guide** (3 hours)
   - PDF/video walkthrough
   - How to add programs/rooms/tours
   - How to upload photos
   - How to connect Cal.com
   - How to set up Stripe
   - How to manage bookings

2. **Create Content Style Guide** (2 hours)
   - Tone and voice guidelines
   - Photo specifications (size, format, quality)
   - Bilingual content requirements
   - Example operator profiles

3. **Add In-App Help** (2 hours)
   - Tooltips in Payload admin
   - Help text for each field
   - Link to documentation
   - FAQs

4. **Create Video Tutorials** (Optional, 3-4 hours)
   - Screen recordings of key tasks
   - Bilingual voiceovers
   - Upload to YouTube
   - Embed in admin

**Deliverable**: Self-service operator onboarding

---

## Phase 22: Launch & Marketing

**Priority**: HIGH - Final phase before going live
**Time Estimate**: 10-15 hours (+ ongoing marketing)
**POC Cost**: $0 (organic marketing)

### Tasks:

1. **Launch morada.sv Directory** (2 hours)
   - Create central landing page
   - List all operators
   - Filter by type and region
   - SEO optimization

2. **Onboard First 5 Operators** (5 hours)
   - 1 Moradas Costeras (Puro Surf)
   - 1 Refugio (eco-lodge)
   - 1 Guía (tour operator)
   - 1 Comunidad (cooperative)
   - 1 extra (your choice)
   - Help them set up profiles
   - Test bookings end-to-end

3. **Create Launch Campaign** (3 hours)
   - Target Salvadoran diaspora
   - Create social media posts (Instagram, TikTok, Facebook)
   - Focus on /regreso landing page
   - Highlight authentic, local experiences

4. **Set Up Social Media** (2 hours)
   - Create Instagram account
   - Create TikTok account (popular in El Salvador)
   - Create Facebook page
   - Post initial content

5. **Create Press Kit** (2 hours)
   - Logo variations (PNG, SVG)
   - Screenshots of platform
   - Founder story
   - Mission statement
   - Contact information

6. **Reach Out to Influencers** (2 hours)
   - Identify Salvadoran travel bloggers
   - Reach out to diaspora influencers
   - Offer free stays in exchange for reviews
   - Build relationships with tourism media

**Deliverable**: Public launch with initial operators

---

## POC Implementation Timeline

**Week 1: Deployment & Infrastructure**
- Day 1-2: GitHub setup + Neon database (Phase 14.5, 15A)
- Day 3-4: Vercel deployment + testing (Phase 15B)
- Day 5: Buffer for issues

**Week 2: Enhancements**
- Day 1-2: Analytics setup (Phase 17)
- Day 3-4: Email system (Phase 18)
- Day 5: Testing and bug fixes

**Week 3: Documentation & Preparation**
- Day 1-3: Operator onboarding docs (Phase 21)
- Day 4-5: Marketing materials (Phase 22 prep)

**Week 4: Launch**
- Day 1-2: Onboard first 5 operators (Phase 22)
- Day 3-4: Launch campaign
- Day 5: Monitor and support

**Total POC Timeline**: 4 weeks to production launch

---

## POC Cost Summary

| Service | Phase | POC Cost | Usage Limit |
|---------|-------|----------|-------------|
| **GitHub** | 14.5 | $0 | Free tier |
| **Neon Database** | 15 | $0 | 0.5GB, 3 projects |
| **Vercel Hosting** | 15 | $0 | Hobby plan |
| **Cal.com** | 11 | $0 | Single user |
| **Stripe** | 12 | $0 | Test mode only |
| **Twilio WhatsApp** | 13 | $0 | $15 trial credit |
| **Google Places** | 14 | $0 | $200/month credit |
| **Umami Analytics** | 17 | $0 | Self-hosted |
| **Resend Email** | 18 | $0 | 3K emails/month |
| **Subscriptions** | 16 | Deferred | Not needed for POC |

**Total POC Cost**: **$0/month** 🎉

---

## Production Upgrade Path

Once POC validates the concept (100+ bookings, 10+ operators):

| Service | Production Cost | When to Upgrade |
|---------|----------------|-----------------|
| **Neon Database** | $19/month | >0.5GB data |
| **Vercel** | $20/month | Need custom domains |
| **WhatsApp Business** | $0.005/msg | >750 messages or need branded number |
| **Stripe** | 2.9% + $0.30 | Enable live mode (no monthly fee) |
| **Google Places** | Pay per use | >$200/month usage (unlikely) |
| **Cal.com Teams** | $12-29/month | Multiple operators need separate calendars |
| **Resend** | $20/month | >3K emails/month |

**Estimated Production Cost**: $70-100/month (scales with usage)

---

## Next Steps

1. **Immediate**: Set up GitHub repository (Phase 14.5)
2. **This Week**: Deploy to Vercel + Neon (Phase 15)
3. **Next Week**: Add analytics and email (Phases 17-18)
4. **Following Weeks**: Documentation and launch (Phases 21-22)

The platform is feature-complete for POC. Remaining work is infrastructure, deployment, and go-to-market.
