"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ContentImage } from "@/components/content-image";
import type { VasaviDhamContent } from "@/lib/site-content-types";
import styles from "./completed-projects-timeline.module.css";

type Project = VasaviDhamContent["projects"][number];
type ProjectGroup = { key: string; year: string | null; projects: Project[] };

function groupProjects(projects: readonly Project[]): ProjectGroup[] {
  const groups = new Map<string, ProjectGroup>();
  for (const project of projects) {
    const year = project.date.match(/\b(?:19|20)\d{2}\b/)?.[0] ?? null;
    const key = year ?? "undated";
    const group = groups.get(key) ?? { key, year, projects: [] };
    group.projects.push(project);
    groups.set(key, group);
  }
  // Dates keep their original wording and source order within each year.
  return [...groups.values()].sort((a, b) =>
    (a.year === null ? Infinity : Number(a.year)) -
    (b.year === null ? Infinity : Number(b.year)));
}

export function CompletedProjectsTimeline({ projects }: { projects: VasaviDhamContent["projects"] }) {
  const groups = groupProjects(projects);
  const datedGroups = groups.filter((group) => group.year !== null);
  const [activeGroup, setActiveGroup] = useState(groups[0]?.key ?? "");
  const rootRef = useRef<HTMLDivElement>(null);
  const groupRefs = useRef(new Map<string, HTMLElement>());
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const header = document.querySelector<HTMLElement>(".temple-header");
    if (!root) return;

    let observer: IntersectionObserver | undefined;
    let headerHeight = 88;
    const visibleGroups = new Set<HTMLElement>();
    function observeGroups() {
      headerHeight = header?.getBoundingClientRect().height ?? 88;
      root?.style.setProperty("--project-header-height", `${headerHeight}px`);
      observer?.disconnect();
      visibleGroups.clear();
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const element = entry.target as HTMLElement;
          if (entry.isIntersecting) visibleGroups.add(element);
          else visibleGroups.delete(element);
        }
        const first = [...visibleGroups].sort((a, b) =>
          a.getBoundingClientRect().top - b.getBoundingClientRect().top)[0];
        if (first?.dataset.projectYear) setActiveGroup(first.dataset.projectYear);
      }, { rootMargin: `-${Math.ceil(headerHeight + 100)}px 0px -35% 0px`, threshold: 0 });
      groupRefs.current.forEach((element) => observer?.observe(element));
    }

    const resizeObserver = new ResizeObserver(observeGroups);
    if (header) resizeObserver.observe(header);
    observeGroups();
    return () => { observer?.disconnect(); resizeObserver.disconnect(); };
  }, [projects]);

  function jumpToGroup(key: string) {
    const target = groupRefs.current.get(key);
    if (!target) return;
    const headerHeight = document.querySelector(".temple-header")?.getBoundingClientRect().height ?? 88;
    const navHeight = navRef.current?.getBoundingClientRect().height ?? 90;
    const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - navHeight - 20;
    setActiveGroup(key);
    window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    // Keep a selected year visible on the horizontally scrollable mobile rail.
    navRef.current?.querySelector<HTMLButtonElement>(`[data-year-button="${key}"]`)
      ?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "instant" });
  }

  if (!projects.length) return null;
  return (
    <div ref={rootRef} className={styles.timeline}>
      <div className={styles.overview}>
        {datedGroups.length > 0 && <p className={styles.range}>{datedGroups[0].year}<span aria-hidden="true">&ndash;</span>{datedGroups[datedGroups.length - 1].year}</p>}
        <p className={styles.total}>{projects.length} completed projects<ArrowDown size={17} aria-hidden="true" /></p>
      </div>

      <nav ref={navRef} className={styles.yearNav} aria-label="Completed projects by year">
        <div className={styles.yearTrack}>
          {groups.map((group) => <button key={group.key} type="button" data-year-button={group.key}
            className={`${styles.yearButton} ${activeGroup === group.key ? styles.activeYear : ""}`}
            aria-current={activeGroup === group.key ? "step" : undefined}
            aria-controls={`completed-projects-${group.key}`}
            aria-label={`${group.year ?? "Date not listed"}, ${group.projects.length} ${group.projects.length === 1 ? "project" : "projects"}`}
            onClick={() => jumpToGroup(group.key)}>
            <span className={styles.yearDot} aria-hidden="true" />
            <span>{group.year ?? "Date not listed"}</span><span className={styles.yearCount}>{group.projects.length}</span>
          </button>)}
        </div>
      </nav>

      <div className={styles.chapters}>
        {groups.map((group) => <section key={group.key} id={`completed-projects-${group.key}`}
          data-project-year={group.key} aria-labelledby={`completed-projects-heading-${group.key}`}
          ref={(element) => { if (element) groupRefs.current.set(group.key, element); else groupRefs.current.delete(group.key); }}
          className={`${styles.chapter} ${group.year === null ? styles.undatedChapter : ""}`}>
          <div className={styles.yearHeading}>
            <span className={styles.chapterDot} aria-hidden="true" />
            <h3 id={`completed-projects-heading-${group.key}`}>{group.year ?? "More completed projects"}</h3>
            <p>{group.year === null ? "Date not listed" : `${group.projects.length} ${group.projects.length === 1 ? "project" : "projects"}`}</p>
          </div>
          <div className={`${styles.projects} ${group.projects.length === 1 ? styles.singleProject : ""}`}>
            {group.projects.map((project, index) => <article key={`${project.date}-${project.title}-${index}`} className={styles.project}>
              {project.image && <a className={styles.image} href={project.image} target="_blank" rel="noreferrer" aria-label={`View image: ${project.title}`}>
                <ContentImage src={project.image} alt={project.title} loading="lazy" />
                <span className={styles.imageAction} aria-hidden="true"><ArrowUpRight size={15} /></span>
              </a>}
              <div className={styles.projectCopy}>
                <p className={styles.date}>{project.date}</p>
                <h4>{project.title}</h4>
              </div>
            </article>)}
          </div>
        </section>)}
      </div>
    </div>
  );
}
