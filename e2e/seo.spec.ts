import { expect, test } from "@playwright/test";
import { config } from "./site";

test("una ruta inexistente responde 404", async ({ page }) => {
  const response = await page.goto("/ruta-que-no-existe");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Página no encontrada");
});

// Un slug no prerenderizado se resuelve con streaming: la primera visita puede llegar con
// status 200, pero Next.js muestra not-found e inyecta noindex (docs: guides/streaming.md).
test("un trabajo inexistente muestra not-found y no se indexa", async ({ page }) => {
  await page.goto("/trabajos/trabajo-que-no-existe");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Página no encontrada");
  await expect(page.locator('meta[name="robots"][content*="noindex"]')).not.toHaveCount(0);
});

test("sitemap.xml incluye el dominio del negocio", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBe(true);
  expect(await response.text()).toContain(`<loc>${config.url}</loc>`);
});

test("robots.txt está disponible", async ({ request }) => {
  const response = await request.get("/robots.txt");
  expect(response.ok()).toBe(true);
});
