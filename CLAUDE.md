@AGENTS.md

# CLAUDE.md

Este archivo orienta a Claude Code (claude.ai/code) al trabajar con el código de este repositorio.

## Qué es este repo

`noua-construccion-web` es el sitio de **Noua Construcción** (terrazas, quinchos, piscinas, ampliaciones y remodelaciones). Es un **clon de cliente** de la base [`business-web-starter`](https://github.com/Hrodrico/business-web-starter): comparte su arquitectura y se puede extender libremente (login, base de datos, nuevas rutas) respetando las reglas de abajo para que siga siendo mantenible.

- **Historial enlazado con la base.** El remoto `base` apunta a `business-web-starter` en solo lectura (push desactivado). Para traer mejoras: `git fetch base` → rama nueva (ej. `chore/sync-base`) → `git merge base/main` → PR fusionado con **Create a merge commit** (no squash ni rebase, para no romper el enlace). Esperar conflictos en lo que Noua personalizó: `src/sites/`, CI, README y este archivo.
- **Mejoras genéricas** hechas aquí (que sirvan a cualquier rubro) se anotan para portarlas a mano a la base.

## Stack y comandos

Next.js 16 (App Router, `cacheComponents` + `partialPrefetching`), React 19, TypeScript estricto, Tailwind CSS 4, despliegue en Vercel. **Node 24 LTS obligatorio** (`nvm use`).

- **Versión de Node:** la fija `engines.node` (`"24.x"`) en `package.json`, que es la fuente que leen Vercel y la validación de `next.config.ts`. `.nvmrc` la replica para nvm y para el CI. `.npmrc` (`engine-strict`) hace fallar `npm install` si Node o una dependencia no la cumplen.
- **Para cambiar de versión** (ej: a 26 cuando Vercel la soporte; hoy solo ofrece 22.x y 24.x): actualiza `engines.node`, `.nvmrc` y `@types/node` al mismo major, y luego `npm install` + verificación completa.
- **TypeScript fijado en `~6.0`** (no `^`): `typescript-eslint`, incluido en `eslint-config-next`, solo soporta `< 6.1`. TypeScript 7 (compilador nativo en Go) no expone la API de JS y rompe el lint. Subir solo cuando `typescript-eslint` lo soporte.
- **ESLint 10:** `npm install` muestra 3 avisos `ERESOLVE overriding peer dependency` porque `eslint-plugin-react`, `eslint-plugin-jsx-a11y` y `eslint-plugin-import` aún no declaran ESLint 10. Son esperados: sus reglas se verificaron y funcionan. Desaparecen cuando esos plugins actualicen su rango.

```bash
npm run dev
npm run lint
npm test                         # unitarios (Vitest)
npx vitest run src/lib/contact.test.ts   # un solo archivo (o: npx vitest run -t "nombre del test")
npm run test:watch
npm run test:e2e                 # E2E (Playwright): hace build + start en el puerto 3100
npm run build                    # verificación obligatoria antes de cerrar una tarea
```

Toda tarea termina con `npm run lint`, `npm test` y `npm run build` sin errores (y `npm run test:e2e` si toca rutas, layouts o páginas). La primera vez, `npx playwright install chromium`.

### Tests

- **Unitarios junto al archivo:** `Rating.tsx` → `Rating.test.tsx` en la misma carpeta (Vitest + Testing Library, jsdom). Si se borra o copia un componente, su test va con él. Cubren `lib/`, componentes síncronos y el contenido.
- **E2E en `e2e/`:** Playwright contra el build de producción, en móvil (Pixel 7) y escritorio. Los Server Components `async` (páginas que llaman a `lib/data.ts`) solo se prueban aquí: Vitest no los soporta.
- **Agnósticos al negocio:** nunca escribir textos de un negocio en un test. Los E2E leen la config activa desde `e2e/site.ts` y `data.test.ts` deriva sus aserciones de `activeSite.content`; así no hay que tocarlos al cambiar textos y siguen siendo compatibles con la base.
- **`src/sites/sites.test.ts`** valida el contenido de los negocios registrados (slugs únicos y aptos para URL, fechas ISO, ratings 1–5, reseñas enlazadas a trabajos existentes, `alt` no vacío, imágenes locales que existen en `public/`, fotos de trabajos en `/images/projects/<año>/<slug>/`, colores hex y contraste WCAG AA de los pares texto/fondo del tema). Es la red de seguridad al editar `config.ts`/`content.ts`.
- **CI:** `.github/workflows/ci.yml` (GitHub Actions) corre lint + unitarios, build + E2E y un job final `CI completo` que falla si algún job anterior falló o se omitió. La protección de `main` está versionada en `.github/rulesets/main.json` (se importa en GitHub → Settings → Rules → Rulesets → Import a ruleset) y exige solo `Lint y tests unitarios` y `CI completo`: no renombrar esos jobs. Con `CI=true`, Playwright no compila: usa el build del paso previo. Vercel no corre tests.
- Un trabajo inexistente (`/trabajos/<slug>`) responde 200 en la primera visita por el streaming de Cache Components; Next.js renderiza not-found e inyecta `noindex`. Es el comportamiento documentado; el E2E verifica eso y no el código HTTP.

## Arquitectura

```text
src/app/            Rutas, layouts, metadatos. Único lugar que importa config y datos.
  (site)/           Sitio público. Futuras áreas: (auth)/, (dashboard)/ con su layout.
src/components/
  layout/           Header, Footer, MobileMenu, Container
  sections/         Bloques de página (Hero, Services, Projects, Reviews, Contact…)
  ui/               Piezas pequeñas (ButtonLink, Media, Rating, SocialLinks, icons)
src/lib/
  data.ts           Capa de acceso a datos: única puerta al contenido
  site.ts           Config del negocio activo
  contact.ts, navigation.ts, theme.ts, format.ts
src/sites/<id>/     config.ts (SiteConfig) + content.ts (SiteContent) por negocio
src/types/          Contratos: site.ts (configuración), content.ts (contenido)
```

### Flujos que cruzan archivos

- **Negocio activo:** `src/sites/index.ts` registra Noua (`sites.construction`) y lo expone como `activeSite`. `lib/site.ts` expone su `config` y `lib/data.ts` su `content`.
- **Tema:** `config.theme` → `themeToCssVars()` (`lib/theme.ts`) lo aplica como variables `--brand-*` en el `<html>` del layout raíz → `globals.css` las mapea a tokens de Tailwind (`--color-primary`, etc.) con `@theme inline`. Un color nuevo requiere tocar `ThemeColors`, `theme.ts`, `globals.css` y cada `config.ts`.

### Reglas que no se rompen

1. **Componentes agnósticos al negocio.** Los componentes reciben todo por props y nunca importan `@/lib/site`, `@/lib/data` ni `@/sites`. El cableado se hace en `src/app/`.
2. **Contenido solo vía `src/lib/data.ts`.** Páginas y metadatos llaman a `getServices()`, `getProjects()`, `getReviews()`, etc. Para pasar a base de datos o CMS se reescribe el cuerpo de esas funciones manteniendo la firma (o se agregan nuevas), no se lee la base de datos desde componentes.
3. **Una sola fuente por dato.** Identidad, contacto, colores, SEO, secciones activas y etiquetas viven en `config.ts`; textos e items en `content.ts`. No duplicar entre ambos ni escribir textos de negocio en componentes.
4. **Vocabulario genérico en código, etiquetas en config.** En código: `projects`, `services`, `reviews`. Lo visible sale de `config.labels` ("Obras realizadas", "Nuestros cortes").
5. **Colores por tokens.** Usa las clases del tema (`bg-primary`, `text-primary-foreground`, `bg-accent`, `bg-surface`, `text-muted`, `border-border`, `bg-background`, `text-foreground`). Nunca colores hex ni paletas de Tailwind fijas (`bg-gray-100`) en componentes; así un cambio de paleta en `config.ts` se aplica en todo el sitio.
6. **Tipos primero.** Un campo nuevo se agrega en `src/types/` antes de usarlo; si es obligatorio, actualiza todos los negocios de `src/sites/`.

## Next.js 16: particularidades de este proyecto

Esta versión difiere de lo que suele conocerse de Next.js; consulta `node_modules/next/dist/docs/` ante cualquier duda (ver AGENTS.md).

- **Cache Components está activo.** Las funciones de `lib/data.ts` usan `"use cache"`. Valores inestables (`new Date()`, `Math.random()`) en render requieren `"use cache"` + `cacheLife`, `await connection()` o un componente cliente (ver `getCurrentYear` en `src/app/(site)/layout.tsx`).
- **No usar** `export const dynamic`, `revalidate`, `dynamicParams`, `fetchCache` ni `runtime`: no existen con Cache Components.
- **Rutas dinámicas:** `generateStaticParams` debe devolver al menos un parámetro (ver el placeholder en `trabajos/[slug]/page.tsx`). `params` es una Promise: `const { slug } = await props.params`.
- **Tipos de rutas globales:** `PageProps<"/ruta/[param]">` y `LayoutProps<"/">` no se importan; se generan con `next dev`, `next build` o `next typegen`.
- **Datos por usuario (login):** leer `cookies()`/`headers()` fuera de los scopes con `"use cache"` y pasar los valores como argumento; envolver lo dinámico en `<Suspense>`. Revisar `02-guides/authentication-with-cache-components.md` en la doc local.
- **Server Components por defecto.** `"use client"` solo para interactividad (ej: `MobileMenu`), lo más abajo posible en el árbol.

## Cómo escalar el proyecto

| Necesidad | Cómo hacerlo |
| --- | --- |
| Nueva sección del home | Tipo en `types/content.ts` → contenido en `content.ts` → getter en `lib/data.ts` → componente en `components/sections/` (props, sin config) → clave en `SectionKey`, `sections` y `labels` → render condicional en `(site)/page.tsx` → navegación en `lib/navigation.ts`. |
| Nueva página pública | `src/app/(site)/<ruta>/page.tsx` con `metadata` (title + `alternates.canonical`) y agregarla a `sitemap.ts`. |
| Login / panel | Grupos `src/app/(auth)/` y `src/app/(dashboard)/` con layout propio; protección de rutas en `src/proxy.ts` (reemplaza a middleware en Next 16). El sitio público no debe depender de la sesión. |
| Base de datos / CMS | Cliente en `src/lib/db.ts` (o similar), reescribir getters de `lib/data.ts`, `cacheTag` + `revalidateTag` al mutar. Los tipos de `types/content.ts` siguen siendo el contrato de la UI. |
| Formularios | Server Actions con validación en servidor (ej: zod) y respuesta accesible; nunca confiar en validación solo del cliente. |
| E-commerce / catálogo | Ruta `(site)/productos/` siguiendo el patrón de `trabajos/` (listado + `[slug]` + `generateStaticParams`). |
| Imágenes remotas | Configurar `images.remotePatterns` en `next.config.ts`. |

## Variables de entorno y secretos

- Documentar cada variable en `.env.example` (sí se versiona; `.env*` está ignorado salvo ese archivo).
- Nunca commitear secretos. Variables expuestas al cliente solo con prefijo `NEXT_PUBLIC_` y solo si son públicas por naturaleza.

## Calidad mínima

- **Accesibilidad:** HTML semántico, `alt` descriptivo en imágenes informativas, `aria-label` en botones de solo icono, foco visible, navegación por teclado, contraste suficiente con los colores del tema.
- **Responsive / mobile-first:** revisar en móvil antes que en escritorio.
- **Imágenes:** siempre vía `next/image` (componente `Media`), con `sizes` correcto; `priority` solo en la imagen principal visible al cargar.
- **SEO:** cada página con título propio y canonical; `site.url` con el dominio real antes de publicar.
- **Contenido:** no publicar datos de ejemplo (`example.com`, `+56 9 0000 0000`, reseñas inventadas) como si fueran reales.

## Convenciones de código

- TypeScript estricto, sin `any`. Tipos de dominio en `src/types/`, props tipadas con `type Props`.
- Exports nombrados para componentes (`export function HeroSection`); `export default` solo donde Next.js lo exige (pages, layouts, robots, sitemap).
- Alias `@/` para imports desde `src/`.
- **Idioma:** el código va en inglés (identificadores, archivos, carpetas, ids de `src/sites/`). En español: lo que ve el cliente final (textos de UI, contenido, metadatos SEO, URL públicas como `/trabajos` y anclas como `#servicios`) y lo dirigido a desarrolladores (comentarios, mensajes de error, logs y documentación).
- Comentarios breves y solo cuando explican el porqué.
- Commits pequeños y descriptivos; no commitear sin que `npm run build` pase.
