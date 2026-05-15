import type { GlobalConfig } from 'payload'

export const WhyUsPage: GlobalConfig = {
  slug: 'why-us-page',
  label: 'Why Choose Us Page',
  admin: {
    group: 'Pages',
    description: 'Manage the standalone Why Choose Us page content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'pageTitle',
      type: 'text',
      label: 'Page Title',
      defaultValue: 'Why Choose Us',
    },
    {
      name: 'sectionTag',
      type: 'text',
      label: 'Section Tag',
      defaultValue: 'Why Choose Us',
    },
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'Why Customers',
    },
    {
      name: 'sectionTitleHighlight',
      type: 'text',
      label: 'Title Highlight',
      defaultValue: 'Trust Us',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      defaultValue:
        'We go above and beyond to deliver the best detailing experience with certified products and professional-grade equipment.',
    },
    {
      name: 'reasons',
      type: 'array',
      label: 'Reason Cards',
      maxRows: 8,
      fields: [
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
          label: 'Card Icon/Image',
        },
      ],
    },
  ],
}
