"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import type { HeroVariant } from "@/lib/hero";
import { ease } from "../Reveal";
import { models, tables } from "@/lib/products";
import { WHATSAPP } from "@/lib/contacts";

export default function Hero({ variant = "c" }: { variant?: HeroVariant }) {
  if (variant === "a") return <GalleryHero />;
  if (variant === "b") return <StoneHero />;
  return <PhotoHero />;
}

function Caption({ light = true, className = "" }: { light?: boolean; className?: string }) {
  // подпись уходит при прокрутке, чтобы не залезать под шапку
  const { scrollY } = useScroll();
  const fade = useTransform(scrollY, [0, 260], [1, 0]);
  return (
    <motion.div style={{ opacity: fade }} className={className}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease, delay: 0.8 }}
        className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${light ? "text-paper" : "text-ink"}`}
      >
        <div>
          <p className="eyebrow opacity-80">Коллекция 2026 · {models(tables.length)}</p>
          <h1 className="font-display mt-3 max-w-2xl text-[clamp(2rem,4.4vw,4rem)] leading-[1.05]">Обеденные столы из керамогранита</h1>
          <p className="mt-3 text-sm opacity-80 md:text-base">Дерево, металл и нержавеющая сталь · стулья к ним</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="#collection"
            className={`eyebrow px-6 py-4 transition-opacity hover:opacity-85 ${light ? "bg-paper text-ink" : "bg-ink text-paper"}`}
          >
            Смотреть коллекцию
          </a>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className={`eyebrow border px-6 py-4 transition-colors ${light ? "border-paper/60 hover:bg-paper/10" : "border-ink/60 hover:bg-ink/5"}`}
          >
            Подобрать в WhatsApp
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

// C: фото на весь экран с затемнением, белый логотип поверх
function PhotoHero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 220]);
  return (
    <section className="relative h-[100svh] overflow-hidden bg-ink">
      <motion.div className="absolute inset-0" style={{ y }}>
        <motion.div className="absolute inset-0" initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease }}>
          <Image src="/img/kona/room.jpg" alt="Стол Kona в интерьере" fill preload sizes="100vw" className="object-cover object-[50%_65%]" />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-ink/30" />
      <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-ink/80 via-ink/45 to-transparent" />
      <Caption className="absolute inset-x-0 bottom-0 px-5 pb-8 md:px-10" />
    </section>
  );
}

// A: светлый фон и чёрный логотип сверху, под ним фото в рамке — как журнальная обложка
function GalleryHero() {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 900], [1, 1.12]);
  return (
    <section className="flex h-[100svh] flex-col bg-paper px-5 pb-6 pt-[calc(14.3vw+18vh)] md:px-10 md:pt-[calc(14.3vw+9vh)]">
      <motion.div
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={{ clipPath: "inset(0% 0 0 0)" }}
        transition={{ duration: 1.6, ease, delay: 0.2 }}
        className="relative flex-1 overflow-hidden"
      >
        <motion.div className="absolute inset-0" style={{ scale }}>
          <Image src="/img/axis/black-room-2.jpg" alt="Стол Axis в интерьере" fill preload sizes="100vw" className="object-cover object-[50%_60%]" />
        </motion.div>
      </motion.div>
      <Caption light={false} className="pt-5" />
    </section>
  );
}

// B: чёрный мрамор на весь экран, белый логотип, фото стола карточкой
// Фон: Alena Lavrova, Unsplash (бесплатная лицензия Unsplash)
function StoneHero() {
  return (
    <section className="relative h-[100svh] overflow-hidden bg-ink">
      <motion.div className="absolute inset-0" initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 2.4, ease }}>
        <Image src="/img/hero-marble.jpg" alt="" fill preload sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-ink/25" />
      <motion.div
        initial={{ opacity: 0, y: 60, x: "-50%" }}
        animate={{ opacity: 1, y: 0, x: "-50%" }}
        transition={{ duration: 1.4, ease, delay: 0.5 }}
        className="absolute bottom-32 left-1/2 aspect-[4/3] w-[86vw] overflow-hidden shadow-2xl md:bottom-16 md:w-[36vw]"
      >
        <Image src="/img/axis/beige-room-2.jpg" alt="Стол Axis в интерьере" fill sizes="(min-width: 768px) 36vw, 78vw" className="object-cover" />
      </motion.div>
      <Caption className="absolute inset-x-0 bottom-0 px-5 pb-8 md:px-10" />
    </section>
  );
}
