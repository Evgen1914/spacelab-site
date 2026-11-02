"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { formatFrom, getProduct } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ease } from "../Reveal";

// Интерьеры с точками на мебели (shop the look). Координаты точки — в процентах от видимой карточки 4:3.
// pos — какая часть фото попадает в карточку (object-position): вертикальные и квадратные фото
// сдвигаем вниз, чтобы стол был виден целиком, с ножками.
const looks = [
  { image: "/img/scandi/room-cover.jpg", title: "Тёплый минимализм", slug: "scandi", dot: { x: 52, y: 42 }, pos: "50% 85%" },
  { image: "/img/cono/room-gold.jpg", title: "Золото и камень", slug: "cono", dot: { x: 50, y: 66 } },
  { image: "/img/kona/green.jpg", title: "Изумрудная столовая", slug: "kona", dot: { x: 46, y: 34 } },
  { image: "/img/trio/room.jpg", title: "Вечерняя столовая", slug: "trio", dot: { x: 50, y: 66 } },
  { image: "/img/rondo/room.jpg", title: "Круглый стол", slug: "rondo", dot: { x: 50, y: 43 }, pos: "50% 80%" },
  { image: "/img/hora/room-2.jpg", title: "Серый минимализм", slug: "hora", dot: { x: 50, y: 62 } },
  { image: "/img/axis/black-room.jpg", title: "Спокойный графит", slug: "axis", dot: { x: 50, y: 42 } },
];

// Лента листается вбок: пальцем, тачпадом или стрелками. Прокрутка вниз просто ведёт страницу дальше.
export default function Interiors() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  // какой интерьер сейчас ближе всего к левому краю + доля пройденной ленты
  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const cards = [...el.children] as HTMLElement[];
    const pos = el.scrollLeft + cards[0].offsetLeft;
    let i = cards.findIndex((c) => c.offsetLeft + c.offsetWidth / 2 > pos);
    if (el.scrollLeft >= max - 4) i = cards.length - 1;
    setActive(Math.max(0, i));
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft >= max - 4 });
  };

  useEffect(() => {
    onScroll();
    window.addEventListener("resize", onScroll);
    return () => window.removeEventListener("resize", onScroll);
  }, []);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.children[0] as HTMLElement;
    el.scrollBy({ left: dir * (card.offsetWidth + 24), behavior: "smooth" });
  };

  return (
    <section className="mt-40" aria-roledescription="карусель" aria-label="Интерьеры">
      <div className="mb-10 flex items-end justify-between gap-6 px-5 md:px-10">
        <div>
          <h2 className="font-display text-[clamp(2.2rem,5vw,4.5rem)] leading-none">Интерьеры</h2>
          <p className="eyebrow mt-4 text-stone">Листайте вбок · нажмите на точку, чтобы увидеть стол</p>
        </div>
        <div className="flex items-center gap-5">
          <span className="font-display text-xl tabular-nums max-md:hidden">
            {String(active + 1).padStart(2, "0")}
            <span className="text-stone/60"> / {String(looks.length).padStart(2, "0")}</span>
          </span>
          <div className="flex gap-2">
            {([-1, 1] as const).map((d) => (
              <button
                key={d}
                onClick={() => go(d)}
                disabled={d === -1 ? edges.start : edges.end}
                aria-label={d === -1 ? "Предыдущий интерьер" : "Следующий интерьер"}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/80 text-lg transition-colors hover:bg-ink hover:text-paper disabled:pointer-events-none disabled:opacity-25"
              >
                {d === -1 ? "←" : "→"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={track}
        onScroll={onScroll}
        data-lenis-prevent-horizontal
        className="flex snap-x snap-mandatory scroll-px-5 gap-6 overflow-x-auto overscroll-x-contain px-5 pb-2 [scrollbar-width:none] md:scroll-px-10 md:px-10 [&::-webkit-scrollbar]:hidden"
      >
        {looks.map((look, i) => (
          <Look key={look.image} look={look} index={i} />
        ))}
        {/* отступ справа, чтобы последняя карточка могла встать к левому краю */}
        <span aria-hidden className="w-px shrink-0" />
      </div>

      <div className="mx-5 mt-8 h-px bg-line md:mx-10">
        <div className="h-px origin-left bg-ink transition-transform duration-300" style={{ transform: `scaleX(${Math.max(progress, 1 / looks.length)})` }} />
      </div>
    </section>
  );
}

function Look({ look, index }: { look: (typeof looks)[number]; index: number }) {
  const [open, setOpen] = useState(false);
  const product = getProduct(look.slug)!;
  const add = useCart((s) => s.add);

  return (
    <figure className="relative w-[82vw] shrink-0 snap-start md:w-[46vw]">
      <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
        <Image
          src={look.image}
          alt={look.title}
          fill
          sizes="(min-width: 768px) 46vw, 82vw"
          className="object-cover"
          style={"pos" in look ? { objectPosition: look.pos } : undefined}
        />
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
              <div className="relative aspect-square w-20 shrink-0 overflow-hidden bg-paper-2">
                <Image src={product.cutout} alt="" fill sizes="80px" className="object-contain mix-blend-multiply" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg leading-tight">{product.name}</span>
                <span className="text-[11px] text-stone">{formatFrom(product)}</span>
                <div className="mt-auto flex gap-4 pt-2 whitespace-nowrap">
                  <Link href={`/product/${product.slug}`} className="eyebrow link-line">
                    Подробнее
                  </Link>
                  <button
                    onClick={() =>
                      add({
                        slug: product.slug,
                        name: product.name,
                        image: product.cutout,
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
