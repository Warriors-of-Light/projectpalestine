// Home Page
"use client";
import React from "react";
import { Header, Hero, Footer } from "@/components/modules";

export default async function Home() {

  //await new Promise(resolve => setTimeout(resolve, 300000))

  return (
    <main className="main">
      <Header />
      <Hero />
      {/* <Footer /> */}
    </main>
  );
};
