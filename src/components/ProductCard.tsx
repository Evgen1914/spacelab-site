import Image from "next/image";
import Link from "next/link";
import { formatFrom, isStudio, type Product } from "@/lib/products";

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
  // у стула при наведении — тот же стул в другом цвете каркаса
  const [a, b] = studio ? [product.cutout, product.images.find((i) => i !== product.cutout)] : product.images;
  return (
    <Link href={`/product/${product.slug}`} className="group block" data-cursor="Смотреть">
      <div className={`relative overflow-hidden bg-paper-2 ${aspect}`}>
        <Image
          src={a}
          alt={product.name}
          fill
          sizes={sizes}
          className={`transition-[transform,opacity] duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04] ${
            studio ? "object-contain p-[8%] mix-blend-multiply" : "object-cover"
          } ${b && isStudio(b) ? "group-hover:opacity-0" : ""}`}
        />
        {b && (
          <Image
            src={b}
            alt=""
            fill
            sizes={sizes}
            className={`opacity-0 transition-opacity duration-700 group-hover:opacity-100 ${
              isStudio(b) ? "object-contain p-[8%] mix-blend-multiply" : "object-cover"
            }`}
          />
        )}
        {product.badge === "Хит" && <span className="eyebrow absolute top-3 left-3 bg-clay px-2.5 py-1 text-[10px] text-paper md:top-4 md:left-4">Хит</span>}
        {product.badge === "Новинка" && (
          <span className="eyebrow absolute top-3 left-3 bg-paper/90 px-2.5 py-1 text-[10px] md:top-4 md:left-4">Новинка</span>
        )}
      </div>
      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4">
        <div className="flex items-baseline gap-3">
          <span className="eyebrow text-stone">{product.index}</span>
          <span className="font-display text-xl md:text-2xl">{product.name}</span>
        </div>
        <span className="text-sm whitespace-nowrap">{formatFrom(product)}</span>
      </div>
      <p className="font-display mt-0.5 pl-[2.1rem] text-sm text-stone italic">{product.short}</p>
    </Link>
  );
}
