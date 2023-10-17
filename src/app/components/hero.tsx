import Image from "next/image";
import Link from "next/link";
import React from "react";
import app from "../assets/app.svg";
import { Company, Icon } from "./modules";

const Hero = () => {

  // Testing Data
  type dataType = {
    logo: string;
    name: string;
    description: string;
    status: 1 | 2 | 3;
  };
  const data: dataType[] = [
    {
      logo: "https://img.icons8.com/color/100/mcdonalds-app.png",
      name: "mcdonalds",
      description: "company",
      status: 3,
    },
    {
      logo: "https://img.icons8.com/ios-filled/100/mac-os.png",
      name: "apple",
      description: "company",
      status: 2,
    },
    {
      logo: "https://img.icons8.com/color/100/coca-cola.png",
      name: "coca cola",
      description: "company",
      status: 1,
    },
  ];

  const searching = (e: InputEvent) => {

    const searchingText = e.target.value

  }

  return (
    <div className="min-h-screen w-screen flex flex-col-reverse md:flex-row items-center justify-center gap-6 p-4 pt-28">
      <div className="w-full md:w-1/2 flex flex-col justify-end gap-4">
        <div className="w-full text-6xl font-black mb-10">
          A way for us to boycott the occupation and it’s supporters
        </div>
        <div className="w-full text-3 opacity-50">Search a product or company</div>
        <div className="w-full relative center">
          <input
            className="app-input"
            type="text"
            placeholder="Product or company name..."
            onChange={searching}
          />
          <Icon type="search" style="absolute right-0 mr-2" />
        </div>

        {data.map((company, index) => {
          return <Company key={index} props={company} />;
        })}
      </div>

      <div className="w-full md:w-1/2 center flex-col">
        <Image
          src={app} //just a placeholder
          alt="Logo"
          width={300}
          height={300}
        />
        <div className="center">
          <Link href="/" className="app-btn-dark">
            <Icon type="appstore" />
            <span>app store</span>
          </Link>
          <Link href="/" className="app-btn-dark">
            <Icon type="googleplay" />
            <span>google play</span>
          </Link>
        </div>
      </div>
    </div>
  );

};

export default Hero;
