import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageHero, PrimaryLink, SectionHeading } from "@/components/public-page";
import { getSiteContent } from "@/lib/site-content";
import { Mail, MapPin, Phone } from "lucide-react";

export default async function ContactPage() {
  const { contact: contactContent, home: homeContent, siteSettings } = await getSiteContent();
  const copy = siteSettings.copy.pages.contact;
  return (
    <main data-page="contact" className="min-h-screen bg-[#f8f6f1] text-stone-900">
      <SiteHeader />

      <PageHero eyebrow={copy.eyebrow} title={contactContent.title} description={copy.description} />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="overflow-hidden rounded-xl bg-white shadow-[0_18px_50px_rgba(78,42,24,0.08)] ring-1 ring-[#e2ddd1]">
          <div className="flex items-end justify-between gap-4 border-b border-[#e2ddd1] px-6 py-5 sm:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#965b35]">{copy.map.eyebrow}</p>
              <h2 className="display-type mt-2 text-3xl text-[#203b35]">{copy.map.title}</h2>
            </div>
            <MapPin className="h-6 w-6 text-[#965b35]" aria-hidden="true" />
          </div>
          <iframe title={copy.map.iframeTitle} src={contactContent.mapEmbed} className="h-[24rem] w-full border-0 sm:h-[32rem]" loading="lazy" allowFullScreen />
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#eee4d3] px-4 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full border-[28px] border-[#f7e7c8]/60" />
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-14">
          <div>
            <SectionHeading eyebrow={copy.trust.eyebrow} title={copy.trust.title} description={copy.trust.description} />
            <div className="mt-8 grid gap-3">
              <ContactCard icon={MapPin} label={copy.labels.location} value={contactContent.location} />
              <ContactCard icon={Mail} label={copy.labels.email} value={contactContent.email} />
              <ContactCard icon={Phone} label={copy.labels.phone} value={contactContent.phone} />
            </div>
          </div>

          <form className="grid gap-5 rounded-2xl bg-white p-6 shadow-[0_22px_60px_rgba(71,36,22,0.12)] ring-1 ring-[#e2ddd1] sm:p-8">
            <div className="border-b border-stone-200 pb-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#a44832]">{copy.form.eyebrow}</p>
              <h2 className="display-type mt-2 text-3xl text-[#244a41]">{copy.form.title}</h2>
              <p className="mt-2 text-sm leading-6 text-stone-500">{copy.form.description}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="name" label={copy.form.name} />
              <Field id="email" label={copy.form.email} type="email" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="phone" label={copy.form.phone} type="tel" />
              <Field id="subject" label={copy.form.subject} />
            </div>
            <div>
              <label htmlFor="message" className="text-sm font-medium text-stone-700">{copy.form.message}</label>
              <textarea id="message" name="message" rows={5} placeholder={copy.form.messagePlaceholder} className="mt-2 w-full rounded-xl border border-stone-300 bg-[#fffdf9] px-3 py-3 text-sm outline-none transition focus:border-[#a44832] focus:ring-4 focus:ring-[#a44832]/10" />
            </div>
            <button type="button" className="inline-flex w-fit items-center rounded-xl bg-[#a44832] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#7d3218]">{copy.form.submit}</button>
          </form>
        </div>
      </section>

      <section className="bg-white px-4 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          <AddressCard title={copy.labels.headOffice} lines={contactContent.headOffice} />
          <AddressCard title={copy.labels.dham} lines={contactContent.vasaviDham} />
        </div>
        <div className="mx-auto mt-8 max-w-7xl"><PrimaryLink href="/overview">{copy.labels.explore}</PrimaryLink></div>
      </section>

      <SiteFooter siteTitle={homeContent.siteTitle} />
    </main>
  );
}

function ContactCard({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-[#cdb98c] bg-[#eee7da]/70 p-4">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#a44832]" aria-hidden="true" />
      <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8c3c2e]">{label}</p><p className="mt-1 text-sm leading-6 text-[#4d5b52]">{value}</p></div>
    </div>
  );
}

function Field({ id, label, type = "text" }: { id: string; label: string; type?: string }) {
  return <label htmlFor={id} className="text-sm font-medium text-stone-700">{label}<input id={id} name={id} type={type} placeholder={label} className="mt-2 w-full rounded-xl border border-stone-300 bg-[#fffdf9] px-3 py-3 outline-none transition focus:border-[#a44832] focus:ring-4 focus:ring-[#a44832]/10" /></label>;
}

function AddressCard({ title, lines }: { title: string; lines: readonly string[] }) {
  return <address className="not-italic rounded-2xl bg-[#f6f0e3] p-6 ring-1 ring-[#e2ddd1]"><h2 className="display-type text-2xl text-[#203b35]">{title}</h2><div className="mt-3 text-sm leading-7 text-stone-600">{lines.map((line) => <p key={line}>{line}</p>)}</div></address>;
}
