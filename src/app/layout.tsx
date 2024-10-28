import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.scss";
import Navbar from "@/components/ui/navbar/Navbar";
import Footer from "@/components/ui/footer/Footer";
import StoreProvider from "./StoreProvider";
import { Category } from "@/types/models/category.types";
import { getApiBaseUrl } from "@/utils/getApiBaseUrl";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Online shop",
  description: "Online shop app",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico"
  }
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const res = await fetch(getApiBaseUrl() + "/categories");
  const categories: Category[] = await res.json();

  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <Navbar categories={categories} />
          <main className="layout">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
