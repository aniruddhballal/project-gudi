import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { authenticated } from '../access'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'publishedAt', 'updatedAt'],
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
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      required: true,
    },
    {
      name: 'summary',
      type: 'textarea',
    },
    {
      name: 'body',
      type: 'richText',
      editor: lexicalEditor({}),
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'externalLink',
      type: 'text',
    },
    {
      name: 'details',
      type: 'array',
      fields: [{ name: 'text', type: 'textarea' }],
    },
    {
      name: 'sourceImage',
      type: 'text',
    },
    {
      name: 'legacyId',
      type: 'number',
    },
  ],
}
