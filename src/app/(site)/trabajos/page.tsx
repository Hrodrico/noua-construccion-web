import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { getProjects } from "@/lib/data";
import { ProjectsSection } from "@/components/sections/ProjectsSection";

export const metadata: Metadata = {
  title: site.labels.projects,
  alternates: { canonical: "/trabajos" },
};

export default async function ProjectsPage() {
  if (!site.sections.projects) notFound();

  const projects = await getProjects();

  return (
    <ProjectsSection
      id="listado"
      label={site.labels.projects}
      projects={projects}
      showAllLink={false}
    />
  );
}
