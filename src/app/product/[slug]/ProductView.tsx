"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { formatPrice, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ease } from "@/components/Reveal";

export default function ProductView({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors?.options[0]);
  const [top, setTop] = useState(product.tops?.options[0]);
  const [size, setSize] = useState(product.sizes[0]);
  const [zoom, setZoom] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const add = useCart((s) => s.add);

  // фото выбранного цвета идут первыми, остальные — после
  const images = color?.images ? [...color.images, ...product.images.filter((i) => !color.images!.includes(i))] : product.images;
  const gallery = product.drawing ? [...images, product.drawing] : images;

  const addToCart = () => {
    const options = [
      ...(size ? [{ label: "Размер", value: `${size} см` }] : []),
      ...(color && product.colors ? [{ label: product.colors.label, value: color.name }] : []),
      ...(top && product.tops ? [{ label: product.tops.label, value: top.name }] : []),
    ];
    add({ slug: product.slug, name: product.name, image: images[0], options });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="grid pt-14 md:grid-cols-12">
      {/* Галерея: на телефоне листается вбок, на компьютере — колонка фото */}
      <div className="flex snap-x snap-mandatory overflow-x-auto md:col-span-7 md:grid md:grid-cols-2 md:gap-1 md:overflow-visible">
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
              className={`relative w-[88vw] shrink-0 snap-start overflow-hidden bg-paper-2 md:w-auto ${
                i === 0 ? "aspect-[4/5] md:col-span-2 md:aspect-[4/3]" : "aspect-[4/5]"
              } ${src === product.drawing ? "bg-white" : ""}`}
            >
              <Image
                src={src}
                alt={`${product.name} — фото ${i + 1}`}
                fill
                preload={i === 0}
                sizes={i === 0 ? "(min-width: 768px) 58vw, 88vw" : "(min-width: 768px) 29vw, 88vw"}
                className={src === product.drawing ? "object-contain p-6" : "object-cover"}
              />
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Информация */}
      <div className="px-5 pt-10 md:col-span-5 md:px-12 md:pt-16">
        <div className="md:sticky md:top-24">
          <nav className="eyebrow mb-8 text-stone">
            <Link href="/catalog" className="link-line">
              Каталог
            </Link>{" "}
            / {product.name}
          </nav>
          <div className="flex items-baseline gap-4">
            <span className="eyebrow text-stone">{product.index}</span>
            {product.badge && <span className="eyebrow text-clay">{product.badge}</span>}
          </div>
          <h1 className="font-display mt-3 text-[clamp(3rem,5vw,4.5rem)] leading-none">{product.name}</h1>
          <p className="mt-3 text-sm text-stone">
            {product.type} · {product.tagline}
          </p>
          <p className="mt-6 text-lg">{formatPrice(product.price)}</p>

          {product.colors && color && (
            <Option label={product.colors.label} value={color.name}>
              <div className="flex gap-3">
                {product.colors.options.map((o) => (
                  <button
                    key={o.id}
                    aria-label={o.name}
                    onClick={() => setColor(o)}
                    className={`rounded-full p-[3px] ring-1 transition-all ${color.id === o.id ? "ring-ink" : "ring-transparent hover:ring-line"}`}
                  >
                    <span className="block h-8 w-8 rounded-full" style={{ background: o.hex }} />
                  </button>
                ))}
              </div>
            </Option>
          )}

          {product.tops && top && (
            <Option label={product.tops.label} value={top.name}>
              <div className="flex gap-2">
                {product.tops.options.map((o) => (
                  <button
                    key={o.id}
                    aria-label={o.name}
                    onClick={() => setTop(o)}
                    className={`relative h-16 w-14 overflow-hidden ring-1 ring-offset-2 ring-offset-paper transition-all ${
                      top.id === o.id ? "ring-ink" : "ring-transparent hover:ring-line"
                    }`}
                  >
                    <Image src={o.texture!} alt="" fill sizes="56px" className="object-cover" />
                  </button>
                ))}
              </div>
              {product.tops.note && <p className="mt-3 text-xs text-stone">{product.tops.note}</p>}
            </Option>
          )}

          {product.sizes.length > 0 ? (
            <Option label="Размер, см" value="Д × Ш × В">
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`border px-4 py-2.5 text-sm transition-colors ${size === s ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </Option>
          ) : (
            <p className="mt-8 text-sm text-stone">Размер подберём под ваше помещение — укажите пожелания в заявке.</p>
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
              <p>{product.description}</p>
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
            <Image src={src} alt="" fill sizes="100vw" className="object-contain" />
          </motion.div>
          <button className="eyebrow link-line absolute top-5 right-5">Закрыть</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
