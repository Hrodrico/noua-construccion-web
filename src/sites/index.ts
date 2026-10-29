import type { SiteConfig } from "@/types/site";
import type { SiteContent } from "@/types/content";
import * as construction from "./construction/config";
import * as constructionContent from "./construction/content";

export type Site = {
  config: SiteConfig;
  content: SiteContent;
};

/** Negocios registrados. `sites.test.ts` valida el contenido de cada uno. */
export const sites = {
  construction: { config: construction.config, content: constructionContent.content },
} satisfies Record<string, Site>;

export const activeSite: Site = sites.construction;
