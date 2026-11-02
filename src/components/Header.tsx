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
import { PHONE, contacts } from "@/lib/contacts";
import { orderSteps } from "@/lib/order-steps";
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
  // вместо фото справа — схема заказа и карточка контактов
  { href: "/#process", label: "Как заказать", image: "panel:steps" },
  { href: "#contacts", label: "Контакты", image: "panel:contacts" },
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
          {hover === "panel:steps" ? (
            <StepsPanel key="steps" />
          ) : hover === "panel:contacts" ? (
            <ContactsPanel key="contacts" close={close} />
          ) : (
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
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// тонкие линейные иконки шагов — в цвет текста
const stepIcons: Record<string, React.ReactNode> = {
  choose: <path d="M3 9.5h18M4.5 9.5 6 6.5h12l1.5 3M6 9.5V19M18 9.5V19M9 13h6" />,
  cart: <path d="M5.5 8.5h13l-1.1 10.6a1 1 0 0 1-1 .9H7.6a1 1 0 0 1-1-.9L5.5 8.5ZM9 8.5V7a3 3 0 0 1 6 0v1.5" />,
  request: (
    <path d="M7 3.5h10a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1ZM10 17.5h4M9 7.5h6M9 10.5h6" />
  ),
  delivery: (
    <>
      <path d="M2.5 6.5h11v10h-11zM13.5 9.5h4l3 3.2v3.8h-7" />
      <circle cx="6.5" cy="17.5" r="1.6" />
      <circle cx="16.5" cy="17.5" r="1.6" />
    </>
  ),
};

const panelIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.6, ease },
};

// «Как заказать»: четыре шага, соединённые линией
function StepsPanel() {
  return (
    <motion.div {...panelIn} className="absolute inset-0 flex flex-col justify-center bg-paper-2 px-[9%]">
      <p className="eyebrow text-stone">Как заказать</p>
      <p className="font-display mt-4 text-[clamp(2rem,3.2vw,3rem)] leading-[1.05]">Четыре шага до стола</p>
      <p className="font-display mt-2 text-stone italic">оплата — после согласования деталей</p>

      <ol className="relative mt-12 space-y-8">
        {/* линия, которая связывает шаги */}
        <motion.span
          aria-hidden
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.1, ease, delay: 0.15 }}
          className="absolute top-7 bottom-7 left-7 w-px origin-top bg-ink/25"
        />
        {orderSteps.map((st, i) => (
          <motion.li
            key={st.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.2 + i * 0.12 }}
            className="relative flex items-start gap-6"
          >
            <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-ink/70 bg-paper-2">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                {stepIcons[st.id]}
              </svg>
            </span>
            <div className="pt-1.5">
              <p className="flex items-baseline gap-3">
                <span className="eyebrow text-stone">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-2xl">{st.title}</span>
              </p>
              <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-stone">{st.text}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </motion.div>
  );
}

// «Контакты»: тёмная карточка, как последняя страница каталога
function ContactsPanel({ close }: { close: () => void }) {
  return (
    <motion.div {...panelIn} className="absolute inset-0 flex flex-col justify-between bg-ink px-[9%] py-[8%] text-paper">
      <div>
        <p className="eyebrow opacity-60">Заказ и консультация</p>
        <span aria-hidden className="logo mt-8 w-[min(60%,340px)] text-paper" />
        <p className="font-display mt-4 text-lg italic opacity-70">подберём модель, размер и цвет</p>
      </div>

      <div>
        <motion.a
          href={contacts[0].href}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
          className="font-display block text-[clamp(2rem,3.4vw,3.2rem)] leading-none"
        >
          <span className="link-line">{PHONE}</span>
        </motion.a>
        <ul className="mt-10 border-t border-paper/15">
          {/* телефон уже крупно сверху — в списке остальные каналы */}
          {contacts.slice(1).map((c, i) => (
            <motion.li
              key={c.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.25 + i * 0.08 }}
            >
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                onClick={close}
                className="group flex items-baseline justify-between gap-6 border-b border-paper/15 py-4"
              >
                <span className="eyebrow opacity-60">{c.label}</span>
                <span className="flex items-baseline gap-3 text-sm">
                  <span className="opacity-80 transition-opacity group-hover:opacity-100">{c.value}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">↗</span>
                </span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>

      <p className="eyebrow opacity-40">homeb · коллекция 2026</p>
    </motion.div>
  );
}

