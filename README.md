# Morada

**The platform for the small dwellings of El Salvador.**

White-label tourism booking platform for El Salvador's surf camps, eco-lodges, tour operators, and community cooperatives.

## Tech Stack

- **Frontend:** Next.js 14 (App Router)
- **CMS:** Payload CMS (self-hosted)
- **Database:** PostgreSQL (Neon)
- **Styling:** Tailwind CSS
- **Language:** TypeScript

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- PostgreSQL database (local or Neon cloud)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your database connection string and other required variables.

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The Payload admin panel will be available at [http://localhost:3000/admin](http://localhost:3000/admin).

### Project Structure

```
morada/
├── app/                    # Next.js App Router pages
├── collections/            # Payload CMS collections
├── components/             # React components
├── lib/                    # Utility functions and helpers
├── messages/               # i18n translation files (es.json, en.json)
├── emails/                 # React Email templates
├── payload.config.ts       # Payload CMS configuration
├── next.config.mjs         # Next.js configuration
└── tailwind.config.ts      # Tailwind CSS configuration
```

## Development Status

Currently in **Phase 0: Foundation & Project Setup**

See `../plan.md` for the complete implementation plan and progress tracking.

## Brand Voice

All copy in this platform follows strict brand voice rules:
- **No exclamation marks** — excitement is shown, not declared
- **No marketing-speak** — banned words: "discover," "amazing," "unforgettable," "luxury," "exclusive"
- **No false urgency**
- **Spanish first** — all UI defaults to Spanish, English is secondary
- Short sentences preferred

See `../brand-positioning.md` for complete brand guidelines.

## Design System

- Color palette: ocean-blue, volcanic-black, sand-white, pacific-mist, sunset-coral, indigo-deep
- Typography: Fraunces (display), Inter (sans), JetBrains Mono (mono)
- Spacing: 8px base unit
- Mobile-first: design target is 390px (iPhone standard)

See `../DESIGN-SYSTEM.md` for complete design specifications.
