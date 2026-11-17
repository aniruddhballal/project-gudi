import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  MapPin,
  MoveUpRight,
} from "lucide-react";

import { ContentImage } from "@/components/content-image";
import { HomeGallery } from "@/components/home/home-gallery";
import { HomeNewsletter } from "@/components/home/home-newsletter";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteContent } from "@/lib/site-content";
import type { HomeContent } from "@/lib/site-content-types";
import "@/components/home/home.css";
import "@/components/home/home-chrome.css";

type Slide = HomeContent["heroSlides"][number];

export default async function HomePage() {
  const { home, siteSettings } = await getSiteContent();
  const copy = siteSettings.copy.home;
  const [hero, ...features] = home.heroSlides;
  const [founder, president, ...community] = home.greatSouls;

  return (
    <main data-page="home" className="home-page">
      <SiteHeader appearance="home" />

      <section className="home-hero" aria-labelledby="page-content">
        <div aria-hidden="true" className="temple-banner-ornament home-banner-ornament" />
        <div className="home-shell home-hero-layout">
          <div className="home-hero-copy">
            <p className="home-eyebrow">
              <span aria-hidden="true">✦</span> {copy.heroEyebrow}
            </p>
            <h1 id="page-content" tabIndex={-1}>
              {hero.title.replace(/\s+Trust$/i, "")}
            </h1>
            <p className="home-hero-description">{hero.description}</p>
            <div className="home-actions">
              <Link href={hero.href} className="home-button home-button-light">
                {copy.heroCta}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <Link href="/contact" className="home-text-link">
                {copy.visitCta}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <div className="home-hero-signature">
              <span className="home-ornament" aria-hidden="true">
                ✧
              </span>
              <p>{home.siteTitle}</p>
            </div>
          </div>
          <figure className="home-sacred-frame">
            <div className="home-sacred-image">
              <ContentImage
                src={hero.image}
                alt={hero.title}
                fetchPriority="high"
                width={1280}
                height={1280}
              />
            </div>
            <figcaption>{home.siteTitle}</figcaption>
          </figure>
        </div>
        <a
          href="#home-explore"
          className="home-scroll-cue"
          aria-label={copy.exploreEyebrow}
        >
          <ArrowDown size={17} aria-hidden="true" />
        </a>
      </section>

      <section
        className="home-wayfinding"
        aria-labelledby="home-wayfinding-title"
      >
        <div className="home-shell home-wayfinding-layout">
          <div className="home-wayfinding-intro">
            <p className="home-eyebrow">{copy.furtherEyebrow}</p>
            <h2 id="home-wayfinding-title">{copy.furtherTitle}</h2>
            <p>
              Explore the Trust, its history, places, and ways to take part.
            </p>
          </div>
          <div className="home-paths">
            {home.majorLinks.map((link, index) => (
              <Link key={link.href} href={link.href}>
                <span className="home-path-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="home-path-name">{link.label}</span>
                <span className="home-path-cta">
                  {copy.furtherCta}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        id="home-explore"
        className="home-section home-discovery"
        aria-labelledby="home-explore-title"
      >
        <div className="home-shell">
          <div className="home-section-heading">
            <div>
              <p className="home-eyebrow">{copy.exploreEyebrow}</p>
              <h2 id="home-explore-title">{copy.exploreTitle}</h2>
            </div>
            <p className="home-section-intro">{copy.exploreDescription}</p>
          </div>
          <div className="home-feature-grid">
            {features.map((slide, index) => (
              <DiscoveryFeature key={slide.href} slide={slide} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="home-purpose" aria-labelledby="home-purpose-title">
        <div className="home-shell home-purpose-layout">
          <div className="home-purpose-symbol" aria-hidden="true">
            <span>✳</span>
          </div>
          <div>
            <p className="home-eyebrow">{copy.trustEyebrow}</p>
            <h2 id="home-purpose-title">{copy.trustTitle}</h2>
          </div>
          <div>
            <p className="home-purpose-description">{home.description}</p>
            <Link href="/about" className="home-text-link">
              {copy.trustCta}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="home-bulletin" aria-labelledby="home-event-title">
        <div className="home-shell home-bulletin-layout">
          <p className="home-eyebrow">
            <CalendarDays size={18} aria-hidden="true" />
            {copy.eventEyebrow}
          </p>
          <h2 id="home-event-title">{home.event.name}</h2>
          <a
            href={home.event.bulletinHref}
            target="_blank"
            rel="noreferrer"
            className="home-text-link"
          >
            {copy.eventCta}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section
        className="home-section home-gallery-section"
        aria-labelledby="home-gallery-title"
      >
        <div className="home-shell">
          <div className="home-section-heading">
            <div>
              <p className="home-eyebrow">{copy.galleryEyebrow}</p>
              <h2 id="home-gallery-title">{copy.galleryTitle}</h2>
            </div>
            <Link href="/gallery/photos" className="home-text-link">
              {copy.galleryCta}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <HomeGallery photos={home.gallery} />
        </div>
      </section>

      <section
        className="home-section home-message-section"
        aria-labelledby="home-message-title"
      >
        <div className="home-shell">
          <div className="home-section-heading">
            <div>
              <p className="home-eyebrow">{copy.presidentEyebrow}</p>
              <h2 id="home-message-title">{copy.presidentTitle}</h2>
            </div>
            <p className="home-section-intro">
              A message in Kannada and English.
            </p>
          </div>
          <div className="home-message-layout">
            <aside className="home-president">
              <div className="home-president-photo">
                <ContentImage
                  src={home.president.image}
                  alt={copy.presidentName}
                  loading="lazy"
                />
              </div>
              <p className="home-president-name">{copy.presidentName}</p>
              <p className="home-president-role">{copy.presidentRole}</p>
              <span className="home-president-mark" aria-hidden="true">
                “
              </span>
            </aside>
            <div className="home-letters">
              <MessageColumn
                title="ಕನ್ನಡ"
                lang="kn"
                paragraphs={home.president.kannada}
              />
              <MessageColumn
                title="English"
                lang="en"
                paragraphs={home.president.english}
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className="home-section home-people-section"
        aria-labelledby="home-people-title"
      >
        <div className="home-shell">
          <div className="home-section-heading">
            <div>
              <p className="home-eyebrow">{copy.soulsEyebrow}</p>
              <h2 id="home-people-title">{copy.soulsTitle}</h2>
            </div>
            <p className="home-section-intro">{copy.soulsDescription}</p>
          </div>
          <div className="home-founders">
            {[founder, president].filter(Boolean).map((person) => (
              <article key={person.name} className="home-founder">
                <div className="home-founder-photo">
                  <ContentImage
                    src={person.image}
                    alt={person.name}
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3>{person.name}</h3>
                  {person.role && (
                    <p className="home-person-role">{person.role}</p>
                  )}
                  {person.description && (
                    <p className="home-person-description">
                      {person.description}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
          <div className="home-community">
            {community.map((person) => (
              <article key={person.name} className="home-person">
                <div className="home-person-photo">
                  <ContentImage
                    src={person.image}
                    alt={person.name}
                    loading="lazy"
                  />
                </div>
                <h3>{person.name}</h3>
                {person.role && (
                  <p className="home-person-role">{person.role}</p>
                )}
                {person.description && (
                  <p className="home-person-description">
                    {person.description}
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-visit" aria-labelledby="home-visit-title">
        <div className="home-shell">
          <div className="home-section-heading">
            <div>
              <p className="home-eyebrow">
                <MapPin size={17} aria-hidden="true" />
                {copy.visitEyebrow}
              </p>
              <h2 id="home-visit-title">{copy.visitTitle}</h2>
            </div>
            <Link href="/contact" className="home-button home-button-light">
              {copy.visitCta}
              <MoveUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="home-contact-grid">
            {home.contact.map((location) => (
              <address key={location.name}>
                <h3>{location.name}</h3>
                {location.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </address>
            ))}
          </div>
        </div>
      </section>

      <HomeNewsletter copy={copy} />
      <SiteFooter siteTitle={home.siteTitle} appearance="home" />
    </main>
  );
}

function DiscoveryFeature({ slide, index }: { slide: Slide; index: number }) {
  return (
    <Link
      href={slide.href}
      className={`home-feature home-feature-${index + 1}`}
    >
      <div className="home-feature-image">
        <ContentImage src={slide.image} alt={slide.title} loading="lazy" />
      </div>
      <div className="home-feature-copy">
        <span className="home-feature-index">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div>
          <h3>{slide.title}</h3>
          <p>{slide.description}</p>
        </div>
        <span className="home-feature-arrow">
          <ArrowUpRight size={23} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

function MessageColumn({
  title,
  lang,
  paragraphs,
}: {
  title: string;
  lang: string;
  paragraphs: readonly string[];
}) {
  return (
    <details className="home-letter" open lang={lang}>
      <summary>
        <h3>{title}</h3>
        <span aria-hidden="true">+</span>
      </summary>
      <div className="home-letter-body">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </details>
  );
}
