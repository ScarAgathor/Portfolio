// Site-wide content lives here

export const site = {
  name: "Edidiong Ekong",
  site_url: "https://scaragathor.github.io/Portfolio/",
  pitch: "Computer engineer: embedded, hardware, and full-stack.",
  github_url: "https://github.com/ScarAgathor",
  linkedin_url: "https://www.linkedin.com/in/TODO",
  email: "edidiongdekong@example.com",
  resume_path: "/EdidiongEkong_Resume.pdf",
};

export const nav_links = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

// About section
export const about = {
  photo_path: "/images/me.jpg",
  paragraphs: [
    "I am a computer engineering student with expereince in electrical engineering. I enjoy working with Embedded systems, VLSI design. In my free time I like to practice Guitar and Blender 3d modeling including 3d printing using CAD with Fusion360. I am currently working on research for machine learning optimization on embedded Systems at the Resilient, Intelligent, and Sustainable Embedded Computing and Networking (RISE) Lab at UT San Antonio under Assistant Professor Chen Pan.",
    "I am interested in hardware and firmware engineering opportunities as well as UI engineering.",
  ],
};

// Skills, grouped
export const skill_groups = [
  { title: "Embedded", skills: ["Low Rank Approximation", "Low Power Operation", "TinyML", "UART", "SPI"] },
  { title: "Hardware", skills: ["Electronic Circuit design/TestingTODO", "PCB Design", "CAD/ECAD"] },
  { title: "Software", skills: ["Embedded C/C++", "Verilog", "Python", "JavaScript"] },
  { title: "Tools", skills: ["Code Composer Studio", "Cadence Innovus", "Cadense Virtuoso", "Arduino IDE", "Blender", "Altium Designer", "KiCAD", "Fusion360"]}
];

// Resume section text
export const resume = {
  blurb: "This resume covers my most proud projects and interests. Last updated Oct 13, 2026",
};

// Contact footer text
export const contact = {
  blurb: "Reach out to me here.",
};
