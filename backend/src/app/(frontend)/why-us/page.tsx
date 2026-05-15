import { getPayload } from 'payload'
import config from '@payload-config'
import WhyUs from '../components/WhyUs'
import type { Media } from '../../../payload-types'

export const dynamic = 'force-dynamic'

export default async function WhyUsPage() {
  const payload = await getPayload({ config })
  const data = await payload.findGlobal({ slug: 'why-us-page' })

  const whyUs = {
    sectionTag: data.sectionTag || 'Why Choose Us',
    sectionTitle: data.sectionTitle || 'Why Customers',
    sectionTitleHighlight: data.sectionTitleHighlight || 'Trust Us',
    subtitle:
      data.subtitle ||
      'We go above and beyond to deliver the best detailing experience with certified products and professional-grade equipment.',
    reasons:
      data.reasons?.map((r, i) => {
        const img = r.image as Media | null
        return {
          title: r.title,
          description: r.description,
          imageUrl: img?.url || `/deign${i + 1}.png`,
        }
      }) || [],
  }

  return <WhyUs data={whyUs} />
}
