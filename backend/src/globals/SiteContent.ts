import type { Field, GlobalConfig } from 'payload'

import { authenticated } from '../access'
import { projectDateFields } from '../fields/editorial'

const textList = (name: string, label?: string) => ({
  name,
  label,
  type: 'array' as const,
  fields: [
    {
      name: 'text',
      type: 'textarea' as const,
    },
  ],
})

const media = (name: string, label?: string) => ({
  name,
  label,
  type: 'upload' as const,
  relationTo: 'media' as const,
})

const imageTextItemFields = [
  media('image', 'Image'),
  { name: 'title', type: 'text' as const },
  { name: 'description', type: 'textarea' as const },
]

const personFields = [
  media('image', 'Portrait'),
  { name: 'name', type: 'text' as const, required: true },
  { name: 'role', type: 'text' as const },
  { name: 'description', type: 'textarea' as const },
]

const projectFields = [
  media('image', 'Image'),
  { name: 'date', label: 'Displayed date (original wording)', type: 'text' as const },
  ...projectDateFields,
  { name: 'title', type: 'text' as const, required: true },
  { name: 'description', type: 'textarea' as const },
]

export const SiteContent: GlobalConfig = {
  slug: 'site-content',
  label: 'Site content',
  admin: {
    hidden: true,
  },
  access: {
    read: () => true,
    update: authenticated,
  },
  versions: {
    max: 4,
  },
  fields: [
    {
      name: 'home',
      type: 'group',
      label: 'Home page',
      fields: [
        { name: 'siteTitle', type: 'text', required: true },
        { name: 'description', label: 'Trust purpose', type: 'textarea' },
        {
          name: 'heroHeading',
          label: 'Homepage headline',
          type: 'text',
          admin: {
            description:
              'Public homepage heading. Does not change the full Trust name or discovery card titles.',
          },
        },
        {
          name: 'aims',
          label: 'Aims and objectives',
          type: 'array',
          fields: [
            { name: 'text', type: 'textarea' },
            { name: 'emphasis', type: 'text', label: 'Highlighted phrase' },
          ],
        },
        {
          name: 'heroSlides',
          label: 'Introduction and discovery cards',
          type: 'array',
          admin: {
            description:
              'The first entry supplies the homepage introduction and its image. Remaining entries appear as discovery cards; these are not rotating slides.',
          },
          fields: [
            media('image'),
            { name: 'href', type: 'text', required: true },
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
          ],
        },
        {
          name: 'president',
          type: 'group',
          fields: [
            media('image'),
            textList('kannada', 'Kannada message'),
            textList('english', 'English message'),
          ],
        },
        {
          name: 'majorLinks',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
          ],
        },
        {
          name: 'event',
          type: 'group',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'name', type: 'text' },
            { name: 'bulletinHref', type: 'text' },
          ],
        },
        { name: 'greatSouls', type: 'array', fields: personFields },
        {
          name: 'gallery',
          type: 'array',
          fields: [media('image'), { name: 'alt', type: 'text' }],
        },
        {
          name: 'contact',
          type: 'array',
          fields: [{ name: 'name', type: 'text' }, textList('lines', 'Address lines')],
        },
        { name: 'email', type: 'email' },
      ],
    },
    {
      name: 'about',
      type: 'group',
      label: 'About page',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'introduction', type: 'textarea' },
        { name: 'underConstruction', type: 'array', fields: imageTextItemFields },
        { name: 'projects', type: 'array', fields: projectFields },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Contact page',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'location', type: 'textarea' },
        { name: 'email', type: 'email' },
        { name: 'phone', type: 'text' },
        { name: 'mapEmbed', type: 'textarea' },
        textList('headOffice', 'Head office address'),
        textList('vasaviDham', 'Vasavi Dham address'),
      ],
    },
    {
      name: 'donations',
      type: 'group',
      label: 'Donations page',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'intro', type: 'textarea' },
        {
          name: 'options',
          type: 'array',
          fields: [
            { name: 'key', type: 'text', required: true },
            media('image'),
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea' },
            { name: 'href', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'donationPages',
      type: 'group',
      label: 'Donation detail pages',
      fields: [
        ...(['annadanam', 'ehundi', 'goshala'] as const).map((name) => ({
          name,
          type: 'group' as const,
          fields: [
            { name: 'title', type: 'text' as const, required: true },
            { name: 'eyebrow', type: 'text' as const },
            media('image'),
            { name: 'formType', type: 'text' as const },
            textList('paragraphs'),
            { name: 'highlight', type: 'textarea' as const },
            { name: 'sectionTitle', type: 'text' as const },
          ],
        })),
      ],
    },
    {
      name: 'newsletter',
      type: 'group',
      label: 'Newsletter page',
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'documents',
          type: 'array',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'category', type: 'text' },
            { name: 'description', type: 'textarea' },
            { name: 'href', type: 'text', required: true },
            { name: 'local', type: 'checkbox' },
          ],
        },
        {
          name: 'announcement',
          type: 'group',
          fields: [
            { name: 'title', type: 'textarea' },
            { name: 'date', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'news',
      type: 'group',
      label: 'News page',
      fields: [{ name: 'title', type: 'text' }],
    },
    {
      name: 'overview',
      type: 'group',
      label: 'Overview page',
      fields: [
        { name: 'title', type: 'text', required: true },
        media('heroImage', 'Activity image'),
        {
          name: 'activity',
          type: 'group',
          fields: [
            { name: 'title', type: 'textarea' },
            { name: 'donationHref', type: 'text' },
          ],
        },
        {
          name: 'events',
          type: 'array',
          fields: [
            media('image'),
            { name: 'date', type: 'text' },
            { name: 'title', type: 'text' },
            { name: 'location', type: 'text' },
            { name: 'description', type: 'textarea' },
          ],
        },
        {
          name: 'story',
          type: 'group',
          fields: [
            { name: 'eyebrow', type: 'text' },
            { name: 'title', type: 'text' },
            textList('paragraphs'),
          ],
        },
        {
          name: 'donation',
          type: 'group',
          fields: [
            { name: 'title', type: 'textarea' },
            media('image'),
            { name: 'href', type: 'text' },
          ],
        },
        {
          name: 'map',
          type: 'group',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'embed', type: 'textarea' },
            { name: 'directions', type: 'text' },
          ],
        },
        {
          name: 'videos',
          type: 'array',
          fields: [
            media('thumbnail'),
            { name: 'title', type: 'text' },
            { name: 'description', type: 'textarea' },
            { name: 'youtubeEmbed', type: 'text' },
            { name: 'videoSrc', type: 'text' },
          ],
        },
        {
          name: 'news',
          type: 'array',
          fields: [
            media('image'),
            { name: 'title', type: 'text' },
            { name: 'description', type: 'textarea' },
            { name: 'href', type: 'text' },
          ],
        },
        {
          name: 'about',
          type: 'group',
          fields: [
            { name: 'title', type: 'text' },
            media('image'),
            { name: 'text', type: 'textarea' },
          ],
        },
      ],
    },
    {
      name: 'photos',
      type: 'group',
      label: 'Photo gallery',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'contentModelVersion', type: 'number', admin: { hidden: true } },
        {
          name: 'albums',
          label: 'Albums and photo cards',
          type: 'array',
          fields: [
            {
              name: 'title',
              type: 'text',
              admin: { description: 'Leave empty for an untitled standalone photo.' },
            },
            media('coverImage', 'Cover photograph'),
            { name: 'coverAlt', label: 'Cover image description', type: 'text' },
            {
              name: 'coverStatus',
              label: 'Cover relationship to this album',
              type: 'select',
              enumName: 'album_cover_status',
              options: [
                {
                  label: 'Illustrative cover, not verified event photography',
                  value: 'illustrative',
                },
                { label: 'Verified album photograph', value: 'verified' },
              ],
            },
            {
              name: 'photos',
              label: 'Actual album photographs',
              type: 'array',
              fields: [
                media('image', 'Photograph'),
                { name: 'alt', label: 'Image description', type: 'text' },
                { name: 'caption', type: 'textarea' },
              ],
              admin: {
                description:
                  'Add only photographs belonging to this album. An illustrative cover does not populate this list.',
              },
            },
            {
              name: 'photoCount',
              label: 'Legacy reported count',
              type: 'number',
              defaultValue: 0,
              admin: {
                readOnly: true,
                description:
                  'Preserved historical count; the website uses the actual photograph list.',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'privacy',
      type: 'group',
      label: 'Privacy policy',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'intro', type: 'textarea' },
        {
          name: 'sections',
          type: 'array',
          fields: [{ name: 'title', type: 'text', required: true }, textList('paragraphs')],
        },
      ],
    },
    {
      name: 'story',
      type: 'group',
      label: 'Story page',
      fields: [
        { name: 'title', type: 'text', required: true },
        media('coverImage'),
        {
          name: 'publication',
          type: 'group',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'note', type: 'textarea' },
            { name: 'href', type: 'text' },
          ],
        },
        textList('introduction'),
        textList('historicEvents', 'Historic events'),
        {
          name: 'narrative',
          type: 'array',
          fields: [media('image'), { name: 'text', type: 'textarea' }],
        },
        { name: 'closing', type: 'textarea' },
      ],
    },
    {
      name: 'trustees',
      type: 'group',
      label: 'Trustees page',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'patrons', type: 'array', fields: personFields },
        { name: 'executive', type: 'array', fields: personFields },
      ],
    },
    {
      name: 'vasaviDham',
      type: 'group',
      label: 'Vasavi Dham page',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'featured', type: 'array', fields: imageTextItemFields },
        {
          name: 'projects',
          label: 'Completed projects timeline',
          type: 'array',
          fields: [
            media('image'),
            { name: 'title', type: 'text' },
            { name: 'date', label: 'Displayed date (original wording)', type: 'text' },
            ...projectDateFields,
          ],
        },
      ],
    },
  ],
}

// Unnamed tabs organise the admin form without changing persisted field paths.
const homeFields = SiteContent.fields.find((field) => 'name' in field && field.name === 'home')
if (homeFields?.type === 'group') {
  const existingFields = homeFields.fields
  const pick = (names: string[]): Field[] =>
    existingFields.filter(
      (field) => 'name' in field && typeof field.name === 'string' && names.includes(field.name),
    )
  homeFields.fields = [
    {
      type: 'tabs',
      tabs: [
        { label: 'Introduction', fields: pick(['siteTitle', 'heroHeading', 'heroSlides']) },
        {
          label: 'Trust and people',
          fields: pick(['description', 'aims', 'president', 'greatSouls']),
        },
        { label: 'Visitor links and contacts', fields: pick(['majorLinks', 'contact', 'email']) },
        { label: 'Photo selection', fields: pick(['gallery']) },
        { label: 'Event and bulletin', fields: pick(['event']) },
      ],
    },
  ]
}
