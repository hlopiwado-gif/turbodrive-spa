import { getPayload } from 'payload'
import config from '@payload-config'
import Hero from './components/Hero'
import OurServices from './components/OurServices'
import WhyUs from './components/WhyUs'
import Services from './components/Services'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import type { Media } from '../../payload-types'
import { getMediaUrl, getMediaAlt } from './utils/media'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayload({ config })

  // Fetch the single Homepage global (all sections in one)
  const data = await payload.findGlobal({ slug: 'homepage' })

  // ─── Hero ────────────────────────────────────────────
  const heroImage = data.heroImage as Media | null
  const hero = {
    badge: data.heroBadge || '#1 Rated Mobile Detailing Service',
    title: data.heroTitle || 'Turbo Drive',
    titleHighlight: data.heroTitleHighlight || '& Spa',
    description:
      data.heroDescription ||
      "Northern Utah's best choice for convenient auto detailing services brought to your residence or workplace. Our team employs state-of-the-art techniques, premium tools, and eco-friendly cleaning products to ensure the impeccable upkeep and protection of your vehicle.",
    features: data.heroFeatures?.map((f) => f.text) || [
      'Eco-Friendly Products',
      'We Come To You',
      '100% Satisfaction',
    ],
    heroImageUrl: getMediaUrl(heroImage),
    customerCount: data.heroCustomerCount || '2,500+',
    rating: data.heroRating || '4.9 / 5.0 Rating',
    yearsExperience: data.heroYearsExperience || '10+',
  }

  // ─── Why Choose Us ───────────────────────────────────
  const whyUs = {
    sectionTag: data.whySectionTag || 'Why Choose Us',
    sectionTitle: data.whySectionTitle || 'Why Customers',
    sectionTitleHighlight: data.whySectionTitleHighlight || 'Trust Us',
    subtitle:
      data.whySubtitle ||
      'We go above and beyond to deliver the best detailing experience with certified products and professional-grade equipment.',
    reasons:
      data.whyReasons?.map((r, i) => {
        const img = r.image as Media | null
        return {
          title: r.title,
          description: r.description,
          imageUrl: getMediaUrl(img, `/deign${i + 1}.png`),
        }
      }) || [],
  }

  // ─── How It Works ────────────────────────────────────
  const howItWorks = {
    title: data.howTitle || 'How it Works',
    steps:
      data.howSteps?.map((s, i) => {
        const img = s.image as Media | null
        return {
          num: s.stepNumber,
          title: s.title,
          description: s.description,
          image: getMediaUrl(img, `/ddesign${i + 1}.png`),
        }
      }) || [],
  }

  // ─── Pricing ─────────────────────────────────────────
  const pricing = {
    sectionTag: data.pricingSectionTag || 'Pricing Plans',
    sectionTitle: data.pricingSectionTitle || 'Transparent',
    sectionTitleHighlight: data.pricingSectionTitleHighlight || 'Pricing',
    subtitle:
      data.pricingSubtitle ||
      'No hidden fees. Choose the package that fits your needs and budget. Every plan includes our satisfaction guarantee.',
    showPrices: data.pricingShowPrices ?? false,
    currency: data.pricingCurrency || '₹',
    plans:
      data.pricingPlans?.map((p) => ({
        name: p.name,
        price: p.price,
        description: p.description || '',
        popular: p.popular || false,
        cta: p.ctaText || 'Book Now',
        features: p.features?.map((f) => f.feature) || [],
      })) || [],
  }

  // ─── Testimonials ────────────────────────────────────
  const testimonials = {
    sectionTitle: data.testimonialsSectionTitle || 'What our customers have to say',
    testimonials:
      data.testimonialsItems?.map((t) => {
        const avatar = t.avatar as Media | null
        return {
          title: t.title,
          text: t.text,
          name: t.name,
          avatar: getMediaUrl(
            avatar,
            `https://i.pravatar.cc/150?u=${t.name.toLowerCase().replace(/\s/g, '')}`
          ),
          rating: t.rating || 5,
        }
      }) || [],
  }

  // ─── Services Carousel ────────────────────────────
  const servicesSection = {
    title: data.servicesTitle || 'All',
    titleHighlight: data.servicesTitleHighlight || 'Services',
    subtitle: data.servicesSubtitle || 'Explore our full range of professional mobile detailing services designed to keep your vehicle in showroom condition.',
    cards: data.serviceCards?.map((card, i) => {
      const img = card.image as Media | null
      return {
        id: card.id || String(i),
        title: card.title,
        description: card.description || '',
        image: {
          url: getMediaUrl(img),
          alt: getMediaAlt(img, card.title),
        },
      }
    }) || [],
  }

  return (
    <>
      <Hero data={hero} />
      <OurServices data={servicesSection} />
      <WhyUs data={whyUs} />
      <Services />
      <HowItWorks data={howItWorks} />
      <Pricing data={pricing} />
      <Testimonials data={testimonials} />
    </>
  )
}
