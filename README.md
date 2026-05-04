# Morada Platform

**White-label tourism platform designed for El Salvador**

A sustainable, bilingual booking platform connecting local operators (surf camps, eco-lodges, tour guides, and community cooperatives) with authentic travelers.

## Project Status

**POC Complete** - Ready for deployment

- ✅ **16 Phases Complete** (0-14, 20, Marketing)
- ✅ **101 Unit Tests Passing** (Jest + React Testing Library)
- ✅ **E2E Tests Ready** (Playwright + Axe accessibility)
- ✅ **$0/month POC Cost** (all free tiers)
- 🚀 **Next**: Phase 15 (Vercel Deployment + Neon Database)

## Core Features

### Multi-Operator Support
- **Moradas Costeras**: Surf camps with program management, surf spot integration
- **Refugio**: Eco-lodges with sustainability metrics
- **Guía**: Tour operators with pickup locations and itineraries
- **Comunidad**: Community cooperatives with impact tracking

### Key Integrations (POC Ready)
- ✅ **Cal.com**: Calendar and availability management
- ✅ **Stripe**: Payments with deposits and tips (test mode)
- ✅ **Twilio WhatsApp**: Bilingual notifications (sandbox)
- ✅ **Google Places**: Review fetching with 24h caching
- ✅ **Bilingual**: Spanish/English with `next-intl`

### Unique Features
- **Regreso Module**: Dedicated landing pages for Salvadoran diaspora (2M+ potential visitors)
- **Conversion Tracking**: Measure diaspora visitor conversion
- **No Commissions**: Flat subscription model (not marketplace)
- **White-Label**: Operators use their own branding

## Tech Stack

- **Framework**: Next.js 15.4.11 (App Router, React Server Components)
- **CMS**: Payload CMS 3.84.1 (self-hosted, PostgreSQL)
- **Frontend**: React 19.2.5, TypeScript 5.7.3
- **Styling**: Tailwind CSS 3.4.17 (custom design system)
- **Database**: PostgreSQL (local dev, Neon for production)
- **Payments**: Stripe Connect (test mode)
- **Notifications**: Twilio WhatsApp API (sandbox)
- **Calendar**: Cal.com API (free tier)
- **Reviews**: Google Places API (free tier)
- **Testing**: Jest 30.3.0, Playwright 1.59.1, React Testing Library 16.3.2
- **i18n**: next-intl 3.28.11 (Spanish/English)

## Quick Start

### Prerequisites

- Node.js >= 18.0.0
- PostgreSQL database (local or cloud)
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yerriportillo/morada.git
cd morada
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and configure:
- `DATABASE_URL` - PostgreSQL connection string
- `PAYLOAD_SECRET` - Random secret for Payload CMS
- (Optional) API keys for Stripe, Twilio, Cal.com, Google Places

4. Run database migrations:
```bash
npx payload migrate
```

5. Seed the database with mock data:
```bash
npm run seed
```

6. Start the development server:
```bash
npm run dev
```

7. Open in your browser:
- **Frontend**: http://localhost:3005
- **Admin Panel**: http://localhost:3005/admin
- **Marketing Page**: http://localhost:3005/en

### Running Tests

```bash
# Unit tests (101 tests)
npm test

# E2E tests (Playwright)
npm run test:e2e

# Accessibility tests
npm run test:a11y
```

## Project Structure

```
morada/
├── app/
│   ├── [locale]/              # Internationalized routes (es/en)
│   │   ├── [operatorSlug]/    # Dynamic operator landing pages
│   │   │   ├── page.tsx       # Operator homepage
│   │   │   ├── book/          # Booking flow
│   │   │   └── regreso/       # Diaspora landing page
│   │   ├── surf-guide/        # Surf spot directory
│   │   └── page.tsx           # Marketing homepage
│   └── api/
│       ├── notifications/      # WhatsApp notification endpoints
│       ├── reviews/            # Google Places review API
│       └── stripe/             # Payment webhooks
├── collections/               # Payload CMS collections
│   ├── Operators.ts           # Tour operators
│   ├── BookableItems.ts       # Programs, rooms, tours
│   ├── Bookings.ts            # Booking records
│   ├── SurfSpots.ts           # Surf spot database
│   └── ...
├── components/
│   ├── booking/               # Booking form, calendar, payment
│   ├── sections/              # Reusable page sections
│   ├── marketing/             # Marketing page components
│   └── ui/                    # Design system components
├── lib/
│   ├── notifications/         # WhatsApp templates and helpers
│   ├── mockData/              # Seed data for testing
│   └── validation.ts          # Form validation utilities
├── messages/
│   ├── es.json                # Spanish translations
│   └── en.json                # English translations
├── docs/                      # Setup guides for integrations
│   ├── DEPLOYMENT.md
│   ├── CAL-SETUP.md
│   ├── STRIPE-SETUP.md
│   ├── WHATSAPP-SETUP.md
│   └── GOOGLE-PLACES-SETUP.md
├── e2e/                       # Playwright E2E tests
├── payload.config.ts          # Payload CMS configuration
├── next.config.mjs            # Next.js configuration
├── tailwind.config.ts         # Tailwind design system
└── plan.md                    # Implementation plan (24 phases)
```

## Collections (Payload CMS)

- **Operators**: Tourism operators with profiles, integrations
- **BookableItems**: Programs, rooms, tours (polymorphic)
- **Bookings**: Reservation records with payment tracking
- **SurfSpots**: Surf spot database with conditions
- **Guides**: Instructor profiles with certifications
- **CommunityMembers**: Team members with stories
- **ImpactMetrics**: Social/environmental impact data
- **PickupLocations**: Tour pickup/dropoff locations
- **Media**: Image/video library
- **Users**: Admin and operator accounts

## API Routes

- `POST /api/notifications/whatsapp` - Send WhatsApp notifications
- `GET /api/reviews/google?placeId=...` - Fetch Google reviews
- `POST /api/stripe/create-payment-intent` - Create Stripe payment
- `POST /api/stripe/webhooks` - Handle Stripe webhooks

## Environment Variables

See `.env.example` for required variables:

**Required**:
- `DATABASE_URL` - PostgreSQL connection
- `PAYLOAD_SECRET` - CMS secret key

**Optional (POC Features)**:
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe public key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `TWILIO_ACCOUNT_SID` - Twilio account SID
- `TWILIO_AUTH_TOKEN` - Twilio auth token
- `TWILIO_WHATSAPP_NUMBER` - Twilio WhatsApp number
- `GOOGLE_PLACES_API_KEY` - Google Places API key
- `NEXT_PUBLIC_CAL_NAMESPACE` - Cal.com namespace

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment guide.

**Recommended Stack (POC - $0/month)**:
- **Hosting**: Vercel (Hobby plan)
- **Database**: Neon (Free tier - 0.5GB)
- **Payments**: Stripe (test mode)
- **WhatsApp**: Twilio (sandbox)
- **Reviews**: Google Places (free tier)
- **Calendar**: Cal.com (free tier)

## Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Production deployment guide
- [plan.md](./plan.md) - Full implementation plan (24 phases)
- [REMAINING-PHASES-OUTLINE.md](./REMAINING-PHASES-OUTLINE.md) - Phases 15-22 breakdown
- [docs/CAL-SETUP.md](./docs/CAL-SETUP.md) - Cal.com integration setup
- [docs/STRIPE-SETUP.md](./docs/STRIPE-SETUP.md) - Stripe payments setup
- [docs/WHATSAPP-SETUP.md](./docs/WHATSAPP-SETUP.md) - WhatsApp notifications setup
- [docs/GOOGLE-PLACES-SETUP.md](./docs/GOOGLE-PLACES-SETUP.md) - Google Places API setup
- [TESTING.md](./TESTING.md) - Testing strategy and guide
- [ACCESSIBILITY.md](./ACCESSIBILITY.md) - Accessibility compliance (WCAG 2.1 AA)

## Brand Guidelines

**Voice & Tone**:
- No exclamation marks (excitement is shown, not declared)
- No marketing-speak (banned: "discover", "amazing", "unforgettable")
- No false urgency
- Spanish-first (UI defaults to Spanish)
- Short, direct sentences

**Design System**:
- **Colors**: ocean-blue, volcanic-black, sand-white, pacific-mist, sunset-coral, indigo-deep
- **Typography**: Fraunces (display), Inter (sans), JetBrains Mono (mono)
- **Spacing**: 8px base unit
- **Mobile-first**: 390px target (iPhone standard)

## License

MIT License - See [LICENSE](./LICENSE) for details

## Contributing

This is a POC for El Salvador's tourism ecosystem. Contributions welcome.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Run tests (`npm test`)
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## Support

- **GitHub Issues**: https://github.com/yerriportillo/morada/issues
- **Documentation**: See `/docs` folder

## Acknowledgments

Built with:
- Next.js by Vercel
- Payload CMS
- Stripe for payments
- Twilio for WhatsApp
- Google Places for reviews
- Cal.com for calendars

---

**Made with ❤️ in El Salvador**
