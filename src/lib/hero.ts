// Варианты первого экрана главной. На сайте стоит C, A и B — для показа заказчику (/hero/a, /hero/b).
// tone — цвет логотипа и шапки поверх первого экрана,
// logoTop — где стоит большой логотип (доля высоты экрана, по центру букв).
export type HeroVariant = "a" | "b" | "c";

export const heroVariants: Record<HeroVariant, { tone: "light" | "dark"; logoTop: number; title: string }> = {
  a: { tone: "dark", logoTop: 0.17, title: "A · Галерея" },
  b: { tone: "light", logoTop: 0.22, title: "B · Тёмный камень" },
  c: { tone: "light", logoTop: 0.62, title: "C · Затемнённое фото" },
};

// какой вариант показывать на странице по её адресу
export function heroFromPath(path: string): HeroVariant | null {
  if (path === "/") return "c"; // на главной — вариант C
  const m = path.match(/^\/hero\/([abc])$/);
  return m ? (m[1] as HeroVariant) : null;
}
