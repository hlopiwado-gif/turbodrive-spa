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

        try {
          const { readFileSync, existsSync } = await import('fs')
          const { resolve, join } = await import('path')
          const { ImageKit } = await import('@imagekit/nodejs')

          const privateKey = process.env.IMAGEKIT_PRIVATE_KEY
          if (!privateKey) {
            console.warn('[ImageKit] No private key set — skipping CDN upload')
            return doc
          }

          const ik = new ImageKit({ privateKey })

          // Read the file directly from disk as base64 — it was just written by Payload
          const staticDir = resolve(process.cwd(), 'media')
          const filePath = join(staticDir, filename)

          let fileData: string

          if (existsSync(filePath)) {
            // Convert file to base64 data URI (ImageKit accepts this)
            const buffer = readFileSync(filePath)
            fileData = buffer.toString('base64')
            console.log(`[ImageKit] Reading local file: ${filePath}`)
          } else {
            // Fallback: pass the URL for ImageKit to fetch
            const baseUrl =
              process.env.NEXT_PUBLIC_SERVER_URL ||
              (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
              `http://localhost:${process.env.PORT || 3000}`
            fileData = `${baseUrl}/api/media/file/${filename}`
            console.log(`[ImageKit] Fetching from URL: ${fileData}`)
          }

          const response = await ik.files.upload({
            file: fileData,
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
