// Home Page
"use client";
import React from "react";
import { Header, Hero, Footer } from "@/components/modules";

const Home = () => {
  return (
    <main className="app-page-container border min-h-full">
      <Header />
      <Hero />
      <Footer />
    </main>
  );
};

export default Home;
