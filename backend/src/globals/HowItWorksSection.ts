import type { GlobalConfig } from 'payload'

export const HowItWorksSection: GlobalConfig = {
  slug: 'how-it-works-section',
  label: 'How It Works',
  admin: {
    group: 'Homepage',
    description: 'Configure the step-by-step process section',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'How it Works',
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Steps',
      maxRows: 6,
      fields: [
        {
          name: 'stepNumber',
          type: 'text',
          label: 'Step Number',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Step Image',
        },
      ],
    },
  ],
}
