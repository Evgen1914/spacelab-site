"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import type { HeroVariant } from "@/lib/hero";
import { ease } from "../Reveal";

export default function Hero({ variant = "current" }: { variant?: HeroVariant }) {
  if (variant === "a") return <GalleryHero />;
  if (variant === "b") return <StoneHero />;
  return <PhotoHero dim={variant === "c"} />;
}

function Caption({ light = true, className = "" }: { light?: boolean; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease, delay: 0.8 }}
      className={`flex items-end justify-between ${light ? "text-paper" : "text-ink"} ${className}`}
    >
      <div>
        <p className="eyebrow opacity-80">Коллекция 2026</p>
        <p className="font-display mt-2 text-2xl md:text-3xl">Обеденные столы</p>
      </div>
      <a href="#collection" className="eyebrow link-line">
        Смотреть ↓
      </a>
    </motion.div>
  );
}

// Фото на весь экран, белый логотип поверх. dim — затемнение, чтобы логотип читался
function PhotoHero({ dim }: { dim: boolean }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 220]);
  return (
    <section className="relative h-[100svh] overflow-hidden bg-ink">
      <motion.div className="absolute inset-0" style={{ y }}>
        <motion.div className="absolute inset-0" initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease }}>
          <Image src="/img/axis/00.jpg" alt="Стол Axis в интерьере" fill preload sizes="100vw" className="object-cover" />
        </motion.div>
      </motion.div>
      {dim ? (
        <>
          <div className="absolute inset-0 bg-ink/30" />
          <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-ink/80 via-ink/45 to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-transparent to-ink/45" />
      )}
      <Caption className="absolute inset-x-0 bottom-0 px-5 pb-8 md:px-10" />
    </section>
  );
}

// A: светлый фон и чёрный логотип сверху, под ним фото в рамке — как журнальная обложка
function GalleryHero() {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 900], [1, 1.12]);
  return (
    <section className="flex h-[100svh] flex-col bg-paper px-5 pb-6 pt-[calc(15.5vw+18vh)] md:px-10 md:pt-[calc(15.5vw+9vh)]">
      <motion.div
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={{ clipPath: "inset(0% 0 0 0)" }}
        transition={{ duration: 1.6, ease, delay: 0.2 }}
        className="relative flex-1 overflow-hidden"
      >
        <motion.div className="absolute inset-0" style={{ scale }}>
          <Image src="/img/noir/04.jpg" alt="Стол Noir в интерьере" fill preload sizes="100vw" className="object-cover object-[50%_60%]" />
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
        <Image src="/img/axis/01.jpg" alt="Стол Axis в интерьере" fill sizes="(min-width: 768px) 36vw, 78vw" className="object-cover" />
      </motion.div>
      <Caption className="absolute inset-x-0 bottom-0 px-5 pb-8 md:px-10" />
    </section>
  );
}
