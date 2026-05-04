# Stripe Setup Guide (POC - Test Mode Only)

This guide walks you through setting up Stripe for Morada's payment processing using **test mode only** (POC approach).

## Overview

Stripe provides payment processing infrastructure for booking deposits and full payments. The integration allows operators to receive payments while Morada handles the booking flow.

**POC Tier**: Test mode (no real payments, no verification required)
**Production Upgrade**: Enable production mode + Stripe Connect for operator payouts

## Step 1: Create Stripe Account (5 minutes)

1. Go to [stripe.com/register](https://stripe.com/register)
2. Sign up with email
3. **IMPORTANT**: Skip all verification for now (business details, bank info, identity)
   - You'll remain in test mode
   - No real money will be processed
   - Perfect for POC testing

4. Complete the basic onboarding
5. You'll land on the Stripe Dashboard

## Step 2: Get Your Test API Keys (2 minutes)

1. In Stripe Dashboard, click **Developers** in the top right
2. Click **API keys** in the left sidebar
3. You'll see two types of keys:
   - **Test mode** (toggle should be ON)
   - **Live mode** (we won't use this for POC)

4. Copy the following test keys:
   - **Publishable key**: Starts with `pk_test_...`
   - **Secret key**: Starts with `sk_test_...` (click "Reveal test key")

**Important**:
- ✅ Use test keys only for POC
- ❌ Never commit these keys to git
- ❌ Don't enable live mode until production

## Step 3: Set Up Webhook Endpoint (5 minutes)

Webhooks allow Stripe to notify your app when payments succeed/fail.

1. In Stripe Dashboard, go to **Developers** → **Webhooks**
2. Click **+ Add endpoint**
3. Enter your endpoint URL:
   - **Local development**: Use `ngrok` or `stripe listen` (see below)
   - **Vercel deployment**: `https://your-app.vercel.app/api/stripe/webhooks`

4. Select events to listen for:
   - ✅ `payment_intent.succeeded`
   - ✅ `payment_intent.payment_failed`
   - ✅ `charge.refunded`
   - ✅ `account.updated` (for Stripe Connect)

5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_...`)

### Option A: Local Testing with Stripe CLI (Recommended)

For local development, use Stripe CLI to forward webhooks:

```bash
# Install Stripe CLI (macOS)
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to your local server
stripe listen --forward-to localhost:3005/api/stripe/webhooks
```

This will output a webhook signing secret like `whsec_...`. Use this for local development.

### Option B: Use ngrok for Public URL

```bash
# Install ngrok
brew install ngrok

# Start ngrok tunnel
ngrok http 3005

# Use the HTTPS URL in Stripe webhook endpoint
# Example: https://abc123.ngrok.io/api/stripe/webhooks
```

## Step 4: Configure Morada Environment Variables

Add the following to your `.env.local` file:

```bash
# Stripe Test Mode Keys
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

**Example**:
```bash
STRIPE_SECRET_KEY=sk_test_51Abc123...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51Abc123...
STRIPE_WEBHOOK_SECRET=whsec_1234567890abcdef...
```

## Step 5: Test the Integration

1. Restart your Next.js dev server:
```bash
npm run dev
```

2. Navigate to a booking page:
```
http://localhost:3005/es/puro-surf/book
```

3. Fill out the booking form (guest details, dates, etc.)

4. Test payment with Stripe test cards:

**Successful Payment**:
- Card number: `4242 4242 4242 4242`
- Expiry: Any future date (e.g., `12/34`)
- CVC: Any 3 digits (e.g., `123`)
- ZIP: Any 5 digits (e.g., `12345`)

**Declined Payment**:
- Card number: `4000 0000 0000 0002`
- Expiry: Any future date
- CVC: Any 3 digits
- ZIP: Any 5 digits

**Authentication Required (3D Secure)**:
- Card number: `4000 0025 0000 3155`
- Follow the authentication modal

5. Check Stripe Dashboard → **Payments** to see test payments

## Step 6: Test Webhooks (Optional)

If using Stripe CLI:

```bash
# In a separate terminal
stripe listen --forward-to localhost:3005/api/stripe/webhooks

# Trigger a test webhook
stripe trigger payment_intent.succeeded
```

Check your server logs to see the webhook event being processed.

## POC Features Implemented

✅ **Payment Intent Creation**
- `/api/stripe/create-payment-intent` route
- Automatic payment methods (card, Apple Pay, Google Pay)
- Metadata attachment (booking ID, operator ID, etc.)

✅ **Stripe Elements Integration**
- `PaymentForm` component with Stripe Elements
- `StripeWrapper` component handles payment intent creation
- Customizable branding (operator brand colors)
- Bilingual support (ES/EN)

✅ **Webhook Handling**
- `/api/stripe/webhooks` route
- Signature verification for security
- Event handling for payment success/failure/refund
- TODO: Update bookings in Payload CMS on payment events

✅ **Test Mode Enforcement**
- API routes reject live mode keys
- Ensures no real payments during POC

## What You CAN Do (Test Mode)

- ✅ Test all payment flows
- ✅ Use test cards (4242 4242 4242 4242, etc.)
- ✅ Test webhooks
- ✅ View payments in dashboard
- ✅ Refund test payments
- ✅ Test Apple Pay / Google Pay (in compatible browsers)
- ✅ Test 3D Secure authentication
- ✅ Test failed payments

## What You CAN'T Do (Test Mode)

- ❌ Process real credit cards
- ❌ Receive real money
- ❌ Payout to bank accounts
- ❌ Use Stripe Connect for operator payouts (requires verification)

## Stripe Connect (For Multi-Operator Payouts)

Stripe Connect allows operators to receive payments directly. **This is not needed for POC**, but here's the upgrade path:

### Phase 1: POC (Current)
- Single Stripe account (Morada's)
- All payments go to Morada
- Manual operator payouts

### Phase 2: Production
1. Complete Stripe account verification
2. Set up Stripe Connect
3. Each operator creates their own Stripe account
4. Link operator accounts to Morada via Connect
5. Payments automatically split: Morada fee + Operator payout

**Connect Setup** (when ready for production):
```bash
# Create connected account for operator
POST /api/stripe/connect/create-account
{
  "operatorId": "abc123",
  "email": "purosurf@example.com",
  "country": "SV" // El Salvador
}

# Redirect operator to Stripe onboarding
GET /api/stripe/connect/onboarding-link
```

See [Stripe Connect Documentation](https://stripe.com/docs/connect) for details.

## Common Test Scenarios

### 1. Successful Booking + Payment

```
1. Fill booking form
2. Enter test card: 4242 4242 4242 4242
3. Click "Pay Now"
4. ✅ Payment succeeds
5. Webhook fires: payment_intent.succeeded
6. Booking marked as "paid" in CMS
7. Confirmation email sent
```

### 2. Declined Payment

```
1. Fill booking form
2. Enter declined card: 4000 0000 0000 0002
3. Click "Pay Now"
4. ❌ Payment fails
5. Error message shown
6. User can retry with different card
```

### 3. Partial Payment (Deposit)

```
1. Fill booking form for $300 program
2. Deposit required: $90 (30%)
3. Enter test card
4. Pay $90 deposit
5. ✅ Booking confirmed (deposit paid)
6. Remaining $210 due before start date
```

### 4. Refund

```
1. Go to Stripe Dashboard → Payments
2. Find the test payment
3. Click "Refund"
4. Webhook fires: charge.refunded
5. Booking status updated to "refunded"
6. Refund confirmation email sent
```

## Production Checklist (Not Needed for POC)

When ready to go live:

- [ ] Complete Stripe account verification
  - [ ] Business details
  - [ ] Bank account info
  - [ ] Identity verification
  - [ ] Tax information

- [ ] Switch to live mode API keys
  - [ ] Update `STRIPE_SECRET_KEY` to `sk_live_...`
  - [ ] Update `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` to `pk_live_...`
  - [ ] Update webhook secret for live endpoint

- [ ] Set up Stripe Connect (if using operator payouts)
  - [ ] Enable Connect in Stripe Dashboard
  - [ ] Set up platform fee structure
  - [ ] Create onboarding flow for operators

- [ ] Configure production webhooks
  - [ ] Add production URL to Stripe webhooks
  - [ ] Test webhook delivery
  - [ ] Set up webhook monitoring

- [ ] Enable fraud prevention
  - [ ] Radar rules (included in Stripe)
  - [ ] 3D Secure enforcement
  - [ ] Dispute handling process

- [ ] Set up reconciliation
  - [ ] Daily payout reports
  - [ ] Operator payout tracking
  - [ ] Tax reporting

**Estimated Time**: 1-2 weeks (includes verification approval)
**Cost**: No monthly fee, 2.9% + $0.30 per transaction

## Troubleshooting

### Payment Form Not Showing:

1. Check that `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set in `.env.local`
2. Restart the dev server after adding environment variables
3. Check browser console for errors
4. Verify the key starts with `pk_test_`

### Webhook Not Firing:

1. Check Stripe CLI is running: `stripe listen --forward-to localhost:3005/api/stripe/webhooks`
2. Verify webhook URL is correct in Stripe Dashboard
3. Check server logs for webhook errors
4. Verify `STRIPE_WEBHOOK_SECRET` is set correctly

### Payment Fails with "Invalid API Key":

1. Verify `STRIPE_SECRET_KEY` starts with `sk_test_`
2. Check for extra spaces in `.env.local`
3. Ensure you copied the full key from Stripe Dashboard

### "This integration requires test mode keys":

1. Your key is a live mode key (`sk_live_`)
2. Switch to test mode in Stripe Dashboard
3. Copy the test key (`sk_test_`)

## Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Test Cards](https://stripe.com/docs/testing)
- [Stripe Elements](https://stripe.com/docs/stripe-js)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)
- [Stripe Connect](https://stripe.com/docs/connect)
- [Stripe CLI](https://stripe.com/docs/stripe-cli)

---

**Phase 12 Status**: ✅ Complete (POC Ready - Test Mode Only)

**Time to Set Up**: 15-30 minutes (test mode only)

**POC Cost**: $0/month (test mode, no real payments)

**Production Cost**: $0/month base fee + 2.9% + $0.30 per transaction
