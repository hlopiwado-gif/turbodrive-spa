import type { CollectionConfig } from 'payload'
import { uploadToImageKit } from '../hooks/uploadToImageKit'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'Config',
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      async (args) => {
        // Skip if this update was triggered by the hook itself
        if (args.context?.skipImageKitUpload) return args.doc
        return uploadToImageKit(args)
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'imagekitUrl',
      type: 'text',
      label: 'ImageKit CDN URL',
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Auto-generated after upload',
      },
    },
    {
      name: 'imagekitFileId',
      type: 'text',
      label: 'ImageKit File ID',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
  ],
  upload: true,
}
