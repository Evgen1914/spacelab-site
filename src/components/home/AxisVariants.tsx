"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { getProduct, slabs } from "@/lib/products";
import Reveal, { SplitLines, ease } from "../Reveal";

// цвет кружка основания по подписи варианта
const baseHex: Record<string, string> = { "чёрное": "#1f1c19", "беж": "#b9a283" };

// Axis · 6 вариантов в один экран: слева сочетания (камень + основание), справа стол.
// Нажал на сочетание — стол сменился; ничего не закрепляется и не «съедает» прокрутку.
export default function AxisVariants() {
  const axis = getProduct("axis")!;
  const variants = axis.variants ?? [];
  const [active, setActive] = useState(0);
  if (!variants.length) return null;
  const v = variants[active];

  return (
    <section id="axis-variants" className="mt-40 px-5 md:px-10">
      {/* телефон: заголовок → стол → сочетания; компьютер: заголовок и сочетания слева, стол справа */}
      <div className="grid gap-8 md:grid-cols-12 md:grid-rows-[auto_1fr] md:gap-x-6 md:gap-y-0">
        <div className="md:col-span-4">
          <p className="eyebrow text-stone">Axis · {variants.length} вариантов</p>
          <h2 className="font-display mt-4 text-[clamp(2.2rem,4.2vw,4rem)] leading-[1.05]">
            <SplitLines lines={["Камень", "и основание"]} />
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-stone">Выберите сочетание столешницы и цвета опоры.</p>
        </div>

        <div className="max-md:order-3 md:col-span-4 md:row-start-2">
          <ul className="grid md:mt-8 grid-cols-2 gap-x-4 border-t border-line md:grid-cols-1">
            {variants.map((x, i) => {
              const slab = slabs.find((s) => s.name === x.top);
              return (
                <li key={x.id} className="border-b border-line">
                  <button
                    onClick={() => setActive(i)}
                    aria-pressed={i === active}
                    className={`flex w-full items-center gap-3 py-3 text-left transition-opacity duration-300 md:gap-4 ${
                      i === active ? "opacity-100" : "opacity-60 hover:opacity-90"
                    }`}
                  >
                    {/* круг — рисунок камня, точка снизу справа — цвет основания */}
                    <span className={`relative h-9 w-9 shrink-0 rounded-full ${i === active ? "ring-1 ring-ink ring-offset-2 ring-offset-paper" : ""}`}>
                      {slab?.texture && <Image src={slab.texture} alt="" fill sizes="40px" className="rounded-full object-cover" />}
                      <span
                        className="absolute -right-0.5 -bottom-0.5 h-3.5 w-3.5 rounded-full border-2 border-paper"
                        style={{ background: baseHex[x.base] }}
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm leading-tight">{x.top}</span>
                      <span className="mt-0.5 block text-xs text-stone">
                        {x.finish} · основание {x.base}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <Link href={`/product/${axis.slug}`} className="eyebrow link-line mt-8 inline-block max-md:hidden">
            Смотреть Axis →
          </Link>
        </div>

        <Reveal className="md:col-span-8 md:col-start-5 md:row-span-2 md:row-start-1 md:self-center">
          <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
            <AnimatePresence initial={false}>
              <motion.div
                key={v.id}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease }}
                className="absolute inset-0"
              >
                <Image
                  src={v.image}
                  alt={`Axis — ${v.top}, ${v.finish}, основание ${v.base}`}
                  fill
                  sizes="(min-width: 768px) 66vw, 100vw"
                  className="object-contain p-4 mix-blend-multiply md:p-10"
                />
              </motion.div>
            </AnimatePresence>
            <p className="font-display absolute bottom-4 left-4 text-lg tabular-nums md:bottom-6 md:left-6 md:text-2xl">
              {String(active + 1).padStart(2, "0")}
              <span className="text-stone/60"> / {String(variants.length).padStart(2, "0")}</span>
            </p>
          </div>
          <Link href={`/product/${axis.slug}`} className="eyebrow link-line mt-5 inline-block md:hidden">
            Смотреть Axis →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
