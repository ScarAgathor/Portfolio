import { resume, site } from "@/lib/site";
import { withBasePath } from "@/lib/projects";

export default function Resume() {
  const resume_href = withBasePath(site.resume_path);

  return (
    <div className="mt-4">
      <p className="text-muted">{resume.blurb}</p>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <a
          href={resume_href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-90"
        >
          View resume
        </a>
        <a
          href={resume_href}
          download
          className="font-mono text-sm text-muted transition-colors hover:text-accent"
        >
          Download PDF ↓
        </a>
      </div>
    </div>
  );
}
