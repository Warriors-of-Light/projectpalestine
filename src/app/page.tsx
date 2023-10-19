// Home Page

import React from "react";
import { Header, Hero } from "../components/modules";

const Home = () => {
  return (
    <main className="bg-app--light relative h-full w-full flex flex-col items-center justify-start xs:h-900">
      <Header />
      <Hero />
    </main>
  );
};

export default Home;
