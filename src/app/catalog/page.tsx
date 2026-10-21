import type { Metadata } from "next";
import Compare from "@/components/Compare";
import Catalog from "./Catalog";

export const metadata: Metadata = { title: "Каталог — homeb" };

export default function CatalogPage() {
  return (
    <>
      <Catalog />
      <Compare className="mt-40" />
    </>
  );
}
