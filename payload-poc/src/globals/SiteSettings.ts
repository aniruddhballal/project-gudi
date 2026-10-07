import type { GlobalConfig } from 'payload'

import { authenticated } from '../access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site settings',
  access: {
    read: () => true,
    update: authenticated,
  },
  versions: {
    max: 4,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'siteTitle',
      type: 'text',
      required: true,
    },
    {
      name: 'location',
      type: 'textarea',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'mapEmbed',
      type: 'textarea',
      required: true,
    },
  ],
}
