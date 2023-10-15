<<<<<<< Updated upstream
import Header from "@/components/header";
import Image from "next/image";
import Link from "next/link";
=======
import Link from 'next/link'
import { Icon, Company } from '@/components/modules'
import Image from 'next/image'
>>>>>>> Stashed changes

export default function Home() {
  return (
    <main className="bg-app-light flex flex-col items-center justify-start h-screen w-screen gap-4">
      <Header />
      <Hero />
    </main>
<<<<<<< Updated upstream
  );
=======

  )

}

const Header = () => {

  return (

    <header className="bg-app-light text-app-dark flex justify-between items-center w-full fixed p-2">

      <div className="text-2">Palestine</div>

      <div className="flex items-center gap-2">
        <Link className="app-btn" href="/">
          <Icon type="download" />
          Download
        </Link>
        <Link className="app-btn" href="/">
          <Icon type="about" />
          About
        </Link>
        <Link className="app-btn" href="/">
          <Icon type="contact" />
          Contact
        </Link>
        <Link className="app-btn" href="/">
          <Icon type="donate" />
          Donate
        </Link>
      </div>

    </header>

  )

>>>>>>> Stashed changes
}

const Hero = () => {
  return (
<<<<<<< Updated upstream
    <div className="bg-app-primary grid grid-cols-12 items-center justify-center w-full h-full gap-4 mt-32">
      <div className="col-span-12 md:col-span-6 flex flex-col items-center">
        <div className="w-full text">
=======

    <div className="grid grid-cols-12 items-start h-full w-full gap-4 p-4 mt-20">

      <div className="text-app-dark col-span-12 md:col-span-6 flex flex-col items-center gap-2">

        <div className="w-full text-1">
>>>>>>> Stashed changes
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula,
          ante eu cursus tincidunt, justo libero consequat tortor, at
          pellentesque erat velit nec libero. Vivamus vel nulla eu justo auctor
          laoreet.
        </div>
<<<<<<< Updated upstream
        <div className="w-full text-3">Search a product or company</div>
        <div className="w-full text-3">
          <input className="w-full" type="text" />
        </div>
      </div>

      <div className="col-span-12 md:col-span-6 flex items-center justify-center"></div>
    </div>
  );
};
=======

        <div className="w-full text-3">
          Search a product or company
        </div>

        <div className="w-full relative center">
          <input className="app-input" type="text" placeholder='Product or company name...' />
          <button className="app-btn p-2">
            <Icon type="search" />
            search
          </button>
        </div>

        <Company props={{
          logo: "https://plchldr.co/i/200x200?&bg=000000&fc=FFFFFF&text=TEST",
          name: "OTPSA",
          description: "description",
          status: 1
        }} />
        <Company props={{
          logo: "https://plchldr.co/i/200x200?&bg=000000&fc=FFFFFF&text=TEST",
          name: "AfAa",
          description: "description",
          status: 2
        }} />
        <Company props={{
          logo: "https://plchldr.co/i/200x200?&bg=000000&fc=FFFFFF&text=TEST",
          name: "UIpO",
          description: "description",
          status: 3
        }} />

      </div>

      <div className="col-span-12 md:col-span-6 flex items-center justify-center">
        <Image src="https://plchldr.co/i/200x200?&bg=000000&fc=FFFFFF&text=TEST" alt="Logo" width={100} height={100} />
      </div>

    </div>

  )

}
>>>>>>> Stashed changes
