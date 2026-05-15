import type { CollectionConfig } from 'payload'

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
      async ({ doc, req, operation, context }) => {
        // Skip if triggered by our own update (prevent infinite loop)
        if (context?.skipImageKitUpload) return doc

        // Only process on create
        if (operation !== 'create') return doc

        const filename = doc.filename
        if (!filename) return doc

        // Dynamic import to avoid crashing module loading
        try {
          const { ImageKit } = await import('@imagekit/nodejs')
          const privateKey = process.env.IMAGEKIT_PRIVATE_KEY
          if (!privateKey) return doc

          const ik = new ImageKit({ privateKey })

          // Build URL to fetch the uploaded file
          const baseUrl =
            process.env.NEXT_PUBLIC_SERVER_URL ||
            (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
            `http://localhost:${process.env.PORT || 3000}`

          const fileUrl = `${baseUrl}/api/media/file/${filename}`

          const response = await ik.files.upload({
            file: fileUrl,
            fileName: filename,
            folder: '/turbo-drive-spa',
            useUniqueFileName: true,
          })

          // Save ImageKit URL back to the document
          await req.payload.update({
            collection: 'media',
            id: doc.id,
            data: {
              imagekitUrl: response.url,
              imagekitFileId: response.fileId,
            },
            context: { skipImageKitUpload: true },
          })

          console.log(`[ImageKit] ✓ ${filename} → ${response.url}`)
        } catch (err: unknown) {
          console.error('[ImageKit] Upload failed (non-blocking):', err)
        }

        return doc
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
  upload: {
    staticDir: '../media',
    mimeTypes: ['image/*'],
  },
}
