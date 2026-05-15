import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Page',
    plural: 'All Pages',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
    group: 'Workspace',
    description: 'Manage all pages on the website',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Page Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: {
        description: 'The URL path for this page (e.g., "about-us", "contact")',
      },
    },
    {
      name: 'metaTitle',
      type: 'text',
      label: 'SEO Title',
      admin: {
        description: 'Overrides the page title in search results',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'SEO Description',
      admin: {
        description: 'Description shown in search engine results',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Page Hero Image',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Page Content',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      defaultValue: 'draft',
      options: [
        { label: '🟢 Live', value: 'published' },
        { label: '🟡 Draft', value: 'draft' },
        { label: '🔵 In Review', value: 'in-review' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'showInNavigation',
      type: 'checkbox',
      label: 'Show in Navigation',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'navigationOrder',
      type: 'number',
      label: 'Navigation Order',
      admin: {
        position: 'sidebar',
        condition: (data) => data?.showInNavigation,
      },
    },
  ],
}
