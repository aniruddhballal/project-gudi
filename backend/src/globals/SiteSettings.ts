import type { GlobalConfig } from 'payload'

import { authenticated } from '../access'
import { navigationField } from '../fields/editorial'

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
    { name: 'contentModelVersion', type: 'number', admin: { hidden: true } },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Identity',
          fields: [
            { name: 'logo', type: 'upload', relationTo: 'media' },
            { name: 'siteTitle', label: 'Full Trust name', type: 'text', required: true },
          ],
        },
        { label: 'Navigation', fields: [navigationField] },
        {
          label: 'Interface copy',
          description: 'Existing page labels and messages. Navigation is managed in its own tab.',
          fields: [
            {
              name: 'copy',
              label: 'Page interface copy (advanced)',
              type: 'json',
              admin: {
                description:
                  'Preserves the existing copy dictionary. Navigation entries here are legacy fallbacks when the Navigation tab is disabled.',
              },
            },
          ],
        },
      ],
    },
  ],
}
