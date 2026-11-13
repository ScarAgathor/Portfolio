import type { Metadata } from "next";
import Link from "next/link";
import ProjectList from "@/components/projectlist";
import { site } from "@/lib/site";

// All projects page at /projects/, everything from first year on, grouped by year

export const metadata: Metadata = {
  title: `All projects | ${site.name}`,
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

      <h1 className="mt-6 text-2xl font-bold leading-tight md:text-[28px]">All projects</h1>
      <p className="mt-2 max-w-[70ch] text-muted">
        TODO: one line introducing this page, e.g. everything from first-year builds to current
        work, including course lab series.
      </p>

      <ProjectList />
    </main>
  );
}