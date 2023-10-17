import { Icon } from "@/components/common/icon";
import { Company } from "@/components/company";
import Header from "@/components/header";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-app-light flex flex-col items-center justify-start h-screen w-screen gap-4">
      <Header />
      <Hero />
    </main>
  );
}

const Hero = () => {
  return (
    <div className="grid grid-cols-12 items-start h-full w-full gap-4 p-4 mt-20">
      <div className="text-app-dark col-span-12 md:col-span-6 flex flex-col items-center gap-2">
        <div className="w-full text-1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula,
          ante eu cursus tincidunt, justo libero consequat tortor, at
          pellentesque erat velit nec libero. Vivamus vel nulla eu justo auctor
          laoreet.
        </div>

        <div className="w-full text-3">Search a product or company</div>

        <div className="w-full relative center">
          <input
            className="app-input"
            type="text"
            placeholder="Product or company name..."
          />
          <button className="app-btn p-2">
            <Icon type="search" />
            search
          </button>
        </div>

        <Company
          props={{
            logo: "https://plchldr.co/i/200x200?&bg=000000&fc=FFFFFF&text=TEST",
            name: "OTPSA",
            description: "description",
            status: 1,
          }}
        />
        <Company
          props={{
            logo: "https://plchldr.co/i/200x200?&bg=000000&fc=FFFFFF&text=TEST",
            name: "AfAa",
            description: "description",
            status: 2,
          }}
        />
        <Company
          props={{
            logo: "https://plchldr.co/i/200x200?&bg=000000&fc=FFFFFF&text=TEST",
            name: "UIpO",
            description: "description",
            status: 3,
          }}
        />
      </div>

      <div className="col-span-12 md:col-span-6 flex items-center justify-center">
        <Image
          src="https://plchldr.co/i/200x200?&bg=000000&fc=FFFFFF&text=TEST"
          alt="Logo"
          width={100}
          height={100}
        />
      </div>
    </div>
  );
};
