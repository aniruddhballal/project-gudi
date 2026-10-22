import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="page-hero relative overflow-hidden border-b border-[#dfd9cd] bg-[#f0ece2] px-4 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-[8%] hidden w-px bg-[#d8cfbd] lg:block" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-[8%] hidden h-24 w-24 translate-x-1/2 translate-y-1/2 rotate-45 border border-[#d8cfbd] lg:block" />
      <div className="relative mx-auto max-w-7xl lg:pr-[15%]">
        <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-[#8c3c2e]"><span className="h-px w-8 bg-[#a86e38]" />{eyebrow}</p>
        <h1 id="page-content" className="display-type mt-5 max-w-5xl text-5xl leading-[1.02] text-[#203b35] sm:text-6xl lg:text-7xl">{title}</h1>
        {description && <p className="mt-6 max-w-3xl text-base leading-8 text-[#4d5b52] sm:text-lg">{description}</p>}
        {children}
      </div>
    </section>
  );
}

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div>
      <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#965b35]"><span className="h-px w-7 bg-[#bd9458]" />{eyebrow}</p>
      <h2 className="display-type mt-3 max-w-4xl text-4xl leading-[1.08] text-[#203b35] sm:text-5xl">{title}</h2>
      {description && <p className="mt-4 max-w-2xl text-base leading-7 text-[#58645c]">{description}</p>}
    </div>
  );
}

export function PrimaryLink({ href, children, external = false }: { href: string; children: ReactNode; external?: boolean }) {
  const className = "group inline-flex w-fit items-center rounded-sm bg-[#a44832] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#873b2b]";
  const content = <>{children}<ArrowRight aria-hidden="true" className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></>;
  return external ? <a href={href} target="_blank" rel="noreferrer" className={className}>{content}</a> : <Link href={href} className={className}>{content}</Link>;
}

export function SecondaryLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="group inline-flex w-fit items-center rounded-sm border border-[#a44832] px-5 py-3 text-sm font-bold text-[#8c3c2e] transition hover:bg-[#a44832] hover:text-white">{children}<ArrowRight aria-hidden="true" className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>;
}
