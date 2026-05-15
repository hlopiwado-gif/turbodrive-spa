import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  admin: {
    group: 'Pages',
    description: 'Manage all sections of the homepage from one place',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        // ─── Hero Section ──────────────────────────────────
        {
          label: 'Hero Section',
          description: 'Configure the main hero banner on the homepage',
          fields: [
            {
              name: 'heroBadge',
              type: 'text',
              label: 'Badge Text',
              defaultValue: '#1 Rated Mobile Detailing Service',
            },
            {
              name: 'heroTitle',
              type: 'text',
              label: 'Headline',
              defaultValue: 'Turbo Drive',
            },
            {
              name: 'heroTitleHighlight',
              type: 'text',
              label: 'Headline Highlight (colored text)',
              defaultValue: '& Spa',
            },
            {
              name: 'heroDescription',
              type: 'textarea',
              label: 'Description',
              defaultValue:
                "Northern Utah's best choice for convenient auto detailing services brought to your residence or workplace. Our team employs state-of-the-art techniques, premium tools, and eco-friendly cleaning products to ensure the impeccable upkeep and protection of your vehicle.",
            },
            {
              name: 'heroFeatures',
              type: 'array',
              label: 'Feature Badges',
              maxRows: 5,
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                },
              ],
              defaultValue: [
                { text: 'Eco-Friendly Products' },
                { text: 'We Come To You' },
                { text: '100% Satisfaction' },
              ],
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Hero Image',
            },
            {
              name: 'heroCustomerCount',
              type: 'text',
              label: 'Happy Customers Count',
              defaultValue: '2,500+',
            },
            {
              name: 'heroRating',
              type: 'text',
              label: 'Rating Text',
              defaultValue: '4.9 / 5.0 Rating',
            },
            {
              name: 'heroYearsExperience',
              type: 'text',
              label: 'Years Experience',
              defaultValue: '10+',
            },
          ],
        },

        // ─── Services Carousel Section ─────────────────────
        {
          label: 'Services Carousel',
          description: 'Configure the services carousel section headline and subtitle',
          fields: [
            {
              name: 'servicesTitle',
              type: 'text',
              label: 'Section Title',
              defaultValue: 'All Services',
            },
            {
              name: 'servicesTitleHighlight',
              type: 'text',
              label: 'Title Highlight (colored text)',
              defaultValue: 'Services',
              admin: {
                description: 'This part will be highlighted in the accent color',
              },
            },
            {
              name: 'servicesSubtitle',
              type: 'textarea',
              label: 'Section Subtitle',
              defaultValue: 'Explore our full range of professional mobile detailing services designed to keep your vehicle in showroom condition.',
            },
            {
              name: 'serviceCards',
              type: 'array',
              label: 'Service Cards',
              maxRows: 12,
              admin: {
                description: 'Add the cards shown in the carousel. If empty, services from the Services collection will be used instead.',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  label: 'Service Title',
                },
                {
                  name: 'description',
                  type: 'textarea',
                  label: 'Short Description',
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                  label: 'Card Image',
                },
              ],
            },
          ],
        },

        // ─── Why Choose Us Section ─────────────────────────
        {
          label: 'Why Choose Us',
          description: 'Manage the "Why Customers Trust Us" cards',
          fields: [
            {
              name: 'whySectionTag',
              type: 'text',
              label: 'Section Tag',
              defaultValue: 'Why Choose Us',
            },
            {
              name: 'whySectionTitle',
              type: 'text',
              label: 'Section Title',
              defaultValue: 'Why Customers',
            },
            {
              name: 'whySectionTitleHighlight',
              type: 'text',
              label: 'Title Highlight',
              defaultValue: 'Trust Us',
            },
            {
              name: 'whySubtitle',
              type: 'textarea',
              label: 'Subtitle',
              defaultValue:
                'We go above and beyond to deliver the best detailing experience with certified products and professional-grade equipment.',
            },
            {
              name: 'whyReasons',
              type: 'array',
              label: 'Reason Cards',
              maxRows: 8,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Card Icon/Image',
                },
              ],
            },
          ],
        },

        // ─── How It Works Section ──────────────────────────
        {
          label: 'How It Works',
          description: 'Configure the step-by-step process section',
          fields: [
            {
              name: 'howTitle',
              type: 'text',
              label: 'Section Title',
              defaultValue: 'How it Works',
            },
            {
              name: 'howSteps',
              type: 'array',
              label: 'Steps',
              maxRows: 6,
              fields: [
                {
                  name: 'stepNumber',
                  type: 'text',
                  label: 'Step Number',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Step Image',
                },
              ],
            },
          ],
        },

        // ─── Pricing Section ───────────────────────────────
        {
          label: 'Pricing Plans',
          description: 'Manage pricing plans and packages shown on the homepage',
          fields: [
            {
              name: 'pricingSectionTag',
              type: 'text',
              label: 'Section Tag',
              defaultValue: 'Pricing Plans',
            },
            {
              name: 'pricingSectionTitle',
              type: 'text',
              label: 'Section Title',
              defaultValue: 'Transparent',
            },
            {
              name: 'pricingSectionTitleHighlight',
              type: 'text',
              label: 'Title Highlight',
              defaultValue: 'Pricing',
            },
            {
              name: 'pricingSubtitle',
              type: 'textarea',
              label: 'Subtitle',
              defaultValue:
                'No hidden fees. Choose the package that fits your needs and budget. Every plan includes our satisfaction guarantee.',
            },
            {
              name: 'pricingShowPrices',
              type: 'checkbox',
              label: 'Show Prices',
              defaultValue: false,
              admin: {
                description: 'Toggle price visibility on the frontend',
              },
            },
            {
              name: 'pricingCurrency',
              type: 'text',
              label: 'Currency Symbol',
              defaultValue: '₹',
            },
            {
              name: 'pricingPlans',
              type: 'array',
              label: 'Plans',
              maxRows: 6,
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'price',
                  type: 'number',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'text',
                },
                {
                  name: 'popular',
                  type: 'checkbox',
                  label: 'Mark as Popular',
                  defaultValue: false,
                },
                {
                  name: 'ctaText',
                  type: 'text',
                  label: 'Button Text',
                  defaultValue: 'Book Now',
                },
                {
                  name: 'features',
                  type: 'array',
                  label: 'Features',
                  fields: [
                    {
                      name: 'feature',
                      type: 'text',
                      required: true,
                    },
                  ],
                },
              ],
            },
          ],
        },

        // ─── Testimonials Section ──────────────────────────
        {
          label: 'Testimonials',
          description: 'Manage customer testimonials and reviews on the homepage',
          fields: [
            {
              name: 'testimonialsSectionTitle',
              type: 'text',
              label: 'Section Title',
              defaultValue: 'What our customers have to say',
            },
            {
              name: 'testimonialsItems',
              type: 'array',
              label: 'Testimonials',
              maxRows: 12,
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  label: 'Review Title',
                },
                {
                  name: 'text',
                  type: 'textarea',
                  required: true,
                  label: 'Review Text',
                },
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  label: 'Customer Name',
                },
                {
                  name: 'avatar',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Customer Avatar',
                },
                {
                  name: 'rating',
                  type: 'number',
                  label: 'Star Rating (1-5)',
                  min: 1,
                  max: 5,
                  defaultValue: 5,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
