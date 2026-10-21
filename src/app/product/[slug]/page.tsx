import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { getProduct, products } from "@/lib/products";
import ProductView from "./ProductView";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  return { title: p ? `${p.name} — ${p.type} — homeb` : "homeb", description: p?.lead };
}

export default function ProductPage({ params }: PageProps<"/product/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <Product params={params} />
    </Suspense>
  );
}

async function Product({ params }: { params: PageProps<"/product/[slug]">["params"] }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const others = products.filter((p) => p.slug !== slug);
  const { detail } = product;

  return (
    <>
      <ProductView product={product} />

      {/* Детали — как разворот каталога */}
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

      <section className="mt-32 px-5 md:px-10">
        <h2 className="eyebrow mb-10 border-b border-line pb-5">Другие модели</h2>
        <div className="grid gap-x-5 gap-y-12 md:grid-cols-3">
          {others.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <ProductCard product={p} studio sizes="(min-width: 768px) 33vw, 100vw" />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
