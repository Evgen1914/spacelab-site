import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { chairs, getProduct, products, tables } from "@/lib/products";
import ProductView from "./ProductView";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  return { title: p ? `${p.name} — ${p.type} — homeb` : "homeb", description: p?.lead };
}

// Все модели есть в generateStaticParams, поэтому страница отдаётся сразу.
// instant = false разрешает ждать params без <Suspense> — так неизвестный адрес получает честный 404, а не 200.
export const instant = false;

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const { detail } = product;
  const chair = product.category === "chair";
  // сначала модели той же формы, потом остальные
  const sameShape = (p: (typeof products)[number]) => (p.shape === "rect") === (product.shape === "rect");
  const others = (chair ? chairs : tables)
    .filter((p) => p.slug !== slug)
    .sort((a, b) => Number(sameShape(b)) - Number(sameShape(a)))
    .slice(0, chair ? 2 : 4);
  const pair = chair ? tables.filter((p) => ["axis", "cono", "hora", "terra"].includes(p.slug)) : chairs;

  return (
    <>
      <ProductView product={product} />

      {/* Детали — как разворот каталога */}
      {detail && (
      <section className="mt-32 grid gap-10 px-5 md:grid-cols-12 md:px-10">
        <div className="md:col-span-4">
          <p className="eyebrow text-stone">{detail.eyebrow}</p>
          <h2 className="font-display mt-4 text-[clamp(2rem,4vw,3.6rem)] leading-[1.05]">{detail.title}</h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-stone">{detail.text}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:col-span-7 md:col-start-6">
          {detail.images.map((im, i) => (
            <Reveal key={im.src} delay={i * 0.1} className={i === 1 ? "md:mt-24" : ""}>
              <figure>
                <div className="relative aspect-[3/4] overflow-hidden bg-paper-2">
                  <Image src={im.src} alt={im.caption} fill sizes="(min-width: 768px) 28vw, 50vw" className="object-cover" />
                </div>
                <figcaption className="eyebrow mt-3 text-stone">{im.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>
      )}

      {/* К столу — стулья, к стулу — столы */}
      <section className="mt-32 bg-paper-2 px-5 py-20 md:px-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-stone">{chair ? "Подойдёт к столам" : "Стулья к столу"}</p>
            <h2 className="font-display mt-3 text-[clamp(1.8rem,3.4vw,3rem)] leading-[1.05]">
              {chair ? `${product.name} за столом` : `Соберите комплект с ${product.name}`}
            </h2>
          </div>
          <Link href={chair ? "/catalog" : "/catalog#chairs"} className="eyebrow link-line">
            {chair ? "Все столы →" : "Все стулья →"}
          </Link>
        </div>
        <div className={`grid gap-x-5 gap-y-12 ${chair ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-3"}`}>
          {pair.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <ProductCard product={p} studio aspect={p.category === "chair" ? "aspect-[4/5]" : "aspect-[4/3]"} sizes="(min-width: 768px) 30vw, 50vw" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-32 px-5 md:px-10">
        <h2 className="eyebrow mb-10 border-b border-line pb-5">{chair ? "Другие стулья" : "Похожие модели"}</h2>
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4">
          {others.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <ProductCard product={p} studio aspect={chair ? "aspect-[4/5]" : "aspect-[4/3]"} sizes="(min-width: 768px) 25vw, 50vw" />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
