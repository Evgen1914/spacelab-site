import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/home/Hero";
import Interiors from "@/components/home/Interiors";
import Slabs from "@/components/home/Slabs";
import ProductCard from "@/components/ProductCard";
import Reveal, { SplitLines } from "@/components/Reveal";
import { products } from "@/lib/products";

const steps = [
  { title: "Выбор", text: "Выберите модель, размер и цвет. Положите в корзину всё, что понравилось." },
  { title: "Заявка", text: "Оставьте контакты. Заявка сразу приходит менеджеру." },
  { title: "Детали", text: "Свяжемся с вами, поможем с размером и камнем, согласуем стоимость и сроки." },
  { title: "Доставка", text: "Привозим стол к вам домой." },
];

export default function Home() {
  const [arbor, noir, colonna, axis] = products;
  return (
    <>
      <Hero />

      {/* Манифест */}
      <section className="px-5 pt-32 md:px-10 md:pt-44">
        <div className="grid gap-10 md:grid-cols-12">
          <p className="eyebrow text-stone md:col-span-3">Space.Lab</p>
          <h2 className="font-display text-[clamp(2.4rem,6vw,6rem)] leading-[1.02] md:col-span-9">
            <SplitLines lines={["Стол — место,", "где собирается", "весь дом"]} />
          </h2>
        </div>
        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-4 md:col-start-4" delay={0.2}>
            <p className="text-base leading-relaxed text-stone">
              Мы делаем обеденные столы из керамогранита, дерева и металла. Простые формы и честные материалы, у каждой
              модели свой характер.
            </p>
          </Reveal>
          <Reveal className="md:col-span-3 md:col-start-10" delay={0.3}>
            <Link href="/catalog" className="eyebrow link-line">
              Вся коллекция →
            </Link>
          </Reveal>
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
            <ProductCard product={colonna} sizes="(min-width: 768px) 33vw, 100vw" />
          </Reveal>
          <Reveal className="md:col-span-4 md:col-start-2">
            <ProductCard product={arbor} sizes="(min-width: 768px) 33vw, 100vw" />
          </Reveal>
          <Reveal className="md:col-span-6 md:col-start-7 md:mt-32" delay={0.1}>
            <ProductCard product={noir} aspect="aspect-square" sizes="(min-width: 768px) 50vw, 100vw" />
          </Reveal>
        </div>
      </section>

      <Interiors />

      {/* Деталь крупно */}
      <section className="mt-20 grid md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden md:aspect-auto">
          <Image src="/img/noir/02.jpg" alt="Опора стола Noir крупным планом" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="flex flex-col justify-center bg-ink px-8 py-20 text-paper md:px-16">
          <p className="eyebrow opacity-60">Деталь</p>
          <h2 className="font-display mt-5 text-[clamp(2rem,4vw,3.6rem)] leading-[1.05]">
            <SplitLines lines={["Опора как", "скульптура"]} />
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed opacity-70">
            Скрещённые опоры Noir из шпонированного дерева. Стол, который хочется рассматривать даже без сервировки.
          </p>
          <Link href="/product/noir" className="eyebrow link-line mt-10 self-start">
            Смотреть Noir →
          </Link>
        </div>
      </section>

      <Slabs />

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
            {["/img/colonna/06.jpg", "/img/colonna/07.jpg", "/img/colonna/08.jpg"].map((src, i) => (
              <Reveal key={src} delay={i * 0.1} className={i === 1 ? "mt-16" : ""}>
                <div className="relative aspect-[3/4] overflow-hidden bg-paper-2">
                  <Image src={src} alt="Стол Colonna у клиента" fill sizes="(min-width: 768px) 22vw, 33vw" className="object-cover" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
