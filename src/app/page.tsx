// Home Page

import { Header, Hero } from "@/app/components/modules";
import React from "react";

const Home = () => {
  return (
    <main className="bg-app--light flex flex-col items-center justify-start min-h-screen w-screen gap-4 relative overflow-x-hidden md:overflow-hidden">
      <Header />
      <Hero />
    </main>
  );
};

export default Home;
