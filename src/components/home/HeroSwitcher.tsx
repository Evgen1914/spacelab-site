import Link from "next/link";
import { heroVariants, type HeroVariant } from "@/lib/hero";

// Временная панель для сравнения вариантов первого экрана — убрать после выбора
export default function HeroSwitcher({ active }: { active: HeroVariant }) {
  return (
    <nav className="fixed bottom-5 left-1/2 z-[55] flex -translate-x-1/2 gap-1 rounded-full bg-ink/90 p-1 text-paper shadow-xl backdrop-blur">
      {(Object.keys(heroVariants) as HeroVariant[]).map((v) => (
        <Link
          key={v}
          href={v === "current" ? "/" : `/hero/${v}`}
          className={`eyebrow rounded-full px-4 py-2 whitespace-nowrap transition-colors ${v === active ? "bg-paper text-ink" : "hover:bg-paper/15"}`}
        >
          <span className="md:hidden">{v === "current" ? "Сейчас" : v.toUpperCase()}</span>
          <span className="hidden md:inline">{heroVariants[v].title}</span>
        </Link>
      ))}
    </nav>
  );
}
