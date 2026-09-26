import pageInventory from "@/content/page-inventory.json";

const statusLabel: Record<string, string> = {
  "not-started": "Not started",
  "in-progress": "In progress",
  "ready-for-review": "Ready for review",
  complete: "Complete",
  "not-applicable": "N/A",
};

const statusClass: Record<string, string> = {
  "not-started": "bg-neutral-100 text-neutral-600",
  "in-progress": "bg-amber-100 text-amber-800",
  "ready-for-review": "bg-blue-100 text-blue-800",
  complete: "bg-emerald-100 text-emerald-800",
  "not-applicable": "bg-neutral-100 text-neutral-400",
};

function Status({ value }: { value: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${statusClass[value] ?? statusClass["not-started"]}`}
    >
      {statusLabel[value] ?? value}
    </span>
  );
}

export default function HomePage() {
  const { summary, pages } = pageInventory;

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-10 text-stone-950 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="text-sm font-semibold tracking-[0.2em] text-amber-700">
            PENU FRONTEND
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Vasavi Penugonda page inventory
          </h1>
          <p className="mt-4 max-w-3xl text-stone-600">
            The original public endpoints are now tracked here as migration
            work. Each page will move from captured source material to usable
            content, media, UI, API data, and verified implementation.
          </p>
        </header>

        <section className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Metric label="Original endpoints" value={summary.totalEndpoints} />
          <Metric label="Reachable source pages" value={summary.reachableEndpoints} />
          <Metric label="Frontend complete" value={`${summary.frontendComplete}/${summary.totalEndpoints}`} />
          <Metric label="Content complete" value={`${summary.contentComplete}/${summary.totalEndpoints}`} />
        </section>

        <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          <div className="border-b border-stone-200 px-5 py-4">
            <h2 className="font-semibold">Migration checklist</h2>
            <p className="mt-1 text-sm text-stone-500">
              Source capture is separate from completion in the new frontend.
            </p>
          </div>

          <div className="divide-y divide-stone-200">
            {pages.map((page) => (
              <article key={page.key} className="p-5">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{page.name}</h3>
                      <span className="rounded-full bg-stone-100 px-2 py-1 text-xs text-stone-500">
                        {page.area}
                      </span>
                      <span className="rounded-full bg-stone-100 px-2 py-1 text-xs text-stone-500">
                        source {page.sourceHttpStatus}
                      </span>
                    </div>
                    <p className="mt-2 break-all font-mono text-xs text-stone-500">
                      {page.originalUrl}
                    </p>
                    <p className="mt-2 text-sm text-stone-600">{page.notes}</p>
                  </div>
                  <p className="shrink-0 rounded-lg bg-stone-100 px-3 py-2 font-mono text-xs text-stone-700">
                    {page.suggestedRoute}
                  </p>
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-6">
                  <Progress label="Content" value={page.contentStatus} />
                  <Progress label="Images" value={page.imageStatus} />
                  <Progress label="Video/audio" value={page.videoAudioStatus} />
                  <Progress label="UI" value={page.frontendStatus} />
                  <Progress label="API" value={page.apiStatus} />
                  <Progress label="QA" value={page.qaStatus} />
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-stone-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}

function Progress({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border border-stone-200 px-3 py-2">
      <span className="text-xs text-stone-500">{label}</span>
      <Status value={value} />
    </div>
  );
}
