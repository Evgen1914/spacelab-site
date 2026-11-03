import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import CursorLabel from "@/components/CursorLabel";

const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin", "cyrillic"], style: ["normal", "italic"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin", "cyrillic"] });

const description =
  "Обеденные столы из керамогранита: 9 моделей — прямоугольные, овальные и круглые, на опорах из дерева, металла и нержавеющей стали. Стулья из массива дуба к ним.";

export const metadata: Metadata = {
  // адрес сайта для ссылок-превью в мессенджерах; при переезде на свой домен — задать SITE_URL в Dokploy
  metadataBase: new URL(process.env.SITE_URL ?? "http://spacelab-spacelabsite-xlrs8s-1baa44-84-54-59-240.traefik.me"),
  title: "homeb — обеденные столы из керамогранита",
  description,
  openGraph: { siteName: "homeb", locale: "ru_RU", type: "website", title: "homeb — обеденные столы из керамогранита", description },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${playfair.variable} ${inter.variable}`}>
      <body className="grain min-h-screen">
        <SmoothScroll>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <CursorLabel />
        </SmoothScroll>
      </body>
    </html>
  );
}
