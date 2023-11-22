"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Footer, Header } from "./modules";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const specificRoutes = [
    "/login",
    "/demonstrations/alloutforjustice",
    "/demonstrations/alloutforjustice/about",
  ];
  const showComponent = !specificRoutes.includes(pathname);
  return (
    <>
      {showComponent && <Header />}
      {children}
      {showComponent && <Footer />}
    </>
  );
};

export default LayoutProvider;
