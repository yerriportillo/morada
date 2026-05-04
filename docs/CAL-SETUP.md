# Cal.com Setup Guide (POC)

This guide walks you through setting up Cal.com for Morada's booking calendar integration using the **free tier** (POC approach).

## Overview

Cal.com provides scheduling infrastructure for bookable items. The integration allows operators to manage their availability while guests book directly through Morada's platform.

**POC Tier**: Free plan (single user, unlimited bookings)
**Production Upgrade**: Cal.com Teams ($12-29/month) for multiple team members

## Step 1: Create Cal.com Account (5 minutes)

1. Go to [cal.com/signup](https://cal.com/signup)
2. Sign up with email or Google/GitHub
3. Choose a username (this will be your namespace, e.g., `puro-surf`)
4. Complete the onboarding wizard

**Important**: Your username becomes your Cal.com namespace and will be used in the embed URL.

## Step 2: Create Event Types (15-30 minutes)

Event types represent the different bookable items your operators offer (surf lessons, tours, accommodations, etc.).

### For Each Bookable Item:

1. Click **"Event Types"** in the sidebar
2. Click **"+ New Event Type"**
3. Configure the event:

#### Basic Settings:
- **Name**: e.g., "Surf Lesson", "Eco Lodge Stay", "Tour Package"
- **URL Slug**: e.g., `surf-lesson`, `eco-lodge`, `tour-package`
- **Duration**: Set based on service (30min, 1 hour, multi-day, etc.)
- **Location**:
  - For in-person: Add physical address
  - For virtual: Add video conferencing link
  - For phone: Add phone number

#### Availability:
- Set your working hours
- Configure buffer time between bookings
- Set minimum notice period (e.g., 24 hours)
- Set date range (how far in advance can guests book)

#### Booking Questions:
Add custom fields to collect guest information:
- Number of guests
- Special dietary requirements
- Experience level
- Any custom questions

#### Advanced Settings:
- **Requires confirmation**: Toggle if you want to manually approve bookings
- **Redirect on booking**: Leave blank (Morada handles the confirmation)
- **Booking limits**: Set max bookings per day/week if needed

4. Click **"Save"** when done

### Example Event Type Configuration:

**Surf Lesson** (Puro Surf):
- Duration: 2 hours
- Location: El Tunco Beach, El Salvador
- Buffer: 30 minutes between lessons
- Minimum notice: 24 hours
- Booking questions:
  - Experience level (Beginner/Intermediate/Advanced)
  - Number of guests (1-4)
  - Surfboard rental needed (Yes/No)

## Step 3: Get Your Cal.com Credentials

### Get Your Username (Namespace):

1. Go to **Settings** → **Profile**
2. Your username is displayed at the top (e.g., `puro-surf`)
3. Copy this value

### Get Your API Key (Optional for POC):

For advanced integrations (creating bookings programmatically), you'll need an API key:

1. Go to **Settings** → **Developer**
2. Click **"Create API Key"**
3. Give it a name (e.g., "Morada Integration")
4. Copy the API key immediately (it won't be shown again)

**Note**: For POC, the API key is optional. The embed widget works without it.

## Step 4: Configure Morada Environment Variables

Add the following to your `.env.local` file:

```bash
# Cal.com Configuration
NEXT_PUBLIC_CAL_NAMESPACE=your-username-here

# Optional: API key for advanced integrations
CAL_API_KEY=your-api-key-here
```

**Example**:
```bash
NEXT_PUBLIC_CAL_NAMESPACE=puro-surf
CAL_API_KEY=cal_live_1234567890abcdef
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

3. You should see the Cal.com calendar widget embedded above the booking form

4. Try creating a test booking:
   - Select a date/time
   - Fill out the Cal.com form
   - Complete the booking
   - Check that the `calBookingUid` is logged in the console

## Step 6: Verify in Cal.com Dashboard

1. Go to [app.cal.com/bookings](https://app.cal.com/bookings)
2. You should see your test booking listed
3. You can manage, reschedule, or cancel bookings from here

## Multi-Operator Setup (Production)

For production with multiple operators, you have two options:

### Option A: Single Cal.com Account (Free)
- Use one Cal.com account for all operators
- Create different event types for each operator
- Use event slugs to differentiate (e.g., `puro-surf-lesson`, `eco-lodge-stay`)
- **Pros**: Free, centralized management
- **Cons**: All bookings go to one inbox, harder to scale

### Option B: Operator-Specific Accounts (Teams Plan)
- Each operator gets their own Cal.com username
- Store `calNamespace` in the Operators collection
- Each operator manages their own availability
- **Pros**: Fully decentralized, operators have control
- **Cons**: Requires Cal.com Teams plan ($12-29/month per team)

**POC Recommendation**: Use Option A (single account) to validate the concept.

## Customization Options

### Branding:

In `components/booking/CalendarWidget.tsx`, you can customize:

```typescript
cal('ui', {
  theme: 'light', // or 'dark'
  styles: {
    branding: {
      brandColor: '#1A6B8A', // Match operator brand color
    },
  },
  hideEventTypeDetails: false,
  layout: 'month_view', // or 'week_view', 'column_view'
})
```

### Pre-filling Guest Data:

If you collect guest information before showing the calendar:

```typescript
<CalendarWidget
  calNamespace="puro-surf"
  eventSlug="surf-lesson"
  prefill={{
    name: "Maria Garcia",
    email: "maria@example.com",
    guests: ["juan@example.com"],
    notes: "Beginner level, vegetarian"
  }}
/>
```

## Webhook Integration (Optional)

For real-time booking notifications:

1. In Cal.com, go to **Settings** → **Developer** → **Webhooks**
2. Click **"+ New Webhook"**
3. Set the URL to: `https://your-domain.vercel.app/api/cal/webhooks`
4. Select events to subscribe to:
   - `BOOKING_CREATED`
   - `BOOKING_RESCHEDULED`
   - `BOOKING_CANCELLED`
5. Save and copy the webhook secret

6. Add to `.env.local`:
```bash
CAL_WEBHOOK_SECRET=your-webhook-secret
```

7. Create webhook handler in `app/api/cal/webhooks/route.ts` (see Phase 11 implementation)

## Troubleshooting

### Calendar Widget Not Showing:

1. Check that `NEXT_PUBLIC_CAL_NAMESPACE` is set in `.env.local`
2. Restart the dev server after adding environment variables
3. Check browser console for errors
4. Verify your username exists at `https://cal.com/{username}`

### Bookings Not Syncing:

1. Verify the event slug matches what you configured in Cal.com
2. Check that the booking was successful in Cal.com dashboard
3. Look for `calBookingUid` in the booking confirmation data

### Calendar Shows Wrong Availability:

1. Check your Cal.com event type availability settings
2. Verify your timezone is set correctly in Cal.com settings
3. Update buffer times if bookings are too close together

## Cal.com Free Tier Limits

**What You CAN Do** (Free):
- ✅ Unlimited bookings
- ✅ Unlimited event types
- ✅ Single user account
- ✅ Email notifications
- ✅ Calendar integrations (Google Calendar, Outlook, etc.)
- ✅ Custom branding colors
- ✅ Embed on your website
- ✅ Webhooks
- ✅ API access

**What You CAN'T Do** (Requires Teams):
- ❌ Multiple team members
- ❌ Round-robin scheduling
- ❌ Collective bookings
- ❌ Advanced workflows
- ❌ Priority support

**POC Recommendation**: The free tier is perfect for testing with 1-2 operators.

## Next Steps

After Cal.com integration is working:

1. **Phase 12**: Integrate Stripe for payment processing
2. **Phase 13**: Add WhatsApp notifications when bookings are created
3. **Phase 15**: Deploy to Vercel and connect production Cal.com
4. **Production**: Upgrade to Cal.com Teams when scaling to multiple operators

## Resources

- [Cal.com Documentation](https://cal.com/docs)
- [Cal.com Embed Documentation](https://cal.com/docs/integrations/embed)
- [Cal.com API Documentation](https://cal.com/docs/api-reference)
- [Cal.com Webhooks](https://cal.com/docs/api-reference/webhooks)

---

**Phase 11 Status**: ✅ Complete (POC Ready)

**Time to Set Up**: 30-60 minutes (manual account creation + configuration)

**POC Cost**: $0/month
