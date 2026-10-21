import Image from "next/image";
import Link from "next/link";
import { formatFrom, type Product } from "@/lib/products";

// Карточка товара. studio — сначала стол на белом фоне (как в каталоге), при наведении — интерьер.
// Иначе — интерьер, при наведении второе фото.
export default function ProductCard({
  product,
  aspect = "aspect-[4/5]",
  sizes = "50vw",
  studio = false,
}: {
  product: Product;
  aspect?: string;
  sizes?: string;
  studio?: boolean;
}) {
  const [a, b] = studio ? [product.cutout, product.images[0]] : product.images;
  return (
    <Link href={`/product/${product.slug}`} className="group block" data-cursor="Смотреть">
      <div className={`relative overflow-hidden bg-paper-2 ${aspect}`}>
        <Image
          src={a}
          alt={product.name}
          fill
          sizes={sizes}
          className={`transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04] ${
            studio ? "object-contain p-[8%] mix-blend-multiply" : "object-cover"
          }`}
        />
        {b && (
          <Image src={b} alt="" fill sizes={sizes} className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        )}
        {product.badge && <span className="eyebrow absolute top-4 left-4 bg-clay px-3 py-1.5 text-paper">{product.badge}</span>}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <span className="eyebrow text-stone">{product.index}</span>
          <span className="font-display text-2xl">{product.name}</span>
        </div>
        <span className="text-sm whitespace-nowrap">{formatFrom(product)}</span>
      </div>
      <p className="font-display mt-0.5 pl-[2.1rem] text-sm text-stone italic">{product.short}</p>
    </Link>
  );
}
