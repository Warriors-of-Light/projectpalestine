// Home Page //
"use client";
import Image from "next/image";
import { Header, Hero, Footer } from "@/components/modules";
import products from '@/assets/products.svg'

export default function Home() {

  //await new Promise(resolve => setTimeout(resolve, 300000))

  return (
    <main className="main">
      <div className="absolute top-0 left-0 w-screen h-screen center -z-10 overflow-hidden">
      <Image src={products} className="full opacity-10 animate-rotate-long object-contain" alt="points" width={800} height={500}/>
      </div>
      <Header />
      <Hero />
      <Footer />
    </main>
  );
};
