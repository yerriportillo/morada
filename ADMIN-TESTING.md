# Payload Admin Testing Guide

## Accessing the Admin Panel

1. **Start the development server** (if not already running):
   ```bash
   npm run dev
   ```

2. **Navigate to the admin panel**:
   ```
   http://localhost:3004/admin
   ```

3. **Create your first admin user** (on first visit):
   - Email: your email
   - Password: secure password (min 8 characters)
   - Name: your name
   - Role: `platform-admin`

## Admin Panel Organization

Collections are now organized into logical groups:

### Core Business
- **Operators** - Manage tourism operators (surf camps, eco-lodges, tour operators, community cooperatives)
- **Bookable Items** - Manage programs, rooms, tours, and activities offered by operators
- **Bookings** - Manage customer bookings and track diaspora visitors (regresoVisitor flag)
- **Guides** - Manage surf instructors, tour guides, and activity leaders

### Content
- **Surf Spots** - Manage surf spot directory (8 El Salvador surf breaks)
- **Community Members** - Manage community member profiles and first-person stories
- **Impact Metrics** - Track conservation and community impact metrics for operators
- **Pickup Locations** - Manage tour pickup locations and meeting points

### Media
- **Media** - Upload and manage photos, videos, and other media assets

### Users
- **Users** - Manage platform users and operator accounts

## Testing Checklist

### 1. Test Operators Collection

**Create Test:**
- [ ] Click "Operators" in sidebar
- [ ] Click "Create New"
- [ ] Fill in required fields:
  - Slug: `test-operator`
  - Name (ES): `Operador de Prueba`
  - Name (EN): `Test Operator`
  - Tagline (ES): `Turismo sostenible`
  - Tagline (EN): `Sustainable tourism`
  - Type: Select any (moradas_costeras, refugio, guia, comunidad)
  - Status: `active`
  - Tier: Select any (comunidad, operator, partner)
  - Brand Color: `#1A6B8A`
- [ ] **Verify bilingual validation**: Try saving with only Spanish - should show error
- [ ] **Verify bilingual validation**: Try saving with only English - should show error
- [ ] Save with BOTH languages - should succeed

**Read Test:**
- [ ] View the operator you just created
- [ ] Verify all fields display correctly in both languages

**Update Test:**
- [ ] Edit the operator
- [ ] Change the tagline in both languages
- [ ] Save and verify changes

**Delete Test:**
- [ ] Delete the test operator (only platform-admin can delete)

### 2. Test Bookable Items Collection

**Create Test:**
- [ ] Create a new bookable item
- [ ] Link it to an operator (if you have one)
- [ ] Fill in:
  - Name (ES & EN) - both required
  - Description (ES & EN) - both required
  - Type: `program`, `room`, `tour`, or `activity`
  - Price: e.g., `75`
  - Currency: `USD`
  - Duration: e.g., `90` (minutes) or `3` (days)
  - Max Capacity: e.g., `8`
- [ ] Verify bilingual validation works
- [ ] Save successfully

### 3. Test Bookings Collection

**Create Test:**
- [ ] Create a test booking
- [ ] Fill in guest details:
  - Guest Name
  - Guest Email
  - Guest WhatsApp
  - Guest Country
  - Guest Language Preference
  - Start Date
  - Number of Guests
- [ ] **CRITICAL**: Test the `regresoVisitor` checkbox
  - [ ] Check the box (simulates booking from /regreso page)
  - [ ] Verify it saves as `true`
- [ ] Link to an operator and bookable item
- [ ] Set booking status and payment status
- [ ] Save and verify

### 4. Test Guides Collection

**Create Test:**
- [ ] Create a guide profile
- [ ] Fill in:
  - Name
  - Bio (ES & EN) - both required
  - Languages: e.g., `es`, `en`
  - Years of Experience: e.g., `5`
  - Active: checked
- [ ] Upload a photo (optional)
- [ ] Link to an operator
- [ ] Verify bilingual validation
- [ ] Save successfully

### 5. Test Surf Spots Collection

**Note**: Surf spots are managed by platform admins only.

**Create Test (as platform-admin):**
- [ ] Create a new surf spot
- [ ] Fill in:
  - Slug: `test-spot`
  - Name: `Test Spot`
  - Region: `la_libertad`, `eastern`, or `western`
  - Break Type: `point`, `beach`, `reef`, or `river_mouth`
  - Skill Level: `beginner`, `intermediate`, or `advanced`
  - Best Season: `Year-round`
  - Best Tide: `low`, `mid`, `high`, or `all`
  - Crowd Rating: 1-5
  - Location: Latitude & Longitude
  - Notes (ES & EN) - both required
- [ ] Verify bilingual validation
- [ ] Save successfully

### 6. Test Community Members Collection

**Create Test:**
- [ ] Create a community member profile
- [ ] Fill in:
  - Name
  - Role (ES & EN) - both required
  - Story (ES & EN) - both required (max 300 words)
  - Active: checked
- [ ] Upload a photo (optional)
- [ ] Link to an operator
- [ ] Verify bilingual validation
- [ ] Save successfully

### 7. Test Impact Metrics Collection

**Create Test:**
- [ ] Create an impact metric
- [ ] Fill in:
  - Label (ES & EN) - both required
  - Value: e.g., `150`
  - Unit (ES & EN): e.g., `árboles plantados` / `trees planted`
  - Icon: e.g., `🌱`
- [ ] Link to an operator
- [ ] Verify bilingual validation
- [ ] Save successfully

### 8. Test Pickup Locations Collection

**Create Test:**
- [ ] Create a pickup location
- [ ] Fill in:
  - Name (ES & EN) - both required
  - Instructions (ES & EN) - both required
  - Active: checked
- [ ] Link to an operator
- [ ] Verify bilingual validation
- [ ] Save successfully

### 9. Test Media Collection

**Upload Test:**
- [ ] Click "Media" in sidebar
- [ ] Click "Create New"
- [ ] Upload an image (JPG, PNG, WebP, or GIF)
- [ ] Fill in:
  - Alt text (ES & EN) - both required
  - Category: `surf`, `accommodation`, `food`, `nature`, `people`, `activities`, `other`
- [ ] Link to an operator (optional)
- [ ] Save successfully
- [ ] Verify that thumbnails are generated automatically:
  - Thumbnail: 400×300
  - Card: 768×576
  - Hero: 1920×1080

**View Test:**
- [ ] Click on the uploaded media
- [ ] Verify all image sizes are available
- [ ] Verify alt text displays in both languages

### 10. Test Users Collection

**Note**: Only visible if logged in as admin.

**Create Test:**
- [ ] Create a new user
- [ ] Fill in:
  - Email
  - Password (min 8 characters)
  - Name
  - Role: `platform-admin`, `operator-admin`, or `operator-staff`
- [ ] Save successfully

## Bilingual Validation Testing

**Critical fields that MUST have both ES and EN:**
- Operator: `name`, `tagline`, `about`, `regresoHeadline`
- Bookable Items: `name`, `description`
- Guides: `bio`
- Surf Spots: `notes`
- Community Members: `role`, `story`
- Impact Metrics: `label`, `unit`
- Pickup Locations: `name`, `instructions`
- Media: `alt`

**Test Each:**
1. Try saving with only Spanish → Should show error: "Falta la versión en inglés"
2. Try saving with only English → Should show error: "Falta la versión en español"
3. Try saving with both → Should succeed ✓

## Seed Data Testing

To populate the database with test data:

```bash
npm run seed
```

This will create:
- 1 demo operator "Puro Surf" (Moradas Costeras type)
- 8 El Salvador surf spots with complete bilingual data
- 3 surf programs with bilingual content
- 2 guides with bilingual bios

After seeding, verify:
- [ ] All operators appear in admin panel
- [ ] All surf spots appear with correct data
- [ ] All programs are linked to the operator
- [ ] All guides are linked to the operator
- [ ] Bilingual content displays correctly

## Admin Branding Customization

Current branding:
- **Title suffix**: "— Morada"
- **Description**: "Morada Admin - White-label tourism platform for El Salvador"
- **Default locale**: Spanish (ES)
- **Fallback locale**: English (EN)

## Custom Dashboard

A custom dashboard component has been created at `components/admin/Dashboard.tsx` with:
- Welcome message in Spanish and English
- Quick stats cards (operators, bookings, regreso visitors, programs)
- Quick action links to common collections
- System status indicators
- Bilingual support status

**Note**: Dashboard integration with Payload admin is ready but requires database setup to display live data. Currently shows placeholder values (—) until collections are populated.

## Known Issues / Future Enhancements

- [x] Custom dashboard with operator metrics (Phase 8 - created, needs database for live data)
- [ ] Custom operator logo upload (to be implemented)
- [ ] Operator-specific access control (operators can only see their own data)
- [ ] Booking calendar view (to be implemented)
- [ ] Analytics dashboard with charts (Phase 17)
- [ ] Real-time booking notifications (Phase 13)

## Next Steps

After completing manual testing:
1. Verify all CRUD operations work
2. Confirm bilingual validation is enforced
3. Test file upload functionality
4. Verify relationship fields (operator links) work correctly
5. Proceed to Phase 9: Community Features UI
