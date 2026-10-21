import Link from "next/link";
import { products } from "@/lib/products";

export default function Footer() {
  return (
    <footer id="contacts" className="mt-32 border-t border-line px-5 pt-16 md:px-10">
      <div className="grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display max-w-md text-3xl leading-tight">Подберём модель, размер и цвет под ваше пространство.</p>
        </div>
        <div>
          <p className="eyebrow mb-5 text-stone">Коллекция</p>
          <ul className="space-y-2 text-sm">
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={`/product/${p.slug}`} className="link-line">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-5 text-stone">Связаться</p>
          {/* TODO: реальные контакты */}
          <ul className="space-y-2 text-sm">
            <li><span className="link-line">Telegram</span></li>
            <li><span className="link-line">WhatsApp</span></li>
            <li><span className="link-line">+7 (000) 000-00-00</span></li>
          </ul>
        </div>
      </div>
      <span aria-hidden className="logo mx-auto mt-24 mb-8 w-full max-w-[1400px] text-ink" />
      <div className="eyebrow flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-line py-5 text-stone">
        <span>© 2026 homeb</span>
        <span>Керамогранит · дерево · металл</span>
      </div>
    </footer>
  );
}
