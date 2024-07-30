import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.scss";
import Head from "next/head";
import Navbar from "@/components/ui/navbar/Navbar";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Online shop",
  description: "Online shop app"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body className={inter.className}>
        <Navbar />
        <Suspense fallback={<Loading />}>
          <main className="layout">{children}</main>
        </Suspense>
        <div className="overlay" id="overlay"></div>
      </body>
    </html>
  );
}
