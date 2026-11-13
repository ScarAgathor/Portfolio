import Link from "next/link";
import ProjectCard from "@/components/projectcard";
import { getAllProjects, getHomeProjects } from "@/lib/projects";

// Featured projects as cards on the home page, with a link to the full list
// 1 column on phones, 2 on tablets, 3 on desktop

export default function ProjectGrid() {
  const projects = getHomeProjects();
  const total_count = getAllProjects().length;

  if (projects.length === 0) {
    return <p className="mt-2 text-muted">Projects coming soon.</p>;
  }

  return (
    <>
      <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>

      <Link
        href="/projects/"
        className="mt-8 inline-block font-mono text-sm text-muted transition-colors hover:text-accent"
      >
        See all {total_count} projects →
      </Link>
    </>
  );
}