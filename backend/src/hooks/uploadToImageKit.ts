import type { CollectionAfterChangeHook } from 'payload'
import { getImageKit } from '../lib/imagekit'
import fs from 'fs'
import path from 'path'

/**
 * After a Media document is created or updated, upload the file to ImageKit
 * and store the ImageKit URL back on the document.
 */
export const uploadToImageKit: CollectionAfterChangeHook = async ({
  doc,
  req,
  operation,
}) => {
  // Skip if triggered by our own update (prevent infinite loop)
  if (req.context?.skipImageKitUpload) return doc

  const ik = getImageKit()
  if (!ik) return doc

  // Only process on create or if there's no imagekit URL yet
  if (doc.imagekitUrl && operation === 'update') return doc

  const filename = doc.filename
  if (!filename) return doc

  try {
    let fileInput: string | fs.ReadStream

    // Try local file first (works in dev), fall back to URL (works on Vercel)
    const localPath = path.resolve(process.cwd(), 'media', filename)
    if (fs.existsSync(localPath)) {
      fileInput = fs.createReadStream(localPath)
    } else {
      // Build the URL to fetch from Payload's own endpoint
      const serverUrl =
        process.env.NEXT_PUBLIC_SERVER_URL ||
        (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
        'http://localhost:3000'

      fileInput = `${serverUrl}/api/media/file/${filename}`
    }

    const response = await ik.files.upload({
      file: fileInput,
      fileName: filename,
      folder: '/turbo-drive-spa',
      useUniqueFileName: true,
    })

    const imagekitUrl = response.url
    const imagekitFileId = response.fileId

    // Update the document with the ImageKit URL
    await req.payload.update({
      collection: 'media',
      id: doc.id,
      data: {
        imagekitUrl,
        imagekitFileId,
      },
      context: { skipImageKitUpload: true },
    })

    console.log(`[ImageKit] Uploaded: ${filename} → ${imagekitUrl}`)
  } catch (error) {
    console.error('[ImageKit] Upload failed:', error)
  }

  return doc
}
