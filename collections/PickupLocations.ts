import type { CollectionConfig } from 'payload'
import { requireBothLanguages } from '../lib/validation'

export const PickupLocations: CollectionConfig = {
  slug: 'pickup-locations',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'operator', 'active'],
    group: 'Content',
    description: 'Manage tour pickup locations and meeting points',
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
      admin: {
        description: 'Must be a Guías-type operator',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      validate: requireBothLanguages,
      admin: {
        description: 'e.g., "El Tunco — Hotel Papaya Lodge" (required in both languages)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      validate: requireBothLanguages,
      admin: {
        description: 'Landmark description for guests (required in both languages)',
      },
    },
    {
      name: 'address',
      type: 'text',
    },
    {
      name: 'location',
      type: 'group',
      fields: [
        {
          name: 'latitude',
          type: 'number',
        },
        {
          name: 'longitude',
          type: 'number',
        },
      ],
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'sortOrder',
      type: 'number',
      admin: {
        description: 'Display order in pickup selector',
      },
    },
  ],
  timestamps: true,
}
