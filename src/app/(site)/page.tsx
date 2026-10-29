import type { Metadata } from "next";
import { site } from "@/lib/site";
import { getAbout, getHero, getProjects, getReviews, getServices } from "@/lib/data";
import { sectionIds } from "@/lib/navigation";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const { sections, labels } = site;
  const [hero, about, services, projects, reviews] = await Promise.all([
    getHero(),
    getAbout(),
    getServices(),
    getProjects({ featured: true }),
    getReviews(),
  ]);

  return (
    <>
      <HeroSection content={hero} fallbackLabel={site.name} />
      {sections.about && <AboutSection id={sectionIds.about} label={labels.about} content={about} />}
      {sections.services && (
        <ServicesSection id={sectionIds.services} label={labels.services} services={services} />
      )}
      {sections.projects && (
        <ProjectsSection id={sectionIds.projects} label={labels.projects} projects={projects} />
      )}
      {sections.reviews && (
        <ReviewsSection id={sectionIds.reviews} label={labels.reviews} reviews={reviews} />
      )}
      {sections.contact && (
        <ContactSection
          id={sectionIds.contact}
          label={labels.contact}
          contact={site.contact}
        />
      )}
    </>
  );
}
