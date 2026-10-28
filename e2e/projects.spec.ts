import { expect, test } from "@playwright/test";
import { config, content } from "./site";

test.describe("trabajos", () => {
  test.skip(!config.sections.projects, "La sección de trabajos está desactivada");

  test("el listado muestra todos los trabajos", async ({ page }) => {
    await page.goto("/trabajos");
    await expect(page).toHaveTitle(new RegExp(config.labels.projects));
    await expect(page.locator('a[href^="/trabajos/"]')).toHaveCount(content.projects.length);
  });

  test("cada trabajo tiene su página de detalle", async ({ page }) => {
    for (const project of content.projects) {
      const response = await page.goto(`/trabajos/${project.slug}`);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(project.title);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `${config.url}/trabajos/${project.slug}`,
      );
    }
  });

  test("se llega al detalle desde el listado", async ({ page }) => {
    const [project] = content.projects;
    test.skip(!project, "No hay trabajos cargados");

    await page.goto("/trabajos");
    await page.getByRole("link", { name: project.title }).click();
    await expect(page).toHaveURL(`/trabajos/${project.slug}`);
  });
});
