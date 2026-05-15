import type { GlobalConfig } from 'payload'

export const FooterSection: GlobalConfig = {
  slug: 'footer-section',
  label: 'Footer',
  admin: {
    group: 'Config',
    description: 'Manage footer content, links, and social media',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'ctaTitle',
      type: 'text',
      label: 'CTA Title',
      defaultValue: 'Ready to make your car shine?',
    },
    {
      name: 'ctaText',
      type: 'text',
      label: 'CTA Description',
      defaultValue: 'Book your mobile detailing appointment today and experience the difference.',
    },
    {
      name: 'brandDescription',
      type: 'textarea',
      label: 'Brand Description',
      defaultValue: 'Premium mobile detailing & car wash services in Salt Lake City and Northern Utah.',
    },
    {
      name: 'socialLinks',
      type: 'group',
      label: 'Social Media Links',
      fields: [
        { name: 'instagram', type: 'text', label: 'Instagram URL' },
        { name: 'facebook', type: 'text', label: 'Facebook URL' },
        { name: 'twitter', type: 'text', label: 'Twitter/X URL' },
        { name: 'youtube', type: 'text', label: 'YouTube URL' },
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      label: 'Copyright Text',
      defaultValue: 'Turbo Drive & Spa. All rights reserved.',
    },
  ],
}
