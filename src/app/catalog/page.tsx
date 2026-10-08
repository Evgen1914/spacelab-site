import type { Metadata } from "next";
import Catalog from "./Catalog";

export const metadata: Metadata = { title: "Каталог — Space.Lab" };

export default function CatalogPage() {
  return <Catalog />;
}
