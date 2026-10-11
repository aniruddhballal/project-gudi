"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { ContentImage } from "@/components/content-image";

type JourneyProject = {
  image: string | null;
  date: string;
  title: string;
  description: string;
};

type ProjectJourneyProps = {
  projects: readonly JourneyProject[];
  unavailableImage: string;
};

function getYear(date: string) {
  return date.match(/\b20\d{2}\b/)?.[0] ?? "Ongoing";
}

export function ProjectJourney({ projects, unavailableImage }: ProjectJourneyProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const eras = useMemo(() => Array.from(new Set(projects.map((project) => getYear(project.date)))), [projects]);
  const activeProject = projects[activeIndex] ?? projects[0];
  const progress = projects.length > 1 ? (activeIndex / (projects.length - 1)) * 100 : 100;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => Math.abs(left.boundingClientRect.top) - Math.abs(right.boundingClientRect.top));

        const index = visible[0]?.target.getAttribute("data-index");
        if (index) setActiveIndex(Number(index));
      },
      { rootMargin: "-32% 0px -52%", threshold: [0, 0.25, 0.6] },
    );

    itemRefs.current.forEach((item) => item && observer.observe(item));
    return () => observer.disconnect();
  }, [projects.length]);

  function jumpToEra(era: string) {
    const index = projects.findIndex((project) => getYear(project.date) === era);
    const target = itemRefs.current[index];
    if (!target) return;

    setActiveIndex(index);
    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "center",
    });
  }

  return (
    <div className="mt-9">
      <div className="sticky top-20 z-20 mb-8 rounded-[1.25rem] bg-[#2c1916] p-4 text-white shadow-[0_18px_50px_rgba(78,42,24,0.14)] sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="shrink-0">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">The journey</p>
            <p className="mt-1 text-sm text-[#f5e5d5]" aria-live="polite">{activeProject?.date ?? "Vasavi Dham"} · {String(activeIndex + 1).padStart(2, "0")} / {projects.length}</p>
          </div>
          <nav aria-label="Project timeline" className="flex min-w-0 gap-1 overflow-x-auto pb-1">
            {eras.map((era) => {
              const firstIndex = projects.findIndex((project) => getYear(project.date) === era);
              const isActive = getYear(activeProject?.date ?? "") === era;

              return (
                <button
                  key={era}
                  type="button"
                  aria-current={isActive ? "step" : undefined}
                  onClick={() => jumpToEra(era)}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${isActive ? "bg-[#f5c66b] text-[#3b241c]" : "text-[#f5e5d5] hover:bg-white/10"}`}
                >
                  <span>{era}</span>
                  <span className={`ml-1.5 ${isActive ? "text-[#7d3218]" : "text-[#cfae9b]"}`}>{String(firstIndex + 1).padStart(2, "0")}</span>
                </button>
              );
            })}
          </nav>
        </div>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/15"><div className="h-full bg-[#f5c66b] transition-[width] duration-500 motion-reduce:transition-none" style={{ width: `${progress}%` }} /></div>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute bottom-8 left-5 top-8 w-px bg-[#d6b681] md:left-16">
          <div className="w-full bg-[#a45826] transition-[height] duration-500 motion-reduce:transition-none" style={{ height: `${progress}%` }} />
        </div>

        {projects.map((project, index) => {
          const isActive = index === activeIndex;
          const imageOnRight = index % 2 === 0;

          return (
            <article key={`${project.date}-${project.title}`} ref={(element) => { itemRefs.current[index] = element; }} data-index={index} className="relative grid scroll-mt-32 gap-5 border-b border-[#eadfd2] py-8 pl-10 sm:gap-7 sm:pl-14 md:grid-cols-[8rem_minmax(0,1fr)_minmax(15rem,0.8fr)] md:gap-8 md:pl-0 md:py-10">
              <div className="relative md:col-start-1 md:pr-7 md:text-right">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a45826]">{project.date}</p>
                <p className="mt-1 text-xs font-semibold text-stone-400">Milestone {String(index + 1).padStart(2, "0")}</p>
              </div>

              <div className={`md:row-start-1 ${imageOnRight ? "md:col-start-3" : "md:col-start-2"}`}>
                <div className="flex items-center justify-center rounded-[1.25rem] bg-[#fbf2e6] p-4 ring-1 ring-[#eadfd2] sm:p-5">
                  {project.image ? <ContentImage src={project.image} alt={project.title} className="h-auto max-h-64 w-auto max-w-full object-contain" /> : <p className="py-8 text-center text-xs text-stone-500">{unavailableImage}</p>}
                </div>
              </div>

              <div className={`md:row-start-1 ${imageOnRight ? "md:col-start-2" : "md:col-start-3"}`}>
                <div className={`rounded-[1.25rem] p-5 transition-[background-color,box-shadow] duration-500 motion-reduce:transition-none sm:p-7 ${isActive ? "bg-white shadow-[0_16px_40px_rgba(78,42,24,0.1)] ring-2 ring-[#a45826]" : "bg-white/60 ring-1 ring-[#eadfd2]"}`}>
                  <h3 className="display-type text-2xl leading-tight text-[#3b241c] sm:text-3xl">{project.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-stone-600">{project.description}</p>
                </div>
              </div>

              <div className="absolute left-5 top-10 flex -translate-x-1/2 items-center justify-center md:left-16">
                <span className={`flex h-9 w-9 items-center justify-center rounded-full border-4 border-[#f7f3ed] text-xs font-bold transition-colors duration-500 motion-reduce:transition-none ${isActive ? "bg-[#f5c66b] text-[#3b241c]" : "bg-[#d6b681] text-[#634a3c]"}`}>{String(index + 1).padStart(2, "0")}</span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
