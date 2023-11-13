import "./globals.css";
import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";

const catamaran = Ubuntu({ subsets: ["latin"], weight: ["400", "500", "700", "300", "400", "500", "700"] });

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
      <body className={catamaran.className}>
        {children}
        {/* <ChakraProvider>{children}</ChakraProvider> */}
      </body>
    </html>
  );
}
