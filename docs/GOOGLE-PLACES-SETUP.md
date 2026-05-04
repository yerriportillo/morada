# Google Places API Setup Guide (POC - Free Tier)

This guide walks you through setting up Google Places API for fetching operator reviews on Morada using the **free tier** ($200/month credit - POC approach).

## Overview

Google Places API allows Morada to display authentic customer reviews from Google Maps on operator landing pages. This builds trust and provides social proof for potential guests.

**POC Tier**: Free tier with $200/month credit (~40,000 API calls)
**Production**: Same tier, monitor usage and set billing alerts

## Step 1: Create Google Cloud Account (5 minutes)

1. Go to [cloud.google.com](https://cloud.google.com)
2. Click **Get started for free**
3. Sign in with your Google account
4. Complete the billing setup:
   - **IMPORTANT**: You get $300 free credit for 90 days
   - After trial, you get $200/month ongoing credit for Maps/Places
   - Add a credit card (required but won't be charged in POC)
   - Set billing alerts (recommended: alert at $50, $100, $150)

## Step 2: Create a New Project (2 minutes)

1. In Google Cloud Console, click the project dropdown (top left)
2. Click **New Project**
3. Enter project details:
   - **Name**: "Morada POC" (or "Morada Production")
   - **Organization**: Leave as "No organization" (or select yours)
4. Click **Create**
5. Wait a few seconds for the project to be created
6. Select your new project from the dropdown

## Step 3: Enable Places API (2 minutes)

1. In Google Cloud Console, go to **APIs & Services** → **Library**
2. Search for "Places API"
3. Click **Places API** (not "Places API (New)")
4. Click **Enable**
5. Wait for the API to be enabled (~30 seconds)

## Step 4: Create API Key (3 minutes)

1. Go to **APIs & Services** → **Credentials**
2. Click **+ Create Credentials** → **API key**
3. A new API key will be created automatically
4. **IMPORTANT**: Click **Edit API key** (pencil icon) to restrict it:

### Restrict the API Key (Security):

**Application restrictions**:
- Select **HTTP referrers (websites)**
- Add your domains:
  - `http://localhost:3005/*` (for local development)
  - `https://*.vercel.app/*` (for Vercel preview deployments)
  - `https://morada.sv/*` (for production, when you have the domain)

**API restrictions**:
- Select **Restrict key**
- Choose: **Places API** only
- Click **Save**

5. Copy your API key (starts with `AIza...`)

## Step 5: Configure Morada Environment Variables

Add the following to your `.env.local` file:

```bash
# Google Places API
GOOGLE_PLACES_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**Example**:
```bash
GOOGLE_PLACES_API_KEY=AIzaSyDJw8f2K3L4m5N6o7P8q9R0s1T2u3V4w5X
```

## Step 6: Find Google Place IDs for Operators

Each operator needs a Google Place ID to fetch their reviews. There are two ways to find it:

### Method A: Using Place ID Finder (Easiest)

1. Go to [developers.google.com/maps/documentation/places/web-service/place-id](https://developers.google.com/maps/documentation/places/web-service/place-id)
2. Search for the business name (e.g., "Puro Surf El Salvador")
3. Click on the result
4. Copy the **Place ID** (starts with `ChIJ...`)

### Method B: Using Google Maps URL

1. Go to [google.com/maps](https://google.com/maps)
2. Search for the business
3. Click on the business to open its details
4. Look at the URL: `https://www.google.com/maps/place/...`
5. The Place ID is in the URL after `!1s`

**Example URL**:
```
https://www.google.com/maps/place/Puro+Surf/...!1sChIJXXXXXXXXXXXXXXXX!2e0
```

The Place ID is: `ChIJXXXXXXXXXXXXXXXX`

## Step 7: Add Place ID to Operator in Payload CMS

1. Go to Payload CMS admin: `http://localhost:3005/admin`
2. Navigate to **Operators**
3. Edit your operator (e.g., "Puro Surf")
4. Scroll to **Integrations** section
5. Enter the **Google Place ID** in the `googlePlaceId` field
6. Click **Save**

## Step 8: Test the Integration

1. Restart your Next.js dev server:
```bash
npm run dev
```

2. Test the API endpoint directly:
```bash
curl "http://localhost:3005/api/reviews/google?placeId=ChIJ..."
```

3. You should get a JSON response with reviews:
```json
{
  "name": "Puro Surf",
  "rating": 4.8,
  "totalReviews": 127,
  "reviews": [
    {
      "author": "Sarah Johnson",
      "rating": 5,
      "text": "Amazing surf experience!",
      "date": "2026-04-15T12:00:00.000Z",
      "relativeTime": "2 weeks ago",
      "language": "en"
    },
    ...
  ]
}
```

## Step 9: Add ReviewsSection to Operator Page

Add the ReviewsSection component to your operator landing page:

```typescript
import ReviewsSection from '@/components/sections/ReviewsSection'
import { useTranslations } from 'next-intl'

export default function OperatorPage() {
  const t = useTranslations()

  return (
    <div>
      {/* ... other sections ... */}

      <ReviewsSection
        placeId="ChIJ..." // From operator.integrations.googlePlaceId
        labels={{
          title: t('reviews.title'),
          viewAllReviews: t('reviews.viewAllReviews'),
          basedOn: t('reviews.basedOn'),
          reviews: t('reviews.reviews'),
          loading: t('reviews.loading'),
          noReviews: t('reviews.noReviews'),
          showMore: t('reviews.showMore'),
          showLess: t('reviews.showLess'),
        }}
      />
    </div>
  )
}
```

## POC Features Implemented

✅ **Review Fetching**
- Fetches reviews from Google Places API
- Returns top 5 reviews by default
- Includes author name, photo, rating, text, and date

✅ **24-Hour Caching**
- Reviews are cached in memory for 24 hours
- Minimizes API calls and costs
- Cached results include `cached: true` and `cachedAt` timestamp

✅ **Graceful Degradation**
- Shows mock reviews if API key is not configured
- Shows mock reviews if API request fails
- Ensures operator pages always have content

✅ **ReviewsSection Component**
- Beautiful star ratings with yellow stars
- User profile photos (or initials if no photo)
- Responsive grid (1 column mobile, 3 columns desktop)
- "Show more/less" functionality
- Loading skeleton states
- Bilingual support (Spanish/English)

✅ **Security**
- API key restricted to specific domains
- API key restricted to Places API only
- No client-side exposure of API key

## What You CAN Do (Free Tier)

- ✅ Fetch reviews for unlimited operators
- ✅ ~40,000 API requests per month ($200 credit ÷ $0.005/request)
- ✅ 24-hour caching reduces actual API calls significantly
- ✅ Display reviews on operator landing pages
- ✅ Show star ratings and total review counts
- ✅ Access all review data (author, text, rating, date)

## Free Tier Calculation

**API Cost**: $0.005 per Place Details request (reviews included)

**Monthly Budget**: $200 free credit

**Requests Allowed**: 40,000 requests/month

**With Caching** (24-hour cache):
- 100 operators × 1 request/day = 100 requests/day
- 100 requests/day × 30 days = 3,000 requests/month
- **Cost**: 3,000 × $0.005 = **$15/month**
- **Well within free tier!** ✅

**Without Caching** (every page load):
- 1,000 page views/day × 1 request = 1,000 requests/day
- 1,000 requests/day × 30 days = 30,000 requests/month
- **Cost**: 30,000 × $0.005 = **$150/month**
- Still within free tier, but not recommended

**Recommendation**: Keep 24-hour caching enabled for POC.

## Monitoring Usage

1. Go to **APIs & Services** → **Dashboard**
2. Click on **Places API**
3. View **Metrics** tab to see:
   - Total requests per day
   - Errors
   - Latency

4. Set up billing alerts:
   - Go to **Billing** → **Budgets & alerts**
   - Create alert at $50, $100, $150
   - Get email notifications before hitting $200 limit

## Production Considerations

### Scaling Beyond Free Tier

If you exceed $200/month (40,000 requests):
- **Option 1**: Increase cache duration to 48 hours or 7 days
- **Option 2**: Enable billing and pay overage at $0.005/request
- **Option 3**: Use Payload CMS to manually cache reviews (refresh monthly)

### Updating Reviews

Reviews are cached for 24 hours. To force a refresh:

```bash
# Clear cache for specific operator
curl -X DELETE "http://localhost:3005/api/reviews/google?placeId=ChIJ..."

# Clear all caches
curl -X DELETE "http://localhost:3005/api/reviews/google"
```

### Rate Limiting

Google Places API has rate limits:
- **100 requests per second** (per project)
- **100,000 requests per day** (with free tier)

With caching, you won't hit these limits in POC.

## Troubleshooting

### No reviews showing (blank section):

1. **Check if operator has Google Place ID**:
   - Verify in Payload CMS → Operators → Integrations
   - Place ID should start with `ChIJ...`

2. **Check if API key is configured**:
   - Verify `GOOGLE_PLACES_API_KEY` in `.env.local`
   - Restart dev server after adding

3. **Check console for errors**:
   - Open browser DevTools → Console
   - Look for API errors

### Error: "This API project is not authorized to use this API":

**Solution**: Enable Places API in Google Cloud Console → APIs & Services → Library.

### Error: "API key not valid":

**Solution**:
1. Check that API key is correct in `.env.local`
2. Verify API restrictions allow your domain
3. Ensure Places API is selected in API restrictions

### Reviews showing but from wrong business:

**Solution**: Verify the Place ID is correct. Search again using Place ID Finder.

### Mock data showing instead of real reviews:

**Reasons**:
1. API key not configured (shows "Demo Mode" message)
2. API request failed (check console for error)
3. Place ID is invalid

## Alternative: Manual Review Entry (No API)

If you don't want to use Google Places API, you can create a Reviews collection in Payload CMS:

```typescript
// collections/Reviews.ts
export const Reviews: CollectionConfig = {
  slug: 'reviews',
  fields: [
    { name: 'operator', type: 'relationship', relationTo: 'operators' },
    { name: 'author', type: 'text' },
    { name: 'rating', type: 'number', min: 1, max: 5 },
    { name: 'text', type: 'textarea', localized: true },
    { name: 'date', type: 'date' },
  ],
}
```

Then manually copy reviews from Google Maps into Payload CMS. No API key needed, but requires manual work.

## Resources

- [Google Places API Documentation](https://developers.google.com/maps/documentation/places/web-service/overview)
- [Place Details API](https://developers.google.com/maps/documentation/places/web-service/details)
- [Find a Place ID](https://developers.google.com/maps/documentation/places/web-service/place-id)
- [Pricing Calculator](https://cloud.google.com/maps-platform/pricing)
- [API Key Best Practices](https://developers.google.com/maps/api-security-best-practices)

---

**Phase 14 Status**: ✅ Complete (POC Ready)

**Time to Set Up**: 15-20 minutes

**POC Cost**: $0/month (within $200 free credit)

**Estimated Monthly Usage**: ~$15/month (with 24h caching, 100 operators)

**Requests/Month**: ~3,000 (well within 40,000 free tier limit)
