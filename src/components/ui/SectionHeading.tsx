type Props = {
  title: string;
  eyebrow?: string;
  description?: string;
  id?: string;
};

export function SectionHeading({ title, eyebrow, description, id }: Props) {
  return (
    <div className="mb-10 max-w-2xl">
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold tracking-wider text-accent-text uppercase">{eyebrow}</p>
      )}
      <h2 id={id} className="text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-lg text-muted">{description}</p>}
    </div>
  );
}
