import Link from "next/link";

// Shown for any URL that doesn't exist on the site

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-[1100px] flex-1 flex-col justify-center px-4 py-24">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-2 text-2xl font-bold md:text-[28px]">Page not found</h1>
      <p className="mt-2 text-muted">That page doesn&apos;t exist or has moved.</p>
      <Link
        href="/"
        className="mt-6 font-mono text-sm text-muted transition-colors hover:text-accent"
      >
        ← Back to home
      </Link>
    </main>
  );
}
