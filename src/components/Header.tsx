"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useLenis } from "lenis/react";
import { useCart } from "@/lib/cart";
import { useMounted } from "@/lib/useMounted";
import { chairs, isStudio, tables } from "@/lib/products";
import { ease } from "./Reveal";
import { heroFromPath, heroVariants } from "@/lib/hero";

const BIG = 0.6; // ширина большого логотипа на главной — доля ширины экрана
const SMALL = 96; // ширина логотипа в шапке, px
const RATIO = 286 / 1200; // высота логотипа к ширине

export default function Header() {
  const variant = heroFromPath(usePathname());
  const isHome = variant !== null;
  const hero = heroVariants[variant ?? "c"];
  const { scrollY } = useScroll();
  const [vw, setVw] = useState(1440);
  const [vh, setVh] = useState(900);
  const [overHero, setOverHero] = useState(true);
  const [menu, setMenu] = useState(false);
  const count = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));
  const setOpen = useCart((s) => s.setOpen);
  const mounted = useMounted();
  const lenis = useLenis();

  useEffect(() => {
    const r = () => {
      setVw(window.innerWidth);
      setVh(window.innerHeight);
    };
    r();
    window.addEventListener("resize", r);
    return () => window.removeEventListener("resize", r);
  }, []);

  useMotionValueEvent(scrollY, "change", (y) => setOverHero(y < vh - 40));

  useEffect(() => {
    if (menu) lenis?.stop();
    else lenis?.start();
  }, [menu, lenis]);

  // логотип: на главной огромный поверх первого экрана и сжимается в шапку при прокрутке
  const small = SMALL / (BIG * vw);
  const scale = useTransform(scrollY, [0, vh * 0.55], [1, small], { clamp: true });
  const top = useTransform(scrollY, [0, vh * 0.55], [vh * hero.logoTop - BIG * vw * RATIO * 0.5, 28 - SMALL * RATIO * 0.5], {
    clamp: true,
  });

  const light = isHome && overHero && !menu && hero.tone === "light";
  const solid = !menu && (!isHome || !overHero);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          light ? "text-paper" : "text-ink"
        } ${solid ? "bg-paper/85 backdrop-blur-md" : ""}`}
      >
        <div className="flex h-14 items-center justify-between px-5 md:px-10">
          <button onClick={() => setMenu((m) => !m)} className="eyebrow link-line z-10">
            {menu ? "Закрыть" : "Меню"}
          </button>
          <nav className="z-10 flex items-center gap-7">
            <Link href="/catalog" className="eyebrow link-line hidden md:inline" onClick={() => setMenu(false)}>
              Каталог
            </Link>
            <button onClick={() => setOpen(true)} className="eyebrow link-line">
              Корзина ({mounted ? count : 0})
            </button>
          </nav>
        </div>
      </header>

      <Link href="/" aria-label="homeb — на главную" onClick={() => setMenu(false)}>
        {isHome && !menu ? (
          <motion.span
            style={{ scale, top, x: "-50%", width: `${BIG * 100}vw` }}
            className={`logo fixed left-1/2 z-50 origin-top transition-colors duration-500 ${light ? "text-paper" : "text-ink"}`}
          />
        ) : (
          <span
            style={{ width: SMALL, top: 28 - SMALL * RATIO * 0.5 }}
            className="logo fixed left-1/2 z-50 -translate-x-1/2 text-ink"
          />
        )}
      </Link>

      <AnimatePresence>{menu && <Menu close={() => setMenu(false)} />}</AnimatePresence>
    </>
  );
}

const links = [
  { href: "/catalog", label: "Столы", image: "/img/axis/black-room-2.jpg" },
  { href: "/catalog#chairs", label: "Стулья", image: "/img/chairs/podium.jpg" },
  { href: "/catalog#prices", label: "Цены", image: "/img/duna/cross.jpg" },
  { href: "/#materials", label: "Столешницы", image: "/img/kona/column.jpg" },
  { href: "/#process", label: "Как заказать", image: "/img/scandi/walnut-top.jpg" },
  { href: "#contacts", label: "Контакты", image: "/img/cono/room-gold.jpg" },
];

function Menu({ close }: { close: () => void }) {
  const [hover, setHover] = useState(links[0].image);
  return (
    <motion.div
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.8, ease }}
      data-lenis-prevent
      className="fixed inset-0 z-40 grid overflow-y-auto bg-paper pt-20 md:grid-cols-2 md:pt-24"
    >
      <div className="flex flex-col justify-center px-5 py-6 md:px-10">
        <ul className="flex flex-col gap-1">
          {links.map((l, i) => (
            <motion.li
              key={l.href}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.25 + i * 0.05 }}
              onMouseEnter={() => setHover(l.image)}
              className="flex items-baseline gap-4"
            >
              <span className="eyebrow w-6 text-stone">{String(i + 1).padStart(2, "0")}</span>
              <Link
                href={l.href}
                onClick={close}
                className={`font-display text-[clamp(2rem,4.4vw,4rem)] leading-[1.1] transition-opacity duration-300 ${
                  hover === l.image ? "opacity-100" : "opacity-35"
                }`}
              >
                {l.label}
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* все модели — компактно, при наведении меняется фото справа */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 grid grid-cols-2 gap-8 border-t border-line pt-6 sm:grid-cols-[2fr_1fr] md:ml-10"
        >
          {[
            { title: "Столы", items: tables },
            { title: "Стулья", items: chairs },
          ].map((g) => (
            <div key={g.title}>
              <p className="eyebrow mb-3 text-stone">{g.title}</p>
              <ul className={`grid gap-x-6 gap-y-1.5 text-sm ${g.items.length > 4 ? "sm:grid-cols-2" : ""}`}>
                {g.items.map((p) => (
                  <li key={p.slug} onMouseEnter={() => setHover(p.images[0])}>
                    <Link href={`/product/${p.slug}`} onClick={close} className="link-line">
                      {p.name}
                    </Link>
                    {p.badge === "Новинка" && g.title === "Столы" && <span className="ml-1.5 align-super text-[9px] text-clay">new</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>
      <div className="relative hidden overflow-hidden md:block">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={hover}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease }}
            className="absolute inset-0 bg-paper-2"
          >
            <Image src={hover} alt="" fill sizes="50vw" className={isStudio(hover) ? "object-contain p-16 mix-blend-multiply" : "object-cover"} />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
