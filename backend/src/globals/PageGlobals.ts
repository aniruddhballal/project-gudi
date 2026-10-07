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

function pageGlobal(slug: string, label: string, fields: Field[]): GlobalConfig {
  return {
    slug,
    label,
    admin: {
      group: 'Pages',
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
  pageGlobal('home-page', 'Home page', fieldsFor('home')),
  pageGlobal('about-page', 'About page', fieldsFor('about')),
  pageGlobal('contact-page', 'Contact page', fieldsFor('contact')),
  pageGlobal('donations-page', 'Donations page', fieldsFor('donations')),
  pageGlobal('donation-annadanam-page', 'Donations – Annadanam', nestedFields('donationPages', 'annadanam')),
  pageGlobal('donation-ehundi-page', 'Donations – E-Hundi', nestedFields('donationPages', 'ehundi')),
  pageGlobal('donation-goshala-page', 'Donations – Go Shala', nestedFields('donationPages', 'goshala')),
  pageGlobal('newsletter-page', 'Newsletter page', fieldsFor('newsletter')),
  pageGlobal('news-page', 'News page', fieldsFor('news')),
  pageGlobal('overview-page', 'Overview page', fieldsFor('overview')),
  pageGlobal('photos-page', 'Photo gallery page', fieldsFor('photos')),
  pageGlobal('privacy-page', 'Privacy policy', fieldsFor('privacy')),
  pageGlobal('story-page', 'Story page', fieldsFor('story')),
  pageGlobal('trustees-page', 'Trustees page', fieldsFor('trustees')),
  pageGlobal('vasavi-dham-page', 'Vasavi Dham page', fieldsFor('vasaviDham')),
]
