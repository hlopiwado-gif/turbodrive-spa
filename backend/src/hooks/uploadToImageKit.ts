import type { CollectionAfterChangeHook } from 'payload'
import { getImageKit } from '../lib/imagekit'

/**
 * After a Media document is created or updated, upload the file to ImageKit
 * and store the ImageKit URL back on the document.
 *
 * On Vercel (serverless), local file system is ephemeral, so we read the file
 * from Payload's own served URL instead of the local disk.
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
    // Fetch the file from Payload's own media endpoint
    // This works both locally and on Vercel
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'

    const fileUrl = `${baseUrl}/api/media/file/${filename}`

    const response = await ik.files.upload({
      file: fileUrl,
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

    return {
      ...doc,
      imagekitUrl,
      imagekitFileId,
    }
  } catch (error) {
    console.error('[ImageKit] Upload failed:', error)
    return doc
  }
}
