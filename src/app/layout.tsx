import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.scss";
import Head from "next/head";
import Navbar from "@/components/ui/navbar/Navbar";
import { Suspense } from "react";
import Loading from "./loading";
import { Category } from "@/types/models/category.types";
import categoriesService from "@/api/services/categoriesService";
import Footer from "@/components/ui/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Online shop",
  description: "Online shop app"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories: Category[] = await categoriesService.getCategories();
  return (
    <html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body className={inter.className}>
        <Navbar categories={categories} />
        <Suspense fallback={<Loading />}>
          <main className="layout">{children}</main>
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}
