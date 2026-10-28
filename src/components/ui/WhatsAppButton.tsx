import { WhatsappIcon } from "./icons";

type Props = {
  href: string;
};

/** Botón flotante de WhatsApp. */
export function WhatsAppButton({ href }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed right-4 bottom-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <WhatsappIcon className="h-7 w-7" />
    </a>
  );
}
