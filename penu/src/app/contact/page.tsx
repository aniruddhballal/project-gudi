import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { contactContent } from "@/content/contact";
import { homeContent } from "@/content/home";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      <SiteHeader />

      <section className="border-b border-stone-200 bg-amber-950 px-4 py-16 text-white sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">Visit and connect</p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{contactContent.title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-amber-50">Reach Vasavi Shanti Dham in Penugonda or contact the Trust office in Bangalore.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-8 lg:px-12">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200">
          <iframe title="Vasavi Penugonda Trust location" src={contactContent.mapEmbed} className="h-[24rem] w-full border-0" loading="lazy" allowFullScreen />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-12 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12">
        <div className="space-y-5">
          <ContactCard label="Location" value={contactContent.location} />
          <ContactCard label="Email" value={contactContent.email} />
          <ContactCard label="Call" value={contactContent.phone} />
        </div>

        <form className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
          <h2 className="text-2xl font-semibold">Send a message</h2>
          <p className="mt-2 text-sm text-stone-500">The current site exposes this form; submission will be connected to the backend contact API in V2.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Field id="name" label="Your Name" />
            <Field id="email" label="Your Email" type="email" />
            <Field id="phone" label="Your Contact Number" type="tel" />
          </div>
          <div className="mt-4">
            <Field id="subject" label="Subject" />
          </div>
          <div className="mt-4">
            <label htmlFor="message" className="text-sm font-medium">Message</label>
            <textarea id="message" name="message" rows={5} placeholder="Message" className="mt-2 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-amber-700" />
          </div>
          <button type="button" className="mt-5 rounded-lg bg-amber-900 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-800">Send Message</button>
        </form>
      </section>

      <section className="bg-white px-4 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2">
          <AddressCard title="Trust Head Office" lines={contactContent.headOffice} />
          <AddressCard title="Vasavi Shanthi Dham" lines={contactContent.vasaviDham} />
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-white px-4 py-6 text-sm text-stone-500 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl justify-between gap-4">
          <p>{homeContent.siteTitle}</p>
          <Link href="/" className="hover:text-stone-900">Back to home</Link>
        </div>
      </footer>
    </main>
  );
}

function ContactCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">{label}</p>
      <p className="mt-2 text-sm leading-7 text-stone-600">{value}</p>
    </div>
  );
}

function Field({ id, label, type = "text" }: { id: string; label: string; type?: string }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      <input id={id} name={id} type={type} placeholder={label} className="mt-2 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-amber-700" />
    </div>
  );
}

function AddressCard({ title, lines }: { title: string; lines: readonly string[] }) {
  return (
    <address className="not-italic">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="mt-3 text-sm leading-7 text-stone-600">
        {lines.map((line) => <p key={line}>{line}</p>)}
      </div>
    </address>
  );
}
