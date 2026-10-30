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

  test("la galería se desliza arrastrando", async ({ page }) => {
    const project = content.projects.find(
      (item) => new Set([item.cover?.src, ...item.gallery.map((image) => image.src)]).size > 1,
    );
    test.skip(!project, "Ningún trabajo tiene más de una foto");

    await page.goto(`/trabajos/${project!.slug}`);
    const stage = page.getByRole("button", { name: /^Ver en pantalla completa/ });
    const box = (await stage.boundingBox())!;
    const y = box.y + box.height / 2;
    const counter = page.getByText(/^1 \/ \d+$/);
    await expect(counter).toBeVisible();

    // Arrastre lento y corto: vuelve a su lugar.
    await page.mouse.move(box.x + box.width * 0.6, y);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.5, y, { steps: 10 });
    await page.waitForTimeout(200);
    await page.mouse.up();
    await expect(counter).toBeVisible();

    // Arrastre de más de media imagen: pasa a la siguiente sin abrir la pantalla completa.
    await page.mouse.move(box.x + box.width * 0.9, y);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.2, y, { steps: 10 });
    await page.mouse.up();
    await expect(page.getByText(/^2 \/ \d+$/)).toBeVisible();
    await expect(page.getByRole("dialog")).toBeHidden();
  });
});
