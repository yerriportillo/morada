import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    description: 'Manage platform users and operator accounts',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'operator',
      options: [
        {
          label: 'Platform Admin',
          value: 'platform-admin',
        },
        {
          label: 'Operator',
          value: 'operator',
        },
      ],
    },
  ],
}
