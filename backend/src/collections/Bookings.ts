import type { CollectionConfig } from 'payload'

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  labels: {
    singular: 'Booking',
    plural: 'Bookings',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'date', 'time', 'status'],
    group: 'Workspace',
  },
  access: {
    read: () => true,
    create: () => true, // Allow public submissions
    update: ({ req: { user } }) => !!user, // Only admins can update
    delete: ({ req: { user } }) => !!user, // Only admins can delete
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'service',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'serviceName',
          type: 'text',
        }
      ],
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'time',
      type: 'text',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
