import type { GlobalConfig } from 'payload'

import { authenticated } from '../access'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site settings',
  admin: {
    group: 'Settings',
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
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'siteTitle',
      type: 'text',
      required: true,
    },
  ],
}
