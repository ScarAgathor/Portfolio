/* eslint-disable @next/next/no-img-element */
// Plain <img> on purpose: GitHub Pages has no image optimizer, and this keeps
// basePath handling explicit through withBasePath().

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getProjectSlugs, withBasePath } from "@/lib/projects";

// Static export: every project page is built ahead of time from content/projects/*.md
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

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <main className="mx-auto max-w-[1100px] px-4 py-12 md:py-16">
      <Link
        href="/#projects"
        className="font-mono text-sm text-neutral-500 hover:text-teal-700 dark:text-neutral-400 dark:hover:text-teal-300"
      >
        ← Back to projects
      </Link>

      {/* 1. Cover photo */}
      {project.cover && (
        <img
          src={withBasePath(project.cover)}
          alt={`${project.title} cover`}
          className="mt-6 aspect-[16/9] w-full rounded-xl border border-neutral-200 object-cover dark:border-neutral-800"
        />
      )}

      {/* 2. Title, meta, tags */}
      <header className="mt-8 max-w-[70ch]">
        <h1 className="text-2xl font-bold leading-tight md:text-[28px]">
          {project.title}
        </h1>

        <p className="mt-2 text-neutral-600 dark:text-neutral-400">{project.summary}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-sm text-neutral-500 dark:text-neutral-400">
          {project.role && <span>{project.role}</span>}
          {project.date && <span>{project.date}</span>}
          {project.status && (
            <span className="rounded-full border border-teal-700/40 px-2 py-0.5 text-teal-700 dark:border-teal-300/40 dark:text-teal-300">
              {project.status}
            </span>
          )}
        </div>

        {project.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-neutral-100 px-3 py-1 font-mono text-xs dark:bg-neutral-800"
              >
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
                className="text-teal-700 underline underline-offset-4 dark:text-teal-300"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        )}
      </header>

      {/* 3–7. Problem, My role, Tech, Photos, Result — written in the Markdown file */}
      <article
        className="prose prose-neutral mt-10 max-w-[70ch] dark:prose-invert prose-headings:font-semibold prose-a:text-teal-700 prose-img:rounded-xl dark:prose-a:text-teal-300"
        dangerouslySetInnerHTML={{ __html: project.html }}
      />

      {/* 8. Back link */}
      <div className="mt-12 border-t border-neutral-200 pt-6 dark:border-neutral-800">
        <Link
          href="/#projects"
          className="font-mono text-sm text-neutral-500 hover:text-teal-700 dark:text-neutral-400 dark:hover:text-teal-300"
        >
          ← Back to projects
        </Link>
      </div>
    </main>
  );
}