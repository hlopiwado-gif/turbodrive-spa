import type { GlobalConfig } from 'payload'

export const Branding: GlobalConfig = {
  slug: 'branding',
  label: 'Branding',
  admin: {
    group: 'Config',
    description: 'Configure site branding, logos, and global appearance',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      label: 'Site Name',
      defaultValue: 'Turbo Drive & Spa',
    },
    {
      name: 'siteTagline',
      type: 'text',
      label: 'Tagline',
      defaultValue: 'Premium Mobile Detailing',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Site Logo',
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
      label: 'Favicon',
    },
    {
      name: 'primaryColor',
      type: 'text',
      label: 'Primary Color (Hex)',
      defaultValue: '#FFD600',
      admin: {
        description: 'Main brand color used across the site',
      },
    },
    {
      name: 'contactPhone',
      type: 'text',
      label: 'Contact Phone',
    },
    {
      name: 'contactEmail',
      type: 'text',
      label: 'Contact Email',
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Business Address',
    },
  ],
}
