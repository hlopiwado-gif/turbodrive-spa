import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Collections
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Bookings } from './collections/Bookings'
import { Services } from './collections/Services'
import { Pages } from './collections/Pages'

// Globals — Pages
import { Homepage } from './globals/Homepage'
import { PricingPage } from './globals/PricingPage'
import { TestimonialsPage } from './globals/TestimonialsPage'
import { WhyUsPage } from './globals/WhyUsPage'
import { ServicesPage } from './globals/ServicesPage'

// Globals — Config
import { Branding } from './globals/Branding'
import { FooterSection } from './globals/FooterSection'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' | Turbo Drive & Spa Admin',
      icons: [{ url: '/logo.png' }],
      openGraph: {
        images: [{ url: '/logo.png' }],
      },
    },
    components: {},
  },
  // Workspace items first, then Config items
  collections: [Pages, Bookings, Services, Users, Media],
  globals: [
    // Pages group
    Homepage,
    PricingPage,
    TestimonialsPage,
    WhyUsPage,
    ServicesPage,
    // Config group
    Branding,
    FooterSection,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [],
})
