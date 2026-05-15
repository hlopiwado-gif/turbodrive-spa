import type { GlobalConfig } from 'payload'

export const ServicesPage: GlobalConfig = {
  slug: 'services-page',
  label: 'Services Page',
  admin: {
    group: 'Pages',
    description: 'Manage the standalone Services page content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'pageTitle',
      type: 'text',
      label: 'Page Title',
      defaultValue: 'Our Services',
    },
    {
      name: 'pageSubtitle',
      type: 'textarea',
      label: 'Page Subtitle',
      defaultValue: 'Explore our complete range of professional mobile detailing services.',
    },
  ],
}
