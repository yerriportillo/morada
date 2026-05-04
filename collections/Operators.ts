import type { CollectionConfig } from 'payload'
import { requireBothLanguages, validateEmail, validateWhatsApp, validateHexColor, validateSlug } from '../lib/validation'

export const Operators: CollectionConfig = {
  slug: 'operators',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'status', 'tier'],
    group: 'Core Business',
    description: 'Manage tourism operators (surf camps, eco-lodges, tour operators, community cooperatives)',
  },
  access: {
    // Platform admins can read/write all
    // Operators can only read/write their own data (implemented in Phase 1 access control)
    read: () => true, // Will be restricted later
    create: ({ req }) => req.user?.role === 'platform-admin',
    update: () => true, // Will be restricted later
    delete: ({ req }) => req.user?.role === 'platform-admin',
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      validate: validateSlug,
      admin: {
        description: 'URL-friendly identifier (e.g., "puro-surf")',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      validate: requireBothLanguages,
      admin: {
        description: 'Operator name (required in both Spanish and English)',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      localized: true,
      validate: requireBothLanguages,
      admin: {
        description: 'Short description or slogan (required in both languages)',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Moradas Costeras (Surf Camps)',
          value: 'moradas_costeras',
        },
        {
          label: 'Refugios (Eco-Lodges)',
          value: 'refugio',
        },
        {
          label: 'Guías (Tour Operators)',
          value: 'guia',
        },
        {
          label: 'Comunidades (Community Cooperatives)',
          value: 'comunidad',
        },
      ],
      admin: {
        description: 'Operator type - determines template and features',
      },
    },
    {
      name: 'tier',
      type: 'select',
      required: true,
      defaultValue: 'operator',
      options: [
        {
          label: 'Comunidad (Free/Subsidized)',
          value: 'comunidad',
        },
        {
          label: 'Operator (Standard)',
          value: 'operator',
        },
        {
          label: 'Partner (Premium)',
          value: 'partner',
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'onboarding',
      options: [
        { label: 'Onboarding', value: 'onboarding' },
        { label: 'Active', value: 'active' },
        { label: 'Suspended', value: 'suspended' },
        { label: 'Churned', value: 'churned' },
      ],
    },
    {
      name: 'brandColor',
      type: 'text',
      required: true,
      defaultValue: '#1A6B8A',
      validate: validateHexColor,
      admin: {
        description: 'Primary brand color (hex code, e.g., #1A6B8A)',
      },
    },
    // Contact Information
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          name: 'whatsapp',
          type: 'text',
          validate: validateWhatsApp,
          admin: {
            description: 'E.164 format (e.g., +50312345678)',
          },
        },
        {
          name: 'email',
          type: 'email',
          validate: validateEmail,
        },
        {
          name: 'instagram',
          type: 'text',
          admin: {
            description: 'Handle only, no @ symbol',
          },
        },
      ],
    },
    // Location Information
    {
      name: 'location',
      type: 'group',
      fields: [
        {
          name: 'address',
          type: 'text',
          localized: true,
          validate: requireBothLanguages,
          admin: {
            description: 'Full address (required in both languages)',
          },
        },
        {
          name: 'city',
          type: 'text',
        },
        {
          name: 'department',
          type: 'select',
          options: [
            { label: 'La Libertad', value: 'la_libertad' },
            { label: 'Usulután', value: 'usulutan' },
            { label: 'La Unión', value: 'la_union' },
            { label: 'San Miguel', value: 'san_miguel' },
            { label: 'Ahuachapán', value: 'ahuachapan' },
            { label: 'Sonsonate', value: 'sonsonate' },
            { label: 'Santa Ana', value: 'santa_ana' },
            { label: 'Cuscatlán', value: 'cuscatlan' },
            { label: 'San Salvador', value: 'san_salvador' },
            { label: 'La Paz', value: 'la_paz' },
            { label: 'Cabañas', value: 'cabanas' },
            { label: 'San Vicente', value: 'san_vicente' },
            { label: 'Chalatenango', value: 'chalatenango' },
            { label: 'Morazán', value: 'morazan' },
          ],
        },
        {
          name: 'coast',
          type: 'select',
          options: [
            { label: 'Central', value: 'central' },
            { label: 'Eastern', value: 'eastern' },
            { label: 'Western', value: 'western' },
            { label: 'Inland', value: 'inland' },
          ],
        },
        {
          name: 'latitude',
          type: 'number',
        },
        {
          name: 'longitude',
          type: 'number',
        },
        {
          name: 'taxiInstructions',
          type: 'textarea',
          localized: true,
          validate: requireBothLanguages,
          admin: {
            description: 'Plain language directions for taxi drivers (required in both languages)',
          },
        },
      ],
    },
    // Integration Settings
    {
      name: 'integrations',
      type: 'group',
      fields: [
        {
          name: 'vercelDomain',
          type: 'text',
          admin: {
            description: 'Custom domain (e.g., purosurf.com)',
          },
        },
        {
          name: 'calUsername',
          type: 'text',
          admin: {
            description: 'Cal.com username/namespace',
          },
        },
        {
          name: 'stripeAccountId',
          type: 'text',
          admin: {
            description: 'Stripe Connect account ID',
          },
        },
        {
          name: 'stripeSubscriptionId',
          type: 'text',
          admin: {
            description: 'Morada subscription ID',
          },
        },
        {
          name: 'twilioWhatsappFrom',
          type: 'text',
          admin: {
            description: 'Twilio WhatsApp sender number',
          },
        },
        {
          name: 'googlePlaceId',
          type: 'text',
          admin: {
            description: 'Google Place ID for fetching reviews (e.g., ChIJ...)',
          },
        },
        {
          name: 'umamiWebsiteId',
          type: 'text',
          admin: {
            description: 'Umami analytics website ID',
          },
        },
      ],
    },
    // External Services
    {
      name: 'external',
      type: 'group',
      fields: [
        {
          name: 'tripadvisorUrl',
          type: 'text',
        },
        {
          name: 'googlePlaceId',
          type: 'text',
          admin: {
            description: 'Google Places ID for review fetching',
          },
        },
      ],
    },
    // Bitcoin (Phase 2)
    {
      name: 'bitcoin',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'address',
          type: 'text',
        },
      ],
    },
    // Regreso Module (Diaspora-Return Feature)
    {
      name: 'regresoModule',
      type: 'group',
      admin: {
        description: 'Diaspora-return landing page feature',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Enable /regreso landing page for this operator',
          },
        },
        {
          name: 'headline',
          type: 'text',
          localized: true,
          validate: requireBothLanguages,
          admin: {
            description: 'Custom headline for Regreso page (optional, but if provided needs both languages)',
          },
        },
      ],
    },
    {
      name: 'launchedAt',
      type: 'date',
      admin: {
        description: 'Date the operator site went live',
      },
    },
  ],
  timestamps: true,
}
