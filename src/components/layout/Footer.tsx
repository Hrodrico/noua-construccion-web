import Link from "next/link";
import type { NavItem } from "@/lib/navigation";
import type { SocialLink } from "@/types/site";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Container } from "./Container";

type Props = {
  name: string;
  tagline: string;
  navigation: NavItem[];
  social: SocialLink[];
  contactLines: string[];
  year: number;
};

export function Footer({ name, tagline, navigation, social, contactLines, year }: Props) {
  return (
    <footer className="bg-primary text-primary-foreground">
      <Container className="grid gap-10 py-12 md:grid-cols-3">
        <div>
          <p className="text-lg font-bold">{name}</p>
          <p className="mt-2 text-sm opacity-80">{tagline}</p>
          <SocialLinks links={social} label="Síguenos" className="mt-6" />
        </div>

        <nav aria-label="Pie de página">
          <ul className="space-y-2 text-sm">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="opacity-80 transition hover:opacity-100">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {contactLines.length > 0 && (
          <ul className="space-y-2 text-sm opacity-80">
            {contactLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        )}
      </Container>

      <div className="border-t border-primary-foreground/15">
        <Container className="py-6 text-xs opacity-70">
          © {year} {name}. Todos los derechos reservados.
        </Container>
      </div>
    </footer>
  );
}
