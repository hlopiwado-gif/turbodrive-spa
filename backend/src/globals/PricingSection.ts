import type { GlobalConfig } from 'payload'

export const PricingSection: GlobalConfig = {
  slug: 'pricing-section',
  label: 'Pricing Plans',
  admin: {
    group: 'Homepage',
    description: 'Manage pricing plans and packages',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'sectionTag',
      type: 'text',
      label: 'Section Tag',
      defaultValue: 'Pricing Plans',
    },
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'Transparent',
    },
    {
      name: 'sectionTitleHighlight',
      type: 'text',
      label: 'Title Highlight',
      defaultValue: 'Pricing',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      defaultValue: 'No hidden fees. Choose the package that fits your needs and budget. Every plan includes our satisfaction guarantee.',
    },
    {
      name: 'showPrices',
      type: 'checkbox',
      label: 'Show Prices',
      defaultValue: false,
      admin: {
        description: 'Toggle price visibility on the frontend',
      },
    },
    {
      name: 'currency',
      type: 'text',
      label: 'Currency Symbol',
      defaultValue: '₹',
    },
    {
      name: 'plans',
      type: 'array',
      label: 'Plans',
      maxRows: 6,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
        },
        {
          name: 'popular',
          type: 'checkbox',
          label: 'Mark as Popular',
          defaultValue: false,
        },
        {
          name: 'ctaText',
          type: 'text',
          label: 'Button Text',
          defaultValue: 'Book Now',
        },
        {
          name: 'features',
          type: 'array',
          label: 'Features',
          fields: [
            {
              name: 'feature',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
