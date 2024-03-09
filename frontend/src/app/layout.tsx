import css from './layout.module.scss'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./preload.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Facilita Entregas",
  description: "Melhores entregas de São Paulo"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body id={css["body"]} className={inter.className}>
        <header id={css["header"]}>
          Facilita Entregas
        </header>
        { children }
        <footer id={css["footer"]}>
          By Victor Hugo - 2024
        </footer>
      </body>
    </html>
  );
}
