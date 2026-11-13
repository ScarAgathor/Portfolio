import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

// All project Markdown files live here, one file per project
// The filename (without .md) becomes the URL slug: exoskeleton-ui.md -> /projects/exoskeleton-ui/
const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");
const PUBLIC_DIR = path.join(process.cwd(), "public");

// How many featured cards the home page shows at most
const MAX_HOME_PROJECTS = 6;

// Same value next.config.ts uses, empty locally
export const basePath = process.env.PAGES_BASE_PATH || "";

// Plain <img> tags and Markdown images don't get basePath added automatically (next/link does)
// Run any "/images/..." path through this
export function withBasePath(src?: string) {
  if (!src) return src;
  return src.startsWith("/") && !src.startsWith("//") ? `${basePath}${src}` : src;
}

export type ProjectLink = { label: string; href: string };

export type ProjectMeta = {
  slug: string;
  title: string;
  summary: string;      // one line, shown on cards and in the list
  date: string;         // "2026-10" or "Fall 2026 – Spring 2027", shown as written
  sortDate: string;     // YYYY-MM-DD, used for ordering and for the year groups
  status?: string;      // e.g. "In progress", "Complete"
  role?: string;        // e.g. "UI Engineer"
  category?: string;    // e.g. "Course labs", "Personal", "Team project", "Workshop"
  tags: string[];
  cover?: string;       // e.g. "/images/projects/exoskeleton-ui/cover.webp"
  featured: boolean;    // true shows it on the home page grid
  links: ProjectLink[];
  has_page: boolean;    // true when the Markdown file has body text, so a project page gets built
};

export type Project = ProjectMeta & { html: string };

export type YearGroup = { year: string; projects: ProjectMeta[] };

// gray-matter turns unquoted YAML dates into Date objects, normalize to text
function asText(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return value == null ? "" : String(value);
}

// Drop a cover path if the image file isn't in public/ yet, so cards show a placeholder instead of a broken image
function existingCover(value: unknown): string | undefined {
  const cover = value ? asText(value) : "";
  if (!cover) return undefined;
  return fs.existsSync(path.join(PUBLIC_DIR, cover)) ? cover : undefined;
}

function toMeta(slug: string, data: Record<string, unknown>, body: string): ProjectMeta {
  const date = asText(data.date);
  return {
    slug,
    title: asText(data.title) || slug,
    summary: asText(data.summary),
    date,
    sortDate: asText(data.sortDate) || date,
    status: data.status ? asText(data.status) : undefined,
    role: data.role ? asText(data.role) : undefined,
    category: data.category ? asText(data.category) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(asText) : [],
    cover: existingCover(data.cover),
    featured: Boolean(data.featured),
    links: Array.isArray(data.links) ? (data.links as ProjectLink[]) : [],
    has_page: body.trim().length > 0,
  };
}

function readProject(slug: string) {
  return matter(fs.readFileSync(path.join(PROJECTS_DIR, `${slug}.md`), "utf8"));
}

function allSlugs(): string[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

// Where a project's card or row should link
// Its own page if it has body text, otherwise its first external link, otherwise nowhere
export function projectHref(project: ProjectMeta): { href: string; external: boolean } | null {
  if (project.has_page) return { href: `/projects/${project.slug}/`, external: false };
  if (project.links[0]) return { href: project.links[0].href, external: true };
  return null;
}

// Only projects with body text get their own page
export function getProjectSlugs(): string[] {
  return allSlugs().filter((slug) => readProject(slug).content.trim().length > 0);
}

// Every project, newest first
export function getAllProjects(): ProjectMeta[] {
  return allSlugs()
    .map((slug) => {
      const { data, content } = readProject(slug);
      return toMeta(slug, data, content);
    })
    .sort((a, b) => b.sortDate.localeCompare(a.sortDate));
}

// Projects for the home page grid
// Featured ones if any are marked, otherwise the newest few
export function getHomeProjects(): ProjectMeta[] {
  const all_projects = getAllProjects();
  const featured_projects = all_projects.filter((project) => project.featured);
  const chosen = featured_projects.length > 0 ? featured_projects : all_projects;
  return chosen.slice(0, MAX_HOME_PROJECTS);
}

// Every project grouped by the year in sortDate, newest year first
export function getProjectsByYear(): YearGroup[] {
  const groups = new Map<string, ProjectMeta[]>();
  for (const project of getAllProjects()) {
    const year = /^\d{4}/.test(project.sortDate) ? project.sortDate.slice(0, 4) : "Other";
    groups.set(year, [...(groups.get(year) ?? []), project]);
  }
  return [...groups.entries()]
    .sort(([a], [b]) => (a === "Other" ? 1 : b === "Other" ? -1 : b.localeCompare(a)))
    .map(([year, projects]) => ({ year, projects }));
}

// Frontmatter plus rendered HTML body, for a single project page
export async function getProject(slug: string): Promise<Project | null> {
  const file = path.join(PROJECTS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;

  const { data, content } = readProject(slug);
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content);

  // Prefix root-relative image and link paths in the Markdown body with basePath
  const html = processed
    .toString()
    .replace(/(src|href)="\/(?!\/)/g, `$1="${basePath}/`);

  return { ...toMeta(slug, data, content), html };
}