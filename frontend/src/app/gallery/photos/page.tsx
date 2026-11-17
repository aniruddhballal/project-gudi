import { ContentImage } from "@/components/content-image";
import galleryStyles from "@/components/home/home-gallery.module.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero } from "@/components/public-page";
import { getSiteContent } from "@/lib/site-content";
import { Upload } from "lucide-react";

export default async function PhotosPage() {
  const { home: homeContent, photos: photosContent, siteSettings } = await getSiteContent();
  const copy = siteSettings.copy.pages.photos;
  // Illustrative covers from existing photos, not verified event-album contents.
  const coverOrder = [3, 4, 2, 6, 7, 1, 5, 0];
  const albumCovers = [
    ...coverOrder.flatMap((index) => homeContent.gallery[index] ? [homeContent.gallery[index]] : []),
    ...homeContent.gallery.slice(8),
  ];
  return (
    <main data-page="photos" className="min-h-screen bg-[#f8f6f1] text-stone-900">
      <SiteHeader />

      <PageHero eyebrow={copy.eyebrow} title={photosContent.title} description={copy.description}>
        <div className="mt-6 border-t border-[#d8cfbd] pt-5">
          <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#965b35]">{copy.albumsEyebrow}</p>
          <h2 id="photo-albums-title" className="display-type mt-2 text-2xl text-[#203b35] sm:text-3xl">{copy.albumsTitle}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-[#58645c]">{copy.albumsDescription}</p>
        </div>
      </PageHero>

      <section className="px-4 py-12 sm:px-8 lg:px-12 lg:py-16" aria-labelledby="temple-photos-title">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-[#965b35]">{siteSettings.copy.home.galleryEyebrow}</p>
            <h2 id="temple-photos-title" className="display-type mt-3 text-4xl text-[#203b35] sm:text-5xl">{siteSettings.copy.home.galleryTitle}</h2>
          </div>
          <div className={galleryStyles.albumGrid}>
            {albumCovers.map((photo, index) => (
              <figure key={`${photo.image}-${index}`} className={galleryStyles.album}>
                <div className={galleryStyles.albumImage}>
                  <ContentImage src={photo.image} alt={photo.alt} loading="lazy" />
                </div>
                {photosContent.albums[index] && (
                  <figcaption className={galleryStyles.caption}>
                    <h2 className={galleryStyles.albumTitle}>{photosContent.albums[index].title}</h2>
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eee4d3] px-4 py-12 sm:px-8 lg:px-12 lg:py-16"><div className="mx-auto flex max-w-7xl flex-col gap-4 rounded-xl border border-[#cdb98c] bg-[#eee7da]/70 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8c3c2e]">{copy.nextEyebrow}</p><h2 className="display-type mt-2 text-3xl text-[#203b35]">{copy.nextTitle}</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-[#4d5b52]">{copy.nextDescription}</p></div><Upload className="h-8 w-8 text-[#a44832]" aria-hidden="true" /></div></section>

      <SiteFooter siteTitle={homeContent.siteTitle} />
    </main>
  );
}
