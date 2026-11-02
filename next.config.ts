import type { NextConfig } from "next";
import path from "path";

const root = path.resolve(__dirname);

const nextConfig: NextConfig = {
  // Dokploy собирает образ по Dockerfile: standalone — минимальный сервер со своими node_modules
  output: "standalone",
  // корень задан явно, иначе Next найдёт чужой lockfile в домашней папке и разложит standalone по вложенным путям
  outputFileTracingRoot: root,
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Next.js сам предлагает обновления безопасности (next upgrade --agent=security)
    agentUpgrade: "security",
  },
  // картинки нарезаны заранее (npm run images) — сервер их не пережимает, а отдаёт готовые webp
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [480, 828, 1200, 1920],
    imageSizes: [128, 256],
  },
  async headers() {
    return [
      { source: "/img-opt/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }] },
      { source: "/brand/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=2592000" }] },
    ];
  },
  // старые названия моделей (до каталога homeb) — ведём на новые страницы
  async redirects() {
    return [
      { source: "/product/arbor", destination: "/product/scandi", permanent: true },
      { source: "/product/noir", destination: "/product/duna", permanent: true },
      { source: "/product/colonna", destination: "/product/kona", permanent: true },
    ];
  },
  turbopack: {
    root,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
