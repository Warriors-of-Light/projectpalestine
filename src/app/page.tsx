// Home Page //
"use client";
import Image from "next/image";
import { Header, Hero, Footer } from "@/components/modules";
import products from '@/assets/products.svg'

export default function Home() {

  //await new Promise(resolve => setTimeout(resolve, 300000))

  return (
    <main className="main">
      <Image src={products} className="absolute w-screen h-screen -z-10 opacity-10 animate-rotate-long" alt="points" width={800} height={500}/>
      <Header />
      <Hero />
      <Footer />
    </main>
  );
};
