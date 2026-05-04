import type { CollectionConfig } from 'payload'
import path from 'path'
import { requireBothLanguages } from '../lib/validation'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: path.resolve(__dirname, '../media'),
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 576,
        position: 'centre',
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4'],
  },
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['alt', 'operator', 'category', 'updatedAt'],
    group: 'Media',
    description: 'Upload and manage photos, videos, and other media assets',
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
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Hero', value: 'hero' },
        { label: 'Gallery', value: 'gallery' },
        { label: 'Room', value: 'room' },
        { label: 'Activity', value: 'activity' },
        { label: 'Guide/Instructor', value: 'guide' },
        { label: 'Logo', value: 'logo' },
        { label: 'Sustainability', value: 'sustainability' },
        { label: 'Community', value: 'community' },
      ],
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
      validate: requireBothLanguages,
      admin: {
        description: 'Alt text for accessibility (required in both languages)',
      },
    },
    {
      name: 'caption',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'sortOrder',
      type: 'number',
      admin: {
        description: 'Display order (lower = first)',
      },
    },
  ],
  timestamps: true,
}
