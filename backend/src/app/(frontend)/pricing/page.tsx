import { getPayload } from 'payload'
import config from '@payload-config'
import Pricing from '../components/Pricing'

export const dynamic = 'force-dynamic'

export default async function PricingPage() {
  const payload = await getPayload({ config })
  const data = await payload.findGlobal({ slug: 'pricing-page' })

  const pricing = {
    sectionTag: data.sectionTag || 'Pricing Plans',
    sectionTitle: data.sectionTitle || 'Transparent',
    sectionTitleHighlight: data.sectionTitleHighlight || 'Pricing',
    subtitle:
      data.pageSubtitle ||
      'No hidden fees. Choose the package that fits your needs and budget. Every plan includes our satisfaction guarantee.',
    showPrices: data.showPrices ?? false,
    currency: data.currency || '₹',
    plans:
      data.plans?.map((p) => ({
        name: p.name,
        price: p.price,
        description: p.description || '',
        popular: p.popular || false,
        cta: p.ctaText || 'Book Now',
        features: p.features?.map((f) => f.feature) || [],
      })) || [],
  }

  return <Pricing data={pricing} />
}
