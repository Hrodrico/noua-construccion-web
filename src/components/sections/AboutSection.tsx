import type { AboutContent } from "@/types/content";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type Props = {
  id: string;
  label: string;
  content: AboutContent;
};

export function AboutSection({ id, label, content }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="bg-surface py-16 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading id={`${id}-title`} eyebrow={label} title={content.title} />
          <div className="space-y-4 text-lg text-muted">
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        {content.highlights && content.highlights.length > 0 && (
          <dl className="grid grid-cols-2 gap-6 self-center">
            {content.highlights.map((item) => (
              <div key={item.label} className="rounded-2xl border border-border bg-background p-6">
                <dt className="text-sm text-muted">{item.label}</dt>
                <dd className="order-first text-4xl font-bold text-primary">{item.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </Container>
    </section>
  );
}
