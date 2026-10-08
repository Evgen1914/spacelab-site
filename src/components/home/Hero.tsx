"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { ease } from "../Reveal";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 220]);

  return (
    <section className="relative h-[100svh] overflow-hidden bg-ink">
      <motion.div className="absolute inset-0" style={{ y }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease }}
        >
          <Image src="/img/axis/00.jpg" alt="Стол Axis в интерьере" fill preload sizes="100vw" className="object-cover" />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-transparent to-ink/45" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease, delay: 0.8 }}
        className="absolute inset-x-0 bottom-0 flex items-end justify-between px-5 pb-8 text-paper md:px-10"
      >
        <div>
          <p className="eyebrow opacity-80">Коллекция 2026</p>
          <p className="font-display mt-2 text-2xl md:text-3xl">Обеденные столы</p>
        </div>
        <a href="#collection" className="eyebrow link-line">
          Смотреть ↓
        </a>
      </motion.div>
    </section>
  );
}
