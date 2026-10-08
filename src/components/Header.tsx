"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useLenis } from "lenis/react";
import { useCart } from "@/lib/cart";
import { useMounted } from "@/lib/useMounted";
import { products } from "@/lib/products";
import { ease } from "./Reveal";
import { heroFromPath, heroVariants } from "@/lib/hero";

const BIG = 0.155; // размер большого логотипа на главной — доля ширины экрана
const SMALL = 24; // размер логотипа в шапке, px

export default function Header() {
  const variant = heroFromPath(usePathname());
  const isHome = variant !== null;
  const hero = heroVariants[variant ?? "current"];
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
  const top = useTransform(scrollY, [0, vh * 0.55], [vh * hero.logoTop - BIG * vw * 0.5, 14], { clamp: true });

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

      <Link href="/" aria-label="Space.Lab — на главную" onClick={() => setMenu(false)}>
        {isHome && !menu ? (
          <motion.span
            style={{ scale, top, x: "-50%", fontSize: `${BIG * 100}vw` }}
            className={`font-logo fixed left-1/2 z-50 origin-top leading-none tracking-[0.02em] whitespace-nowrap transition-colors duration-500 ${
              light ? "text-paper" : "text-ink"
            }`}
          >
            SPACE.LAB
          </motion.span>
        ) : (
          <span
            style={{ fontSize: SMALL }}
            className="font-logo fixed top-[14px] left-1/2 z-50 -translate-x-1/2 leading-none tracking-[0.02em] text-ink"
          >
            SPACE.LAB
          </span>
        )}
      </Link>

      <AnimatePresence>{menu && <Menu close={() => setMenu(false)} />}</AnimatePresence>
    </>
  );
}

const links = [
  { href: "/catalog", label: "Все столы", image: "/img/axis/00.jpg" },
  ...products.map((p) => ({ href: `/product/${p.slug}`, label: p.name, image: p.images[0] })),
  { href: "/#materials", label: "Столешницы", image: "/img/slabs/patagonia.jpg" },
  { href: "/#process", label: "Как заказать", image: "/img/colonna/03.jpg" },
];

function Menu({ close }: { close: () => void }) {
  const [hover, setHover] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.8, ease }}
      className="fixed inset-0 z-40 grid bg-paper pt-24 md:grid-cols-2"
    >
      <ul className="flex flex-col justify-center gap-1 px-5 md:px-10">
        {links.map((l, i) => (
          <motion.li
            key={l.href}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.25 + i * 0.05 }}
            onMouseEnter={() => setHover(i)}
            className="flex items-baseline gap-4"
          >
            <span className="eyebrow w-6 text-stone">{String(i + 1).padStart(2, "0")}</span>
            <Link
              href={l.href}
              onClick={close}
              className={`font-display text-[clamp(2.2rem,5vw,4.5rem)] leading-[1.1] transition-opacity duration-300 ${
                hover === i ? "opacity-100" : "opacity-35"
              }`}
            >
              {l.label}
            </Link>
          </motion.li>
        ))}
      </ul>
      <div className="relative hidden overflow-hidden md:block">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={links[hover].image}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease }}
            className="absolute inset-0"
          >
            <Image src={links[hover].image} alt="" fill sizes="50vw" className="object-cover" />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
