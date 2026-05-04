# Phase 15: Vercel Deployment + Neon Database - Step-by-Step Guide

**Time Estimate**: 2-3 hours
**POC Cost**: $0/month (Vercel Hobby + Neon Free Tier)

This guide will walk you through deploying Morada to production using Vercel (hosting) and Neon (PostgreSQL database).

---

## Part A: Neon Database Setup (45-60 minutes)

### Step 1: Create Neon Account (5 minutes)

1. Go to https://neon.tech
2. Click **Sign Up**
3. Sign up with GitHub (recommended for easy integration)
4. Verify your email if prompted
5. You'll be redirected to the Neon Console

### Step 2: Create Database Project (10 minutes)

1. In the Neon Console, click **Create a project**
2. Configure the project:
   - **Project name**: `morada-poc` (or `morada-production`)
   - **Region**: Select closest to your target users:
     - `us-east-1` (Virginia) - Good for US East Coast
     - `us-west-2` (Oregon) - Good for US West Coast
     - `eu-central-1` (Frankfurt) - Good for Europe
   - **PostgreSQL version**: 16 (latest)
3. Click **Create Project**
4. Wait for the project to be provisioned (~30 seconds)

### Step 3: Get Connection String (5 minutes)

1. Once created, you'll see the **Connection Details** page
2. Copy the connection string that looks like:
   ```
   postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```
3. **IMPORTANT**: Save this connection string - you'll need it multiple times

**Connection String Format**:
```
postgresql://[user]:[password]@[host]/[database]?sslmode=require
```

### Step 4: Update Local Environment (2 minutes)

1. Open your `.env.local` file
2. Update the `DATABASE_URL`:
   ```bash
   DATABASE_URL=postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```
3. Save the file
4. **Verify**: The connection string starts with `postgresql://` and ends with `?sslmode=require`

### Step 5: Run Payload Migrations (10 minutes)

Now we'll create and run database migrations to set up all tables.

1. **Create migration**:
   ```bash
   npx payload migrate:create initial-schema
   ```
   This will generate a migration file in `src/migrations/` with a timestamp.

2. **Run migration**:
   ```bash
   npx payload migrate
   ```
   This will create all Payload tables in your Neon database.

3. **Verify in Neon Console**:
   - Go to Neon Console → Your Project → Tables
   - You should see tables like:
     - `payload_migrations`
     - `users`
     - `operators`
     - `bookable_items`
     - `bookings`
     - `surf_spots`
     - `guides`
     - `community_members`
     - `impact_metrics`
     - `pickup_locations`
     - `media`

### Step 6: Seed Production Data (20 minutes)

We'll seed the database with essential data for the POC.

1. **Run the seed script**:
   ```bash
   npm run seed
   ```
   This will populate:
   - 8 El Salvador surf spots
   - 1 demo operator (Puro Surf)
   - 3 surf programs
   - 2 guides
   - Sample community members
   - Sample impact metrics

2. **Verify in Payload Admin**:
   ```bash
   npm run dev
   ```
   Then visit http://localhost:3005/admin and verify:
   - Operators collection has "Puro Surf"
   - Surf Spots collection has 8 spots
   - Bookable Items has 3 programs

3. **Create Admin User**:
   - Visit http://localhost:3005/admin
   - Create your first admin user with email and password
   - **IMPORTANT**: Save these credentials - you'll need them for Vercel deployment

### Step 7: Test Local Connection (5 minutes)

1. Start the dev server:
   ```bash
   npm run dev
   ```

2. Visit http://localhost:3005/en
3. Navigate to Puro Surf operator page
4. Verify all data loads correctly
5. Test the booking form (don't submit - we're just testing UI)

If everything works locally with Neon, you're ready for Vercel deployment.

### Step 8: Enable Backups (5 minutes)

1. In Neon Console → Your Project → Settings
2. **Backups** section:
   - **Point-in-time recovery**: Enabled (default on free tier)
   - **Retention**: 7 days (free tier)
3. **Billing Alerts** (recommended):
   - Go to Account Settings → Billing
   - Set alert at 80% of free tier usage
   - Add your email for notifications

---

## Part B: Vercel Deployment (60-90 minutes)

### Step 1: Create Vercel Account (5 minutes)

1. Go to https://vercel.com
2. Click **Sign Up**
3. Sign up with GitHub (same account as your repository)
4. Authorize Vercel to access your GitHub account
5. You'll be redirected to the Vercel Dashboard

### Step 2: Import GitHub Repository (10 minutes)

1. In Vercel Dashboard, click **Add New...** → **Project**
2. Find your repository: `yerriportillo/morada`
3. Click **Import**
4. **Configure Project**:
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: `./` (leave as default)
   - **Build Settings**:
     - Build Command: `npm run build`
     - Output Directory: `.next`
     - Install Command: `npm install --legacy-peer-deps`
   - **Node Version**: 18.x (should auto-detect from package.json)

**IMPORTANT**: Do NOT click "Deploy" yet - we need to add environment variables first.

### Step 3: Configure Environment Variables (20 minutes)

Click **Environment Variables** section and add the following:

#### Required Variables:

**Database**:
```
DATABASE_URL = postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
```
(Use the same Neon connection string from Part A)

**Payload CMS**:
```
PAYLOAD_SECRET = [generate a random 32-character string]
```
To generate: `openssl rand -base64 32` or use https://generate-secret.vercel.app

**Environment**: Select **Production**, **Preview**, and **Development** for all variables.

#### Optional API Keys (if you've set them up):

**Stripe** (from Phase 12):
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_test_...
STRIPE_SECRET_KEY = sk_test_...
```

**Twilio WhatsApp** (from Phase 13):
```
TWILIO_ACCOUNT_SID = ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN = your_auth_token_here
TWILIO_WHATSAPP_NUMBER = whatsapp:+14155238886
```

**Google Places** (from Phase 14):
```
GOOGLE_PLACES_API_KEY = AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**Cal.com** (from Phase 11):
```
NEXT_PUBLIC_CAL_NAMESPACE = your-namespace
```

**Note**: If you skip the optional APIs, the platform will use mock data gracefully.

### Step 4: Deploy (10 minutes)

1. After adding environment variables, click **Deploy**
2. Vercel will:
   - Clone your GitHub repository
   - Install dependencies with `npm install --legacy-peer-deps`
   - Run the build with `npm run build`
   - Deploy to a production URL
3. **Wait for deployment** (~3-5 minutes)
4. Watch the build logs for any errors

**Common Build Issues**:
- If you see "Module not found" errors, check that all dependencies are in `package.json`
- If you see "Database connection failed", verify your `DATABASE_URL` is correct
- If you see "Build timeout", the free tier allows 45 minutes - this shouldn't be an issue

### Step 5: Get Your Production URL (2 minutes)

Once deployed, Vercel will show you:
- **Production URL**: `https://morada-xxx.vercel.app`
- **Deployment Status**: ✅ Ready

Click **Visit** to open your production site.

### Step 6: Test Production Deployment (15 minutes)

Test the following in your production URL:

1. **Homepage** (`/en`):
   - [ ] Marketing page loads
   - [ ] No console errors (open DevTools)
   - [ ] Images load correctly

2. **Operator Page** (`/en/puro-surf`):
   - [ ] Operator landing page loads
   - [ ] Programs section displays
   - [ ] Reviews section displays (if Google Places API configured)
   - [ ] Navigation works

3. **Surf Guide** (`/en/surf-guide`):
   - [ ] 8 surf spots display
   - [ ] Filters work
   - [ ] Spot details load

4. **Admin Panel** (`/admin`):
   - [ ] Login page loads
   - [ ] Can log in with credentials created in Part A, Step 6
   - [ ] Dashboard displays collections
   - [ ] Can view Operators collection

5. **API Routes**:
   - Test Google Places Reviews:
     ```bash
     curl "https://morada-xxx.vercel.app/api/reviews/google?placeId=ChIJ..."
     ```
   - Should return JSON with reviews or mock data

**If everything works**: Congratulations! Your POC is live.

**If something fails**: Check the Vercel deployment logs and Neon database connection.

### Step 7: Configure Custom Domain (Optional - Skip for POC)

For POC, use the free Vercel subdomain: `morada-xxx.vercel.app`

For production, you can:
1. Purchase a domain (e.g., `morada.sv`)
2. Add it in Vercel → Project Settings → Domains
3. Configure DNS records as instructed by Vercel
4. Wait for SSL certificate (automatic, ~10 minutes)

### Step 8: Update Webhooks for Production (10 minutes)

If you've configured Stripe or Twilio, update their webhooks to use your production URL:

#### Stripe Webhooks:

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click **Add endpoint**
3. Enter URL: `https://morada-xxx.vercel.app/api/stripe/webhooks`
4. Select events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the **Webhook signing secret** (starts with `whsec_`)
6. Add to Vercel environment variables:
   ```
   STRIPE_WEBHOOK_SECRET = whsec_...
   ```
7. Redeploy your Vercel project (Vercel → Deployments → Redeploy)

#### Twilio WhatsApp Callbacks (if needed):

1. Go to Twilio Console → Messaging → Settings
2. Update callback URL: `https://morada-xxx.vercel.app/api/notifications/whatsapp`
3. Save changes

### Step 9: Set Up Automatic Deployments (5 minutes)

Vercel automatically deploys on every push to `main` branch.

**How it works**:
1. You push code to GitHub: `git push origin main`
2. Vercel detects the push via webhook
3. Vercel automatically builds and deploys
4. You get a notification when deployment completes

**Preview Deployments**:
- Every pull request gets its own preview URL
- Perfect for testing before merging to main

---

## Part C: Post-Deployment Verification (15 minutes)

### Checklist:

- [ ] Production URL loads: `https://morada-xxx.vercel.app`
- [ ] Marketing page displays correctly
- [ ] Operator page (Puro Surf) loads with data
- [ ] Surf guide displays 8 surf spots
- [ ] Admin panel accessible at `/admin`
- [ ] Can log in to admin with credentials
- [ ] Database connection working (check Neon Console → Queries)
- [ ] No errors in Vercel deployment logs
- [ ] No errors in browser console (DevTools)

### Success Criteria:

✅ **Phase 15 Complete** if:
1. Production site is live and accessible
2. All pages load without errors
3. Database connection is stable
4. Admin panel is functional
5. API routes respond correctly

---

## Troubleshooting

### Build Fails on Vercel

**Error**: `npm ERR! code ERESOLVE`
**Solution**: Ensure install command is `npm install --legacy-peer-deps`

**Error**: `Module not found: Can't resolve 'next-intl'`
**Solution**: Check that all dependencies are in `package.json`, redeploy

**Error**: `Database connection timeout`
**Solution**: Verify `DATABASE_URL` in Vercel environment variables, check Neon project is active

### Admin Panel Won't Load

**Error**: 401 Unauthorized
**Solution**: Verify `PAYLOAD_SECRET` is set in Vercel environment variables

**Error**: Can't create admin user
**Solution**: Check database migrations ran successfully in Neon

### Images Not Loading

**Error**: 404 on image paths
**Solution**: Ensure Media collection is seeded, check `/media` route in Next.js

### API Routes Return 500

**Error**: Internal Server Error
**Solution**: Check Vercel Function Logs → Real-time logs for specific error

---

## Costs Breakdown (POC)

| Service | Tier | Cost | Limit |
|---------|------|------|-------|
| **Neon Database** | Free | $0/month | 0.5GB storage, 3 projects |
| **Vercel Hosting** | Hobby | $0/month | 100GB bandwidth, 6,000 build minutes/month |
| **Total** | | **$0/month** | Sufficient for POC testing |

**When to Upgrade**:
- Neon: When you exceed 0.5GB or need more than 3 projects
- Vercel: When you need custom domains or exceed bandwidth

---

## Next Steps

After Phase 15 is complete:

- [ ] **Phase 17**: Add Umami Analytics (self-hosted on Vercel)
- [ ] **Phase 18**: Set up Resend email notifications
- [ ] **Phase 21**: Create operator onboarding documentation
- [ ] **Phase 22**: Launch marketing campaign

**Production Readiness**: After Phase 15, your POC is live and testable. You can onboard real operators and start collecting feedback.

---

## Quick Reference

**Neon Console**: https://console.neon.tech
**Vercel Dashboard**: https://vercel.com/dashboard
**Production URL**: `https://morada-xxx.vercel.app` (you'll get this after deployment)
**Admin Panel**: `https://morada-xxx.vercel.app/admin`

**Support**:
- Neon Docs: https://neon.tech/docs
- Vercel Docs: https://vercel.com/docs
- Payload Docs: https://payloadcms.com/docs
