"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import ProductCard from "@/components/ProductCard";
import { SplitLines, ease } from "@/components/Reveal";
import { chairs, models, tableGroups, tables, type Product } from "@/lib/products";

const filters: { id: string; label: string; test: (p: Product) => boolean }[] = [
  { id: "all", label: "Все", test: () => true },
  { id: "rect", label: "Прямоугольные", test: (p) => p.shape === "rect" },
  { id: "oval", label: "Овальные", test: (p) => p.shape === "oval" },
  { id: "round", label: "Круглые", test: (p) => p.shape === "round" },
  { id: "wood", label: "Дерево", test: (p) => p.category === "table" && p.materials.includes("wood") },
  { id: "metal", label: "Металл", test: (p) => p.materials.includes("metal") },
  { id: "new", label: "Новинки", test: (p) => p.badge === "Новинка" },
  { id: "chairs", label: "Стулья", test: (p) => p.category === "chair" },
];

export default function Catalog() {
  const [filter, setFilter] = useState("all");
  const test = filters.find((f) => f.id === filter)!.test;

  // группы каталога; пустые после фильтра не показываем
  const groups = [
    ...tableGroups.map((g) => ({ ...g, note: g.id === "rect" ? "1400–1800 мм" : "овал до 2000 мм · круг Ø 900–1200" })),
    { id: "chairs", title: "Стулья", items: chairs, note: "массив дуба · мягкая обивка" },
  ]
    .map((g) => ({ ...g, items: g.items.filter(test) }))
    .filter((g) => g.items.length);
  const shown = groups.reduce((n, g) => n + g.items.length, 0);

  const pick = (id: string) => {
    setFilter(id);
    window.scrollTo({ top: Math.min(window.scrollY, document.getElementById("catalog-grid")!.offsetTop - 140), behavior: "smooth" });
  };

  return (
    <div className="px-5 pt-28 md:px-10 md:pt-36">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-[clamp(2.6rem,7vw,7rem)] leading-none">
            <SplitLines lines={["Коллекция"]} />
          </h1>
          <p className="font-display mt-4 text-lg text-stone italic">
            {models(tables.length)} обеденных столов и {chairs.length} стула
          </p>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-stone">
          Керамогранит 12 мм во всех столах, высота 750 мм. Размер, цвет основания и столешницы подберём под ваше пространство.
        </p>
      </div>

      <div className="sticky top-14 z-30 -mx-5 mt-12 flex items-center justify-between gap-6 border-y border-line bg-paper/85 px-5 py-3 backdrop-blur-md md:-mx-10 md:px-10">
        <div className="-my-3 flex gap-5 overflow-x-auto py-3 [scrollbar-width:none]">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => pick(f.id)}
              className={`eyebrow shrink-0 transition-colors ${filter === f.id ? "text-ink underline underline-offset-[6px]" : "text-stone hover:text-ink"}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div id="catalog-grid">
        <AnimatePresence mode="popLayout">
          {groups.map((g) => (
            <motion.section
              key={g.id}
              id={g.id === "chairs" ? "chairs" : undefined}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease }}
              className="mt-14 scroll-mt-32 md:mt-20"
            >
              <div className="mb-8 flex items-baseline justify-between gap-4 border-b border-line pb-4">
                <h2 className="font-display text-2xl md:text-3xl">
                  {g.title} <span className="eyebrow ml-2 align-middle text-stone">{g.items.length}</span>
                </h2>
                <span className="font-display text-sm text-stone italic max-md:hidden">{g.note}</span>
              </div>

              {g.id === "chairs" && filter === "all" ? (
                <ChairsBlock items={g.items} />
              ) : (
                <Grid items={g.items} chairs={g.id === "chairs"} />
              )}
            </motion.section>
          ))}
        </AnimatePresence>
      </div>
      <p className="eyebrow mt-16 text-stone">Показано: {shown}</p>
    </div>
  );
}

// Сетка без «дыр»: число колонок подбирается под количество моделей,
// а если ряд всё равно не заполняется — первая модель встаёт широкой карточкой на две колонки.
function layout(n: number) {
  if (n % 4 === 0) return { cols: 4, wide: false };
  if (n % 3 === 0) return { cols: 3, wide: false };
  if ((n + 1) % 3 === 0) return { cols: 3, wide: true };
  if ((n + 1) % 4 === 0) return { cols: 4, wide: true };
  return { cols: 3, wide: false };
}

// соотношения сторон: обычная карточка и широкая (на две колонки, той же высоты).
// Классы записаны целиком, иначе Tailwind их не найдёт.
const ASPECT = {
  table: { sm: "aspect-[4/3]", smWide: "aspect-[8/3]", md: "md:aspect-[4/3]", mdWide: "md:aspect-[8/3]" },
  chair: { sm: "aspect-[4/5]", smWide: "aspect-[8/5]", md: "md:aspect-[4/5]", mdWide: "md:aspect-[8/5]" },
};

function Grid({ items, chairs }: { items: Product[]; chairs?: boolean }) {
  const { cols, wide } = layout(items.length);
  const A = ASPECT[chairs ? "chair" : "table"];
  const wideMobile = items.length % 2 === 1 && items.length > 1; // на телефоне две колонки
  return (
    <motion.div layout className={`grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-5 ${cols === 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
      <AnimatePresence mode="popLayout">
        {items.map((p, i) => {
          const big = i === 0;
          const spanMd = big && wide;
          const spanSm = big && wideMobile;
          return (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease }}
              className={`min-w-0 ${spanSm ? "col-span-2" : ""} ${spanMd ? "md:col-span-2" : spanSm ? "md:col-span-1" : ""}`}
            >
              <ProductCard
                product={p}
                studio
                aspect={`${spanSm ? A.smWide : A.sm} ${spanMd ? A.mdWide : spanSm ? A.md : ""}`}
                sizes={spanMd ? "(min-width: 768px) 66vw, 100vw" : cols === 4 ? "(min-width: 768px) 25vw, 50vw" : "(min-width: 768px) 33vw, 50vw"}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
}

// стулья в общем каталоге — с атмосферным фото, как разворот «Стулья» в каталоге
function ChairsBlock({ items }: { items: Product[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-12">
      <div className="relative aspect-[4/5] overflow-hidden bg-paper-2 md:col-span-4 md:aspect-auto">
        <Image src="/img/chairs/podium.jpg" alt="Стулья homeb" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/55 to-transparent" />
        <p className="font-display absolute bottom-5 left-5 text-xl text-paper italic">три оттенка дерева</p>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:col-span-8 md:grid-cols-3 md:gap-x-5">
        {items.map((p) => (
          <ProductCard key={p.slug} product={p} studio aspect="aspect-[4/5]" sizes="(min-width: 768px) 22vw, 50vw" />
        ))}
      </div>
    </div>
  );
}
