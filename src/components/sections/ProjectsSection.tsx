import type { Project } from "@/types/content";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "./ProjectCard";

type Props = {
  id: string;
  label: string;
  projects: Project[];
  /** Muestra el enlace "Ver todos" hacia /trabajos. */
  showAllLink?: boolean;
};

export function ProjectsSection({ id, label, projects, showAllLink = true }: Props) {
  if (projects.length === 0) return null;

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="bg-surface py-16 sm:py-24">
      <Container>
        <SectionHeading id={`${id}-title`} title={label} />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
        {showAllLink && (
          <div className="mt-10">
            <ButtonLink href="/trabajos" variant="outline">
              Ver todos
            </ButtonLink>
          </div>
        )}
      </Container>
    </section>
  );
}
