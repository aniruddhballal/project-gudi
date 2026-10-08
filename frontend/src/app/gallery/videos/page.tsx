import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getGalleryVideos, getSiteContent } from "@/lib/site-content";

export default async function VideosPage() {
  const { home: homeContent } = await getSiteContent();
  const videos = await getGalleryVideos();
  return (
    <main className="min-h-screen bg-[#f7f3ed] text-stone-900">
      <SiteHeader />

      <section className="bg-[#2c1916] px-4 py-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300">Gallery</p>
          <h1 className="display-type mt-4 text-5xl leading-tight sm:text-6xl">Videos</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-amber-50">Videos preserved from the original public gallery, embedded from the source YouTube URLs.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-8 md:grid-cols-2 lg:px-12">
        {videos.map((video) => (
          <article key={video.id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200">
            <div className="aspect-video bg-stone-900">
              <iframe className="h-full w-full" src={`https://www.youtube.com/embed/${video.id}`} title={video.title} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
            <div className="p-6">
              <p className="text-sm font-semibold leading-7 text-stone-700">{video.title}</p>
              <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-semibold text-amber-800 hover:text-amber-950">Open on YouTube</a>
            </div>
          </article>
        ))}
      </section>

      <SiteFooter siteTitle={homeContent.siteTitle} />
    </main>
  );
}
