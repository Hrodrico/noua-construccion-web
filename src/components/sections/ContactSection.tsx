import type { ReactNode } from "react";
import type { ContactInfo, SocialLink } from "@/types/site";
import { emailUrl, phoneUrl, whatsappUrl } from "@/lib/contact";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon, WhatsappIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SocialLinks } from "@/components/ui/SocialLinks";

type Props = {
  id: string;
  label: string;
  contact: ContactInfo;
  social: SocialLink[];
};

function Item({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
        {icon}
      </span>
      <div>
        <p className="text-sm text-muted">{title}</p>
        <div className="font-medium">{children}</div>
      </div>
    </li>
  );
}

export function ContactSection({ id, label, contact, social }: Props) {
  const { phone, email, whatsapp, address, city, mapUrl, hours } = contact;
  const location = [address, city].filter(Boolean).join(", ");
  const iconClass = "h-5 w-5";

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="bg-surface py-16 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading
            id={`${id}-title`}
            title={label}
            description="Escríbenos y te responderemos a la brevedad."
          />
          {whatsapp && (
            <ButtonLink href={whatsappUrl(whatsapp)} external variant="accent">
              <WhatsappIcon className={iconClass} />
              Escríbenos por WhatsApp
            </ButtonLink>
          )}
          <SocialLinks links={social} className="mt-8" />
        </div>

        <ul className="space-y-6">
          {phone && (
            <Item icon={<PhoneIcon className={iconClass} />} title="Teléfono">
              <a href={phoneUrl(phone)} className="hover:underline">{phone}</a>
            </Item>
          )}
          {email && (
            <Item icon={<MailIcon className={iconClass} />} title="Correo">
              <a href={emailUrl(email)} className="hover:underline">{email}</a>
            </Item>
          )}
          {location && (
            <Item icon={<MapPinIcon className={iconClass} />} title="Ubicación">
              {mapUrl ? (
                <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {location}
                </a>
              ) : (
                location
              )}
            </Item>
          )}
          {hours && hours.length > 0 && (
            <Item icon={<ClockIcon className={iconClass} />} title="Horario">
              <ul>
                {hours.map((h) => (
                  <li key={h.label}>
                    {h.label}: <span className="text-muted">{h.value}</span>
                  </li>
                ))}
              </ul>
            </Item>
          )}
        </ul>
      </Container>
    </section>
  );
}
