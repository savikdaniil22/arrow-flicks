import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.scss";
import Head from "next/head";
import SideBar from "./ui/side-bar/Side-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ArrowFlicks",
  description: "ArrowFlicks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>ArrowFlicks</title>
        <meta name="description" content="ArrowFlicks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={`${inter.className} ${styles.container}`}>
        <SideBar />
        <div className={styles.content}>{children}</div>
      </body>
    </html>
  );
}
