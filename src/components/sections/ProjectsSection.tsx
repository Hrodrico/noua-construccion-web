import type { ReactNode } from "react";
import type { Project } from "@/types/content";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "./ProjectCard";

type Props = {
  id: string;
  label: string;
  projects: Project[];
  /** Muestra el enlace hacia /trabajos. */
  showAllLink?: boolean;
  /** Texto del enlace al listado completo. */
  showAllLabel?: string;
  /** Texto del enlace al pie de cada tarjeta. */
  viewProjectLabel?: string;
  /** Se muestra sobre el título (ej: ruta de navegación en la página del listado). */
  breadcrumbs?: ReactNode;
};

export function ProjectsSection({ id, label, projects, showAllLink = true, showAllLabel = "Ver todos", viewProjectLabel, breadcrumbs }: Props) {
  if (projects.length === 0) return null;

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="bg-surface py-16 sm:py-24">
      <Container>
        {breadcrumbs}
        <SectionHeading id={`${id}-title`} title={label} />
        {/* auto-rows-fr: todas las filas con el alto de la tarjeta más alta. */}
        <ul className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} viewLabel={viewProjectLabel} />
            </li>
          ))}
        </ul>
        {showAllLink && (
          <div className="mt-10">
            <ButtonLink href="/trabajos" variant="outline">
              {showAllLabel}
            </ButtonLink>
          </div>
        )}
      </Container>
    </section>
  );
}
