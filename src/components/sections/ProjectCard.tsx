import Link from "next/link";
import type { Project } from "@/types/content";
import { Media } from "@/components/ui/Media";

type Props = {
  project: Project;
  /** Texto del enlace al pie de la tarjeta. */
  viewLabel?: string;
};

// Título y resumen recortados (line-clamp) para que todas las tarjetas midan lo mismo;
// el texto completo está en la página de la obra.
export function ProjectCard({ project, viewLabel = "Ver más" }: Props) {
  const meta = [project.category, project.location].filter(Boolean).join(" · ");

  return (
    <article className="group h-full overflow-hidden rounded-2xl border border-border bg-background transition dark:bg-foreground/5 duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/15 focus-within:-translate-y-1 focus-within:shadow-xl focus-within:shadow-primary/15 active:translate-y-0 active:scale-[0.99] active:shadow-md motion-reduce:transform-none motion-reduce:transition-none">
      <Link href={`/trabajos/${project.slug}`} className="flex h-full flex-col">
        <Media
          image={project.cover}
          fallbackLabel={project.title}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="aspect-[4/3] transition group-hover:opacity-90"
        />
        <div className="flex flex-1 flex-col p-6">
          {meta && <p className="text-xs font-semibold tracking-wider text-muted uppercase">{meta}</p>}
          <h3 className="mt-2 line-clamp-2 text-lg font-semibold group-hover:underline">{project.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm text-muted">{project.summary}</p>
          <span className="mt-auto pt-4 text-sm font-semibold text-accent-text">
            {viewLabel} <span aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
