import ImageKit from '@imagekit/nodejs'

// Initialize ImageKit only if credentials are present
const publicKey = process.env.IMAGEKIT_PUBLIC_KEY || ''
const privateKey = process.env.IMAGEKIT_PRIVATE_KEY || ''
const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT || ''

let imagekit: InstanceType<typeof ImageKit> | null = null

export function getImageKit() {
  if (!publicKey || !privateKey || !urlEndpoint) {
    console.warn('[ImageKit] Missing credentials — uploads will be skipped')
    return null
  }

  if (!imagekit) {
    imagekit = new ImageKit({
      publicKey,
      privateKey,
      urlEndpoint,
    })
  }

  return imagekit
}

export { urlEndpoint as imagekitUrlEndpoint }
