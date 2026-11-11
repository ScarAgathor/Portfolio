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
  summary: string;      // one line, shown on the card
  date: string;         // "2026-10" or "Fall 2026 – Spring 2027", shown as written
  sortDate: string;     // ISO-ish date used only for ordering the grid
  status?: string;      // e.g. "In progress", "Complete"
  role?: string;        // e.g. "UI Engineer"
  tags: string[];
  cover?: string;       // e.g. "/images/projects/exoskeleton-ui/cover.webp"
  featured?: boolean;
  links: ProjectLink[];
  has_page: boolean;    // true when the Markdown file has body text, so a project page gets built
};

export type Project = ProjectMeta & { html: string };

// gray-matter turns unquoted YAML dates into Date objects, normalize to text
function asText(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return value == null ? "" : String(value);
}

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

// Only projects with body text get their own page
export function getProjectSlugs(): string[] {
  return allSlugs().filter((slug) => readProject(slug).content.trim().length > 0);
}

// Frontmatter only, for the project grid
// Featured projects first, then newest first
export function getAllProjects(): ProjectMeta[] {
  return allSlugs()
    .map((slug) => {
      const { data, content } = readProject(slug);
      return toMeta(slug, data, content);
    })
    .sort(
      (a, b) =>
        Number(b.featured) - Number(a.featured) || b.sortDate.localeCompare(a.sortDate),
    );
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