import type { NextConfig } from "next";

// basePath is set by the GitHub Actions workflow.
// - Repo named <username>.github.io  -> empty, site lives at the root
// - Any other repo name               -> "/<repo-name>"
// Locally it's unset, so `npm run dev` works at http://localhost:3000
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",          // build a fully static site into /out
  basePath,
  trailingSlash: true,       // /projects/foo/ -> /projects/foo/index.html (plays well with Pages)
  images: {
    unoptimized: true,       // no image server on GitHub Pages
  },
};

export default nextConfig;
