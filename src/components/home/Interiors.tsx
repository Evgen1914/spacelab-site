"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { getProduct } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ease } from "../Reveal";

// Интерьеры с точками на мебели (shop the look). Координаты точки — в процентах от фото.
const looks = [
  { image: "/img/colonna/04.jpg", title: "Светлая гостиная", slug: "colonna", dot: { x: 55, y: 52 } },
  { image: "/img/noir/04.jpg", title: "Графичная столовая", slug: "noir", dot: { x: 51, y: 51 } },
  { image: "/img/arbor/06.jpg", title: "Тёплый минимализм", slug: "arbor", dot: { x: 51, y: 50 } },
  { image: "/img/axis/01.jpg", title: "Спокойный графит", slug: "axis", dot: { x: 50, y: 42 } },
];

export default function Interiors() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const track = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);
  useEffect(() => {
    const measure = () => track.current && setShift(track.current.scrollWidth - window.innerWidth + 40);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  const x = useTransform(scrollYProgress, (p) => -p * shift);

  return (
    <section ref={ref} className="relative mt-40 h-[320vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mb-10 flex items-end justify-between px-5 md:px-10">
          <h2 className="font-display text-[clamp(2.2rem,5vw,4.5rem)] leading-none">Интерьеры</h2>
          <p className="eyebrow max-w-[220px] text-right text-stone">Нажмите на точку, чтобы увидеть стол</p>
        </div>
        <motion.div ref={track} style={{ x }} className="flex w-max gap-6 pl-5 md:pl-10">
          {looks.map((look, i) => (
            <Look key={look.image} look={look} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Look({ look, index }: { look: (typeof looks)[number]; index: number }) {
  const [open, setOpen] = useState(false);
  const product = getProduct(look.slug)!;
  const add = useCart((s) => s.add);

  return (
    <figure className="relative w-[82vw] shrink-0 md:w-[46vw]">
      <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
        <Image src={look.image} alt={look.title} fill sizes="(min-width: 768px) 46vw, 82vw" className="object-cover" />
        <button
          aria-label={`Показать ${product.name}`}
          onClick={() => setOpen((o) => !o)}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${look.dot.x}%`, top: `${look.dot.y}%` }}
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-paper/70" />
          <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-paper text-ink shadow-lg">
            <span className={`text-lg leading-none transition-transform duration-300 ${open ? "rotate-45" : ""}`}>+</span>
          </span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.45, ease }}
              className="absolute right-4 bottom-4 flex w-80 gap-4 bg-paper p-3"
            >
              <div className="relative aspect-square w-20 shrink-0 overflow-hidden">
                <Image src={product.images[0]} alt="" fill sizes="80px" className="object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg leading-tight">{product.name}</span>
                <span className="text-[11px] text-stone">{product.type}</span>
                <div className="mt-auto flex gap-4 pt-2 whitespace-nowrap">
                  <Link href={`/product/${product.slug}`} className="eyebrow link-line">
                    Подробнее
                  </Link>
                  <button
                    onClick={() =>
                      add({
                        slug: product.slug,
                        name: product.name,
                        image: product.images[0],
                        options: [{ label: "Вариант", value: "как на фото" }],
                      })
                    }
                    className="eyebrow link-line"
                  >
                    В корзину
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <figcaption className="mt-3 flex gap-3 text-sm">
        <span className="eyebrow text-stone">{String(index + 1).padStart(2, "0")}</span>
        {look.title}
      </figcaption>
    </figure>
  );
}
