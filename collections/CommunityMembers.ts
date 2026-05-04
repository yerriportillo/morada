import type { CollectionConfig } from 'payload'
import { requireBothLanguages } from '../lib/validation'

export const CommunityMembers: CollectionConfig = {
  slug: 'community-members',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'operator', 'role', 'active'],
    group: 'Content',
    description: 'Manage community member profiles and first-person stories',
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
        description: 'Must be a Comunidades-type operator',
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      localized: true,
      validate: requireBothLanguages,
      admin: {
        description: 'e.g., "Lead guide", "Artisan weaver" (required in both languages)',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'story',
      type: 'textarea',
      localized: true,
      maxLength: 300,
      validate: requireBothLanguages,
      admin: {
        description: 'First-person story (max 300 words, required in both languages)',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'sortOrder',
      type: 'number',
    },
  ],
  timestamps: true,
}
