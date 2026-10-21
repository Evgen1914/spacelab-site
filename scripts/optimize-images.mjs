// Нарезка фото заранее: public/img/**/*.jpg|png → public/img-opt/**/<имя>-<ширина>.webp
// Сервер тогда не сжимает картинки сам (это тяжело для маленького VPS), а отдаёт готовые файлы.
// Запуск: npm run images — после того как добавили или заменили фото в public/img.
// Ширины должны совпадать с deviceSizes + imageSizes в next.config.ts.
import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

export const WIDTHS = [128, 256, 480, 828, 1200, 1920];

const root = path.resolve(import.meta.dirname, "..");
const src = path.join(root, "public/img");
const out = path.join(root, "public/img-opt");

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (/\.(jpe?g|png)$/i.test(e.name)) yield p;
  }
}

let made = 0;
let skipped = 0;
for await (const file of walk(src)) {
  const rel = path.relative(src, file).replace(/\.(jpe?g|png)$/i, "");
  const mtime = (await stat(file)).mtimeMs;
  // чертежи и фото на белом фоне — чуть выше качество, чтобы не было «грязи» на однотонном фоне
  const quality = /drawing|cutout|\/v-|studio/.test(rel) ? 86 : 78;
  for (const w of WIDTHS) {
    const target = path.join(out, `${rel}-${w}.webp`);
    const done = await stat(target).catch(() => null);
    if (done && done.mtimeMs >= mtime) {
      skipped++;
      continue;
    }
    await mkdir(path.dirname(target), { recursive: true });
    await sharp(file).resize({ width: w, withoutEnlargement: true }).webp({ quality, effort: 5 }).toFile(target);
    made++;
  }
}
console.log(`img-opt: создано ${made}, без изменений ${skipped}`);
