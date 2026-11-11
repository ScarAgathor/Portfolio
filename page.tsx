// Full project page, one per Markdown file with body text in content/projects

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getProjectSlugs, withBasePath } from "@/lib/projects";

// Static export: every project page is built ahead of time
export const dynamicParams = false;

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} | Edidiong Ekong`,
    description: project.summary,
  };
}

const back_link_style = "font-mono text-sm text-muted transition-colors hover:text-accent";

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <main className="mx-auto w-full max-w-[1100px] px-4 py-12 md:py-16">
      <Link href="/#projects" className={back_link_style}>
        ← Back to projects
      </Link>

      {project.cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={withBasePath(project.cover)}
          alt={`${project.title} cover`}
          className="mt-6 aspect-[16/9] w-full rounded-xl border border-border object-cover"
        />
      )}

      <header className="mt-8 max-w-[70ch]">
        <h1 className="text-2xl font-bold leading-tight md:text-[28px]">{project.title}</h1>
        <p className="mt-2 text-muted">{project.summary}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-sm text-muted">
          {project.role && <span>{project.role}</span>}
          {project.date && <span>{project.date}</span>}
          {project.status && (
            <span className="rounded-full border border-accent/40 px-2 py-0.5 text-accent">
              {project.status}
            </span>
          )}
        </div>

        {project.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag} className="rounded-full bg-chip px-3 py-1 font-mono text-xs">
                {tag}
              </li>
            ))}
          </ul>
        )}

        {project.links.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-4"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        )}
      </header>

      <article
        className="prose prose-neutral mt-10 max-w-[70ch] dark:prose-invert prose-headings:font-semibold prose-a:text-accent prose-img:rounded-xl"
        dangerouslySetInnerHTML={{ __html: project.html }}
      />

      <div className="mt-12 border-t border-border pt-6">
        <Link href="/#projects" className={back_link_style}>
          ← Back to projects
        </Link>
      </div>
    </main>
  );
}
