import type { CollectionConfig } from 'payload'
import { requireBothLanguages } from '../lib/validation'

export const ImpactMetrics: CollectionConfig = {
  slug: 'impact-metrics',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'operator', 'value', 'updatedAt'],
    group: 'Content',
    description: 'Track conservation and community impact metrics for operators',
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
      name: 'key',
      type: 'text',
      required: true,
      admin: {
        description: 'Internal identifier (e.g., "guests_hosted", "turtles_released")',
      },
    },
    {
      name: 'label',
      type: 'text',
      required: true,
      localized: true,
      validate: requireBothLanguages,
      admin: {
        description: 'Display label for frontend (required in both languages)',
      },
    },
    {
      name: 'value',
      type: 'number',
      required: true,
      admin: {
        description: 'Current metric value',
      },
    },
    {
      name: 'unit',
      type: 'text',
      admin: {
        description: 'Optional unit (e.g., "trees", "kg CO2")',
      },
    },
    {
      name: 'sinceYear',
      type: 'number',
      admin: {
        description: 'Year tracking started',
      },
    },
  ],
  timestamps: true,
}
