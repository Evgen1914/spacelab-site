import type { Metadata } from "next";
import { Bodoni_Moda, Onest, Prata } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import CursorLabel from "@/components/CursorLabel";

const bodoni = Bodoni_Moda({ variable: "--font-bodoni", subsets: ["latin"], axes: ["opsz"] });
const prata = Prata({ variable: "--font-prata", subsets: ["latin", "cyrillic"], weight: "400" });
const onest = Onest({ variable: "--font-onest", subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Space.Lab — обеденные столы",
  description: "Обеденные столы из керамогранита, дерева и металла. Space.Lab.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${bodoni.variable} ${prata.variable} ${onest.variable}`}>
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
