import "./globals.css";
import "@/css/globals.css";
import type { Metadata } from "next";
import { Livvic } from 'next/font/google'
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import LayoutProvider from "@/components/layoutProvider";
import { Analytics } from "@vercel/analytics/react";

const livvic = Livvic({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export const metadata: Metadata = {
  icons: ['palestine.png'],
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
      <body className={livvic.className}>
        <ChakraProvider>
          <LayoutProvider>{children}</LayoutProvider>
        </ChakraProvider>
        <Analytics />
      </body>
    </html>
  );
}
