import fs from "node:fs";
import path from "node:path";
import { about, skill_groups } from "@/lib/site";
import { withBasePath } from "@/lib/projects";

function photoExists(photo_path: string) {
  return fs.existsSync(path.join(process.cwd(), "public", photo_path));
}

export default function About() {
  const show_photo = photoExists(about.photo_path);

  return (
    <div className="mt-6 grid gap-10 md:grid-cols-[3fr_2fr] md:gap-12">
      <div>
        {show_photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={withBasePath(about.photo_path)}
            alt="Photo of Edidiong Ekong"
            className="h-24 w-24 rounded-full border border-border object-cover"
          />
        ) : (
          <div className="h-24 w-24 rounded-full border border-border bg-chip" />
        )}

        <div className="mt-6 max-w-[70ch] space-y-4">
          {about.paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {skill_groups.map((group) => (
          <div key={group.title}>
            <h3 className="font-mono text-sm text-muted">{group.title}</h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {group.skills.map((skill, index) => (
                <li
                  key={`${skill}-${index}`}
                  className="rounded-full bg-chip px-3 py-1 font-mono text-xs"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
