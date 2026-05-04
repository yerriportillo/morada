import type { CollectionConfig } from 'payload'
import { validateSlug } from '../lib/validation'

export const SurfSpots: CollectionConfig = {
  slug: 'surf-spots',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'region', 'breakType', 'skillLevel'],
    group: 'Content',
    description: 'Manage surf spot directory (8 El Salvador surf breaks)',
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'platform-admin',
    update: ({ req }) => req.user?.role === 'platform-admin',
    delete: ({ req }) => req.user?.role === 'platform-admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      validate: validateSlug,
    },
    {
      name: 'region',
      type: 'select',
      required: true,
      options: [
        { label: 'La Libertad (Central)', value: 'la_libertad' },
        { label: 'Eastern', value: 'eastern' },
        { label: 'Western', value: 'western' },
      ],
    },
    {
      name: 'breakType',
      type: 'select',
      required: true,
      options: [
        { label: 'Point Break', value: 'point' },
        { label: 'Beach Break', value: 'beach' },
        { label: 'Reef Break', value: 'reef' },
        { label: 'River Mouth', value: 'river_mouth' },
      ],
    },
    {
      name: 'skillLevel',
      type: 'select',
      required: true,
      options: [
        { label: 'Beginner', value: 'beginner' },
        { label: 'Intermediate', value: 'intermediate' },
        { label: 'Advanced', value: 'advanced' },
        { label: 'All Levels', value: 'all' },
      ],
    },
    {
      name: 'bestSeason',
      type: 'text',
      admin: {
        description: 'e.g., "March–October"',
      },
    },
    {
      name: 'bestTide',
      type: 'select',
      options: [
        { label: 'Low', value: 'low' },
        { label: 'Mid', value: 'mid' },
        { label: 'High', value: 'high' },
        { label: 'All Tides', value: 'all' },
      ],
    },
    {
      name: 'crowdRating',
      type: 'number',
      min: 1,
      max: 5,
      admin: {
        description: 'Crowd factor (1 = uncrowded, 5 = very crowded)',
      },
    },
    {
      name: 'location',
      type: 'group',
      fields: [
        {
          name: 'latitude',
          type: 'number',
          required: true,
        },
        {
          name: 'longitude',
          type: 'number',
          required: true,
        },
      ],
    },
    {
      name: 'surflineSpotId',
      type: 'text',
      admin: {
        description: 'Surfline spot ID (for Phase 2 swell forecast widget)',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'General notes about the break',
      },
    },
  ],
  timestamps: true,
}
