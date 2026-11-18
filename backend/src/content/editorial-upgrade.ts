/** Add editorial structure without rewriting historical content. */
export type RecordData = Record<string, unknown>
export function record(value: unknown): RecordData {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? (value as RecordData)
    : {}
}
function records(value: unknown): RecordData[] {
  return Array.isArray(value) ? value.map(record) : []
}
function text(value: unknown, fallback = '') {
  return typeof value === 'string' ? value : fallback
}

export function structuredDate(date: string) {
  const year = Number(date.match(/\b(?:19|20)\d{2}\b/)?.[0]) || undefined
  if (!year) return { datePrecision: 'unknown' as const }
  const months = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec',
  ]
  const monthName = date.match(
    /\b(jan[a-z]*|feb[a-z]*|mar[a-z]*|apr[a-z]*|may|jun[a-z]*|jul[a-z]*|aug[a-z]*|sep[a-z]*|oct[a-z]*|nov[a-z]*|dec[a-z]*)\b/i,
  )?.[0]
  const month = monthName ? months.indexOf(monthName.slice(0, 3).toLowerCase()) + 1 : undefined
  const candidate = month
    ? Number(date.match(/^\s*(\d{1,2})\s+[a-z]/i)?.[1]) || undefined
    : undefined
  const validDay =
    candidate &&
    month &&
    candidate >= 1 &&
    candidate <= new Date(Date.UTC(year, month, 0)).getUTCDate()
      ? candidate
      : undefined
  return {
    year,
    ...(month ? { month } : {}),
    ...(validDay ? { day: validDay } : {}),
    datePrecision: validDay ? ('day' as const) : month ? ('month' as const) : ('year' as const),
  }
}

export function upgradeProjects(value: unknown): RecordData[] {
  return records(value).map((project) =>
    project.datePrecision || typeof project.year === 'number'
      ? project
      : { ...project, ...structuredDate(text(project.date)) },
  )
}

export function buildNavigation(copyValue: unknown) {
  const nav = record(record(copyValue).navigation)
  const source = records(nav.groups).flatMap((group) => records(group.items))
  source.push(
    { label: text(nav.story, 'Story'), href: '/story' },
    { label: text(nav.trustees, 'Trustees'), href: '/trustees' },
  )
  const links = new Map(
    source.map((link) => [text(link.href), { label: text(link.label), href: text(link.href) }]),
  )
  const definitions = [
    ['Discover Penugonda', ['/overview', '/about', '/vasavi-dham', '/story']],
    [
      'Seva & donations',
      ['/donations', '/donations/annadanam', '/donations/goshala', '/donations/e-hundi'],
    ],
    ['From the Trust', ['/news', '/newsletter', '/trustees']],
    ['Gallery', ['/gallery/photos', '/gallery/videos']],
  ] as const
  const used = new Set<string>()
  const groups: Array<{ label: string; items: Array<{ label: string; href: string }> }> =
    definitions
      .map(([label, paths]) => ({
        label,
        items: paths.flatMap((href) => {
          const link = links.get(href)
          if (!link) return []
          used.add(href)
          return [link]
        }),
      }))
      .filter((group) => group.items.length)
  const extras = [...links.values()].filter((link) => link.href && !used.has(link.href))
  if (extras.length) groups.push({ label: 'Explore further', items: extras })
  return {
    enabled: true,
    home: text(nav.home, 'Home'),
    contact: text(nav.contact, 'Contact the Trust'),
    openMenu: text(nav.openMenu, 'Open menu'),
    closeMenu: text(nav.closeMenu, 'Close menu'),
    directoryTitle: 'Explore Penugonda',
    toggleOpenLabel: 'Explore',
    toggleCloseLabel: 'Close',
    groups,
    quickLinks: ['/vasavi-dham', '/donations'].flatMap((href) =>
      links.get(href) ? [links.get(href)!] : [],
    ),
  }
}

export function upgradePhotoAlbums(photosValue: unknown, galleryValue: unknown): RecordData[] {
  const photos = record(photosValue)
  const albums = records(photos.albums)
  if (Number(photos.contentModelVersion) >= 2) return albums
  const gallery = records(galleryValue)
  const coverOrder = [3, 4, 2, 6, 7, 1, 5, 0]
  const used = new Set<unknown>()
  const upgraded: RecordData[] = albums.map((album, index) => {
    const fallback = gallery[coverOrder[index]]
    const coverImage = album.coverImage ?? records(album.photos)[0]?.image ?? fallback?.image
    if (coverImage != null) used.add(coverImage)
    return {
      ...album,
      ...(coverImage != null ? { coverImage } : {}),
      coverAlt: album.coverAlt ?? fallback?.alt ?? album.title ?? '',
      coverStatus: album.coverStatus ?? 'illustrative',
      photos: album.photos ?? [],
    }
  })
  for (const photo of gallery) {
    if (photo.image != null && !used.has(photo.image)) {
      upgraded.push({
        title: '',
        coverImage: photo.image,
        coverAlt: photo.alt ?? '',
        coverStatus: 'illustrative',
        photos: [],
        photoCount: 0,
      })
      used.add(photo.image)
    }
  }
  return upgraded
}
