# Vercel Environment Variables Reference

Copy and paste these into Vercel → Project Settings → Environment Variables.

**IMPORTANT**: Apply to **Production**, **Preview**, and **Development** environments for all variables.

---

## Required Variables (Must Set)

### Database
```
DATABASE_URL
postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
```
👉 Get this from Neon Console after creating your database project

### Payload CMS
```
PAYLOAD_SECRET
[generate-random-32-char-string]
```
👉 Generate with: `openssl rand -base64 32` or https://generate-secret.vercel.app

### Site URL
```
NEXT_PUBLIC_SITE_URL
https://your-project-name.vercel.app
```
👉 Update with your actual Vercel deployment URL after first deploy

---

## Optional API Variables (POC Features)

### Stripe Payments (Phase 12)
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
pk_test_your_publishable_key_here

STRIPE_SECRET_KEY
sk_test_your_secret_key_here

STRIPE_WEBHOOK_SECRET
whsec_your_webhook_secret_here
```
👉 Get from Stripe Dashboard → Developers → API keys
👉 Webhook secret: Create webhook endpoint first, then get secret

### Twilio WhatsApp (Phase 13)
```
TWILIO_ACCOUNT_SID
ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

TWILIO_AUTH_TOKEN
your_auth_token_here

TWILIO_WHATSAPP_NUMBER
whatsapp:+14155238886
```
👉 Get from Twilio Console → Account → Settings
👉 For POC: Use sandbox number `whatsapp:+14155238886`

### Google Places API (Phase 14)
```
GOOGLE_PLACES_API_KEY
your_google_places_api_key_here
```
👉 Get from Google Cloud Console → APIs & Services → Credentials

### Cal.com Calendar (Phase 11)
```
NEXT_PUBLIC_CAL_NAMESPACE
your-namespace

CAL_API_KEY
your_cal_api_key_here
```
👉 Get from Cal.com → Settings → Developer

---

## How to Add in Vercel

1. Go to https://vercel.com/dashboard
2. Select your project: `morada`
3. Click **Settings** → **Environment Variables**
4. For each variable:
   - **Key**: Variable name (e.g., `DATABASE_URL`)
   - **Value**: Your actual value
   - **Environments**: Select **Production**, **Preview**, **Development**
   - Click **Add**
5. After adding all variables, click **Redeploy** to apply changes

---

## Environment Variable Priority

**Required for deployment**:
- `DATABASE_URL` ✅ Must have
- `PAYLOAD_SECRET` ✅ Must have
- `NEXT_PUBLIC_SITE_URL` ✅ Must have

**Optional (graceful degradation)**:
- Stripe variables → Uses test mode if missing
- Twilio variables → Shows WhatsApp UI but doesn't send
- Google Places → Shows mock reviews if missing
- Cal.com → Calendar widget won't load if missing

**What happens if optional variables are missing?**
- The site will still deploy successfully
- Features will show mock data or hide gracefully
- No errors or crashes

---

## Generating Secrets

### PAYLOAD_SECRET (32 characters)

**Option 1: OpenSSL** (Mac/Linux)
```bash
openssl rand -base64 32
```

**Option 2: Online Generator**
https://generate-secret.vercel.app

**Option 3: Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Example output**:
```
X8F3jK9mN2pQ5rT7vW1yZ4cB6dE8gH0i
```

---

## Verifying Environment Variables

After deployment, check if variables are loaded:

1. Go to Vercel → Your Project → Deployments
2. Click on latest deployment → Function Logs
3. Check for any "missing environment variable" warnings

**Or test via API**:
```bash
curl https://your-project.vercel.app/api/health
```

Should return:
```json
{
  "status": "ok",
  "database": "connected",
  "payload": "configured"
}
```

---

## Common Issues

### Build fails: "DATABASE_URL is not defined"
**Solution**: Ensure `DATABASE_URL` is added to environment variables and applied to all environments

### Admin panel 401 Unauthorized
**Solution**: Ensure `PAYLOAD_SECRET` is set correctly

### Images not loading
**Solution**: Check Neon database is accessible and `DATABASE_URL` connection string is correct

### Stripe/Twilio/Google features not working
**Solution**: These are optional - check that API keys are added if you want these features enabled

---

## Security Best Practices

✅ **DO**:
- Use Vercel's environment variables (encrypted at rest)
- Rotate secrets regularly (every 90 days)
- Use different secrets for Production vs Preview
- Enable 2FA on Vercel account

❌ **DON'T**:
- Commit secrets to GitHub
- Share secrets in Slack/email
- Use production API keys in Preview environments
- Reuse secrets across projects

---

## Next Steps After Adding Variables

1. **Redeploy**: Vercel → Deployments → Redeploy
2. **Test**: Visit your production URL
3. **Verify Admin**: Go to `/admin` and log in
4. **Check Logs**: Vercel → Function Logs for any errors

---

## Quick Copy-Paste Template

```env
# Required
DATABASE_URL=postgresql://...
PAYLOAD_SECRET=...
NEXT_PUBLIC_SITE_URL=https://...

# Optional - Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Optional - Twilio
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886

# Optional - Google Places
GOOGLE_PLACES_API_KEY=AIza...

# Optional - Cal.com
NEXT_PUBLIC_CAL_NAMESPACE=...
CAL_API_KEY=cal_live_...
```

---

**Last Updated**: Phase 15
**See Also**: [PHASE-15-DEPLOYMENT-GUIDE.md](./PHASE-15-DEPLOYMENT-GUIDE.md)
