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

export const metadata: Metadata = {
  title: "homeb — обеденные столы",
  description: "Обеденные столы homeb: керамогранит, дерево, металл. Scandi, Duna, Kona и Axis — коллекция 2026.",
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
