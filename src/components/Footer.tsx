import Link from "next/link";
import { products } from "@/lib/products";

export default function Footer() {
  return (
    <footer id="contacts" className="mt-32 border-t border-line px-5 pt-16 md:px-10">
      <div className="grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display max-w-md text-3xl leading-tight">Поможем выбрать стол под ваш интерьер и размер комнаты.</p>
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
      <p aria-hidden className="font-logo mt-24 mb-6 text-center text-[15.5vw] leading-none tracking-[0.02em] select-none">
        SPACE.LAB
      </p>
      <div className="eyebrow flex justify-between border-t border-line py-5 text-stone">
        <span>© 2026 Space.Lab</span>
        <span>Обеденные столы</span>
      </div>
    </footer>
  );
}
