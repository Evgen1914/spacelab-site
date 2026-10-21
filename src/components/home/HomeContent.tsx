import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/home/Hero";
import HeroSwitcher from "@/components/home/HeroSwitcher";
import type { HeroVariant } from "@/lib/hero";
import Interiors from "@/components/home/Interiors";
import Slabs from "@/components/home/Slabs";
import Compare from "@/components/Compare";
import ProductCard from "@/components/ProductCard";
import Reveal, { SplitLines } from "@/components/Reveal";
import { getProduct, products } from "@/lib/products";

const stats = [
  { value: "12 мм", text: "керамогранит во всех моделях" },
  { value: "750 мм", text: "высота обеденного стола у всех моделей" },
  { value: "1400–1800", text: "мм — длины на выбор" },
];

const steps = [
  { title: "Выбор", text: "Выберите модель, размер и цвет. Положите в корзину всё, что понравилось." },
  { title: "Заявка", text: "Оставьте контакты. Заявка сразу приходит менеджеру." },
  { title: "Детали", text: "Свяжемся с вами, поможем с размером и камнем, согласуем сроки." },
  { title: "Доставка", text: "Привозим стол к вам домой." },
];

export default function HomeContent({ variant, preview = false }: { variant: HeroVariant; preview?: boolean }) {
  const [scandi, duna, kona, axis] = products;
  const axisDetail = getProduct("axis")!.detail;
  return (
    <>
      <Hero variant={variant} />
      {preview && <HeroSwitcher active={variant} />}

      {/* О коллекции */}
      <section className="px-5 pt-32 md:px-10 md:pt-44">
        <div className="grid gap-10 md:grid-cols-12">
          <p className="eyebrow text-stone md:col-span-3">О коллекции</p>
          <h2 className="font-display text-[clamp(2.4rem,6vw,6rem)] leading-[1.02] md:col-span-9">
            <SplitLines lines={["Четыре стола —", "одна идея"]} />
          </h2>
        </div>
        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-5 md:col-start-4" delay={0.2}>
            <p className="text-base leading-relaxed text-stone">
              Столешница — спокойная и светлая, основание — с характером. Каждый стол коллекции построен на этом контрасте: гладкий камень
              сверху и скульптурная опора снизу.
            </p>
            <p className="mt-4 text-base leading-relaxed text-stone">
              Scandi, Duna, Kona и Axis отличаются формой опор и материалом основания: дерево, шпон, МДФ с рифлением или металл.
            </p>
          </Reveal>
          <Reveal className="md:col-span-3 md:col-start-10" delay={0.3}>
            <Link href="/catalog" className="eyebrow link-line">
              Вся коллекция →
            </Link>
          </Reveal>
        </div>
        <div className="mt-20 grid gap-8 border-t border-line pt-8 sm:grid-cols-3 md:ml-[25%]">
          {stats.map((s, i) => (
            <Reveal key={s.value} delay={i * 0.08}>
              <p className="font-display text-[clamp(2rem,3.4vw,3.2rem)] leading-none">{s.value}</p>
              <p className="mt-3 max-w-[200px] text-xs leading-relaxed text-stone">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Коллекция — журнальная асимметричная сетка */}
      <section id="collection" className="mt-32 scroll-mt-20 px-5 md:mt-44 md:px-10">
        <div className="mb-12 flex items-end justify-between border-b border-line pb-5">
          <h2 className="eyebrow">Коллекция · {products.length} модели</h2>
          <Link href="/catalog" className="eyebrow link-line text-stone">
            Каталог
          </Link>
        </div>
        <div className="grid gap-x-6 gap-y-20 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <ProductCard product={axis} aspect="aspect-[4/3]" sizes="(min-width: 768px) 58vw, 100vw" />
          </Reveal>
          <Reveal className="md:col-span-4 md:col-start-9 md:mt-48" delay={0.1}>
            <ProductCard product={kona} sizes="(min-width: 768px) 33vw, 100vw" />
          </Reveal>
          <Reveal className="md:col-span-4 md:col-start-2">
            <ProductCard product={scandi} sizes="(min-width: 768px) 33vw, 100vw" />
          </Reveal>
          <Reveal className="md:col-span-6 md:col-start-7 md:mt-32" delay={0.1}>
            <ProductCard product={duna} aspect="aspect-square" sizes="(min-width: 768px) 50vw, 100vw" />
          </Reveal>
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

      {/* Axis: два цвета основания */}
      <section className="mt-40 px-5 md:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow text-stone">Axis · {axisDetail.eyebrow.toLowerCase()}</p>
            <h2 className="font-display mt-4 text-[clamp(2.2rem,4.5vw,4rem)] leading-[1.05]">{axisDetail.title}</h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-stone">{axisDetail.text}</p>
            <Link href="/product/axis" className="eyebrow link-line mt-10 inline-block">
              6 сочетаний камня и основания →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:col-span-8">
            {[
              { src: "/img/axis/studio-black.jpg", caption: "Чёрный металл" },
              { src: "/img/axis/studio-beige.jpg", caption: "Беж металл" },
            ].map((im, i) => (
              <Reveal key={im.src} delay={i * 0.1}>
                <figure>
                  <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
                    <Image src={im.src} alt={`Axis — ${im.caption}`} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-contain p-4 mix-blend-multiply" />
                  </div>
                  <figcaption className="eyebrow mt-3 text-stone">{im.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Slabs />

      <Compare className="mt-40" />

      {/* Как заказать */}
      <section id="process" className="mt-40 scroll-mt-20 px-5 md:px-10">
        <h2 className="font-display text-[clamp(2.2rem,5vw,4.5rem)] leading-none">Как заказать</h2>
        <ol className="mt-14 grid border-t border-line md:grid-cols-4">
          {steps.map((s, i) => (
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
