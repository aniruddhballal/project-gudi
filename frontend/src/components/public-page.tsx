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
    <section className="relative overflow-hidden bg-[#2c1916] px-4 py-16 text-white sm:px-8 lg:px-12 lg:py-20">
      <div className="pointer-events-none absolute -right-24 -top-28 h-96 w-96 rounded-full border-[34px] border-[#e9b86d]/10" />
      <div className="relative mx-auto max-w-7xl">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-300">{eyebrow}</p>
        <h1 className="display-type mt-4 max-w-5xl text-5xl leading-[0.98] sm:text-6xl lg:text-7xl">{title}</h1>
        {description && <p className="mt-6 max-w-3xl text-lg leading-8 text-[#f5e5d5]">{description}</p>}
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
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a45826]">{eyebrow}</p>
      <h2 className="display-type mt-3 text-4xl leading-tight text-[#3b241c] sm:text-5xl">{title}</h2>
      {description && <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">{description}</p>}
    </div>
  );
}

export function PrimaryLink({ href, children, external = false }: { href: string; children: ReactNode; external?: boolean }) {
  const className = "group inline-flex w-fit items-center rounded-full bg-[#9d431f] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#7d3218]";
  const content = <>{children}<ArrowRight aria-hidden="true" className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></>;

  return external ? <a href={href} target="_blank" rel="noreferrer" className={className}>{content}</a> : <Link href={href} className={className}>{content}</Link>;
}

export function SecondaryLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="group inline-flex w-fit items-center rounded-full border border-[#9d431f] px-5 py-3 text-sm font-bold text-[#9d431f] transition hover:bg-[#9d431f] hover:text-white">{children}<ArrowRight aria-hidden="true" className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>;
}
