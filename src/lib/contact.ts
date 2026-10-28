import type { ContactInfo } from "@/types/site";

const digits = (value: string) => value.replace(/\D/g, "");

export function whatsappUrl(whatsapp: NonNullable<ContactInfo["whatsapp"]>): string {
  const base = `https://wa.me/${digits(whatsapp.number)}`;
  return whatsapp.message ? `${base}?text=${encodeURIComponent(whatsapp.message)}` : base;
}

export function phoneUrl(phone: string): string {
  return `tel:+${digits(phone)}`;
}

export function emailUrl(email: string): string {
  return `mailto:${email}`;
}
