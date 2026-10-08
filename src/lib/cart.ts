"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  key: string;
  slug: string;
  name: string;
  image: string;
  options: { label: string; value: string }[];
  qty: number;
};

type CartState = {
  items: CartItem[];
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (item: Omit<CartItem, "key" | "qty">) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
};

const keyOf = (slug: string, options: CartItem["options"]) =>
  [slug, ...options.map((o) => o.value)].join("|");

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      open: false,
      setOpen: (open) => set({ open }),
      add: (item) =>
        set((s) => {
          const key = keyOf(item.slug, item.options);
          const existing = s.items.find((i) => i.key === key);
          const items = existing
            ? s.items.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i))
            : [...s.items, { ...item, key, qty: 1 }];
          return { items, open: true };
        }),
      setQty: (key, qty) =>
        set((s) => ({
          items: qty < 1 ? s.items.filter((i) => i.key !== key) : s.items.map((i) => (i.key === key ? { ...i, qty } : i)),
        })),
      remove: (key) => set((s) => ({ items: s.items.filter((i) => i.key !== key) })),
      clear: () => set({ items: [] }),
    }),
    { name: "spacelab-cart", partialize: (s) => ({ items: s.items }) },
  ),
);
