import { headers as getHeaders } from 'next/headers.js'
import Link from 'next/link'
import { getPayload } from 'payload'

import config from '@/payload.config'
import './styles.css'

const pageLinks = [
  ['Home page', '/admin/globals/home-page'],
  ['About page', '/admin/globals/about-page'],
  ['Contact page', '/admin/globals/contact-page'],
  ['Donations', '/admin/globals/donations-page'],
  ['News page', '/admin/globals/news-page'],
  ['Story page', '/admin/globals/story-page'],
  ['Trustees', '/admin/globals/trustees-page'],
  ['Vasavi Dham', '/admin/globals/vasavi-dham-page'],
] as const

const workspaceLinks = [
  {
    eyebrow: 'Pages',
    title: 'Update the website',
    description: 'Edit the fixed content of each public page without changing its layout or structure.',
    href: '/admin/globals/home-page',
    linkLabel: 'Open page editors',
    tone: 'saffron',
  },
  {
    eyebrow: 'Content',
    title: 'Publish updates',
    description: 'Create and maintain news articles, videos, and the media library used across the site.',
    href: '/admin/collections/articles',
    linkLabel: 'Open content library',
    tone: 'terracotta',
  },
  {
    eyebrow: 'Settings',
    title: 'Keep essentials current',
    description: 'Update the trust identity and other always-present site settings from one place.',
    href: '/admin/globals/site-settings',
    linkLabel: 'Open site settings',
    tone: 'olive',
  },
] as const

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })
  const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3001'

  return (
    <div className="cms-home">
      <header className="cms-header">
        <Link className="brand" href="/">
          <span className="brand-mark" aria-hidden="true">P</span>
          <span>
            <strong>Penu CMS</strong>
            <small>Vasavi Penugonda Temple Trust</small>
          </span>
        </Link>
        <div className="header-actions">
          <span className="workspace-badge"><span className="status-dot" /> Local workspace</span>
          <Link className="header-admin-link" href={payloadConfig.routes.admin}>Admin panel <span aria-hidden="true">↗</span></Link>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">Content backoffice</p>
            <h1>Keep the Penu website current.</h1>
            <p className="hero-description">
              Manage the trust&apos;s pages, articles, videos, and media from one place. Saved changes are reflected on the public website.
            </p>
            <div className="hero-actions">
              <Link className="primary-button" href={payloadConfig.routes.admin}>Open admin panel <span aria-hidden="true">→</span></Link>
              <a className="secondary-button" href={frontendUrl} target="_blank" rel="noreferrer">View public website <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className="hero-note">
            <span className="note-icon" aria-hidden="true">✦</span>
            <p><strong>Simple by design</strong><br />Everyone has the same editing access. No approvals or structural changes—just update, save, and publish.</p>
          </div>
        </section>

        <section className="workspace-section" aria-labelledby="workspace-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Your workspace</p>
              <h2 id="workspace-heading">What do you want to update?</h2>
            </div>
            <p>Choose the area closest to the change you need to make.</p>
          </div>

          <div className="workspace-grid">
            {workspaceLinks.map((item) => (
              <article className={`workspace-card ${item.tone}`} key={item.title}>
                <span className="card-eyebrow">{item.eyebrow}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Link href={item.href}>{item.linkLabel} <span aria-hidden="true">→</span></Link>
              </article>
            ))}
          </div>
        </section>

        <section className="page-links-section" aria-labelledby="pages-heading">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow">Fixed page content</p>
              <h2 id="pages-heading">Jump straight to a page</h2>
            </div>
            <p>These pages always exist. You can edit their content, but not create or remove the page itself.</p>
          </div>
          <div className="page-links">
            {pageLinks.map(([label, href]) => <Link href={href} key={href}>{label}<span aria-hidden="true">↗</span></Link>)}
          </div>
        </section>

        <section className="how-it-works" aria-labelledby="how-heading">
          <div>
            <p className="eyebrow">The workflow</p>
            <h2 id="how-heading">Three steps from edit to live.</h2>
          </div>
          <div className="steps">
            <div><span>01</span><h3>Find the content</h3><p>Choose a page, article, video, or media item from the admin panel.</p></div>
            <div><span>02</span><h3>Make the change</h3><p>Edit text, replace images, upload media, or create a new update.</p></div>
            <div><span>03</span><h3>Save and publish</h3><p>The public frontend reads the saved backend content immediately.</p></div>
          </div>
        </section>
      </main>

      <footer className="cms-footer">
        <span>{user ? `Signed in as ${user.email}` : 'Sign in through the admin panel to manage content.'}</span>
        <span>Project Gudi · Penu CMS</span>
      </footer>
    </div>
  )
}
