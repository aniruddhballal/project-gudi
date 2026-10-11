import type { GlobalConfig } from 'payload'

import { authenticated } from '../access'

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
  { name: 'date', type: 'text' as const },
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
        { name: 'description', type: 'textarea' },
        {
          name: 'aims',
          label: 'Aims and objectives',
          type: 'array',
          fields: [{ name: 'text', type: 'textarea' }, { name: 'emphasis', type: 'text', label: 'Highlighted phrase' }],
        },
        {
          name: 'heroSlides',
          type: 'array',
          fields: [media('image'), { name: 'href', type: 'text', required: true }, { name: 'title', type: 'text', required: true }, { name: 'description', type: 'textarea' }],
        },
        {
          name: 'president',
          type: 'group',
          fields: [media('image'), textList('kannada', 'Kannada message'), textList('english', 'English message')],
        },
        {
          name: 'majorLinks',
          type: 'array',
          fields: [{ name: 'label', type: 'text', required: true }, { name: 'href', type: 'text', required: true }],
        },
        {
          name: 'event',
          type: 'group',
          fields: [{ name: 'title', type: 'text' }, { name: 'name', type: 'text' }, { name: 'bulletinHref', type: 'text' }],
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
          fields: [{ name: 'title', type: 'textarea' }, { name: 'date', type: 'text' }],
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
          fields: [{ name: 'title', type: 'textarea' }, { name: 'donationHref', type: 'text' }],
        },
        {
          name: 'events',
          type: 'array',
          fields: [media('image'), { name: 'date', type: 'text' }, { name: 'title', type: 'text' }, { name: 'location', type: 'text' }, { name: 'description', type: 'textarea' }],
        },
        {
          name: 'story',
          type: 'group',
          fields: [{ name: 'eyebrow', type: 'text' }, { name: 'title', type: 'text' }, textList('paragraphs')],
        },
        {
          name: 'donation',
          type: 'group',
          fields: [{ name: 'title', type: 'textarea' }, media('image'), { name: 'href', type: 'text' }],
        },
        {
          name: 'map',
          type: 'group',
          fields: [{ name: 'title', type: 'text' }, { name: 'embed', type: 'textarea' }, { name: 'directions', type: 'text' }],
        },
        {
          name: 'videos',
          type: 'array',
          fields: [media('thumbnail'), { name: 'title', type: 'text' }, { name: 'description', type: 'textarea' }, { name: 'youtubeEmbed', type: 'text' }, { name: 'videoSrc', type: 'text' }],
        },
        {
          name: 'news',
          type: 'array',
          fields: [media('image'), { name: 'title', type: 'text' }, { name: 'description', type: 'textarea' }, { name: 'href', type: 'text' }],
        },
        {
          name: 'about',
          type: 'group',
          fields: [{ name: 'title', type: 'text' }, media('image'), { name: 'text', type: 'textarea' }],
        },
      ],
    },
    {
      name: 'photos',
      type: 'group',
      label: 'Photo gallery',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'albums', type: 'array', fields: [{ name: 'title', type: 'text', required: true }, { name: 'photoCount', type: 'number', defaultValue: 0 }],
        },
      ],
    },
    {
      name: 'privacy',
      type: 'group',
      label: 'Privacy policy',
      fields: [{ name: 'title', type: 'text', required: true }, { name: 'intro', type: 'textarea' }, { name: 'sections', type: 'array', fields: [{ name: 'title', type: 'text', required: true }, textList('paragraphs')] }],
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
          fields: [{ name: 'title', type: 'text' }, { name: 'note', type: 'textarea' }, { name: 'href', type: 'text' }],
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
      fields: [{ name: 'title', type: 'text', required: true }, { name: 'patrons', type: 'array', fields: personFields }, { name: 'executive', type: 'array', fields: personFields }],
    },
    {
      name: 'vasaviDham',
      type: 'group',
      label: 'Vasavi Dham page',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'featured', type: 'array', fields: imageTextItemFields },
        { name: 'projects', type: 'array', fields: [media('image'), { name: 'title', type: 'text' }, { name: 'date', type: 'text' }] },
      ],
    },
  ],
}
