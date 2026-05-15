import { ImageKit } from '@imagekit/nodejs'

// Initialize ImageKit only if credentials are present
const privateKey = process.env.IMAGEKIT_PRIVATE_KEY || ''
const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT || ''

let imagekit: InstanceType<typeof ImageKit> | null = null

export function getImageKit() {
  if (!privateKey) {
    console.warn('[ImageKit] Missing private key — uploads will be skipped')
    return null
  }

  if (!imagekit) {
    imagekit = new ImageKit({
      privateKey,
    })
  }

  return imagekit
}

export { urlEndpoint as imagekitUrlEndpoint }
