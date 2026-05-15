import { getPayload } from 'payload'
import config from '@payload-config'
import Services from '../components/Services'

export const dynamic = 'force-dynamic'

export default async function ServicesPage() {
  const payload = await getPayload({ config })
  const pageData = await payload.findGlobal({ slug: 'services-page' })

  return (
    <Services
      pageTitle={pageData.pageTitle || 'Our Services'}
      pageSubtitle={pageData.pageSubtitle || ''}
    />
  )
}
