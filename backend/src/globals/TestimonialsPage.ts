import type { GlobalConfig } from 'payload'

export const TestimonialsPage: GlobalConfig = {
  slug: 'testimonials-page',
  label: 'Testimonials Page',
  admin: {
    group: 'Pages',
    description: 'Manage the standalone Testimonials page content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'pageTitle',
      type: 'text',
      label: 'Page Title',
      defaultValue: 'Customer Testimonials',
    },
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'What our customers have to say',
    },
    {
      name: 'testimonials',
      type: 'array',
      label: 'Testimonials',
      maxRows: 12,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Review Title',
        },
        {
          name: 'text',
          type: 'textarea',
          required: true,
          label: 'Review Text',
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Customer Name',
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
          label: 'Customer Avatar',
        },
        {
          name: 'rating',
          type: 'number',
          label: 'Star Rating (1-5)',
          min: 1,
          max: 5,
          defaultValue: 5,
        },
      ],
    },
  ],
}
