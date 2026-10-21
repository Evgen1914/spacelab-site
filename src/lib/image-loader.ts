"use client";

// Отдаёт заранее нарезанный файл из public/img-opt вместо обработки на сервере.
// Ширины приходят из deviceSizes/imageSizes (next.config.ts) — те же, что нарезает scripts/optimize-images.mjs.
const WIDTHS = [128, 256, 480, 828, 1200, 1920];

export default function imageLoader({ src, width }: { src: string; width: number }) {
  if (!src.startsWith("/img/")) return src;
  const w = WIDTHS.find((x) => x >= width) ?? WIDTHS[WIDTHS.length - 1];
  return src.replace(/^\/img\//, "/img-opt/").replace(/\.(jpe?g|png)$/i, `-${w}.webp`);
}
