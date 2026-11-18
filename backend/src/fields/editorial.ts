import type { Field, NumberFieldSingleValidation } from 'payload'

const wholeNumber = (value: number | null | undefined, min: number, max: number) => {
  if (value == null) return true
  if (!Number.isInteger(value)) return 'Enter a whole number.'
  return (value >= min && value <= max) || `Enter a value between ${min} and ${max}.`
}

// Payload's Field union does not contextually type number validators unless
// their single-value validation signature is supplied explicitly.
type DateParts = { datePrecision?: string; year?: number; month?: number }
const dateParts = (value: unknown): DateParts =>
  value !== null && typeof value === 'object' ? value as DateParts : {}

const validateYear: NumberFieldSingleValidation = (value, { siblingData }) =>
  ['year', 'month', 'day'].includes(dateParts(siblingData).datePrecision ?? '') && value == null
    ? 'A known date needs a year.'
    : wholeNumber(value, 1000, 9999)

const validateMonth: NumberFieldSingleValidation = (value, { siblingData }) =>
  ['month', 'day'].includes(dateParts(siblingData).datePrecision ?? '') && value == null
    ? 'Enter the known month.'
    : wholeNumber(value, 1, 12)

const validateDay: NumberFieldSingleValidation = (value, { siblingData }) => {
  const { datePrecision, year, month } = dateParts(siblingData)
  if (datePrecision !== 'day') return wholeNumber(value, 1, 31)
  if (value == null) return 'Enter the known day.'
  if (!Number.isInteger(value)) return 'Enter a whole number.'
  if (year && month && value > new Date(Date.UTC(year, month, 0)).getUTCDate())
    return 'This day does not exist in that month.'
  return wholeNumber(value, 1, 31)
}

export const projectDateFields: Field[] = [
  {
    name: 'datePrecision',
    label: 'How much of the date is known?',
    type: 'select',
    enumName: 'project_date_precision',
    options: [
      { label: 'Year only', value: 'year' },
      { label: 'Month and year', value: 'month' },
      { label: 'Full date', value: 'day' },
      { label: 'Date not known', value: 'unknown' },
    ],
    admin: {
      description:
        'The displayed historical date is preserved separately. Never guess missing dates.',
    },
  },
  {
    type: 'row',
    fields: [
      {
        name: 'year',
        type: 'number',
        min: 1000,
        max: 9999,
        validate: validateYear,
        admin: { width: '34%', condition: (_, sibling) => sibling.datePrecision !== 'unknown' },
      },
      {
        name: 'month',
        type: 'number',
        min: 1,
        max: 12,
        validate: validateMonth,
        admin: {
          width: '33%',
          condition: (_, sibling) => ['month', 'day'].includes(sibling.datePrecision),
        },
      },
      {
        name: 'day',
        type: 'number',
        min: 1,
        max: 31,
        validate: validateDay,
        admin: { width: '33%', condition: (_, sibling) => sibling.datePrecision === 'day' },
      },
    ],
  },
]

const linkFields: Field[] = [
  { name: 'label', type: 'text', required: true },
  {
    name: 'href',
    label: 'Page path',
    type: 'text',
    required: true,
    validate: (value: string | null | undefined) =>
      Boolean(value && /^\/(?!\/)/.test(value)) || 'Use a local page path such as /about.',
    admin: {
      description: 'Choose an existing website path. Adding a link does not create a new page.',
    },
  },
]

export const navigationField: Field = {
  name: 'navigation',
  label: 'Website navigation',
  type: 'group',
  fields: [
    {
      name: 'enabled',
      label: 'Use these navigation settings',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Existing navigation remains available until these settings are enabled.',
      },
    },
    {
      type: 'row',
      fields: [
        { name: 'home', label: 'Home link label', type: 'text' },
        { name: 'contact', label: 'Contact link label', type: 'text' },
      ],
    },
    { name: 'directoryTitle', label: 'Directory heading', type: 'text' },
    {
      type: 'row',
      fields: [
        { name: 'toggleOpenLabel', label: 'Explore button text', type: 'text' },
        { name: 'toggleCloseLabel', label: 'Close button text', type: 'text' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'openMenu', label: 'Accessible open-menu label', type: 'text' },
        { name: 'closeMenu', label: 'Accessible close-menu label', type: 'text' },
      ],
    },
    {
      name: 'groups',
      label: 'Explore directory groups',
      type: 'array',
      fields: [
        { name: 'label', label: 'Group heading', type: 'text', required: true },
        {
          name: 'items',
          label: 'Pages in this group',
          type: 'array',
          required: true,
          minRows: 1,
          fields: linkFields,
        },
      ],
      admin: { description: 'Drag groups and their page links to change the directory order.' },
    },
    {
      name: 'quickLinks',
      label: 'Desktop quick links',
      type: 'array',
      maxRows: 3,
      fields: linkFields,
      admin: {
        description:
          'Shortcuts beside Explore. Contact is displayed separately. Leave this list empty to remove shortcuts.',
      },
    },
  ],
}
