// Home Page
"use client";
import React from "react";
import { Hero, Footer } from "@/components/modules";

const Home = () => {
  return (
    <main className="app-page-container  dark:bg-app-dark dark:text-white border min-h-full">
      <Hero />
      <Footer />
    </main>
  );
};

export default Home;
