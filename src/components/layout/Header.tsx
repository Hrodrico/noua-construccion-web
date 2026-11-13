import Image from "next/image";
import Link from "next/link";
import type { NavItem } from "@/lib/navigation";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Container } from "./Container";
import { MobileMenu } from "./MobileMenu";

type Props = {
  name: string;
  logo?: string;
  /** Logo para modo oscuro; se alterna por CSS con la variante dark. */
  logoDark?: string;
  navigation: NavItem[];
  cta?: NavItem;
  /** Muestra el botón de modo claro/oscuro (solo si el negocio define una paleta oscura). */
  themeToggle?: boolean;
};

export function Header({ name, logo, logoDark, navigation, cta, themeToggle = false }: Props) {
  // En escritorio el botón CTA ya lleva a su destino: no repetirlo como enlace del menú.
  // El botón comparte el breakpoint del menú (md): en móvil el destino queda solo dentro del menú.
  const desktopNavigation = cta ? navigation.filter((item) => item.href !== cta.href) : navigation;

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          {logo ? (
            // width/height en 0 + w-auto: respeta la proporción de cualquier logo.
            <>
              <Image
                src={logo}
                alt={name}
                width={0}
                height={0}
                sizes="240px"
                className={`h-11 w-auto ${logoDark ? "dark:hidden" : ""}`}
                priority
              />
              {logoDark && (
                <Image
                  src={logoDark}
                  alt={name}
                  width={0}
                  height={0}
                  sizes="240px"
                  className="hidden h-11 w-auto dark:block"
                  priority
                />
              )}
            </>
          ) : (
            name
          )}
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1 text-sm font-medium">
            {desktopNavigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-3 py-2 text-foreground/80 transition hover:bg-accent/15 hover:text-accent-text"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 md:gap-2">
          {themeToggle && <ThemeToggle />}
          {/* La visibilidad va en el contenedor: el inline-flex de ButtonLink le gana a "hidden". */}
          {cta && (
            <div className="hidden md:block">
              <ButtonLink href={cta.href} className="px-5 py-2">
                {cta.label}
              </ButtonLink>
            </div>
          )}
          <MobileMenu navigation={navigation} />
        </div>
      </Container>
    </header>
  );
}
