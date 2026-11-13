// One card in the home page project grid
// Plain <img> on purpose since GitHub Pages has no image optimizer

import Link from "next/link";
import type { ProjectMeta } from "@/lib/projects";
import { projectHref, withBasePath } from "@/lib/projects";

const max_card_tags = 4;

function CardBody({ project }: { project: ProjectMeta }) {
  const shown_tags = project.tags.slice(0, max_card_tags);

  return (
    <>
      <div className="aspect-[4/3] overflow-hidden border-b border-border bg-chip">
        {project.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={withBasePath(project.cover)}
            alt={`${project.title} cover`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-6 text-center font-mono text-sm text-muted">
            {project.title}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-snug">{project.title}</h3>
          {project.status && (
            <span className="shrink-0 rounded-full border border-accent/40 px-2 py-0.5 font-mono text-xs text-accent">
              {project.status}
            </span>
          )}
        </div>

        <p className="mt-2 text-sm text-muted">{project.summary}</p>

        {shown_tags.length > 0 && (
          <ul className="mt-auto flex flex-wrap gap-2 pt-4">
            {shown_tags.map((tag) => (
              <li key={tag} className="rounded-full bg-chip px-3 py-1 font-mono text-xs">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default function ProjectCard({ project }: { project: ProjectMeta }) {
  const card_style =
    "group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors";
  const clickable_style = `${card_style} hover:border-accent focus-visible:border-accent`;
  const target = projectHref(project);

  if (!target) {
    return (
      <div className={card_style}>
        <CardBody project={project} />
      </div>
    );
  }

  if (target.external) {
    return (
      <a href={target.href} target="_blank" rel="noopener noreferrer" className={clickable_style}>
        <CardBody project={project} />
      </a>
    );
  }

  return (
    <Link href={target.href} className={clickable_style}>
      <CardBody project={project} />
    </Link>
  );
}