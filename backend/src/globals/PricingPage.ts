import type { GlobalConfig } from 'payload'

export const PricingPage: GlobalConfig = {
  slug: 'pricing-page',
  label: 'Pricing Page',
  admin: {
    group: 'Pages',
    description: 'Manage the standalone Pricing page content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'pageTitle',
      type: 'text',
      label: 'Page Title',
      defaultValue: 'Our Pricing Plans',
    },
    {
      name: 'pageSubtitle',
      type: 'textarea',
      label: 'Page Subtitle',
      defaultValue:
        'No hidden fees. Choose the package that fits your needs and budget. Every plan includes our satisfaction guarantee.',
    },
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
