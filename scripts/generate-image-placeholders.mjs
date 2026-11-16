// Genera una vista previa mínima (difuminada por next/image) de cada foto de public/images.
// Se ejecuta antes de `dev` y `build`; el resultado se versiona para que los tests lo lean.
import { readdir, writeFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import sharp from "sharp";

const root = process.cwd();
const imagesDir = join(root, "public", "images");
const output = join(root, "src", "generated", "image-placeholders.json");
const extensions = /\.(jpe?g|png|webp|avif)$/i;
// 16 px de lado mayor: suficiente para los colores y forma de la foto en ~200 bytes.
const SIZE = 16;

async function listImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) return listImages(path);
      return extensions.test(entry.name) ? [path] : [];
    }),
  );
  return nested.flat();
}

const files = (await listImages(imagesDir)).sort();
const placeholders = {};

for (const file of files) {
  const buffer = await sharp(file)
    .resize(SIZE, SIZE, { fit: "inside" })
    .webp({ quality: 60 })
    .toBuffer();
  const src = `/${relative(join(root, "public"), file).split(sep).join("/")}`;
  placeholders[src] = `data:image/webp;base64,${buffer.toString("base64")}`;
}

await writeFile(output, `${JSON.stringify(placeholders, null, 2)}\n`);
console.log(`Vistas previas: ${files.length} imágenes → ${relative(root, output)}`);
