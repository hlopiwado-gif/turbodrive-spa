import type { GlobalConfig } from 'payload'

export const HeroSection: GlobalConfig = {
  slug: 'hero-section',
  label: 'Hero Section',
  admin: {
    group: 'Homepage',
    description: 'Configure the main hero banner on the homepage',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'badge',
      type: 'text',
      label: 'Badge Text',
      defaultValue: '#1 Rated Mobile Detailing Service',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Headline',
      defaultValue: 'Turbo Drive',
    },
    {
      name: 'titleHighlight',
      type: 'text',
      label: 'Headline Highlight (colored text)',
      defaultValue: '& Spa',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue: "Northern Utah's best choice for convenient auto detailing services brought to your residence or workplace. Our team employs state-of-the-art techniques, premium tools, and eco-friendly cleaning products to ensure the impeccable upkeep and protection of your vehicle.",
    },
    {
      name: 'features',
      type: 'array',
      label: 'Feature Badges',
      maxRows: 5,
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
      defaultValue: [
        { text: 'Eco-Friendly Products' },
        { text: 'We Come To You' },
        { text: '100% Satisfaction' },
      ],
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero Image',
    },
    {
      name: 'customerCount',
      type: 'text',
      label: 'Happy Customers Count',
      defaultValue: '2,500+',
    },
    {
      name: 'rating',
      type: 'text',
      label: 'Rating Text',
      defaultValue: '4.9 / 5.0 Rating',
    },
    {
      name: 'yearsExperience',
      type: 'text',
      label: 'Years Experience',
      defaultValue: '10+',
    },
  ],
}
