import { expect, test } from "@playwright/test";
import { heroId, sectionIds } from "../src/lib/navigation";
import { config, content } from "./site";

test.describe("home", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("muestra el hero y el título del sitio", async ({ page }) => {
    await expect(page).toHaveTitle(config.seo.title);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(content.hero.title);
  });

  test("en escritorio el hero ocupa la primera pantalla", async ({ page, isMobile }) => {
    test.skip(isMobile, "Solo aplica en escritorio");
    const next = page.locator("main > section").nth(1);
    test.skip((await next.count()) === 0, "No hay sección después del hero");
    const viewport = page.viewportSize();
    const top = (await next.boundingBox())?.y ?? 0;
    expect(top).toBeGreaterThanOrEqual(viewport?.height ?? 0);
  });

  test("renderiza solo las secciones activas", async ({ page }) => {
    for (const [key, id] of Object.entries(sectionIds)) {
      const enabled = config.sections[key as keyof typeof sectionIds];
      await expect(page.locator(`section#${id}`)).toHaveCount(enabled ? 1 : 0);
    }
  });

  test("el enlace de salto lleva al contenido", async ({ page }) => {
    await page.keyboard.press("Tab");
    const skipLink = page.getByRole("link", { name: "Saltar al contenido" });
    await expect(skipLink).toBeFocused();
    await skipLink.press("Enter");
    await expect(page).toHaveURL(/#contenido$/);
  });

  test("el botón de WhatsApp apunta a wa.me", async ({ page }) => {
    test.skip(!config.contact.whatsapp, "El negocio no tiene WhatsApp");
    // Al cargar se ve el hero y el botón está oculto (aria-hidden): se busca incluyendo ocultos.
    await expect(page.getByRole("link", { name: "Escribir por WhatsApp", includeHidden: true })).toHaveAttribute(
      "href",
      /^https:\/\/wa\.me\/\d+/,
    );
  });

  test("el WhatsApp flotante se oculta mientras se ven el hero o la sección de contacto", async ({ page }) => {
    test.skip(!config.contact.whatsapp || !config.sections.contact, "Sin WhatsApp o sin contacto");
    const floating = page.getByRole("link", { name: "Escribir por WhatsApp" });
    // Al cargar se ve el hero: el botón no debe tapar sus controles.
    await expect(floating).toBeHidden();

    // Entre el hero y contacto el botón aparece.
    await page.evaluate((heroId) => {
      const hero = document.getElementById(heroId);
      if (hero) window.scrollTo(0, hero.offsetTop + hero.offsetHeight + 200);
    }, heroId);
    await expect(floating).toBeVisible();

    await page.locator(`section#${sectionIds.contact}`).scrollIntoViewIfNeeded();
    await expect(floating).toBeHidden();
  });
});

test.describe("navegación móvil", () => {
  test("abre el menú y navega a una sección", async ({ page, isMobile }) => {
    test.skip(!isMobile, "Solo aplica en móvil");
    await page.goto("/");

    await page.getByRole("button", { name: "Abrir menú" }).click();
    const menu = page.locator("#mobile-menu");
    await expect(menu).toBeVisible();

    await menu.getByRole("link").first().click();
    await expect(menu).toBeHidden();
  });
});
