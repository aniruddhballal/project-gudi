import type { ProjectDate } from "./site-content-types";

export function projectYear(project: ProjectDate): string | null {
  if (project.datePrecision === "unknown") return null;
  if (Number.isInteger(project.year) && project.year != null) return String(project.year);
  return project.date?.match(/\b(?:19|20)\d{2}\b/)?.[0] ?? null;
}

export function projectDateLabel(project: ProjectDate): string {
  if (project.date) return project.date;
  const year = projectYear(project);
  if (!year) return "Date not listed";
  if (project.datePrecision === "year" || !project.month) return year;
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][project.month - 1];
  if (!month) return year;
  return project.datePrecision === "day" && project.day ? `${project.day} ${month} ${year}` : `${month} ${year}`;
}
