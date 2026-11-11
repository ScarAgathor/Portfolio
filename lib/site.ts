// Site-wide content lives here
// All the text on the home page is edited in this file

export const site = {
  name: "Edidiong Ekong",
  site_url: "https://scaragathor.github.io/Portfolio/",
  pitch: "Computer engineer: embedded, hardware, and full-stack.",
  github_url: "https://github.com/ScarAgathor",
  linkedin_url: "https://www.linkedin.com/in/TODO",
  email: "edidiongdekong@example.com",
  resume_path: "/EdidiongEkong_Resume.pdf",
};

// Section links for the top nav, each href matches a section id in app/page.tsx
export const nav_links = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

// About section
// Each string is one paragraph
// photo_path points into public/
export const about = {
  photo_path: "/images/me.webp",
  paragraphs: [
    "TODO: first paragraph about who you are and what you build.",
    "TODO: second paragraph about what you're looking for or working on now.",
  ],
};

// Skills, grouped
// Add, remove, or rename groups freely, the layout adjusts
export const skill_groups = [
  { title: "Embedded", skills: ["TODO", "TODO", "TODO"] },
  { title: "Hardware", skills: ["TODO", "TODO", "TODO"] },
  { title: "Software", skills: ["TODO", "TODO", "TODO"] },
];

// Resume section text
export const resume = {
  blurb: "TODO: one line, e.g. what the resume covers or when it was last updated.",
};

// Contact footer text
export const contact = {
  blurb: "TODO: one line inviting people to reach out.",
};
