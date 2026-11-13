import Link from "next/link";
import { ChevronRightIcon } from "./icons";

export type BreadcrumbItem = { label: string; href?: string };

type Props = {
  /** Del inicio a la página actual; el último elemento es la página actual. */
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumbs({ items, className = "" }: Props) {
  return (
    <nav aria-label="Ruta de navegación" className={className}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-muted">
        {items.map((item, index) => {
          const current = index === items.length - 1;
          return (
            // El separador va al final del elemento anterior: si la ruta se parte en dos líneas,
            // la segunda no empieza con "›".
            <li key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-x-1.5">
              {current || !item.href ? (
                <span aria-current={current ? "page" : undefined} className="truncate font-medium text-foreground">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="rounded transition hover:text-foreground hover:underline">
                  {item.label}
                </Link>
              )}
              {!current && <ChevronRightIcon aria-hidden="true" className="h-4 w-4 shrink-0 opacity-60" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
