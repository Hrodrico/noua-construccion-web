import type { SiteConfig } from "@/types/site";
import type { SiteContent } from "@/types/content";
import * as construction from "./construction/config";
import * as constructionContent from "./construction/content";
import * as barbershop from "./barbershop/config";
import * as barbershopContent from "./barbershop/content";

export type Site = {
  config: SiteConfig;
  content: SiteContent;
};

/**
 * Sitios disponibles en la base. Al clonar para un cliente, deja solo su
 * carpeta, registra aquí ese único sitio y borra los demás.
 */
export const sites = {
  construction: { config: construction.config, content: constructionContent.content },
  barbershop: { config: barbershop.config, content: barbershopContent.content },
} satisfies Record<string, Site>;

type SiteId = keyof typeof sites;

const DEFAULT_SITE: SiteId = "construction";

function resolveSite(): Site {
  const id = process.env.SITE_ID ?? DEFAULT_SITE;
  if (!(id in sites)) {
    throw new Error(
      `SITE_ID "${id}" no existe. Opciones: ${Object.keys(sites).join(", ")}`,
    );
  }
  return sites[id as SiteId];
}

export const activeSite = resolveSite();
