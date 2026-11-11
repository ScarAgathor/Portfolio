import About from "@/components/about";
import Contact from "@/components/contact";
import Header from "@/components/header";
import ProjectGrid from "@/components/projectgrid";
import Resume from "@/components/resume";

// All the text lives in lib/site.ts and content/projects

const section_style = "mx-auto w-full max-w-[1100px] scroll-mt-16 px-4 py-12 md:py-16";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section id="projects" className={section_style}>
          <h2 className="text-xl font-semibold">Projects</h2>
          <ProjectGrid />
        </section>

        <section id="about" className={section_style}>
          <h2 className="text-xl font-semibold">About</h2>
          <About />
        </section>

        <section id="resume" className={section_style}>
          <h2 className="text-xl font-semibold">Resume</h2>
          <Resume />
        </section>
      </main>
      <Contact />
    </>
  );
}
