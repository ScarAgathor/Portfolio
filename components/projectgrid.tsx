import ProjectCard from "@/components/projectcard";
import { getAllProjects } from "@/lib/projects";

// Reads every file in content/projects at build time and lays them out as cards
// 1 column on phones, 2 on tablets, 3 on desktop

export default function ProjectGrid() {
  const projects = getAllProjects();

  if (projects.length === 0) {
    return <p className="mt-2 text-muted">Projects coming soon.</p>;
  }

  return (
    <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <li key={project.slug}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
