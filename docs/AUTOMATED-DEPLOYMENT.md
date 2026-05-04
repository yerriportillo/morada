# Automated Deployment Guide

**Total Time**: ~30 minutes (mostly automated)
**Cost**: $0/month

This guide uses automation scripts to streamline Phase 15 deployment.

---

## Quick Start

### Option 1: Fully Automated (Recommended)

```bash
npm run deploy
```

This single command will:
1. Install CLIs (Vercel + Neon)
2. Authenticate with both services (opens browser)
3. Create Neon database
4. Run migrations and seed data
5. Deploy to Vercel
6. Configure environment variables
7. Return your production URL

**Manual steps required**:
- Neon authentication (browser opens once)
- Vercel authentication (browser opens once)
- Confirm project settings

---

## Option 2: Step-by-Step

If you prefer more control, run each step manually:

### Step 1: Install CLIs
```bash
npm run deploy:setup
```

### Step 2: Authenticate with Neon
```bash
neonctl auth
```
- Opens browser
- Click "Generate API key" in Neon Console
- Copy and paste key when prompted

### Step 3: Create Neon Database
```bash
# Create project
neonctl projects create --name morada-poc --region aws-us-east-1

# Get connection string
neonctl connection-string --project-id <project-id>
```

### Step 4: Update Environment Variables
```bash
# Add to .env.local
echo "DATABASE_URL=postgresql://..." >> .env.local
echo "PAYLOAD_SECRET=$(openssl rand -base64 32)" >> .env.local
```

### Step 5: Run Migrations
```bash
npm run db:migrate:create initial-schema
npm run db:migrate
```

### Step 6: Seed Database
```bash
npm run seed
```

### Step 7: Test Locally
```bash
npm run dev
```
Visit http://localhost:3005 to verify

### Step 8: Deploy to Vercel
```bash
vercel login           # Authenticate
vercel link            # Link to project
vercel --prod          # Deploy
```

### Step 9: Set Environment Variables in Vercel
```bash
# From your .env.local
vercel env add DATABASE_URL production
vercel env add PAYLOAD_SECRET production
```

### Step 10: Redeploy with Environment Variables
```bash
vercel --prod
```

---

## Verification

After deployment completes:

```bash
# Get your deployment URL
vercel ls --prod

# Test the deployment
curl https://your-project.vercel.app/en

# Check admin panel
open https://your-project.vercel.app/admin
```

---

## Troubleshooting

### Neon Authentication Fails
```bash
# Clear cached auth
rm -rf ~/.config/neonctl
neonctl auth
```

### Vercel Authentication Fails
```bash
# Logout and re-login
vercel logout
vercel login
```

### Database Connection Fails
```bash
# Verify connection string format
echo $DATABASE_URL
# Should start with postgresql:// and end with ?sslmode=require
```

### Build Fails on Vercel
```bash
# Check logs
vercel logs

# Common fixes:
# 1. Verify environment variables are set
# 2. Ensure DATABASE_URL is accessible from Vercel
# 3. Check for missing dependencies
```

---

## What Gets Automated?

✅ **Fully Automated**:
- CLI installation (Vercel + Neon)
- Database creation
- Migration generation and execution
- Database seeding
- Vercel project linking
- Environment variable configuration
- Production deployment
- Build and optimization

⚠️ **Requires Browser (One-Time)**:
- Neon account creation + authentication (~2 minutes)
- Vercel account creation + authentication (~2 minutes)

❌ **Not Automated (Optional)**:
- Stripe webhook configuration
- Twilio webhook configuration
- Custom domain setup

---

## Environment Variables

The script automatically configures:
- `DATABASE_URL` (from Neon)
- `PAYLOAD_SECRET` (auto-generated)
- `NEXT_PUBLIC_SITE_URL` (from Vercel deployment)

Optional APIs (add manually if needed):
- Stripe keys
- Twilio keys
- Google Places key
- Cal.com namespace

---

## Cost Breakdown

| Service | Tier | Monthly Cost |
|---------|------|-------------|
| Neon Database | Free | $0 |
| Vercel Hosting | Hobby | $0 |
| **Total** | | **$0** |

Limits:
- Neon: 0.5GB storage, 3 projects
- Vercel: 100GB bandwidth, 6,000 build minutes

---

## Next Steps After Deployment

1. **Create Admin User**:
   ```
   Visit: https://your-project.vercel.app/admin
   Create account with email + password
   ```

2. **Test Operator Page**:
   ```
   Visit: https://your-project.vercel.app/en/puro-surf
   Verify all data loads
   ```

3. **Configure Optional APIs** (if needed):
   ```bash
   # Add API keys to Vercel
   vercel env add STRIPE_SECRET_KEY production
   vercel env add TWILIO_ACCOUNT_SID production
   vercel env add GOOGLE_PLACES_API_KEY production

   # Redeploy
   vercel --prod
   ```

4. **Set Up Webhooks** (if using Stripe/Twilio):
   - Stripe: Dashboard → Webhooks → Add endpoint
     - URL: `https://your-project.vercel.app/api/stripe/webhooks`
   - Twilio: Console → Messaging → Settings
     - URL: `https://your-project.vercel.app/api/notifications/whatsapp`

---

## Success Criteria

Deployment is complete when:
- ✅ `vercel ls --prod` shows your deployment
- ✅ `curl https://your-project.vercel.app` returns HTML
- ✅ Admin panel loads at `/admin`
- ✅ Operator page loads at `/en/puro-surf`
- ✅ No errors in Vercel logs: `vercel logs`
- ✅ Database shows tables in Neon Console

---

## Getting Help

If deployment fails:

1. **Check deployment logs**:
   ```bash
   vercel logs --follow
   ```

2. **Verify environment variables**:
   ```bash
   vercel env ls
   ```

3. **Test database connection**:
   ```bash
   # From .env.local
   psql $DATABASE_URL
   ```

4. **Re-run deployment**:
   ```bash
   npm run deploy
   ```

---

## Manual Deployment (Fallback)

If automation fails, follow:
- [PHASE-15-DEPLOYMENT-GUIDE.md](./PHASE-15-DEPLOYMENT-GUIDE.md) for manual steps
- [VERCEL-ENV-VARIABLES.md](./VERCEL-ENV-VARIABLES.md) for environment variable reference

---

**Last Updated**: Phase 15
**Script Location**: `scripts/deploy.sh`
**Package Script**: `npm run deploy`
