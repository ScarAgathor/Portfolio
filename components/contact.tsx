import { contact, site } from "@/lib/site";

const link_style = "text-muted transition-colors hover:text-accent";

export default function Contact() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="mt-12 scroll-mt-16 border-t border-border"
    >
      <div className="mx-auto w-full max-w-[1100px] px-4 py-12 md:py-16">
        <h2 className="text-xl font-semibold">Contact</h2>
        <p className="mt-2 text-muted">{contact.blurb}</p>

        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
          <li>
            <a href={`mailto:${site.email}`} className={link_style}>
              {site.email}
            </a>
          </li>
          <li>
            <a href={site.github_url} target="_blank" rel="noopener noreferrer" className={link_style}>
              GitHub ↗
            </a>
          </li>
          <li>
            <a href={site.linkedin_url} target="_blank" rel="noopener noreferrer" className={link_style}>
              LinkedIn ↗
            </a>
          </li>
        </ul>

        <p className="mt-12 font-mono text-xs text-muted">
          © {year} {site.name}
        </p>
      </div>
    </footer>
  );
}
