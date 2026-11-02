"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { isStudio, rub, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ease } from "@/components/Reveal";

export default function ProductView({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors.options[0]);
  const [top, setTop] = useState(product.tops.options[0]);
  const [variant, setVariant] = useState(product.variants?.[0]);
  // что выбрали последним — столешницу или основание: его фото показываем первыми
  const [last, setLast] = useState<"top" | "color">("color");
  const [size, setSize] = useState(product.sizes[0]);
  const [zoom, setZoom] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const add = useCart((s) => s.add);

  // фото выбранного варианта или цвета идут первыми, остальные — после, чертёж в конце
  const picked = last === "top" ? [...(top.images ?? []), ...(color.images ?? [])] : [...(color.images ?? []), ...(top.images ?? [])];
  const first = variant ? [variant.image] : [...new Set(picked)];
  const gallery = [...first, ...product.images.filter((i) => !first.includes(i)), ...(product.drawing ? [product.drawing] : [])];
  const flat = (src: string) => src === product.drawing || isStudio(src);
  const chair = product.category === "chair";

  const addToCart = () => {
    const options = [
      { label: "Размер", value: `${size.size} мм` },
      ...(variant
        ? [
            { label: "Столешница", value: `${variant.top}, ${variant.finish}` },
            { label: "Основание", value: variant.base },
          ]
        : [
            { label: product.tops.label, value: top.name },
            { label: product.colors.label, value: color.name },
          ]),
    ];
    add({ slug: product.slug, name: product.name, image: gallery[0], price: size.price, options });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    // на компьютере — две колонки высотой в экран, каждая прокручивается сама;
    // докрутили колонку до конца — дальше едет страница (детали, стулья к столу)
    <div className="grid pt-14 md:mt-14 md:h-[calc(100svh-3.5rem)] md:grid-cols-12 md:pt-0">
      {/* Галерея: на телефоне листается вбок, на компьютере — колонка фото */}
      <div data-lenis-prevent className="thin-scroll min-w-0 !overscroll-y-auto md:col-span-7 md:h-full md:overflow-y-auto">
        <div className="flex snap-x snap-mandatory overflow-x-auto md:grid md:grid-cols-2 md:gap-1 md:overflow-visible">
          <AnimatePresence mode="popLayout" initial={false}>
            {gallery.map((src, i) => (
              <motion.button
                key={src}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease }}
                onClick={() => setZoom(src)}
                data-cursor="Увеличить"
                className={`relative w-[88vw] shrink-0 snap-start overflow-hidden md:w-auto ${
                  i === 0 || src === product.drawing ? `aspect-[4/5] md:col-span-2 ${chair ? "md:aspect-[5/4]" : "md:aspect-[4/3]"}` : "aspect-[4/5]"
                } ${src === product.drawing ? "bg-white" : "bg-paper-2"}`}
              >
                <Image
                  src={src}
                  alt={src === product.drawing ? `${product.name} — чертёж с размерами` : `${product.name} — фото ${i + 1}`}
                  fill
                  preload={i === 0}
                  sizes={i === 0 ? "(min-width: 768px) 58vw, 88vw" : "(min-width: 768px) 29vw, 88vw"}
                  className={
                    src === product.drawing ? "object-contain p-8 md:p-14" : flat(src) ? "object-contain p-6 mix-blend-multiply" : "object-cover"
                  }
                />
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Информация */}
      <div data-lenis-prevent className="thin-scroll !overscroll-y-auto px-5 pt-10 md:col-span-5 md:h-full md:overflow-y-auto md:px-12 md:pt-12 md:pb-16">
        <div>
          <nav className="eyebrow mb-8 text-stone">
            <Link href="/catalog" className="link-line">
              Каталог
            </Link>{" "}
            / {chair ? "Стулья" : "Столы"} / {product.name}
          </nav>
          <div className="flex items-baseline gap-4">
            <span className="eyebrow text-stone">{product.index}</span>
            {product.badge === "Хит" && <span className="eyebrow bg-clay px-2 py-1 text-[10px] text-paper">Самая популярная</span>}
            {product.badge === "Новинка" && <span className="eyebrow border border-ink px-2 py-0.5 text-[10px]">Новинка 2026</span>}
          </div>
          <h1 className="font-display mt-3 text-[clamp(3rem,5vw,4.5rem)] leading-none">{product.name}</h1>
          <p className="font-display mt-2 text-lg text-stone italic">{product.type}</p>
          <div className="mt-6 flex items-baseline justify-between gap-4">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={size.price}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease }}
                className="font-display text-3xl"
              >
                {rub(size.price)}
              </motion.p>
            </AnimatePresence>
            <span className="text-xs text-stone">{product.priceNote}</span>
          </div>

          <Option label={product.sizeLabel} value={chair ? "" : size.seats}>
            <div className="border-t border-ink">
              {product.sizes.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSize(s)}
                  className={`grid w-full grid-cols-[1.4fr_1fr_auto] items-baseline gap-3 border-b border-line px-3 py-3.5 text-left text-sm transition-colors ${
                    size.id === s.id ? "bg-ink text-paper" : "hover:bg-paper-2"
                  }`}
                >
                  <span>
                    {s.size} <span className="text-[11px] opacity-60">мм</span>
                  </span>
                  <span className="text-xs opacity-60">{chair ? `${product.colors.options.length} цвета каркаса` : s.seats}</span>
                  <span className="font-display text-base">{rub(s.price)}</span>
                </button>
              ))}
            </div>
          </Option>

          {variant && product.variants ? (
            <Option label="Сочетание" value={`${variant.top} · ${variant.finish} · основание ${variant.base}`}>
              <div className="grid grid-cols-3 gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    aria-label={`${v.top}, ${v.finish}, основание ${v.base}`}
                    onClick={() => setVariant(v)}
                    className={`relative aspect-[7/4] overflow-hidden bg-paper-2 ring-1 ring-offset-2 ring-offset-paper transition-all ${
                      variant.id === v.id ? "ring-ink" : "ring-transparent hover:ring-line"
                    }`}
                  >
                    <Image src={v.image} alt="" fill sizes="120px" className="object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-stone">Другое сочетание камня и основания уточните у менеджера при заказе.</p>
            </Option>
          ) : (
            <>
              <Option label={product.tops.label} value={[top.name, top.note].filter(Boolean).join(", ")}>
                <div className="flex flex-wrap gap-2">
                  {product.tops.options.map((o) => {
                    const one = product.tops.options.length === 1;
                    const Tag = one ? "span" : "button";
                    return (
                      <Tag
                        key={o.id}
                        aria-label={o.name}
                        {...(one ? {} : { onClick: () => (setTop(o), setLast("top")) })}
                        className={`relative block h-12 w-16 overflow-hidden ring-1 ring-offset-2 ring-offset-paper transition-all ${
                          top.id === o.id && !one ? "ring-ink" : one ? "ring-line" : "ring-transparent hover:ring-line"
                        }`}
                        style={o.texture ? undefined : { background: o.hex }}
                      >
                        {o.texture && <Image src={o.texture} alt="" fill sizes="64px" className="object-cover" />}
                      </Tag>
                    );
                  })}
                </div>
              </Option>
              <Option label={product.colors.label} value={[color.name, color.note].filter(Boolean).join(", ")}>
                <div className="flex gap-3">
                  {product.colors.options.map((o) => (
                    <button
                      key={o.id}
                      aria-label={o.name}
                      onClick={() => (setColor(o), setLast("color"))}
                      className={`rounded-full p-[3px] ring-1 transition-all ${color.id === o.id ? "ring-ink" : "ring-transparent hover:ring-line"}`}
                    >
                      <span className="block h-8 w-8 rounded-full ring-1 ring-black/10" style={{ background: o.hex }} />
                    </button>
                  ))}
                </div>
              </Option>
            </>
          )}

          <button onClick={addToCart} className="eyebrow relative mt-10 w-full overflow-hidden bg-ink py-5 text-paper">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={added ? "added" : "add"}
                initial={{ y: "120%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                transition={{ duration: 0.4, ease }}
                className="block"
              >
                {added ? "Добавлено ✓" : "Добавить в корзину"}
              </motion.span>
            </AnimatePresence>
          </button>
          <p className="mt-3 text-center text-xs text-stone">Оплата после согласования деталей с менеджером</p>

          <div className="mt-12 border-t border-line">
            <Accordion title="Описание" defaultOpen>
              <p className="font-display italic">{product.lead}</p>
              {product.description.map((d) => (
                <p key={d} className="mt-3">
                  {d}
                </p>
              ))}
            </Accordion>
            <Accordion title="Материалы и характеристики">
              <dl className="space-y-2">
                {product.specs.map((s) => (
                  <div key={s.label} className="flex justify-between gap-6">
                    <dt className="text-stone">{s.label}</dt>
                    <dd className="text-right">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </Accordion>
            <Accordion title="Доставка и сборка">
              {/* TODO: условия доставки от владельца */}
              <p>Сроки и стоимость доставки менеджер рассчитает после заявки.</p>
            </Accordion>
          </div>
        </div>
      </div>

      <Lightbox src={zoom} close={() => setZoom(null)} />
    </div>
  );
}

function Option({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return (
    <div className="mt-8">
      <p className="eyebrow mb-3">
        {label} <span className="ml-2 normal-case tracking-normal text-stone">{value}</span>
      </p>
      {children}
    </div>
  );
}

function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-line">
      <button onClick={() => setOpen(!open)} className="eyebrow flex w-full items-center justify-between py-5">
        {title}
        <span className={`text-base transition-transform duration-500 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-sm leading-relaxed">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Lightbox({ src, close }: { src: string | null; close: () => void }) {
  const lenis = useLenis();
  useEffect(() => {
    if (src) lenis?.stop();
    else lenis?.start();
  }, [src, lenis]);
  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={close}
          data-cursor="Закрыть"
          className="fixed inset-0 z-[80] bg-paper"
        >
          <motion.div initial={{ scale: 0.94 }} animate={{ scale: 1 }} transition={{ duration: 0.6, ease }} className="absolute inset-6 md:inset-12">
            <Image src={src} alt="" fill sizes="100vw" className="object-contain mix-blend-multiply" />
          </motion.div>
          <button className="eyebrow link-line absolute top-5 right-5">Закрыть</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
