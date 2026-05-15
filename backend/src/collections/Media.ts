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

        // Run ImageKit upload in background — don't block the response
        uploadToImageKit(args).catch((err: unknown) => {
          console.error('[ImageKit] Background upload failed:', err)
        })

        return args.doc
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
