// Home Page

import React from "react";
import { Header, Hero } from "../components/modules";

const Home = () => {
  return (
    <main className="bg-app--light relative h-full w-full flex flex-col items-center justify-start overflow-hidden">
      <Header />
      <Hero />
    </main>
  );
};

export default Home;
