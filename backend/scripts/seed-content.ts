import 'dotenv/config'

import fs from 'node:fs/promises'
import path from 'node:path'

import { getPayload } from 'payload'

import config from '../src/payload.config'
import { homeContent } from '../src/content/home'
import { aboutContent } from '../src/content/about'
import { contactContent } from '../src/content/contact'
import { donationsContent } from '../src/content/donations'
import { annadanamContent } from '../src/content/donation-annadanam'
import { ehundiContent } from '../src/content/donation-ehundi'
import { goshalaContent } from '../src/content/donation-goshala'
import { newsletterContent } from '../src/content/newsletter'
import { overviewContent } from '../src/content/overview'
import { photosContent } from '../src/content/photos'
import { privacyContent } from '../src/content/privacy'
import { storyContent } from '../src/content/story'
import { trusteesContent } from '../src/content/trustees'
import { vasaviDhamContent } from '../src/content/vasavi-dham'
import { videosContent } from '../src/content/videos'
import { newsContent } from '../src/content/news'
import { siteCopy } from '../src/content/site-copy'

const frontendPublic = path.resolve(process.cwd(), '../frontend/public')
const legacyRoot = path.join(frontendPublic, 'legacy')

function textList(values: readonly string[]) {
  return values.map((text) => ({ text }))
}

function mimeType(filePath: string) {
  const extension = path.extname(filePath).toLowerCase()
  const types: Record<string, string> = {
    '.gif': 'image/gif',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
  }
  return types[extension] ?? 'application/octet-stream'
}

async function imageFiles(directory: string): Promise<string[]> {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const files: string[] = []

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      files.push(...await imageFiles(fullPath))
    } else if (/\.(gif|jpe?g|png|webp)$/i.test(entry.name)) {
      files.push(fullPath)
    }
  }

  return files
}

async function seedMedia(payload: Awaited<ReturnType<typeof getPayload>>) {
  const mediaIds = new Map<string, number>()
  const files = await imageFiles(legacyRoot)

  for (const filePath of files) {
    const relativePath = `/${path.relative(frontendPublic, filePath).split(path.sep).join('/')}`
    const filename = `penu-${path.relative(legacyRoot, filePath).split(path.sep).join('-')}`
    const existing = await payload.find({ collection: 'media', where: { filename: { equals: filename } }, limit: 1 })
    const mediaDocument = existing.docs[0] ?? await payload.create({
      collection: 'media',
      data: { alt: path.basename(filePath, path.extname(filePath)).replace(/[-_]/g, ' ') },
      file: {
        data: await fs.readFile(filePath),
        mimetype: mimeType(filePath),
        name: filename,
        size: (await fs.stat(filePath)).size,
      },
    })

    mediaIds.set(relativePath, mediaDocument.id)
  }

  return mediaIds
}

function mediaId(mediaIds: Map<string, number>, value: string | null | undefined) {
  if (!value) return null
  return mediaIds.get(value) ?? null
}

function bodyFromParagraphs(paragraphs: readonly string[]) {
  return {
    root: {
      type: 'root',
      version: 1,
      direction: null,
      format: '',
      indent: 0,
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        version: 1,
        direction: null,
        format: '',
        indent: 0,
        textFormat: 0,
        textStyle: '',
        children: [{ type: 'text', version: 1, detail: 0, format: 0, mode: 'normal', style: '', text }],
      })),
    },
  }
}

async function main() {
  const payload = await getPayload({ config })
  const mediaIds = await seedMedia(payload)
  const image = (value: string | null | undefined) => mediaId(mediaIds, value)

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      logo: image('/legacy/home/logo.png'),
      siteTitle: homeContent.siteTitle,
      copy: siteCopy,
    } as any,
  })

  const pageData = {
      home: {
        siteTitle: homeContent.siteTitle,
        description: homeContent.description,
        aims: homeContent.aims,
        heroSlides: homeContent.heroSlides.map((slide) => ({ ...slide, image: image(slide.image) })),
        president: {
          image: image(homeContent.president.image),
          kannada: textList(homeContent.president.kannada),
          english: textList(homeContent.president.english),
        },
        majorLinks: homeContent.majorLinks,
        event: homeContent.event,
        greatSouls: homeContent.greatSouls.map((person) => ({ ...person, image: image(person.image) })),
        gallery: homeContent.gallery.map((photo) => ({ ...photo, image: image(photo.image) })),
        contact: homeContent.contact.map((location) => ({ ...location, lines: textList(location.lines) })),
        email: homeContent.email,
      },
      about: {
        title: aboutContent.title,
        introduction: aboutContent.introduction,
        underConstruction: aboutContent.underConstruction.map((project) => ({ ...project, image: image(project.image) })),
        projects: aboutContent.projects.map((project) => ({ ...project, image: image(project.image) })),
      },
      contact: {
        ...contactContent,
        headOffice: textList(contactContent.headOffice),
        vasaviDham: textList(contactContent.vasaviDham),
      },
      donations: {
        ...donationsContent,
        options: donationsContent.options.map((option) => ({ ...option, image: image(option.image) })),
      },
      donationPages: {
        annadanam: { ...annadanamContent, image: image(annadanamContent.image), paragraphs: textList(annadanamContent.paragraphs) },
        ehundi: { ...ehundiContent, image: image(ehundiContent.image), paragraphs: textList(ehundiContent.paragraphs) },
        goshala: { ...goshalaContent, image: image(goshalaContent.image), paragraphs: textList(goshalaContent.paragraphs) },
      },
      newsletter: {
        ...newsletterContent,
      },
      news: {
        title: newsContent.title,
      },
      overview: {
        ...overviewContent,
        heroImage: image('/legacy/overview/top.png'),
        events: overviewContent.events.map((event) => ({ ...event, image: image(event.image) })),
        story: { ...overviewContent.story, paragraphs: textList(overviewContent.story.paragraphs) },
        donation: { ...overviewContent.donation, image: image(overviewContent.donation.image) },
        videos: overviewContent.videos.map((video) => ({ ...video, thumbnail: image(video.thumbnail) })),
        news: overviewContent.news.map((item) => ({ ...item, image: image(item.image) })),
        about: { ...overviewContent.about, image: image(overviewContent.about.image) },
      },
      photos: {
        title: photosContent.title,
        albums: photosContent.albums,
      },
      privacy: {
        ...privacyContent,
        sections: privacyContent.sections.map((section) => ({ ...section, paragraphs: textList(section.paragraphs) })),
      },
      story: {
        ...storyContent,
        coverImage: image('/legacy/story/1.png'),
        introduction: textList(storyContent.introduction),
        historicEvents: textList(storyContent.historicEvents),
        narrative: storyContent.narrative.map((chapter) => ({ ...chapter, image: image(chapter.image) })),
      },
      trustees: {
        title: trusteesContent.title,
        patrons: trusteesContent.patrons.map((person) => ({ ...person, image: image(person.image) })),
        executive: trusteesContent.executive.map((person) => ({ ...person, image: image(person.image) })),
      },
      vasaviDham: {
        title: vasaviDhamContent.title,
        description: vasaviDhamContent.description,
        featured: vasaviDhamContent.featured.map((project) => ({ ...project, image: image(project.image) })),
        projects: vasaviDhamContent.projects.map((project) => ({ ...project, image: image(project.image) })),
      },
  } as any

  const pageGlobals: Record<string, unknown> = {
    'home-page': pageData.home,
    'about-page': pageData.about,
    'contact-page': pageData.contact,
    'donations-page': pageData.donations,
    'donation-annadanam-page': pageData.donationPages.annadanam,
    'donation-ehundi-page': pageData.donationPages.ehundi,
    'donation-goshala-page': pageData.donationPages.goshala,
    'newsletter-page': pageData.newsletter,
    'news-page': pageData.news,
    'overview-page': pageData.overview,
    'photos-page': pageData.photos,
    'privacy-page': pageData.privacy,
    'story-page': pageData.story,
    'trustees-page': pageData.trustees,
    'vasavi-dham-page': pageData.vasaviDham,
  }

  for (const [slug, data] of Object.entries(pageGlobals)) {
    await payload.updateGlobal({ slug: slug as any, data: data as any })
  }

  for (const item of newsContent.items) {
    const slug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    const existing = await payload.find({ collection: 'articles', where: { slug: { equals: slug } }, limit: 1 })
    const data = {
      title: item.title,
      slug,
      publishedAt: new Date(`${item.date}T12:00:00.000Z`).toISOString(),
      summary: item.summary,
      body: bodyFromParagraphs(item.details.length > 0 ? item.details : [item.summary]),
      image: image(item.image),
      externalLink: item.href,
      details: item.details.map((text) => ({ text })),
      sourceImage: item.sourceImage,
      legacyId: item.id,
    }

    if (existing.docs[0]) {
      await payload.update({ collection: 'articles', id: existing.docs[0].id, data: data as any })
    } else {
      await payload.create({ collection: 'articles', data: data as any })
    }
  }

  for (const [sortOrder, video] of videosContent.videos.entries()) {
    const existing = await payload.find({ collection: 'videos', where: { videoId: { equals: video.id } }, limit: 1 })
    const data = {
      title: video.title,
      provider: 'youtube' as const,
      videoId: video.id,
      description: video.title,
      sortOrder,
    }

    if (existing.docs[0]) {
      await payload.update({ collection: 'videos', id: existing.docs[0].id, data })
    } else {
      await payload.create({ collection: 'videos', data })
    }
  }

  console.log(`Seeded site content and ${mediaIds.size} media files.`)
  await payload.destroy()
}

main().catch(async (error) => {
  console.error(error)
  process.exitCode = 1
})
