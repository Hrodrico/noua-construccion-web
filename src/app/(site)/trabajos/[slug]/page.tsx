import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { getProject, getProjects, getReviews } from "@/lib/data";
import { formatMonthYear } from "@/lib/format";
import { sectionIds } from "@/lib/navigation";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Media } from "@/components/ui/Media";
import { ReviewCard } from "@/components/sections/ReviewCard";

// Con Cache Components, generateStaticParams debe devolver al menos un valor.
const EMPTY_PLACEHOLDER = "__sin-trabajos__";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.length > 0
    ? projects.map((project) => ({ slug: project.slug }))
    : [{ slug: EMPTY_PLACEHOLDER }];
}

export async function generateMetadata(props: PageProps<"/trabajos/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = await getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/trabajos/${project.slug}` },
    openGraph: project.cover ? { images: [project.cover.src] } : undefined,
  };
}

export default async function ProjectPage(props: PageProps<"/trabajos/[slug]">) {
  const { slug } = await props.params;
  const project = site.sections.projects ? await getProject(slug) : undefined;
  if (!project) notFound();

  const reviews = await getReviews({ projectSlug: project.slug });
  const meta = [
    project.category,
    project.location,
    project.date && formatMonthYear(project.date, site.locale),
  ].filter(Boolean);

  return (
    <article className="py-12 sm:py-16">
      <Container>
        <Link href="/trabajos" className="text-sm text-muted hover:text-foreground">
          ← {site.labels.projects}
        </Link>

        <header className="mt-6 max-w-3xl">
          {meta.length > 0 && (
            <p className="text-sm font-semibold tracking-wider text-accent uppercase">
              {meta.join(" · ")}
            </p>
          )}
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{project.title}</h1>
          <p className="mt-4 text-lg text-muted">{project.summary}</p>
        </header>

        <Media
          image={project.cover}
          fallbackLabel={project.title}
          sizes="(min-width: 1152px) 1152px, 100vw"
          priority
          className="mt-10 aspect-[16/9] rounded-3xl"
        />

        <div className="mt-10 grid gap-12 lg:grid-cols-3">
          <div className="space-y-4 text-lg lg:col-span-2">
            {project.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {reviews.length > 0 && (
            <aside aria-label="Reseñas de este trabajo" className="space-y-4">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </aside>
          )}
        </div>

        {project.gallery.length > 0 && (
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.gallery.map((image) => (
              <li key={image.src}>
                <Media
                  image={image}
                  fallbackLabel={project.title}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="aspect-[4/3] rounded-2xl"
                />
              </li>
            ))}
          </ul>
        )}

        {site.sections.contact && (
          <div className="mt-16 rounded-3xl bg-primary p-8 text-primary-foreground sm:p-12">
            <p className="text-2xl font-bold">¿Te interesa algo similar?</p>
            <ButtonLink href={`/#${sectionIds.contact}`} variant="accent" className="mt-6">
              {site.labels.contact}
            </ButtonLink>
          </div>
        )}
      </Container>
    </article>
  );
}
