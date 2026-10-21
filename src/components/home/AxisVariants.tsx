"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { getProduct } from "@/lib/products";

gsap.registerPlugin(ScrollTrigger, useGSAP);
// на телефоне адресная строка то прячется, то появляется — не пересчитываем сцену на каждое такое изменение
ScrollTrigger.config({ ignoreMobileResize: true });

const ease = "expo.out";

// Axis · 6 вариантов: секция закрепляется, при прокрутке по очереди сменяются
// сочетания столешницы и основания — и на компьютере, и на телефоне.
// При «уменьшить движение» — обычная горизонтальная лента без закрепления.
export default function AxisVariants() {
  const axis = getProduct("axis")!;
  const variants = axis.variants ?? [];
  const n = variants.length;

  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  // Lenis прокручивает страницу сам — сообщаем ScrollTrigger о каждом шаге,
  // иначе закрепление «отстаёт» и дёргается.
  useLenis(() => ScrollTrigger.update());

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // условия пересчитываются сами при повороте телефона или смене ширины окна
      mm.add({ desktop: "(min-width: 768px)", motion: "(prefers-reduced-motion: no-preference)" }, (ctx) => {
        const { desktop, motion } = ctx.conditions as { desktop: boolean; motion: boolean };
        if (!motion) return;
        // на телефоне шаг прокрутки короче, а «доводки» до варианта нет — она откатывает палец назад
        const step = desktop ? 0.9 : 0.7;
        const imgs = gsap.utils.toArray<HTMLElement>("[data-v-img]");
        const labels = gsap.utils.toArray<HTMLElement>("[data-v-label]");

        // стартовое состояние: виден только первый вариант
        gsap.set(imgs.slice(1), { autoAlpha: 0, scale: 1.06 });
        gsap.set(labels.slice(1), { autoAlpha: 0, yPercent: 60 });

        const tl = gsap.timeline({
          defaults: { duration: 1, ease: "power2.inOut" },
          scrollTrigger: {
            trigger: "[data-v-stage]",
            start: "top top",
            end: () => `+=${window.innerHeight * (n - 1) * step}`,
            pin: true,
            anticipatePin: 1,
            scrub: 0.8,
            snap: desktop ? { snapTo: 1 / (n - 1), duration: { min: 0.2, max: 0.6 }, ease: "power1.inOut" } : undefined,
            invalidateOnRefresh: true,
            onUpdate: (self) => setActive(Math.round(self.progress * (n - 1))),
          },
        });

        for (let i = 1; i < n; i++) {
          const at = i - 1;
          tl.to(imgs[i - 1], { autoAlpha: 0, scale: 0.97 }, at)
            .to(imgs[i], { autoAlpha: 1, scale: 1 }, at)
            .to(labels[i - 1], { autoAlpha: 0, yPercent: -60 }, at)
            .to(labels[i], { autoAlpha: 1, yPercent: 0 }, at + 0.15);
        }
        tl.fromTo("[data-v-bar]", { scaleX: 1 / n }, { scaleX: 1, ease: "none", duration: n - 1 }, 0);
      });

      // заголовок секции выезжает из-под маски один раз
      gsap.from("[data-v-title] > span > span", {
        yPercent: 105,
        duration: 1.2,
        ease,
        stagger: 0.09,
        scrollTrigger: { trigger: "[data-v-title]", start: "top 85%", once: true },
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [n] },
  );

  if (!n) return null;

  return (
    <section ref={root} id="axis-variants" className="mt-40">
      {/* Сцена: на компьютере — две колонки, на телефоне — столбик: заголовок, стол, номер и подпись, полоска */}
      <div data-v-stage className="relative h-[100svh] overflow-hidden motion-reduce:hidden">
        <div className="flex h-full flex-col gap-5 px-5 pt-20 pb-8 md:grid md:grid-cols-12 md:items-center md:gap-6 md:px-10 md:py-0">
          <div className="contents md:col-span-4 md:flex md:h-[70vh] md:flex-col md:justify-between">
            <div className="order-1">
              <p className="eyebrow text-stone">Axis · {n} вариантов</p>
              <h2 data-v-title className="font-display mt-3 text-[clamp(2rem,4.2vw,4rem)] leading-[1.05] md:mt-4">
                <span className="block overflow-hidden pb-[0.08em]">
                  <span className="block">Камень</span>
                </span>
                <span className="block overflow-hidden pb-[0.08em]">
                  <span className="block">и основание</span>
                </span>
              </h2>
            </div>

            <div className="order-3">
              <p className="font-display text-[clamp(2.4rem,6vw,5.5rem)] leading-none tabular-nums">
                {String(active + 1).padStart(2, "0")}
                <span className="text-stone/50"> / {String(n).padStart(2, "0")}</span>
              </p>
              <div className="relative mt-4 h-[4.2rem] md:mt-8 md:h-[5.5rem]">
                {variants.map((v, i) => (
                  <div key={v.id} data-v-label className={`absolute inset-x-0 top-0 ${i ? "invisible opacity-0" : ""}`}>
                    <p className="font-display text-xl md:text-2xl">{v.top}</p>
                    <p className="mt-2 flex gap-4 text-xs text-stone md:mt-3 md:gap-6 md:text-sm">
                      <span>Столешница · {v.finish}</span>
                      <span>Основание · {v.base}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-4">
              <div className="h-px w-full bg-line">
                <div data-v-bar className="h-px origin-left bg-ink" />
              </div>
              <Link href={`/product/${axis.slug}`} className="eyebrow link-line mt-4 inline-block md:mt-6">
                Смотреть Axis →
              </Link>
            </div>
          </div>

          <div className="relative order-2 min-h-0 flex-1 bg-paper-2 md:order-none md:col-span-8 md:h-[78vh] md:flex-none">
            {variants.map((v, i) => (
              <div key={v.id} data-v-img className={`absolute inset-0 bg-paper-2 ${i ? "invisible opacity-0" : ""}`}>
                <Image
                  src={v.image}
                  alt={`Axis — ${v.top}, основание ${v.base}`}
                  fill
                  sizes="(min-width: 768px) 66vw, 100vw"
                  className="object-contain p-4 mix-blend-multiply md:p-10"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* «Уменьшить движение»: лента с прокруткой пальцем вместо закреплённой сцены */}
      <div className="hidden motion-reduce:block">
        <div className="px-5 md:px-10">
          <p className="eyebrow text-stone">Axis · {n} вариантов</p>
          <h2 className="font-display mt-4 text-[clamp(2.2rem,8vw,4rem)] leading-[1.05]">Камень и основание</h2>
        </div>
        <div className="mt-8 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-4 md:scroll-px-10 md:px-10" data-lenis-prevent>
          {variants.map((v, i) => (
            <figure key={v.id} className="w-[78vw] max-w-[420px] shrink-0 snap-start">
              <div className="relative aspect-[4/3] bg-paper-2">
                <Image
                  src={v.image}
                  alt={`Axis — ${v.top}, основание ${v.base}`}
                  fill
                  sizes="80vw"
                  className="object-contain p-4 mix-blend-multiply"
                />
              </div>
              <figcaption className="mt-3">
                <span className="eyebrow text-stone">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display mt-1 block text-lg">{v.top}</span>
                <span className="mt-1 block text-xs text-stone">
                  Столешница · {v.finish} &nbsp;·&nbsp; Основание · {v.base}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="px-5">
          <Link href={`/product/${axis.slug}`} className="eyebrow link-line mt-6 inline-block">
            Смотреть Axis →
          </Link>
        </div>
      </div>
    </section>
  );
}
