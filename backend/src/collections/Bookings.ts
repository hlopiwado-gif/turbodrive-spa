import type { CollectionConfig } from 'payload'

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'date', 'time', 'status'],
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
      admin: {
        components: {
          RowLabel: ({ data }) => {
            return data?.serviceName || 'Service'
          },
        },
      },
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
