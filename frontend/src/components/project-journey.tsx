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
};

function getYear(date: string) {
  return date.match(/\b20\d{2}\b/)?.[0] ?? "Ongoing";
}

export function ProjectJourney({ projects }: ProjectJourneyProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const eras = useMemo(() => Array.from(new Set(projects.map((project) => getYear(project.date)))), [projects]);
  const activeProject = projects[activeIndex] ?? projects[0];
  const progress = projects.length > 1 ? (activeIndex / (projects.length - 1)) * 100 : 100;

  useEffect(() => {
    let frame = 0;

    function updateActiveMilestone() {
      frame = 0;
      const readingLine = window.innerHeight * 0.34;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      itemRefs.current.forEach((item, index) => {
        if (!item) return;

        const distance = Math.abs(item.getBoundingClientRect().top - readingLine);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex((currentIndex) => currentIndex === closestIndex ? currentIndex : closestIndex);
    }

    function handleScroll() {
      if (frame === 0) frame = window.requestAnimationFrame(updateActiveMilestone);
    }

    updateActiveMilestone();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
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
    <div className="mt-9 grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-[1.5rem] bg-[#2c1916] p-5 text-white shadow-[0_18px_50px_rgba(78,42,24,0.14)] sm:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">The journey</p>
          <p className="mt-2 text-sm leading-6 text-[#f5e5d5]">Scroll through the moments that shaped Vasavi Dham.</p>
          <nav aria-label="Project timeline" className="mt-5 space-y-1.5">
            {eras.map((era) => {
              const firstIndex = projects.findIndex((project) => getYear(project.date) === era);
              const isActive = getYear(activeProject?.date ?? "") === era;

              return (
                <button
                  key={era}
                  type="button"
                  aria-current={isActive ? "step" : undefined}
                  onClick={() => jumpToEra(era)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-semibold transition-colors ${isActive ? "bg-[#f5c66b] text-[#3b241c]" : "text-[#f5e5d5] hover:bg-white/10"}`}
                >
                  <span>{era}</span>
                  <span className={isActive ? "text-[#7d3218]" : "text-[#cfae9b]"}>{String(firstIndex + 1).padStart(2, "0")}</span>
                </button>
              );
            })}
          </nav>
          <div className="mt-5 border-t border-white/15 pt-4" aria-live="polite">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#cfae9b]">Progress</p>
            <p className="mt-1 text-xl font-semibold text-amber-200">{String(activeIndex + 1).padStart(2, "0")} <span className="text-sm font-normal text-[#cfae9b]">/ {projects.length}</span></p>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/15"><div className="h-full bg-[#f5c66b] transition-[width] duration-500 motion-reduce:transition-none" style={{ width: `${progress}%` }} /></div>
          </div>
        </div>
      </aside>

      <div className="relative">
        <div className="pointer-events-none absolute bottom-8 left-4 top-8 w-px bg-[#d6b681] md:left-[7rem]">
          <div className="w-full bg-[#a45826] transition-[height] duration-500 motion-reduce:transition-none" style={{ height: `${progress}%` }} />
        </div>

        {projects.map((project, index) => {
          const isActive = index === activeIndex;
          const imageOnRight = index % 2 === 0;

          return (
            <article key={`${project.date}-${project.title}`} ref={(element) => { itemRefs.current[index] = element; }} data-index={index} className="relative grid scroll-mt-32 gap-5 border-b border-[#eadfd2] py-8 pl-10 sm:gap-7 sm:pl-14 md:grid-cols-[7rem_minmax(0,1fr)_minmax(12rem,0.75fr)] md:gap-7 md:pl-0 md:py-10">
              <div className="relative md:col-start-1 md:pr-6 md:text-right">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a45826]">{project.date}</p>
                <p className="mt-1 text-xs font-semibold text-stone-400">Milestone {String(index + 1).padStart(2, "0")}</p>
              </div>

              {project.image && <div className={`md:row-start-1 ${imageOnRight ? "md:col-start-3" : "md:col-start-2"}`}><div className="flex items-center justify-center rounded-[1.25rem] bg-[#fbf2e6] p-4 ring-1 ring-[#eadfd2] sm:p-5"><ContentImage src={project.image} alt={project.title} className="h-auto max-h-64 w-auto max-w-full object-contain" /></div></div>}

              <div className={`md:row-start-1 ${project.image ? (imageOnRight ? "md:col-start-2" : "md:col-start-3") : "md:col-span-2"}`}>
                <div className={`rounded-[1.25rem] p-5 transition-[background-color,box-shadow] duration-500 motion-reduce:transition-none sm:p-7 ${isActive ? "bg-white shadow-[0_16px_40px_rgba(78,42,24,0.1)] ring-2 ring-[#a45826]" : "bg-white/60 ring-1 ring-[#eadfd2]"}`}>
                  <h3 className="display-type text-2xl leading-tight text-[#3b241c] sm:text-3xl">{project.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-stone-600">{project.description}</p>
                </div>
              </div>

              <div className="absolute left-4 top-10 flex -translate-x-1/2 items-center justify-center md:left-[7rem]">
                <span className={`flex h-9 w-9 items-center justify-center rounded-full border-4 border-[#f7f3ed] text-xs font-bold transition-colors duration-500 motion-reduce:transition-none ${isActive ? "bg-[#f5c66b] text-[#3b241c]" : "bg-[#d6b681] text-[#634a3c]"}`}>{String(index + 1).padStart(2, "0")}</span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
