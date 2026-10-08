import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
  return { title: p ? `${p.name} — ${p.type} — Space.Lab` : "Space.Lab", description: p?.description };
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const others = products.filter((p) => p.slug !== slug);

  return (
    <>
      <ProductView product={product} />
      <section className="mt-32 px-5 md:px-10">
        <h2 className="eyebrow mb-10 border-b border-line pb-5">Другие модели</h2>
        <div className="grid gap-x-5 gap-y-12 md:grid-cols-3">
          {others.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <ProductCard product={p} sizes="(min-width: 768px) 33vw, 100vw" />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
