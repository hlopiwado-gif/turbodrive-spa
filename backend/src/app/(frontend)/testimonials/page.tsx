import { getPayload } from 'payload'
import config from '@payload-config'
import Testimonials from '../components/Testimonials'
import type { Media } from '../../../payload-types'

export const dynamic = 'force-dynamic'

export default async function TestimonialsPage() {
  const payload = await getPayload({ config })
  const data = await payload.findGlobal({ slug: 'testimonials-page' })

  const testimonials = {
    sectionTitle: data.sectionTitle || 'What our customers have to say',
    testimonials:
      data.testimonials?.map((t) => {
        const avatar = t.avatar as Media | null
        return {
          title: t.title,
          text: t.text,
          name: t.name,
          avatar:
            avatar?.url ||
            `https://i.pravatar.cc/150?u=${t.name.toLowerCase().replace(/\s/g, '')}`,
          rating: t.rating || 5,
        }
      }) || [],
  }

  return <Testimonials data={testimonials} />
}
