import { notFound } from "next/navigation";
import HomeContent from "@/components/home/HomeContent";

// Превью вариантов первого экрана: /hero/a, /hero/b, /hero/c
export function generateStaticParams() {
  return [{ v: "a" }, { v: "b" }, { v: "c" }];
}

export default async function HeroPreview({ params }: PageProps<"/hero/[v]">) {
  const { v } = await params;
  if (v !== "a" && v !== "b" && v !== "c") notFound();
  return <HomeContent variant={v} preview />;
}
