import Image from "next/image";
import Link from "next/link";
import type { NavItem } from "@/lib/navigation";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "./Container";
import { MobileMenu } from "./MobileMenu";

type Props = {
  name: string;
  logo?: string;
  navigation: NavItem[];
  cta?: NavItem;
};

export function Header({ name, logo, navigation, cta }: Props) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          {logo ? (
            <Image src={logo} alt={name} width={140} height={40} className="h-10 w-auto" priority />
          ) : (
            name
          )}
        </Link>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm font-medium">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-foreground/80 transition hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {cta && (
            <ButtonLink href={cta.href} className="hidden px-5 py-2 sm:inline-flex">
              {cta.label}
            </ButtonLink>
          )}
          <MobileMenu navigation={navigation} />
        </div>
      </Container>
    </header>
  );
}
