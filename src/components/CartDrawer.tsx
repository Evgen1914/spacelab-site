"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { useCart } from "@/lib/cart";
import { useMounted } from "@/lib/useMounted";
import { ease } from "./Reveal";

type Step = "cart" | "form" | "sending" | "done";

const contactWays = ["Telegram", "WhatsApp", "Звонок"];

export default function CartDrawer() {
  const { items, open, setOpen, setQty, remove, clear } = useCart();
  const mounted = useMounted();
  const lenis = useLenis();
  const [step, setStep] = useState<Step>("cart");
  const [error, setError] = useState("");
  const [contact, setContact] = useState(contactWays[0]);

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [setOpen]);

  const close = () => {
    setOpen(false);
    if (step === "done") setTimeout(() => setStep("cart"), 600);
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setStep("sending");
    setError("");
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, contact, items }),
      });
      if (!res.ok) throw new Error();
      clear();
      setStep("done");
    } catch {
      setError("Не получилось отправить заявку. Попробуйте ещё раз или напишите нам напрямую.");
      setStep("form");
    }
  };

  const total = items.reduce((n, i) => n + i.qty, 0);

  return (
    <AnimatePresence>
      {mounted && open && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-ink/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            data-lenis-prevent
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.7, ease }}
            className="fixed top-0 right-0 bottom-0 z-[70] flex w-full flex-col bg-paper sm:w-[460px]"
          >
            <div className="flex h-14 items-center justify-between border-b border-line px-6">
              <span className="eyebrow">
                {step === "done" ? "Заявка отправлена" : step === "cart" ? `Корзина · ${total}` : "Оформление заявки"}
              </span>
              <button onClick={close} className="eyebrow link-line">
                Закрыть
              </button>
            </div>

            {step === "done" ? (
              <Done close={close} />
            ) : items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-6 px-10 text-center">
                <p className="font-display text-3xl">Корзина пока пуста</p>
                <p className="text-sm text-stone">Выберите стол в каталоге — мы свяжемся с вами и всё уточним.</p>
                <Link href="/catalog" onClick={close} className="eyebrow border border-ink px-8 py-4 transition-colors hover:bg-ink hover:text-paper">
                  В каталог
                </Link>
              </div>
            ) : step === "cart" ? (
              <>
                <ul className="flex-1 overflow-y-auto px-6">
                  {items.map((item) => (
                    <li key={item.key} className="flex gap-5 border-b border-line py-6">
                      <div className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden bg-paper-2">
                        <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <p className="font-display text-xl">{item.name}</p>
                          <button onClick={() => remove(item.key)} className="eyebrow text-stone hover:text-ink">
                            Убрать
                          </button>
                        </div>
                        <dl className="mt-2 space-y-0.5 text-xs text-stone">
                          {item.options.map((o) => (
                            <div key={o.label}>
                              {o.label}: <span className="text-ink">{o.value}</span>
                            </div>
                          ))}
                        </dl>
                        <div className="mt-auto flex items-center gap-4 pt-3 text-sm">
                          <button aria-label="Меньше" onClick={() => setQty(item.key, item.qty - 1)} className="h-7 w-7 border border-line hover:border-ink">
                            −
                          </button>
                          <span>{item.qty}</span>
                          <button aria-label="Больше" onClick={() => setQty(item.key, item.qty + 1)} className="h-7 w-7 border border-line hover:border-ink">
                            +
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-line p-6">
                  <p className="mb-5 text-xs leading-relaxed text-stone">
                    Это заявка, а не оплата. Менеджер свяжется с вами, уточнит размеры, цвет, сроки и стоимость доставки.
                  </p>
                  <button onClick={() => setStep("form")} className="eyebrow w-full bg-ink py-5 text-paper transition-opacity hover:opacity-85">
                    Оформить заявку
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={submit} className="flex flex-1 flex-col overflow-y-auto px-6 py-8">
                <button type="button" onClick={() => setStep("cart")} className="eyebrow mb-8 self-start text-stone hover:text-ink">
                  ← Назад к корзине
                </button>
                <Field name="name" label="Имя" required autoComplete="name" />
                <Field name="phone" label="Телефон" type="tel" required autoComplete="tel" placeholder="+7" />
                <Field name="email" label="Email (по желанию)" type="email" autoComplete="email" />
                <div className="mb-7">
                  <p className="eyebrow mb-3 text-stone">Как с вами связаться</p>
                  <div className="flex flex-wrap gap-2">
                    {contactWays.map((c) => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => setContact(c)}
                        className={`border px-4 py-2 text-sm transition-colors ${contact === c ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <Field name="comment" label="Комментарий" textarea />
                {error && <p className="mb-4 text-sm text-clay">{error}</p>}
                <button
                  disabled={step === "sending"}
                  className="eyebrow mt-auto w-full bg-ink py-5 text-paper transition-opacity hover:opacity-85 disabled:opacity-50"
                >
                  {step === "sending" ? "Отправляем…" : "Отправить заявку"}
                </button>
                <p className="mt-4 text-center text-[11px] text-stone">Нажимая кнопку, вы соглашаетесь на обработку персональных данных</p>
              </form>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  textarea,
  ...props
}: { label: string; textarea?: boolean } & React.InputHTMLAttributes<HTMLInputElement> & { name: string }) {
  const cls =
    "peer w-full border-b border-line bg-transparent pt-5 pb-2 text-base outline-none transition-colors placeholder:text-transparent focus:border-ink focus:placeholder:text-stone";
  return (
    <label className="relative mb-7 block">
      {textarea ? (
        <textarea name={props.name} rows={3} placeholder=" " className={`${cls} resize-none`} />
      ) : (
        <input {...props} placeholder={props.placeholder ?? " "} className={cls} />
      )}
      <span className="eyebrow pointer-events-none absolute top-5 left-0 text-stone transition-all duration-300 peer-focus:top-0 peer-focus:text-[10px] peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[10px]">
        {label}
      </span>
    </label>
  );
}

function Done({ close }: { close: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-10 text-center">
      <motion.svg width="64" height="64" viewBox="0 0 64 64" className="mb-8">
        <motion.circle
          cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="1"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease }}
        />
        <motion.path
          d="M20 33 L29 41 L45 24" fill="none" stroke="currentColor" strokeWidth="1"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, ease, delay: 0.7 }}
        />
      </motion.svg>
      <p className="font-display text-3xl">Спасибо!</p>
      <p className="mt-4 max-w-xs text-sm text-stone">Заявка у нас. Менеджер свяжется с вами в ближайшее время.</p>
      <button onClick={close} className="eyebrow link-line mt-10">
        Продолжить просмотр
      </button>
    </div>
  );
}
