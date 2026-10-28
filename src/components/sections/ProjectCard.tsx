import Link from "next/link";
import type { Project } from "@/types/content";
import { Media } from "@/components/ui/Media";

type Props = {
  project: Project;
};

export function ProjectCard({ project }: Props) {
  const meta = [project.category, project.location].filter(Boolean).join(" · ");

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-background">
      <Link href={`/trabajos/${project.slug}`}>
        <Media
          image={project.cover}
          fallbackLabel={project.title}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="aspect-[4/3] transition group-hover:opacity-90"
        />
        <div className="p-6">
          {meta && <p className="text-xs font-semibold tracking-wider text-accent uppercase">{meta}</p>}
          <h3 className="mt-2 text-lg font-semibold group-hover:underline">{project.title}</h3>
          <p className="mt-2 text-sm text-muted">{project.summary}</p>
        </div>
      </Link>
    </article>
  );
}
