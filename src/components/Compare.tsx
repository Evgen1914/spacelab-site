import Image from "next/image";
import Link from "next/link";
import { products, rub } from "@/lib/products";

const lengths = ["1400", "1600", "1800"];

// Сравнение моделей и цены — как стр. 13 каталога. На телефоне строка превращается в карточку.
export default function Compare({ className = "" }: { className?: string }) {
  return (
    <section id="prices" className={`scroll-mt-20 px-5 md:px-10 ${className}`}>
      <h2 className="font-display text-[clamp(2.2rem,5vw,4.5rem)] leading-none">Сравнение моделей</h2>
      <p className="font-display mt-3 text-stone italic">материалы, размеры и цены</p>

      <div className="eyebrow mt-12 hidden grid-cols-[110px_1.1fr_1.6fr_0.8fr_repeat(3,1fr)] gap-6 border-b border-ink pb-4 text-stone md:grid">
        <span />
        <span>Модель</span>
        <span>Материалы</span>
        <span>Цвета</span>
        {lengths.map((l) => (
          <span key={l}>{l} мм</span>
        ))}
      </div>

      <ul className="mt-8 md:mt-0">
        {products.map((p) => {
          const n = p.colors.options.length;
          return (
            <li key={p.slug} className="border-b border-line py-7 md:py-6">
              <Link
                href={`/product/${p.slug}`}
                className="group grid grid-cols-[88px_1fr] items-center gap-x-5 gap-y-5 md:grid-cols-[110px_1.1fr_1.6fr_0.8fr_repeat(3,1fr)] md:gap-6"
              >
                <div className="relative aspect-[4/3] bg-paper">
                  <Image src={p.cutout} alt="" fill sizes="110px" className="object-contain mix-blend-multiply" />
                </div>
                <div>
                  <p className="font-display text-2xl">
                    <span className="link-line">{p.name}</span>
                    {p.badge && <span className="eyebrow ml-3 bg-clay px-2 py-1 align-middle text-[9px] text-paper">{p.badge}</span>}
                  </p>
                  <p className="font-display text-sm text-stone italic">{p.short}</p>
                </div>
                <div className="col-span-2 space-y-1 text-sm text-stone md:col-span-1">
                  {p.specs.slice(0, 2).map((s) => (
                    <p key={s.label}>{s.value}</p>
                  ))}
                </div>
                <p className="col-span-2 text-sm md:col-span-1">
                  {n} {n === 1 ? "цвет" : "цвета"} <span className="block text-xs text-stone">основания</span>
                </p>
                <div className="col-span-2 grid grid-cols-3 gap-4 md:contents">
                  {lengths.map((l) => {
                    const s = p.sizes.find((x) => x.id === l);
                    return (
                      <div key={l}>
                        <span className="eyebrow mb-1 block text-[10px] text-stone md:hidden">{l} мм</span>
                        {s ? (
                          <>
                            <p className="font-display text-lg md:text-xl">{rub(s.price)}</p>
                            <p className="text-[11px] text-stone">{s.size.replace(/×750$/, "")} мм</p>
                          </>
                        ) : (
                          <p className="text-stone">—</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 text-xs leading-relaxed text-stone">
        Высота всех столов — 750 мм. Ширина: 800 мм для длины 1400 и 1600, 900 мм для длины 1800. Цены указаны за стол, стулья в стоимость
        не входят.
      </p>
    </section>
  );
}
