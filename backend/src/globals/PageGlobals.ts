import type { Field, GlobalConfig } from 'payload'

import { authenticated } from '../access'
import { SiteContent } from './SiteContent'

type NamedField = { name?: string; fields?: Field[] }

const sourceFields = SiteContent.fields as NamedField[]

function fieldsFor(name: string): Field[] {
  const field = sourceFields.find((item) => item.name === name)
  return field?.fields ?? []
}

function nestedFields(parentName: string, childName: string): Field[] {
  const parent = sourceFields.find((item) => item.name === parentName)
  const child = (parent?.fields as NamedField[] | undefined)?.find((item) => item.name === childName)
  return child?.fields ?? []
}

function pageGlobal(slug: string, label: string, livePath: string, fields: Field[]): GlobalConfig {
  return {
    slug,
    label,
    admin: {
      group: 'Pages',
      components: {
        elements: {
          beforeDocumentControls: [
            {
              path: '@/components/LivePageLink',
              serverProps: { livePath },
            },
          ],
        },
      },
    },
    access: {
      read: () => true,
      update: authenticated,
    },
    versions: {
      max: 4,
    },
    fields,
  }
}

export const PageGlobals: GlobalConfig[] = [
  pageGlobal('home-page', 'Home page', '/', fieldsFor('home')),
  pageGlobal('about-page', 'About page', '/about', fieldsFor('about')),
  pageGlobal('contact-page', 'Contact page', '/contact', fieldsFor('contact')),
  pageGlobal('donations-page', 'Donations page', '/donations', fieldsFor('donations')),
  pageGlobal('donation-annadanam-page', 'Donations – Annadanam', '/donations/annadanam', nestedFields('donationPages', 'annadanam')),
  pageGlobal('donation-ehundi-page', 'Donations – E-Hundi', '/donations/e-hundi', nestedFields('donationPages', 'ehundi')),
  pageGlobal('donation-goshala-page', 'Donations – Go Shala', '/donations/goshala', nestedFields('donationPages', 'goshala')),
  pageGlobal('newsletter-page', 'Newsletter page', '/newsletter', fieldsFor('newsletter')),
  pageGlobal('news-page', 'News page', '/news', fieldsFor('news')),
  pageGlobal('overview-page', 'Overview page', '/overview', fieldsFor('overview')),
  pageGlobal('photos-page', 'Photo gallery page', '/gallery/photos', fieldsFor('photos')),
  pageGlobal('privacy-page', 'Privacy policy', '/privacy', fieldsFor('privacy')),
  pageGlobal('story-page', 'Story page', '/story', fieldsFor('story')),
  pageGlobal('trustees-page', 'Trustees page', '/trustees', fieldsFor('trustees')),
  pageGlobal('vasavi-dham-page', 'Vasavi Dham page', '/vasavi-dham', fieldsFor('vasaviDham')),
]
