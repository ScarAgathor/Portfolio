import type { Metadata } from "next";
import Link from "next/link";
import ProjectList from "@/components/projectlist";
import { site } from "@/lib/site";

// All projects page at /projects/, everything from first year on, grouped by year

export const metadata: Metadata = {
  title: `Projects | ${site.name}`,
  description: `Every project, course lab series, and build by ${site.name}.`,
};

export default function AllProjectsPage() {
  return (
    <main className="mx-auto w-full max-w-[1100px] px-4 py-12 md:py-16">
      <Link
        href="/"
        className="font-mono text-sm text-muted transition-colors hover:text-accent"
      >
        ← Home
      </Link>

      <h1 className="mt-6 text-2xl font-bold leading-tight md:text-[28px]">Projects</h1>
      <p className="mt-2 max-w-[70ch] text-muted">
        This page contains all my projects both small and large that I have completed since I became interested in Engineering, including personal projects, coursework projects, business projects, school club projects etc.
      </p>
      <ProjectList />
    </main>
  );
}