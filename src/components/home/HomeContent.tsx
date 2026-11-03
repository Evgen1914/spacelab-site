import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/home/Hero";
import HeroSwitcher from "@/components/home/HeroSwitcher";
import type { HeroVariant } from "@/lib/hero";
import Interiors from "@/components/home/Interiors";
import Slabs from "@/components/home/Slabs";
import AxisVariants from "@/components/home/AxisVariants";
import { orderSteps } from "@/lib/order-steps";
import ProductCard from "@/components/ProductCard";
import Reveal, { SplitLines } from "@/components/Reveal";
import { chairs, models, tables } from "@/lib/products";

// Почему мы. Сроки изготовления и гарантию добавим, когда будут точные цифры.
const reasons = [
  { mark: "01", title: "Подбор под ваш интерьер", text: "Пришлите фото комнаты в WhatsApp — подскажем размер, камень и цвет опоры." },
  { mark: "02", title: "Оплата после согласования", text: "Сначала уточняем размер, камень и цвет вместе с менеджером, потом оплата." },
  { mark: "03", title: "Доставка до двери", text: "Привозим стол к вам домой. Стоимость менеджер посчитает по адресу." },
  { mark: "04", title: "Стулья к столу", text: "Три модели из массива дуба в тех же оттенках — комплект собирается сразу." },
];

const faq = [
  { q: "Сколько ждать стол?", a: "Срок зависит от модели, размера и камня. Точную дату менеджер назовёт, когда подтвердит заказ." },
  { q: "Входят ли стулья в цену?", a: "Нет, цена указана за стол. Стулья Onda, Arca и Kumo можно добавить в заказ отдельно." },
  { q: "Как ухаживать за керамогранитом?", a: "Достаточно влажной салфетки и обычного средства для посуды. Керамогранит не впитывает пятна от вина и кофе и не боится горячей посуды." },
  { q: "Можно другой размер или камень?", a: "Напишите нам — подскажем, какие сочетания размера, камня и основания возможны для выбранной модели." },
  { q: "Как оплатить?", a: "Оплата — после того как вы согласуете с менеджером все детали заказа." },
];

export default function HomeContent({ variant, preview = false }: { variant: HeroVariant; preview?: boolean }) {
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

      {/* Коллекция — все столы один раз, ровной сеткой 3 × 3; на телефоне две колонки и плитка «в каталог» */}
      <section id="collection" className="mt-32 scroll-mt-20 px-5 md:mt-44 md:px-10">
        <div className="mb-12 flex items-end justify-between border-b border-line pb-5">
          <h2 className="eyebrow">Коллекция 2026 · {models(tables.length)}</h2>
          <Link href="/catalog" className="eyebrow link-line text-stone">
            Каталог и цены
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-6 md:gap-y-20">
          {tables.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.08}>
              {/* карточка в формате самих фото (4:3) — стол виден целиком, без обрезки */}
              <ProductCard product={p} aspect="aspect-[4/3]" sizes="(min-width: 768px) 33vw, 50vw" />
            </Reveal>
          ))}
          <Link
            href="/catalog"
            className="flex aspect-[4/3] flex-col justify-between bg-ink p-4 text-paper md:hidden"
          >
            <span className="eyebrow opacity-60">Каталог</span>
            <span className="font-display text-lg leading-tight">
              Все модели, размеры и цены <span aria-hidden>→</span>
            </span>
          </Link>
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

      {/* Почему мы — коротко о главном для покупателя */}
      <section className="mt-40 px-5 md:px-10">
        <h2 className="font-display text-[clamp(2.2rem,5vw,4.5rem)] leading-none">Почему homeb</h2>
        <ul className="mt-14 grid gap-px border-y border-line bg-line sm:grid-cols-2 md:grid-cols-4">
          {reasons.map((r, i) => (
            <li key={r.title} className="bg-paper py-8 sm:px-6 sm:first:pl-0 md:py-10">
              <Reveal delay={i * 0.08}>
                <span className="font-display text-4xl text-stone/50">{r.mark}</span>
                <p className="mt-6 text-lg">{r.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-stone">{r.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Реальные фото */}
      <section className="mt-40 px-5 md:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow text-stone">Без ретуши</p>
            <h2 className="font-display mt-4 text-[clamp(2rem,4vw,3.6rem)] leading-[1.05]">Так столы выглядят у наших клиентов</h2>
          </div>
          {/* на телефоне — лента вбок, фото крупно; третий снимок обрезан: без людей и коробок в кадре */}
          <div
            data-lenis-prevent-horizontal
            className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 [scrollbar-width:none] md:col-span-8 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0"
          >
            {["/img/kona/client-1.jpg", "/img/kona/client-2.jpg", "/img/kona/client-3-crop.jpg"].map((src, i) => (
              <Reveal key={src} delay={i * 0.1} className={`w-[72vw] shrink-0 snap-start md:w-auto ${i === 1 ? "md:mt-16" : ""}`}>
                <div className="relative aspect-[3/4] overflow-hidden bg-paper-2">
                  <Image src={src} alt="Стол Kona у клиента" fill sizes="(min-width: 768px) 22vw, 72vw" className="object-cover" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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

        <div className="mt-24 grid gap-10 md:grid-cols-12">
          <h3 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-tight md:col-span-4">Частые вопросы</h3>
          <div className="border-t border-line md:col-span-8">
            {faq.map((q) => (
              <details key={q.q} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-base [&::-webkit-details-marker]:hidden">
                  {q.q}
                  <span className="text-xl leading-none text-stone transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-2xl pb-6 text-sm leading-relaxed text-stone">{q.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
