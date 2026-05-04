#!/bin/bash
set -e  # Exit on error

# Morada Platform - Automated Deployment Script
# This script automates Phase 15: Vercel + Neon deployment

echo "🚀 Morada Platform - Automated Deployment"
echo "========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Print colored message
print_status() {
    echo -e "${BLUE}[*]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

# Step 1: Check prerequisites
print_status "Checking prerequisites..."

if ! command_exists node; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

if ! command_exists npm; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

if ! command_exists git; then
    print_error "git is not installed. Please install git first."
    exit 1
fi

print_success "Prerequisites check passed"
echo ""

# Step 2: Install Vercel CLI
print_status "Installing Vercel CLI..."
if ! command_exists vercel; then
    npm install -g vercel
    print_success "Vercel CLI installed"
else
    print_success "Vercel CLI already installed"
fi
echo ""

# Step 3: Install Neon CLI
print_status "Installing Neon CLI..."
if ! command_exists neonctl; then
    npm install -g neonctl
    print_success "Neon CLI installed"
else
    print_success "Neon CLI already installed"
fi
echo ""

# Step 4: Authenticate with Neon
print_status "Authenticating with Neon..."
echo ""
print_warning "MANUAL STEP: You need to authenticate with Neon"
echo "  1. Visit: https://console.neon.tech/app/settings/api-keys"
echo "  2. Click 'Generate new API key'"
echo "  3. Copy the API key"
echo "  4. Run: neonctl auth"
echo "  5. Paste your API key when prompted"
echo ""
read -p "Press Enter after you've authenticated with Neon CLI..."

# Verify Neon authentication
if ! neonctl me >/dev/null 2>&1; then
    print_error "Neon authentication failed. Please run 'neonctl auth' manually."
    exit 1
fi
print_success "Neon authentication verified"
echo ""

# Step 5: Create Neon project
print_status "Creating Neon database project..."
PROJECT_NAME="morada-poc"

# Check if project already exists
EXISTING_PROJECT=$(neonctl projects list --output json 2>/dev/null | grep -o "\"name\":\"$PROJECT_NAME\"" || true)

if [ -n "$EXISTING_PROJECT" ]; then
    print_warning "Project '$PROJECT_NAME' already exists"
    read -p "Do you want to use the existing project? (y/n): " use_existing
    if [ "$use_existing" != "y" ]; then
        read -p "Enter a new project name: " PROJECT_NAME
        neonctl projects create --name "$PROJECT_NAME" --region aws-us-east-1
        print_success "Created new Neon project: $PROJECT_NAME"
    else
        print_success "Using existing project: $PROJECT_NAME"
    fi
else
    neonctl projects create --name "$PROJECT_NAME" --region aws-us-east-1
    print_success "Created Neon project: $PROJECT_NAME"
fi
echo ""

# Step 6: Get connection string
print_status "Getting Neon connection string..."
PROJECT_ID=$(neonctl projects list --output json | grep -B5 "\"name\":\"$PROJECT_NAME\"" | grep "\"id\":" | head -1 | sed 's/.*"id": "\([^"]*\)".*/\1/')

if [ -z "$PROJECT_ID" ]; then
    print_error "Could not find project ID for $PROJECT_NAME"
    exit 1
fi

CONNECTION_STRING=$(neonctl connection-string --project-id "$PROJECT_ID" --database-name neondb --role-name neondb_owner)

if [ -z "$CONNECTION_STRING" ]; then
    print_error "Could not get connection string"
    exit 1
fi

print_success "Got Neon connection string"
echo ""

# Step 7: Update .env.local
print_status "Updating .env.local with Neon connection string..."

if [ -f .env.local ]; then
    # Backup existing .env.local
    cp .env.local .env.local.backup
    print_success "Backed up existing .env.local to .env.local.backup"
fi

# Update or add DATABASE_URL
if grep -q "^DATABASE_URL=" .env.local 2>/dev/null; then
    # Update existing
    sed -i.bak "s|^DATABASE_URL=.*|DATABASE_URL=$CONNECTION_STRING|" .env.local
    rm -f .env.local.bak
else
    # Add new
    echo "DATABASE_URL=$CONNECTION_STRING" >> .env.local
fi

print_success "Updated .env.local with DATABASE_URL"
echo ""

# Step 8: Generate PAYLOAD_SECRET if not exists
print_status "Checking PAYLOAD_SECRET..."
if ! grep -q "^PAYLOAD_SECRET=" .env.local 2>/dev/null || grep -q "^PAYLOAD_SECRET=your-secret-key-here" .env.local 2>/dev/null; then
    print_status "Generating new PAYLOAD_SECRET..."
    PAYLOAD_SECRET=$(openssl rand -base64 32)

    if grep -q "^PAYLOAD_SECRET=" .env.local 2>/dev/null; then
        sed -i.bak "s|^PAYLOAD_SECRET=.*|PAYLOAD_SECRET=$PAYLOAD_SECRET|" .env.local
        rm -f .env.local.bak
    else
        echo "PAYLOAD_SECRET=$PAYLOAD_SECRET" >> .env.local
    fi

    print_success "Generated new PAYLOAD_SECRET"
else
    print_success "PAYLOAD_SECRET already set"
fi
echo ""

# Step 9: Run Payload migrations
print_status "Running Payload migrations..."
echo ""

# Create migration
npx payload migrate:create initial-schema --no-interaction || true

# Run migrations
npx payload migrate

print_success "Migrations completed"
echo ""

# Step 10: Seed database
print_status "Seeding database with demo data..."
npm run seed
print_success "Database seeded successfully"
echo ""

# Step 11: Test local connection
print_status "Testing local database connection..."
echo "Starting dev server briefly to verify connection..."

# Start dev server in background
npm run dev > /tmp/morada-dev.log 2>&1 &
DEV_PID=$!

# Wait for server to start (max 30 seconds)
for i in {1..30}; do
    if curl -s http://localhost:3005 >/dev/null 2>&1; then
        print_success "Local connection test passed"
        break
    fi
    sleep 1
done

# Kill dev server
kill $DEV_PID 2>/dev/null || true
echo ""

# Step 12: Authenticate with Vercel
print_status "Authenticating with Vercel..."
echo ""
print_warning "MANUAL STEP: You need to authenticate with Vercel"
echo "  This will open a browser window for authentication"
echo ""
vercel login

print_success "Vercel authentication complete"
echo ""

# Step 13: Link to Vercel project
print_status "Linking to Vercel project..."
echo ""
print_warning "Select 'Set up and deploy' when prompted"
echo "  - Link to existing project? NO (create new)"
echo "  - Project name: morada (or your choice)"
echo "  - Directory: ./ (default)"
echo ""

vercel link

print_success "Linked to Vercel project"
echo ""

# Step 14: Set Vercel environment variables
print_status "Setting Vercel environment variables..."

# Get PAYLOAD_SECRET from .env.local
PAYLOAD_SECRET=$(grep "^PAYLOAD_SECRET=" .env.local | cut -d '=' -f 2)

# Set environment variables
vercel env add DATABASE_URL production <<EOF
$CONNECTION_STRING
EOF

vercel env add PAYLOAD_SECRET production <<EOF
$PAYLOAD_SECRET
EOF

vercel env add DATABASE_URL preview <<EOF
$CONNECTION_STRING
EOF

vercel env add PAYLOAD_SECRET preview <<EOF
$PAYLOAD_SECRET
EOF

print_success "Environment variables set in Vercel"
echo ""

# Step 15: Deploy to Vercel
print_status "Deploying to Vercel..."
echo ""

vercel --prod

print_success "Deployed to Vercel"
echo ""

# Step 16: Get deployment URL
print_status "Getting deployment URL..."
DEPLOYMENT_URL=$(vercel ls --prod 2>/dev/null | grep "morada" | head -1 | awk '{print $2}')

if [ -n "$DEPLOYMENT_URL" ]; then
    print_success "Deployment URL: https://$DEPLOYMENT_URL"
    echo ""

    # Update NEXT_PUBLIC_SITE_URL
    print_status "Updating NEXT_PUBLIC_SITE_URL..."
    vercel env add NEXT_PUBLIC_SITE_URL production <<EOF
https://$DEPLOYMENT_URL
EOF

    vercel env add NEXT_PUBLIC_SITE_URL preview <<EOF
https://$DEPLOYMENT_URL
EOF

    print_success "NEXT_PUBLIC_SITE_URL updated"
    echo ""
fi

# Step 17: Summary
echo ""
echo "========================================="
echo -e "${GREEN}✅ Deployment Complete!${NC}"
echo "========================================="
echo ""
echo "📊 Deployment Summary:"
echo "  • Neon Database: $PROJECT_NAME"
echo "  • Connection String: Set in .env.local"
echo "  • Migrations: Complete"
echo "  • Seed Data: Loaded (Puro Surf demo)"
if [ -n "$DEPLOYMENT_URL" ]; then
    echo "  • Production URL: https://$DEPLOYMENT_URL"
    echo "  • Admin Panel: https://$DEPLOYMENT_URL/admin"
    echo "  • Marketing Page: https://$DEPLOYMENT_URL/en"
fi
echo ""
echo "🔐 Next Steps:"
echo "  1. Visit https://$DEPLOYMENT_URL/admin"
echo "  2. Create your admin user account"
echo "  3. Test the operator page: https://$DEPLOYMENT_URL/en/puro-surf"
echo "  4. Review deployment logs: vercel logs"
echo ""
echo "📚 Documentation:"
echo "  • Deployment Guide: docs/PHASE-15-DEPLOYMENT-GUIDE.md"
echo "  • Environment Variables: docs/VERCEL-ENV-VARIABLES.md"
echo ""
echo "💰 POC Cost: \$0/month (Neon Free Tier + Vercel Hobby)"
echo ""

print_success "Phase 15 deployment automation complete!"
