import type { CollectionConfig } from 'payload'

import { authenticated } from '../access'

export const Videos: CollectionConfig = {
  slug: 'videos',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'provider', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  versions: {
    maxPerDoc: 4,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'provider',
      type: 'select',
      required: true,
      defaultValue: 'youtube',
      options: [
        { label: 'YouTube', value: 'youtube' },
        { label: 'Uploaded video', value: 'upload' },
      ],
    },
    {
      name: 'videoId',
      type: 'text',
      admin: {
        description: 'For YouTube, enter the video ID rather than the full watch URL.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'videoSrc',
      type: 'text',
    },
    {
      name: 'sortOrder',
      type: 'number',
    },
  ],
}
