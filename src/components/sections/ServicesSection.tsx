import type { Service } from "@/types/content";
import { Container } from "@/components/layout/Container";
import { Media } from "@/components/ui/Media";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Props = {
  id: string;
  label: string;
  services: Service[];
};

export function ServicesSection({ id, label, services }: Props) {
  if (services.length === 0) return null;

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-16 sm:py-24">
      <Container>
        <SectionHeading id={`${id}-title`} title={label} />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.id} className="overflow-hidden rounded-2xl border border-border bg-surface">
              {service.image && (
                <Media image={service.image} fallbackLabel={service.title} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
              )}
              <div className="p-6">
                <div className="mb-4 h-1 w-10 rounded-full bg-accent" aria-hidden="true" />
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm text-muted">{service.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
