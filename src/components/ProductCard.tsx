import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";

// Карточка товара: при наведении фото меняется на второе
export default function ProductCard({ product, aspect = "aspect-[4/5]", sizes = "50vw" }: { product: Product; aspect?: string; sizes?: string }) {
  const [a, b] = product.images;
  return (
    <Link href={`/product/${product.slug}`} className="group block" data-cursor="Смотреть">
      <div className={`relative overflow-hidden bg-paper-2 ${aspect}`}>
        <Image src={a} alt={product.name} fill sizes={sizes} className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]" />
        {b && (
          <Image src={b} alt="" fill sizes={sizes} className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        )}
        {product.badge && <span className="eyebrow absolute top-4 left-4 bg-paper px-3 py-1.5">{product.badge}</span>}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <span className="eyebrow text-stone">{product.index}</span>
          <span className="font-display text-xl">{product.name}</span>
        </div>
        <span className="text-xs text-stone">{formatPrice(product.price)}</span>
      </div>
      <p className="mt-1 pl-[2.1rem] text-xs text-stone">{product.type}</p>
    </Link>
  );
}
