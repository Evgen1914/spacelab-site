"use client";

import Image from "next/image";
import { useState } from "react";
import { slabs } from "@/lib/products";
import Reveal from "../Reveal";

// Образцы столешниц: при наведении фактура увеличивается под курсором, как лупа
export default function Slabs() {
  return (
    <section id="materials" className="mt-40 px-5 md:px-10">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="eyebrow text-stone">Материал</p>
          <h2 className="font-display mt-4 text-[clamp(2.2rem,4.5vw,4rem)] leading-[1.05]">Камень, который не боится жизни</h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-stone">
            Во всех моделях — керамогранит 12 мм. Для Axis доступны четыре рисунка камня, белый мрамор — в глянце или мате. Наведите на
            образец или нажмите на него, чтобы рассмотреть фактуру.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:col-span-8 md:grid-cols-4">
          {slabs.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.08}>
              <Loupe src={s.texture!} name={s.name} note={s.note} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Loupe({ src, name, note }: { src: string; name: string; note?: string }) {
  const [origin, setOrigin] = useState("50% 50%");
  const [on, setOn] = useState(false); // на телефоне наведения нет — увеличиваем по нажатию
  return (
    <figure>
      <div
        className="group relative aspect-[4/5] cursor-zoom-in overflow-hidden bg-paper-2"
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
          setOn((v) => !v);
        }}
        onPointerLeave={() => setOn(false)}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setOrigin(`${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`);
        }}
      >
        <Image
          src={src}
          alt={`Столешница ${name}`}
          fill
          sizes="(min-width: 768px) 16vw, 45vw"
          style={{ transformOrigin: origin }}
          className={`object-cover transition-transform duration-500 ease-out group-hover:scale-[2.2] ${on ? "scale-[2.2]" : ""}`}
        />
      </div>
      <figcaption className="mt-3 text-sm">
        {name}
        <span className="font-display block text-xs text-stone italic">{note}</span>
      </figcaption>
    </figure>
  );
}
