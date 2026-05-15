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
  const ik = getImageKit()
  if (!ik) return doc

  // Only process on create or if there's no imagekit URL yet
  if (doc.imagekitUrl && operation === 'update') return doc

  // Resolve the local file path
  const filename = doc.filename
  if (!filename) return doc

  const staticDir = path.resolve(process.cwd(), 'media')
  const filePath = path.join(staticDir, filename)

  // Check if local file exists
  if (!fs.existsSync(filePath)) {
    console.warn(`[ImageKit] Local file not found: ${filePath}`)
    return doc
  }

  try {
    const response = await ik.files.upload({
      file: fs.createReadStream(filePath),
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
      // Prevent infinite loop
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
