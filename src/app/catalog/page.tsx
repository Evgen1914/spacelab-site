import type { Metadata } from "next";
import Catalog from "./Catalog";

export const metadata: Metadata = {
  title: "Каталог и цены — homeb",
  description: "Все обеденные столы и стулья homeb: размеры, материалы, цвета и цены.",
};

export default function CatalogPage() {
  return <Catalog />;
}
