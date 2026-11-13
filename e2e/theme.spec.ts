import { expect, test } from "@playwright/test";
import { config } from "./site";

test.describe("modo oscuro", () => {
  test.skip(!config.themeDark, "El negocio no define paleta oscura");

  test("sigue la preferencia del sistema al entrar", async ({ browser }) => {
    const context = await browser.newContext({ colorScheme: "dark" });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(/\bdark\b/);
    await context.close();
  });

  test("el botón cambia el tema y la elección se mantiene al recargar", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    const html = page.locator("html");
    await expect(html).not.toHaveClass(/\bdark\b/);

    const toggle = page.getByRole("button", { name: "Modo oscuro" });
    await toggle.click();
    await expect(html).toHaveClass(/\bdark\b/);
    await expect(toggle).toHaveAttribute("aria-pressed", "true");

    // El script inicial aplica la elección guardada antes de pintar, aunque el sistema esté en claro.
    await page.reload();
    await expect(html).toHaveClass(/\bdark\b/);
    const background = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(background).not.toBe("rgb(255, 255, 255)");
  });
});
