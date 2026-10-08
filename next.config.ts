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
