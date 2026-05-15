import type { Media } from '../../../payload-types'

/**
 * Resolve the best URL for a media item.
 * Prefers ImageKit CDN URL (works on Vercel), falls back to local Payload URL.
 */
export function getMediaUrl(media: Media | string | null | undefined, fallback = '/car-wash-hero.png'): string {
  if (!media) return fallback
  if (typeof media === 'string') return media

  // Prefer ImageKit CDN URL (persists on Vercel)
  if ((media as any).imagekitUrl) return (media as any).imagekitUrl

  // Fall back to local Payload URL
  return media.url || fallback
}

/**
 * Get alt text from a media item.
 */
export function getMediaAlt(media: Media | string | null | undefined, fallback = ''): string {
  if (!media || typeof media === 'string') return fallback
  return (media as any).alt || fallback
}
