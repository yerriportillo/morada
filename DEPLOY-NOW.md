# Deploy Morada - Quick Start Guide

**Time**: 15 minutes | **Cost**: $0/month

This guide gets you deployed with minimal steps.

---

## Prerequisites ✅ (Already Done)

- ✅ Vercel CLI installed
- ✅ Neon CLI installed
- ✅ GitHub repository ready
- ✅ All code committed

---

## Step 1: Authenticate with Neon (2 minutes)

```bash
neonctl auth
```

This will:
1. Open https://console.neon.tech in your browser
2. Click **"Generate new API key"**
3. Copy the key
4. Paste it back in the terminal

**That's it!** You're authenticated with Neon.

---

## Step 2: Create Neon Database (1 minute)

```bash
neonctl projects create --name morada-poc --region aws-us-east-1
```

Copy the output - you'll need the project ID.

---

## Step 3: Get Connection String (30 seconds)

```bash
# Replace <project-id> with your project ID from Step 2
neonctl connection-string --project-id <project-id> --database-name neondb
```

Copy the entire connection string (starts with `postgresql://`)

---

## Step 4: Set Environment Variables (1 minute)

Create/update `.env.local`:

```bash
# Paste your Neon connection string here
echo "DATABASE_URL=postgresql://..." >> .env.local

# Auto-generate PAYLOAD_SECRET
echo "PAYLOAD_SECRET=$(openssl rand -base64 32)" >> .env.local
```

---

## Step 5: Run Migrations (2 minutes)

```bash
npx payload migrate:create initial-schema
npx payload migrate
```

---

## Step 6: Seed Database (1 minute)

```bash
npm run seed
```

This adds:
- 8 El Salvador surf spots
- Puro Surf demo operator
- 3 surf programs
- 2 guides

---

## Step 7: Test Locally (Optional but recommended - 2 minutes)

```bash
npm run dev
```

Visit http://localhost:3005/en and verify:
- ✅ Homepage loads
- ✅ Puro Surf operator page loads
- ✅ Surf guide shows 8 spots

Press Ctrl+C to stop the dev server.

---

## Step 8: Deploy to Vercel (5 minutes)

```bash
# Login to Vercel (opens browser)
vercel login

# Deploy to production
vercel --prod
```

**Follow the prompts**:
1. "Set up and deploy?"  → **YES**
2. "Link to existing project?" → **NO**
3. "What's your project's name?" → **morada** (or your choice)
4. "In which directory is your code located?" → **./** (press Enter)

Vercel will:
- Build your project
- Deploy to production
- Give you a URL like `https://morada-xxx.vercel.app`

**Copy this URL!**

---

## Step 9: Set Environment Variables in Vercel (3 minutes)

Get your values from `.env.local`:

```bash
# View your environment variables
cat .env.local
```

Add them to Vercel:

```bash
# DATABASE_URL (paste your Neon connection string)
vercel env add DATABASE_URL production

# PAYLOAD_SECRET (paste the value from .env.local)
vercel env add PAYLOAD_SECRET production

# Also add to preview environment
vercel env add DATABASE_URL preview
vercel env add PAYLOAD_SECRET preview
```

---

## Step 10: Redeploy with Environment Variables (2 minutes)

```bash
vercel --prod
```

This redeploys with the environment variables we just added.

---

## Step 11: Visit Your Site! 🎉

```bash
# Get your URL
vercel ls --prod
```

**Visit these pages**:
- Homepage: `https://morada-xxx.vercel.app/en`
- Operator: `https://morada-xxx.vercel.app/en/puro-surf`
- Surf Guide: `https://morada-xxx.vercel.app/en/surf-guide`
- Admin Panel: `https://morada-xxx.vercel.app/admin`

---

## Step 12: Create Admin User (1 minute)

1. Visit: `https://morada-xxx.vercel.app/admin`
2. Click **"Create your first user"**
3. Enter your email and password
4. Click **"Create"**

**You're now logged in!**

---

## ✅ Success Checklist

- [ ] Neon database created and accessible
- [ ] Migrations ran successfully
- [ ] Database seeded with Puro Surf data
- [ ] Vercel deployment shows ✅ Ready
- [ ] Homepage loads without errors
- [ ] Operator page (Puro Surf) displays correctly
- [ ] Admin panel accessible
- [ ] Created admin user account

---

## 🎯 Your Production URLs

Replace `morada-xxx` with your actual Vercel URL:

- **Homepage**: https://morada-xxx.vercel.app/en
- **Puro Surf**: https://morada-xxx.vercel.app/en/puro-surf
- **Surf Guide**: https://morada-xxx.vercel.app/en/surf-guide
- **Admin**: https://morada-xxx.vercel.app/admin

---

## 📊 What You Just Deployed

**Infrastructure**:
- PostgreSQL database on Neon (0.5GB, free tier)
- Next.js app on Vercel (serverless, free tier)
- 135 files, 36,579 lines of code
- 17 completed phases

**Features**:
- ✅ Bilingual (Spanish/English)
- ✅ 8 surf spots with detailed info
- ✅ Operator landing pages
- ✅ Booking flow UI
- ✅ Regreso (diaspora) module
- ✅ Admin dashboard
- ✅ API integrations ready (Stripe, Twilio, Cal.com, Google Places)

**Cost**: $0/month

---

## 🔧 Optional: Add API Keys

If you want to enable Stripe, Twilio, or Google Places:

```bash
# Stripe
vercel env add STRIPE_SECRET_KEY production
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY production

# Twilio WhatsApp
vercel env add TWILIO_ACCOUNT_SID production
vercel env add TWILIO_AUTH_TOKEN production
vercel env add TWILIO_WHATSAPP_NUMBER production

# Google Places
vercel env add GOOGLE_PLACES_API_KEY production

# Redeploy
vercel --prod
```

---

## 🆘 Troubleshooting

### Build failed on Vercel?
```bash
# Check logs
vercel logs

# Common fix: Ensure environment variables are set
vercel env ls
```

### Can't connect to database?
```bash
# Test connection locally
psql $DATABASE_URL
```

### Admin panel shows 401 error?
```bash
# Verify PAYLOAD_SECRET is set
vercel env ls | grep PAYLOAD_SECRET
```

---

## 📚 Next Steps

After deployment:
1. ✅ **Explore the admin** - Add more operators, programs, tours
2. ✅ **Customize branding** - Update colors, fonts, content
3. ✅ **Add API keys** - Enable Stripe payments, WhatsApp, etc.
4. ✅ **Test bookings** - Walk through the entire booking flow
5. ✅ **Share with operators** - Get feedback on the platform

---

## 🎉 Congratulations!

You've successfully deployed Morada Platform to production!

**Phase 15: COMPLETE** ✅

Next phases:
- Phase 17: Analytics (Umami)
- Phase 18: Email Notifications (Resend)
- Phase 21: Documentation
- Phase 22: Launch & Marketing

---

**Need Help?**
- Deployment Guide: `docs/PHASE-15-DEPLOYMENT-GUIDE.md`
- Environment Variables: `docs/VERCEL-ENV-VARIABLES.md`
- Testing Guide: `TESTING.md`
