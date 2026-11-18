import 'dotenv/config'
import fs from 'node:fs/promises'
import path from 'node:path'
import { getPayload } from 'payload'
import { sql } from '@payloadcms/db-sqlite'
import { applyEditorialSchema } from '../src/migrations/20261118_020156_editorial_content_model'
import config from '../src/payload.config'
import type { AboutPage, PhotosPage, VasaviDhamPage } from '../src/payload-types'
import {
  buildNavigation,
  upgradePhotoAlbums,
  upgradeProjects,
} from '../src/content/editorial-upgrade'

/** Idempotent additive backfill for an existing database. Never runs the seed. */
async function main() {
  // Explicit migrations must run before Payload's development schema sync.
  process.env.PAYLOAD_MIGRATING = 'true'
  const payload = await getPayload({ config })
  try {
    const folder = path.resolve(process.cwd(), '.cms-backups')
    await fs.mkdir(folder, { recursive: true })
    const columns = await payload.db.drizzle.all<{ name: string }>(
      sql`PRAGMA table_info(photos_page)`,
    )
    if (!columns.some((column) => column.name === 'content_model_version')) {
      const migrations = await payload.find({ collection: 'payload-migrations', limit: 0 })
      if (!migrations.docs.some((migration) => migration.batch === -1)) {
        throw new Error(
          'Run pnpm payload migrate before this content upgrade on migration-managed databases.',
        )
      }
      const databaseBackup = path.join(folder, `before-editorial-schema-${Date.now()}.db`)
      await payload.db.drizzle.run(sql`VACUUM INTO ${databaseBackup}`)
      console.log('Saved SQLite database backup in .cms-backups.')
      await payload.db.drizzle.run(sql`PRAGMA foreign_keys=OFF`)
      try {
        await payload.db.drizzle.transaction(async (db) => {
          await applyEditorialSchema(db)
        })
      } finally {
        await payload.db.drizzle.run(sql`PRAGMA foreign_keys=ON`)
      }
      await payload.create({
        collection: 'payload-migrations',
        data: {
          name: '20261118_020156_editorial_content_model',
          batch: 1,
        },
      })
      console.log('Applied the editorial schema to the existing development database.')
    }
    const [settings, home, photos, about, dham] = await Promise.all([
      payload.findGlobal({ slug: 'site-settings', depth: 0 }),
      payload.findGlobal({ slug: 'home-page', depth: 0 }),
      payload.findGlobal({ slug: 'photos-page', depth: 0 }),
      payload.findGlobal({ slug: 'about-page', depth: 0 }),
      payload.findGlobal({ slug: 'vasavi-dham-page', depth: 0 }),
    ])
    const snapshot = path.join(
      folder,
      `editorial-content-${new Date().toISOString().replace(/[:.]/g, '-')}.json`,
    )
    await fs.writeFile(snapshot, JSON.stringify({ settings, home, photos, about, dham }, null, 2))
    console.log('Saved existing content snapshot in .cms-backups.')

    if ((settings.contentModelVersion ?? 0) < 2) {
      await payload.updateGlobal({
        slug: 'site-settings',
        data: {
          contentModelVersion: 2,
          ...(!settings.navigation?.groups?.length
            ? { navigation: buildNavigation(settings.copy) }
            : {}),
        },
      })
      console.log('Added structured navigation, preserving existing copy.')
    }
    if (home.heroHeading == null) {
      await payload.updateGlobal({
        slug: 'home-page',
        data: {
          heroHeading: (home.heroSlides?.[0]?.title ?? '').replace(/\s+Trust$/i, ''),
        },
      })
      console.log('Stored the existing public homepage headline in its own field.')
    }
    if ((photos.contentModelVersion ?? 0) < 2) {
      await payload.updateGlobal({
        slug: 'photos-page',
        data: {
          contentModelVersion: 2,
          albums: upgradePhotoAlbums(photos, home.gallery) as PhotosPage['albums'],
        },
      })
      console.log('Stored explicit illustrative covers; left actual album photo lists empty.')
    }
    const aboutProjects = upgradeProjects(about.projects) as AboutPage['projects']
    if (JSON.stringify(aboutProjects) !== JSON.stringify(about.projects)) {
      await payload.updateGlobal({ slug: 'about-page', data: { projects: aboutProjects } })
      console.log('Added known date parts to About projects; original date text is unchanged.')
    }
    const dhamProjects = upgradeProjects(dham.projects) as VasaviDhamPage['projects']
    if (JSON.stringify(dhamProjects) !== JSON.stringify(dham.projects)) {
      await payload.updateGlobal({ slug: 'vasavi-dham-page', data: { projects: dhamProjects } })
      console.log('Added known date parts to Vasavi Dham projects; undated records remain undated.')
    }
    console.log('Editorial content-model upgrade complete.')
  } finally {
    await payload.destroy()
  }
}
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
