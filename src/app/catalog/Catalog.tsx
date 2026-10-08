"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import ProductCard from "@/components/ProductCard";
import { SplitLines, ease } from "@/components/Reveal";
import { products, type Product } from "@/lib/products";

const filters: { id: string; label: string; test: (p: Product) => boolean }[] = [
  { id: "all", label: "Все", test: () => true },
  { id: "ceramic", label: "Керамогранит", test: (p) => p.materials.includes("ceramic") },
  { id: "wood", label: "Дерево", test: (p) => p.materials.includes("wood") },
  { id: "metal", label: "Металл", test: (p) => p.materials.includes("metal") },
  { id: "oval", label: "Овальные", test: (p) => p.shape === "oval" },
];

export default function Catalog() {
  const [filter, setFilter] = useState("all");
  const [cols, setCols] = useState<2 | 4>(2);
  const list = products.filter(filters.find((f) => f.id === filter)!.test);

  return (
    <div className="px-5 pt-28 md:px-10 md:pt-36">
      <h1 className="font-display text-[clamp(2.6rem,7vw,7rem)] leading-none">
        <SplitLines lines={["Обеденные столы"]} />
      </h1>

      <div className="sticky top-14 z-30 -mx-5 mt-12 flex items-center justify-between gap-6 border-y border-line bg-paper/85 px-5 py-3 backdrop-blur-md md:-mx-10 md:px-10">
        <div className="flex gap-5 overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`eyebrow shrink-0 transition-colors ${filter === f.id ? "text-ink underline underline-offset-[6px]" : "text-stone hover:text-ink"}`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <span className="eyebrow text-stone">Вид</span>
          {([2, 4] as const).map((n) => (
            <button key={n} onClick={() => setCols(n)} aria-label={`${n} в ряд`} className={`flex gap-[3px] p-1 ${cols === n ? "opacity-100" : "opacity-30"}`}>
              {Array.from({ length: n }).map((_, i) => (
                <span key={i} className="block h-3 w-[5px] bg-ink" />
              ))}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className={`mt-10 grid gap-x-5 gap-y-14 ${cols === 2 ? "md:grid-cols-2" : "grid-cols-2 md:grid-cols-4"}`}>
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease }}
            >
              <ProductCard product={p} aspect={cols === 2 ? "aspect-[4/5]" : "aspect-[3/4]"} sizes={cols === 2 ? "(min-width: 768px) 50vw, 100vw" : "25vw"} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <p className="eyebrow mt-16 text-stone">Показано: {list.length}</p>
    </div>
  );
}
