import Link from "next/link";
import type { ProjectMeta } from "@/lib/projects";
import { getProjectsByYear, projectHref } from "@/lib/projects";

// Compact list of every project, grouped by year
// Used on the All projects page

const max_row_tags = 5;

function RowBody({ project, clickable }: { project: ProjectMeta; clickable: boolean }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div className="min-w-0">
        <h3 className="font-semibold leading-snug">
          {project.title}
          {clickable && (
            <span className="ml-1 text-muted transition-colors group-hover:text-accent">→</span>
          )}
        </h3>
        <p className="mt-1 text-sm text-muted">{project.summary}</p>
        {project.tags.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.tags.slice(0, max_row_tags).map((tag) => (
              <li key={tag} className="rounded-full bg-chip px-2.5 py-0.5 font-mono text-xs">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex shrink-0 flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted sm:flex-col sm:items-end">
        {project.category && <span>{project.category}</span>}
        {project.status && <span className="text-accent">{project.status}</span>}
      </div>
    </div>
  );
}

function ProjectRow({ project }: { project: ProjectMeta }) {
  const row_style = "group block border-b border-border py-5";
  const target = projectHref(project);

  if (!target) {
    return (
      <div className={row_style}>
        <RowBody project={project} clickable={false} />
      </div>
    );
  }

  if (target.external) {
    return (
      <a href={target.href} target="_blank" rel="noopener noreferrer" className={row_style}>
        <RowBody project={project} clickable />
      </a>
    );
  }

  return (
    <Link href={target.href} className={row_style}>
      <RowBody project={project} clickable />
    </Link>
  );
}

export default function ProjectList() {
  const year_groups = getProjectsByYear();

  if (year_groups.length === 0) {
    return <p className="mt-6 text-muted">Projects coming soon.</p>;
  }

  return (
    <div className="mt-10 space-y-12">
      {year_groups.map((group) => (
        <section key={group.year} className="grid gap-2 md:grid-cols-[120px_1fr] md:gap-8">
          <h2 className="font-mono text-sm text-muted md:pt-5">{group.year}</h2>
          <ul className="border-t border-border">
            {group.projects.map((project) => (
              <li key={project.slug}>
                <ProjectRow project={project} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
