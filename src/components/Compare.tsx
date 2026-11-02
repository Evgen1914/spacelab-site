import Image from "next/image";
import Link from "next/link";
import { chairs, rub, tableGroups, type Product } from "@/lib/products";

const groups = [
  ...tableGroups.map((g) => ({ ...g, title: `${g.title} столы` })),
  { id: "chairs", title: "Стулья", items: chairs },
];

const plural = (n: number) => (n === 1 ? "цвет" : n < 5 ? "цвета" : "цветов");

// Сравнение моделей и цены — как последние страницы каталога. На телефоне строка превращается в карточку.
export default function Compare({ className = "" }: { className?: string }) {
  return (
    <section id="prices" className={`scroll-mt-20 px-5 md:px-10 ${className}`}>
      <h2 className="font-display text-[clamp(2.2rem,5vw,4.5rem)] leading-none">Сравнение моделей</h2>
      <p className="font-display mt-3 text-stone italic">материалы, размеры и цены</p>

      <div className="eyebrow mt-12 hidden grid-cols-[120px_1.1fr_1.5fr_0.7fr_1.5fr] gap-6 border-b border-ink pb-4 text-stone md:grid">
        <span />
        <span>Модель</span>
        <span>Материалы</span>
        <span>Цвета</span>
        <span className="flex justify-between">
          <span>Размер, мм</span>
          <span>Цена</span>
        </span>
      </div>

      {groups.map((g) => (
        <div key={g.id} className="mt-10 md:mt-12">
          <p className="eyebrow mb-1 flex items-baseline justify-between text-stone">
            {g.title}
            <span>{g.items.length}</span>
          </p>
          <ul className="border-t border-line">
            {g.items.map((p) => (
              <Row key={p.slug} p={p} />
            ))}
          </ul>
        </div>
      ))}

      <p className="mt-8 text-xs leading-relaxed text-stone">
        Высота всех столов — 750 мм. Размер стола указан как длина × ширина, у круглых — диаметр. Цены за стол указаны без стульев, цена
        стула — за одну штуку.
      </p>
    </section>
  );
}

function Row({ p }: { p: Product }) {
  const n = p.colors.options.length;
  const chair = p.category === "chair";
  return (
    <li className="border-b border-line py-6">
      <Link
        href={`/product/${p.slug}`}
        className="group grid grid-cols-[88px_1fr] items-center gap-x-5 gap-y-4 md:grid-cols-[120px_1.1fr_1.5fr_0.7fr_1.5fr] md:gap-6"
      >
        <div className={`relative bg-paper ${chair ? "aspect-[4/3]" : "aspect-[16/10]"}`}>
          <Image src={p.cutout} alt="" fill sizes="120px" className="object-contain mix-blend-multiply" />
        </div>
        <div>
          <p className="font-display text-2xl">
            <span className="link-line">{p.name}</span>
            {p.badge === "Хит" && <span className="eyebrow ml-3 bg-clay px-2 py-1 align-middle text-[9px] text-paper">Хит</span>}
            {p.badge === "Новинка" && !chair && <span className="eyebrow ml-3 align-middle text-[9px] text-clay">новинка</span>}
          </p>
          <p className="font-display text-sm text-stone italic">{p.short}</p>
        </div>
        <div className="col-span-2 space-y-1 text-sm text-stone md:col-span-1">
          {p.specs.slice(0, 2).map((s) => (
            <p key={s.label}>{chair ? `${s.label}: ${s.value.toLowerCase()}` : s.value}</p>
          ))}
        </div>
        <p className="text-sm max-md:hidden">
          {n} {plural(n)} <span className="block text-xs text-stone">{chair ? "каркаса" : "основания"}</span>
        </p>
        <ul className="col-span-2 divide-y divide-line/70 md:col-span-1">
          {p.sizes.map((s) => (
            <li key={s.id} className="flex items-baseline justify-between gap-4 py-1.5 first:pt-0 last:pb-0">
              <span className="text-sm text-stone">{s.size.replace(/×750$/, "")}</span>
              <span className="font-display text-lg whitespace-nowrap">{rub(s.price)}</span>
            </li>
          ))}
        </ul>
      </Link>
    </li>
  );
}
