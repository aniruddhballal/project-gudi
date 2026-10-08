import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getSiteContent } from "@/lib/site-content";

export default async function PhotosPage() {
  const { home: homeContent, photos: photosContent } = await getSiteContent();
  return (
    <main className="min-h-screen bg-[#f7f3ed] text-stone-900">
      <SiteHeader />

      <section className="bg-[#2c1916] px-4 py-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300">Gallery</p>
          <h1 className="display-type mt-4 text-5xl leading-tight sm:text-6xl">{photosContent.title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-amber-50">The original public page exposed these seven album categories, but each album currently reports zero photos.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:px-12">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {photosContent.albums.map((album) => (
            <article key={album.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-amber-50 text-2xl text-amber-800 ring-1 ring-amber-100" aria-hidden="true">▧</div>
              <h2 className="mt-5 text-xl font-semibold">{album.title}</h2>
              <p className="mt-3 text-sm font-semibold text-amber-700">{album.photoCount} Photos</p>
              <p className="mt-3 text-sm leading-6 text-stone-500">No public album images were returned by the original endpoint.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-stone-200 bg-white px-4 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl rounded-2xl bg-stone-100 p-6">
          <p className="text-sm leading-7 text-stone-600">The album list is preserved from the source page. Gallery image upload and album management should become backend-driven when the media API is available.</p>
        </div>
      </section>

      <SiteFooter siteTitle={homeContent.siteTitle} />
    </main>
  );
}
