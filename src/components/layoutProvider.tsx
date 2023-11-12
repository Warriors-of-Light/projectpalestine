"use client";
import React from "react";
import { Footer, Header } from "./modules";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default LayoutProvider;
