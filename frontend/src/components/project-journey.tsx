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
    <div className="mt-9 grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-[1.5rem] bg-[#2c1916] p-6 text-white shadow-[0_18px_50px_rgba(78,42,24,0.14)] sm:p-7">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300">The journey</p>
          <p className="mt-3 text-sm leading-6 text-[#f5e5d5]">Scroll through the moments that shaped Vasavi Dham.</p>
          <nav aria-label="Project timeline" className="mt-6 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
            {eras.map((era) => {
              const firstIndex = projects.findIndex((project) => getYear(project.date) === era);
              const isActive = getYear(activeProject?.date ?? "") === era;

              return (
                <button
                  key={era}
                  type="button"
                  aria-current={isActive ? "step" : undefined}
                  onClick={() => jumpToEra(era)}
                  className={`shrink-0 rounded-full px-3 py-2 text-left text-sm font-semibold transition-colors lg:rounded-xl ${isActive ? "bg-[#f5c66b] text-[#3b241c]" : "text-[#f5e5d5] hover:bg-white/10"}`}
                >
                  <span>{era}</span>
                  <span className={`ml-2 text-xs ${isActive ? "text-[#7d3218]" : "text-[#cfae9b]"}`}>{String(firstIndex + 1).padStart(2, "0")}</span>
                </button>
              );
            })}
          </nav>

          {activeProject && (
            <div className="mt-7 border-t border-white/15 pt-5" aria-live="polite">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#cfae9b]">Now viewing</p>
              <p className="mt-2 text-sm font-semibold text-amber-200">{activeProject.date}</p>
              <h3 className="display-type mt-2 text-2xl leading-tight">{activeProject.title}</h3>
              <p className="mt-3 text-xs font-semibold text-[#cfae9b]">Milestone {String(activeIndex + 1).padStart(2, "0")} of {projects.length}</p>
            </div>
          )}
        </div>
      </aside>

      <div className="relative">
        <div className="pointer-events-none absolute bottom-8 left-4 top-8 w-px bg-[#d6b681] sm:left-6 lg:left-1/2 lg:-translate-x-1/2">
          <div className="w-full bg-[#a45826] transition-[height] duration-500 motion-reduce:transition-none" style={{ height: `${progress}%` }} />
        </div>

        {projects.map((project, index) => {
          const isActive = index === activeIndex;
          const contentOnLeft = index % 2 === 1;

          return (
            <article
              key={`${project.date}-${project.title}`}
              ref={(element) => { itemRefs.current[index] = element; }}
              data-index={index}
              className="relative scroll-mt-32 py-7 pl-12 sm:pl-16 lg:grid lg:grid-cols-[minmax(0,1fr)_4.5rem_minmax(0,1fr)] lg:gap-0 lg:py-10 lg:pl-0"
            >
              <div className={`lg:row-start-1 ${contentOnLeft ? "lg:col-start-1" : "lg:col-start-3"}`}>
                <div className={`overflow-hidden rounded-[1.5rem] bg-white shadow-[0_12px_35px_rgba(78,42,24,0.07)] ring-1 transition-[box-shadow,transform,ring-color] duration-500 motion-reduce:transition-none ${isActive ? "scale-[1.015] ring-2 ring-[#a45826] shadow-[0_20px_45px_rgba(78,42,24,0.14)]" : "ring-[#eadfd2]"}`}>
                  <div className="flex items-center justify-center border-b border-[#eadfd2] bg-[#fbf2e6] p-4 sm:p-5">
                    {project.image ? <ContentImage src={project.image} alt={project.title} className="h-auto max-h-56 w-auto max-w-full object-contain" /> : <p className="py-8 text-center text-xs text-stone-500">{unavailableImage}</p>}
                  </div>
                  <div className="p-5 sm:p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a45826]">{project.date}</p>
                    <h3 className="display-type mt-2 text-2xl leading-tight text-[#3b241c]">{project.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-stone-600">{project.description}</p>
                  </div>
                </div>
              </div>

              <div className="absolute left-4 top-12 flex -translate-x-1/2 items-center justify-center sm:left-6 lg:static lg:col-start-2 lg:row-start-1 lg:translate-x-0">
                <span className={`flex h-9 w-9 items-center justify-center rounded-full border-4 border-[#f7f3ed] text-xs font-bold transition-colors duration-500 motion-reduce:transition-none ${isActive ? "bg-[#f5c66b] text-[#3b241c]" : "bg-[#d6b681] text-[#634a3c]"}`}>{String(index + 1).padStart(2, "0")}</span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
