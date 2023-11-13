// Home Page //
"use client";
import Image from "next/image";
import { Header, Hero, Footer } from "@/components/modules";
import points from '@/assets/points.svg'

export default function Home() {

  //await new Promise(resolve => setTimeout(resolve, 300000))

  return (
    <main className="main">
      <Image src={points} className="layer full object-cover -z-10 opacity-10" alt="points" width={800} height={500}/>
      <Header />
      <Hero />
      <Footer />
    </main>
  );
};
