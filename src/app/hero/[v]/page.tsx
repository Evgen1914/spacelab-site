import { notFound } from "next/navigation";
import { Suspense } from "react";
import HomeContent from "@/components/home/HomeContent";

// Превью вариантов первого экрана: /hero/a, /hero/b, /hero/c
export function generateStaticParams() {
  return [{ v: "a" }, { v: "b" }, { v: "c" }];
}

export default function HeroPreview({ params }: PageProps<"/hero/[v]">) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ink" />}>
      <Preview params={params} />
    </Suspense>
  );
}

async function Preview({ params }: { params: PageProps<"/hero/[v]">["params"] }) {
  const { v } = await params;
  if (v !== "a" && v !== "b" && v !== "c") notFound();
  return <HomeContent variant={v} preview />;
}
