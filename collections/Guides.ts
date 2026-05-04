import type { CollectionConfig } from 'payload'
import { requireBothLanguages, validateSlug } from '../lib/validation'

export const Guides: CollectionConfig = {
  slug: 'guides',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'operator', 'languages', 'active'],
    group: 'Core Business',
    description: 'Manage surf instructors, tour guides, and activity leaders',
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
      name: 'name',
      type: 'text',
      required: true,
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
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Profile photo (square/portrait)',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      localized: true,
      maxLength: 500,
      validate: requireBothLanguages,
      admin: {
        description: 'Bio (max 500 characters, required in both Spanish and English)',
      },
    },
    {
      name: 'languages',
      type: 'select',
      hasMany: true,
      required: true,
      options: [
        { label: 'Spanish', value: 'es' },
        { label: 'English', value: 'en' },
        { label: 'French', value: 'fr' },
        { label: 'German', value: 'de' },
        { label: 'Portuguese', value: 'pt' },
        { label: 'Italian', value: 'it' },
      ],
    },
    {
      name: 'yearsExperience',
      type: 'number',
      required: true,
      admin: {
        description: 'Years of experience as instructor/guide',
      },
    },
    {
      name: 'certifications',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'issuer',
          type: 'text',
          required: true,
        },
        {
          name: 'year',
          type: 'number',
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'specialties',
      type: 'array',
      fields: [
        {
          name: 'specialty',
          type: 'text',
        },
      ],
      admin: {
        description: 'Areas of expertise (e.g., "Beginner instruction", "Big wave surfing")',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Currently available for bookings',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      admin: {
        description: 'Display order on website (lower = first)',
      },
    },
  ],
  timestamps: true,
}
