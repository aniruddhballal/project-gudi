import Link from "next/link";

import { SiteHeader } from "@/components/site-header";

export const dynamic = "force-dynamic";

type RichTextNode = {
  text?: string;
  children?: RichTextNode[];
};

type PayloadImage = {
  url?: string;
  alt?: string;
};

type Article = {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  summary?: string | null;
  body?: {
    root?: {
      children?: RichTextNode[];
    };
  } | null;
  image?: PayloadImage | string | null;
  externalLink?: string | null;
};

type ArticlesResponse = {
  docs?: Article[];
};

const payloadUrl = process.env.PAYLOAD_API_URL ?? "http://localhost:3000";

function getText(node: RichTextNode): string {
  return [node.text ?? "", ...(node.children ?? []).map(getText)].join("");
}

function getImageUrl(image: Article["image"]): string | null {
  if (!image || typeof image === "string" || !image.url) return null;
  return image.url.startsWith("http") ? image.url : `${payloadUrl}${image.url}`;
}

async function getArticles(): Promise<{ articles: Article[]; error?: string }> {
  try {
    const response = await fetch(`${payloadUrl}/api/articles?limit=100&sort=-publishedAt&depth=1`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Payload returned ${response.status}`);
    }

    const data = (await response.json()) as ArticlesResponse;
    return { articles: data.docs ?? [] };
  } catch {
    return { articles: [], error: `Could not connect to Payload at ${payloadUrl}.` };
  }
}

export default async function CmsTestPage() {
  const { articles, error } = await getArticles();

  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <SiteHeader />

      <section className="border-b border-stone-200 bg-amber-950 px-4 py-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">CMS test</p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Articles from Payload</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-amber-50">
            This temporary page reads live content from the local Payload CMS.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-8 lg:px-12">
        {error ? (
          <div className="rounded-2xl bg-red-50 p-6 text-red-800 ring-1 ring-red-200">
            {error}
          </div>
        ) : articles.length === 0 ? (
          <p className="rounded-2xl bg-white p-6 text-stone-600 ring-1 ring-stone-200">No articles found.</p>
        ) : (
          <div className="space-y-6">
            {articles.map((article) => {
              const imageUrl = getImageUrl(article.image);
              const imageAlt = article.image && typeof article.image === "object" ? article.image.alt ?? article.title : article.title;
              const body = article.body?.root?.children?.map(getText).filter(Boolean) ?? [];

              return (
                <article key={article.id} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200">
                  {imageUrl && (
                    <img src={imageUrl} alt={imageAlt} className="max-h-96 w-full object-cover" />
                  )}
                  <div className="p-6 sm:p-8">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold">{article.title}</h2>
                    {article.summary && <p className="mt-3 text-stone-600">{article.summary}</p>}
                    {body.length > 0 && (
                      <div className="mt-5 space-y-3 leading-7 text-stone-700">
                        {body.map((paragraph, index) => <p key={`${article.id}-body-${index}`}>{paragraph}</p>)}
                      </div>
                    )}
                    <p className="mt-5 text-xs text-stone-400">Slug: {article.slug}</p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <footer className="border-t border-stone-200 bg-white px-4 py-6 text-sm text-stone-500 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Link href="/" className="hover:text-stone-900">Back to home</Link>
        </div>
      </footer>
    </main>
  );
}
