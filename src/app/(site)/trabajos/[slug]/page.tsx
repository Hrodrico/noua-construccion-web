import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { getProject, getProjects, getReviews } from "@/lib/data";
import { formatMonthYear } from "@/lib/format";
import { sectionIds } from "@/lib/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ImageGallery } from "@/components/ui/ImageGallery";
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

type Params = PageProps<"/trabajos/[slug]">["params"];

const parentCrumbs: BreadcrumbItem[] = [
  { label: "Inicio", href: "/" },
  { label: site.labels.projects, href: "/trabajos" },
];

// El llamado a contacto no depende del slug: forma el shell instantáneo junto al esqueleto.
// Lo que lee `params` va dentro de <Suspense> para no bloquear la navegación.
export default function ProjectPage(props: PageProps<"/trabajos/[slug]">) {
  return (
    <article className="py-12 sm:py-16">
      <Container>
        <Suspense fallback={<ProjectSkeleton />}>
          <ProjectDetail params={props.params} />
        </Suspense>

        {site.sections.contact && (
          <div className="focus-on-dark mt-16 rounded-3xl bg-primary p-8 text-primary-foreground sm:p-12">
            <p className="text-2xl font-bold">¿Te interesa algo similar?</p>
            <ButtonLink href={`/#${sectionIds.contact}`} variant="accent" className="mt-6">
              {site.actions?.quote ?? site.labels.contact}
            </ButtonLink>
          </div>
        )}
      </Container>
    </article>
  );
}

async function ProjectDetail({ params }: { params: Params }) {
  const { slug } = await params;
  const project = site.sections.projects ? await getProject(slug) : undefined;
  if (!project) notFound();

  const reviews = await getReviews({ projectSlug: project.slug });
  const meta = [
    project.category,
    project.location,
    project.date && formatMonthYear(project.date, site.locale),
  ].filter(Boolean);
  // Portada + galería sin repetir: con más de una foto se muestra el visor con pantalla completa.
  const images = [project.cover, ...project.gallery]
    .filter((image) => image !== undefined)
    .filter((image, index, all) => all.findIndex((other) => other.src === image.src) === index);

  return (
    <>
      <Breadcrumbs items={[...parentCrumbs, { label: project.title }]} />
      <header className="mt-6 max-w-3xl">
        {meta.length > 0 && (
          <p className="text-sm font-semibold tracking-wider text-accent-text uppercase">
            {meta.join(" · ")}
          </p>
        )}
        <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">{project.title}</h1>
        <p className="mt-4 text-lg text-muted">{project.summary}</p>
      </header>

      {images.length > 1 ? (
        <ImageGallery images={images} label={`Fotos de ${project.title}`} className="mt-10" />
      ) : (
        <Media
          image={images[0]}
          fallbackLabel={project.title}
          sizes="(min-width: 1152px) 1152px, 100vw"
          priority
          className="mt-10 aspect-[16/9] rounded-3xl"
        />
      )}

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
    </>
  );
}

function ProjectSkeleton() {
  return (
    <div aria-busy="true">
      {/* Los niveles anteriores no dependen del slug: se ven de inmediato. */}
      <Breadcrumbs items={[...parentCrumbs, { label: "…" }]} />
      <div className="mt-6 animate-pulse motion-reduce:animate-none">
        <span className="sr-only">Cargando trabajo…</span>
        <div className="h-4 w-40 rounded bg-surface" />
        <div className="mt-4 h-12 max-w-xl rounded bg-surface" />
        <div className="mt-4 h-6 max-w-2xl rounded bg-surface" />
        <div className="mt-10 aspect-[16/9] rounded-3xl bg-surface" />
      </div>
    </div>
  );
}
