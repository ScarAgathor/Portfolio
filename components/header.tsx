import { site, nav_links } from "@/lib/site";

// Sticky section nav

const link_style =
  "text-muted transition-colors hover:text-accent focus-visible:text-accent";

export default function Header() {
  return (
    <>
      <nav className="sticky top-0 z-10 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-4 py-3">
          <a href="#top" className="font-mono text-sm font-semibold">
            EE
          </a>
          <ul className="flex gap-4 font-mono text-sm sm:gap-6">
            {nav_links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={link_style}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <header
        id="top"
        className="mx-auto w-full max-w-[1100px] scroll-mt-16 px-4 pb-12 pt-16 md:pt-24"
      >
        <h1 className="text-[32px] font-bold leading-tight md:text-[40px]">
          {site.name}
        </h1>
        <p className="mt-3 text-lg text-muted">{site.pitch}</p>

        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
          <li>
            <a
              href={site.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className={link_style}
            >
              GitHub ↗
            </a>
          </li>
          <li>
            <a
              href={site.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className={link_style}
            >
              LinkedIn ↗
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`} className={link_style}>
              {site.email}
            </a>
          </li>
        </ul>
      </header>
    </>
  );
}
