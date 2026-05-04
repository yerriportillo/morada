import type { CollectionConfig } from 'payload'

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  admin: {
    useAsTitle: 'guestName',
    defaultColumns: ['guestName', 'operator', 'startDate', 'bookingStatus', 'paymentStatus'],
    group: 'Core Business',
    description: 'Manage customer bookings and track diaspora visitors (regresoVisitor flag)',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: ({ req }) => req.user?.role === 'platform-admin',
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
      name: 'bookableItem',
      type: 'relationship',
      relationTo: 'bookable-items',
      required: true,
      hasMany: false,
    },
    {
      name: 'calBookingUid',
      type: 'text',
      unique: true,
      admin: {
        description: 'Cal.com booking UID',
      },
    },
    {
      name: 'calEventTypeId',
      type: 'text',
    },
    // Guest Information
    {
      name: 'guestName',
      type: 'text',
      required: true,
    },
    {
      name: 'guestEmail',
      type: 'email',
      required: true,
    },
    {
      name: 'guestWhatsapp',
      type: 'text',
      admin: {
        description: 'E.164 format',
      },
    },
    {
      name: 'guestCountry',
      type: 'text',
      admin: {
        description: 'ISO 3166-1 alpha-2',
      },
    },
    {
      name: 'guestLanguage',
      type: 'select',
      options: [
        { label: 'Español', value: 'es' },
        { label: 'English', value: 'en' },
      ],
      defaultValue: 'es',
    },
    // REGRESO TRACKING - Critical for diaspora analytics
    {
      name: 'regresoVisitor',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Set to true if booking originated from /regreso landing page',
      },
    },
    // Booking Details
    {
      name: 'startDate',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      type: 'date',
    },
    {
      name: 'numGuests',
      type: 'number',
      defaultValue: 1,
      min: 1,
    },
    // Pricing
    {
      name: 'pricing',
      type: 'group',
      fields: [
        {
          name: 'subtotalUsd',
          type: 'number',
          required: true,
        },
        {
          name: 'depositUsd',
          type: 'number',
          required: true,
        },
        {
          name: 'tipUsd',
          type: 'number',
          defaultValue: 0,
        },
      ],
    },
    // Payment Status
    {
      name: 'paymentStatus',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Deposit Paid', value: 'deposit_paid' },
        { label: 'Paid in Full', value: 'paid_in_full' },
        { label: 'Pending', value: 'pending' },
        { label: 'Refunded', value: 'refunded' },
        { label: 'Failed', value: 'failed' },
      ],
    },
    {
      name: 'paymentIds',
      type: 'group',
      fields: [
        {
          name: 'stripePaymentId',
          type: 'text',
        },
        {
          name: 'paypalPaymentId',
          type: 'text',
        },
        {
          name: 'btcPaymentId',
          type: 'text',
        },
      ],
    },
    // Booking Status
    {
      name: 'bookingStatus',
      type: 'select',
      required: true,
      defaultValue: 'confirmed',
      options: [
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Pending Review', value: 'pending_review' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Completed', value: 'completed' },
        { label: 'No Show', value: 'no_show' },
      ],
    },
    // Notification Tracking
    {
      name: 'notifications',
      type: 'group',
      fields: [
        {
          name: 'confirmationEmailSentAt',
          type: 'date',
        },
        {
          name: 'confirmationWhatsappSentAt',
          type: 'date',
        },
        {
          name: 'preArrivalSentAt',
          type: 'date',
        },
        {
          name: 'balanceReminderSentAt',
          type: 'date',
        },
        {
          name: 'reviewRequestSentAt',
          type: 'date',
        },
      ],
    },
  ],
  timestamps: true,
}
