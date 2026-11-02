import Link from "next/link";
import { chairs, tables } from "@/lib/products";
import { PHONE, contacts } from "@/lib/contacts";

export default function Footer() {
  return (
    <footer id="contacts" className="mt-32 border-t border-line px-5 pt-16 md:px-10">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display max-w-md text-3xl leading-tight">Подберём модель, размер и цвет под ваше пространство.</p>
          <a href={contacts[0].href} className="font-display mt-8 inline-block text-[clamp(1.8rem,3vw,2.6rem)] leading-none">
            <span className="link-line">{PHONE}</span>
          </a>
          <p className="mt-3 text-sm text-stone">Заказ и консультация — звоните или пишите в мессенджер.</p>
        </div>
        <div className="md:col-span-2 md:col-start-7">
          <p className="eyebrow mb-5 text-stone">Столы</p>
          <ul className="space-y-2 text-sm">
            {tables.map((p) => (
              <li key={p.slug}>
                <Link href={`/product/${p.slug}`} className="link-line">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="eyebrow mb-5 text-stone">Стулья</p>
          <ul className="space-y-2 text-sm">
            {chairs.map((p) => (
              <li key={p.slug}>
                <Link href={`/product/${p.slug}`} className="link-line">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className="eyebrow mt-8 mb-5 text-stone">Ещё</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/catalog#prices" className="link-line">
                Цены
              </Link>
            </li>
            <li>
              <Link href="/#process" className="link-line">
                Как заказать
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="eyebrow mb-5 text-stone">Связаться</p>
          <ul className="space-y-3 text-sm">
            {contacts.map((c) => (
              <li key={c.label}>
                <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="link-line">
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <span aria-hidden className="logo mx-auto mt-24 mb-8 w-full max-w-[1400px] text-ink" />
      <div className="eyebrow flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-line py-5 text-stone">
        <span>© 2026 homeb</span>
        <span>Обеденные столы и стулья · коллекция 2026</span>
      </div>
    </footer>
  );
}
