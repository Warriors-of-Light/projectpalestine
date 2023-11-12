"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Footer, Header } from "./modules";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const specificRoute = "/login";
  const showComponent = pathname !== specificRoute;
  return (
    <>
      {showComponent && <Header />}
      {children}
      {showComponent && <Footer />}
    </>
  );
};

export default LayoutProvider;
