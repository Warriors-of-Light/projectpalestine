import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { useCompaniesStore } from "@/store/useCompaniesStore";
import Header from "../components/common/header";
import NextThemesProvider from "@/components/providers/nextThemesProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: ["/logo.svg"],
  title: "Project Palestine",
  description: "A way for us to boycott the occupation and it’s supporters",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider>
          <NextThemesProvider>
            <Header />
            {children}
          </NextThemesProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
