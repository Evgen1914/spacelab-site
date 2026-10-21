import { NextResponse, type NextRequest } from "next/server";
import { products } from "@/lib/products";

// Неизвестная модель или вариант первого экрана → честный 404.
// Без этого страница успевает начать стримиться со статусом 200 (PPR), и notFound() даёт только «мягкий» 404.
const known = new Set([...products.map((p) => `/product/${p.slug}`), "/hero/a", "/hero/b", "/hero/c"]);

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname.replace(/\/$/, "");
  if (!known.has(path)) return NextResponse.rewrite(new URL("/__not-found", request.url));
}

export const config = {
  matcher: ["/product/:slug", "/hero/:v"],
};
