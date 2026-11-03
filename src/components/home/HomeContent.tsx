import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/home/Hero";
import HeroSwitcher from "@/components/home/HeroSwitcher";
import type { HeroVariant } from "@/lib/hero";
import Interiors from "@/components/home/Interiors";
import Slabs from "@/components/home/Slabs";
import AxisVariants from "@/components/home/AxisVariants";
import Compare from "@/components/Compare";
import { orderSteps } from "@/lib/order-steps";
import ProductCard from "@/components/ProductCard";
import Reveal, { SplitLines } from "@/components/Reveal";
import { chairs, getProduct, models, tableGroups, tables } from "@/lib/products";

export default function HomeContent({ variant, preview = false }: { variant: HeroVariant; preview?: boolean }) {
  const [axis, cono, scandi, hora] = ["axis", "cono", "scandi", "hora"].map((s) => getProduct(s)!);
  return (
    <>
      <Hero variant={variant} />
      {preview && <HeroSwitcher active={variant} />}

      {/* О коллекции */}
      <section className="px-5 pt-32 md:px-10 md:pt-44">
        <div className="grid gap-10 md:grid-cols-12">
          <p className="eyebrow text-stone md:col-span-3">О коллекции</p>
          <h2 className="font-display text-[clamp(2.4rem,6vw,6rem)] leading-[1.02] md:col-span-9">
            <SplitLines lines={["Разные формы —", "одна идея"]} />
          </h2>
        </div>
      </section>

      {/* Коллекция — журнальная асимметричная сетка: хит и новинки */}
      <section id="collection" className="mt-32 scroll-mt-20 px-5 md:mt-44 md:px-10">
        <div className="mb-12 flex items-end justify-between border-b border-line pb-5">
          <h2 className="eyebrow">Коллекция 2026 · {models(tables.length)}</h2>
          <Link href="/catalog" className="eyebrow link-line text-stone">
            Каталог
          </Link>
        </div>
        <div className="grid gap-x-6 gap-y-20 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <ProductCard product={axis} aspect="aspect-[4/3]" sizes="(min-width: 768px) 58vw, 100vw" />
          </Reveal>
          <Reveal className="md:col-span-4 md:col-start-9 md:mt-48" delay={0.1}>
            <ProductCard product={cono} sizes="(min-width: 768px) 56vw, 167vw" />
          </Reveal>
          <Reveal className="md:col-span-4 md:col-start-2">
            <ProductCard product={hora} sizes="(min-width: 768px) 56vw, 167vw" />
          </Reveal>
          <Reveal className="md:col-span-6 md:col-start-7 md:mt-32" delay={0.1}>
            <ProductCard product={scandi} aspect="aspect-square" sizes="(min-width: 768px) 50vw, 100vw" />
          </Reveal>
        </div>

        {/* Вся коллекция: две группы по форме, предметы на белом — как оглавление каталога */}
        <div className="mt-32 space-y-16">
          {tableGroups.map((g) => (
            <div key={g.id}>
              <div className="mb-6 flex items-baseline justify-between">
                <h3 className="font-display text-2xl md:text-3xl">
                  {g.title} <span className="eyebrow ml-2 align-middle text-stone">{g.items.length}</span>
                </h3>
                <Link href="/catalog" className="eyebrow link-line text-stone max-md:hidden">
                  Смотреть все →
                </Link>
              </div>
              <div
                data-lenis-prevent-horizontal
                className={`-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:gap-5 md:overflow-visible md:px-0 ${
                  g.items.length > 4 ? "md:grid-cols-5" : "md:grid-cols-4"
                }`}
              >
                {g.items.map((p, i) => (
                  <Reveal key={p.slug} delay={i * 0.06} className="w-[62vw] shrink-0 snap-start md:w-auto">
                    <ProductCard product={p} studio aspect="aspect-[4/3]" sizes="(min-width: 768px) 20vw, 62vw" />
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Interiors />

      {/* Деталь крупно */}
      <section className="mt-20 grid md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden md:aspect-auto md:min-h-[90vh]">
          <Image src="/img/duna/cross.jpg" alt="Перекрестье опор стола Duna" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="flex flex-col justify-center bg-ink px-8 py-20 text-paper md:px-16">
          <p className="eyebrow opacity-60">Деталь · Duna</p>
          <h2 className="font-display mt-5 text-[clamp(2rem,4vw,3.6rem)] leading-[1.05]">
            <SplitLines lines={["Опора как", "скульптура"]} />
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed opacity-70">
            Две арки из шпонированного дерева повторяют форму друг друга и перекрещиваются в центре. Вблизи видна текстура шпона, издалека —
            единый графичный силуэт.
          </p>
          <Link href="/product/duna" className="eyebrow link-line mt-10 self-start">
            Смотреть Duna →
          </Link>
        </div>
      </section>

      {/* Стулья — как разворот «Стулья» в каталоге */}
      <section id="chairs" className="mt-40 grid scroll-mt-20 grid-cols-1 gap-10 px-5 md:grid-cols-12 md:gap-6 md:px-10">
        <div className="relative aspect-[4/5] overflow-hidden bg-paper-2 md:col-span-5 md:aspect-auto md:min-h-[86vh]">
          <Image src="/img/chairs/podium.jpg" alt="Стулья Onda, Arca и Kumo" fill sizes="(min-width: 768px) 42vw, 100vw" className="object-cover" />
        </div>
        <div className="flex min-w-0 flex-col justify-between md:col-span-6 md:col-start-7">
          <div>
            <p className="eyebrow text-stone">Новинка · к столам коллекции</p>
            <h2 className="font-display mt-4 text-[clamp(2.4rem,5vw,4.5rem)] leading-none">
              <SplitLines lines={["Стулья"]} />
            </h2>
            <p className="font-display mt-3 text-lg text-stone italic">массив дуба · мягкая обивка</p>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-stone">
              Стулья подобраны к столам коллекции: тот же спокойный язык форм, натуральные материалы и три оттенка дерева — орех, чёрный и
              натуральный дуб, — которые сочетаются и с камнем, и с металлом.
            </p>
          </div>
          <div
            data-lenis-prevent-horizontal
            className="-mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0"
          >
            {chairs.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.08} className="w-[58vw] shrink-0 snap-start md:w-auto">
                <ProductCard product={c} studio aspect="aspect-[4/5]" sizes="(min-width: 768px) 16vw, 58vw" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Axis: 6 вариантов — закреплённая сцена на GSAP */}
      <AxisVariants />

      <Slabs />

      <Compare className="mt-40" />

      {/* Как заказать */}
      <section id="process" className="mt-40 scroll-mt-20 px-5 md:px-10">
        <h2 className="font-display text-[clamp(2.2rem,5vw,4.5rem)] leading-none">Как заказать</h2>
        <ol className="mt-14 grid border-t border-line md:grid-cols-4">
          {orderSteps.map((s, i) => (
            <li key={s.title} className="border-b border-line py-8 md:border-r md:border-b-0 md:px-6 md:first:pl-0 md:last:border-r-0">
              <Reveal delay={i * 0.08}>
                <span className="font-display text-5xl text-stone/50">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-8 text-lg">{s.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-stone">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* Реальные фото */}
      <section className="mt-40 px-5 md:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow text-stone">Без ретуши</p>
            <h2 className="font-display mt-4 text-[clamp(2rem,4vw,3.6rem)] leading-[1.05]">Так столы выглядят у наших клиентов</h2>
          </div>
          <div className="grid grid-cols-3 gap-4 md:col-span-8">
            {["/img/kona/client-1.jpg", "/img/kona/client-2.jpg", "/img/kona/client-3.jpg"].map((src, i) => (
              <Reveal key={src} delay={i * 0.1} className={i === 1 ? "mt-16" : ""}>
                <div className="relative aspect-[3/4] overflow-hidden bg-paper-2">
                  <Image src={src} alt="Стол Kona у клиента" fill sizes="(min-width: 768px) 22vw, 33vw" className="object-cover" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
