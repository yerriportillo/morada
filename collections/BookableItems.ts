import type { CollectionConfig } from 'payload'
import { requireBothLanguages, validateSlug } from '../lib/validation'

export const BookableItems: CollectionConfig = {
  slug: 'bookable-items',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'operator', 'price', 'status'],
    group: 'Core Business',
    description: 'Manage programs, rooms, tours, and activities offered by operators',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'operator',
      type: 'relationship',
      relationTo: 'operators',
      required: true,
      hasMany: false,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Surf Program', value: 'surf_program' },
        { label: 'Room', value: 'room' },
        { label: 'Tour', value: 'tour' },
        { label: 'Activity', value: 'activity' },
        { label: 'Volunteer Slot', value: 'volunteer_slot' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Seasonal', value: 'seasonal' },
        { label: 'Archived', value: 'archived' },
      ],
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      validate: requireBothLanguages,
      admin: {
        description: 'Item name (required in both Spanish and English)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      validate: validateSlug,
      admin: {
        description: 'URL-friendly identifier (lowercase, hyphenated)',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      localized: true,
      maxLength: 200,
      validate: requireBothLanguages,
      admin: {
        description: 'Brief description (max 200 characters, required in both languages)',
      },
    },
    {
      name: 'fullDescription',
      type: 'richText',
      localized: true,
      validate: requireBothLanguages,
      admin: {
        description: 'Full description (required in both languages)',
      },
    },
    // Pricing
    {
      name: 'pricing',
      type: 'group',
      fields: [
        {
          name: 'priceUsd',
          type: 'number',
          required: true,
          admin: {
            description: 'Base price in USD',
          },
        },
        {
          name: 'priceHighSeason',
          type: 'number',
          admin: {
            description: 'High season price (optional)',
          },
        },
        {
          name: 'depositPercent',
          type: 'number',
          defaultValue: 30,
          min: 0,
          max: 100,
          admin: {
            description: 'Deposit percentage (default 30%)',
          },
        },
      ],
    },
    // Duration & Capacity
    {
      name: 'duration',
      type: 'group',
      fields: [
        {
          name: 'days',
          type: 'number',
          admin: {
            description: 'Duration in days (for multi-day programs)',
          },
        },
        {
          name: 'hours',
          type: 'number',
          admin: {
            description: 'Duration in hours (for day tours/activities)',
          },
        },
      ],
    },
    {
      name: 'capacity',
      type: 'group',
      fields: [
        {
          name: 'minGuests',
          type: 'number',
          defaultValue: 1,
        },
        {
          name: 'maxGuests',
          type: 'number',
          required: true,
        },
        {
          name: 'minAge',
          type: 'number',
          admin: {
            description: 'Minimum age requirement',
          },
        },
      ],
    },
    // Skill/Difficulty Level
    {
      name: 'skillLevel',
      type: 'select',
      options: [
        { label: 'Beginner', value: 'beginner' },
        { label: 'Intermediate', value: 'intermediate' },
        { label: 'Advanced', value: 'advanced' },
        { label: 'All Levels', value: 'all' },
      ],
      admin: {
        description: 'For surf programs',
      },
    },
    {
      name: 'difficulty',
      type: 'select',
      options: [
        { label: 'Easy', value: 'easy' },
        { label: 'Moderate', value: 'moderate' },
        { label: 'Challenging', value: 'challenging' },
      ],
      admin: {
        description: 'For tours and activities',
      },
    },
    // What's Included
    {
      name: 'includes',
      type: 'textarea',
      localized: true,
      validate: requireBothLanguages,
      admin: {
        description: 'What is included (markdown format, required in both languages)',
      },
    },
    {
      name: 'excludes',
      type: 'textarea',
      localized: true,
      validate: requireBothLanguages,
      admin: {
        description: 'What is NOT included (optional, but if provided needs both languages)',
      },
    },
    {
      name: 'whatToBring',
      type: 'textarea',
      localized: true,
      validate: requireBothLanguages,
      admin: {
        description: 'What guests should bring (optional, but if provided needs both languages)',
      },
    },
    // Seasonal Availability
    {
      name: 'seasonal',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'availableMonths',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'January', value: '1' },
        { label: 'February', value: '2' },
        { label: 'March', value: '3' },
        { label: 'April', value: '4' },
        { label: 'May', value: '5' },
        { label: 'June', value: '6' },
        { label: 'July', value: '7' },
        { label: 'August', value: '8' },
        { label: 'September', value: '9' },
        { label: 'October', value: '10' },
        { label: 'November', value: '11' },
        { label: 'December', value: '12' },
      ],
      admin: {
        description: 'Months when this item is available (if seasonal)',
      },
    },
    // Cal.com Integration
    {
      name: 'calEventTypeId',
      type: 'text',
      admin: {
        description: 'Cal.com event type ID for booking',
      },
    },
    // Tip Feature (for Comunidades)
    {
      name: 'tipOnCheckout',
      type: 'group',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'fundName',
          type: 'text',
          localized: true,
          validate: requireBothLanguages,
          admin: {
            description: 'Name of the fund/project tips support (if provided, needs both languages)',
          },
        },
        {
          name: 'suggestedAmounts',
          type: 'array',
          fields: [
            {
              name: 'amount',
              type: 'number',
            },
          ],
          admin: {
            description: 'Suggested tip amounts in USD (e.g., 5, 10, 20)',
          },
        },
      ],
    },
  ],
  timestamps: true,
}
