import { Avatar } from "@chakra-ui/react";
import motaz from "../../assets/motaz.jpg";
import plestia from "../../assets/plestia.png";
import bisan from "../../assets/bisan.jpg";
import shaun from "../../assets/shaun.jpeg";
import saleh from "../../assets/saleh.png";
import eyeonpalestine from "../../assets/eyeonpalestine.jpeg";
import aljazeeraenglish from "../../assets/aljazeera.png";
import ali from "../../assets/ali.jpeg";

import Head from "next/head";
import Link from "next/link";

const News = () => {
  return (
    <>
      <Head>
        <link rel="preload" href={motaz.src} as="image" />
        <link rel="preload" href={plestia.src} as="image" />
        <link rel="preload" href={saleh.src} as="image" />
        <link rel="preload" href={bisan.src} as="image" />
        <link rel="preload" href={shaun.src} as="image" />
      </Head>

      <div className="w-full h-90-screen flex flex-col bg-app--light ">
        <div>
          <div className=" pl-5 pt-32 flex justify-start ">
            <div className="flex-col flex">
              <span className="font-semibold text-2xl text-white bg-green-600 p-1 rounded-md">
                Featured Creators
              </span>
              <span className="flex pt-2 font-semibold text-xl">
                On the ground in Gaza
              </span>
              <div className="grid grid-cols-1 grid-flow-col xs:grid-cols-4 space-x-4 -mt-4 ">
                <Link
                  href="https://www.instagram.com/wizard_bisan1/"
                  target="_blank"
                >
                  <div className="flex-col flex justify-center items-center hover:animate-pulse">
                    <Avatar
                      mt={10}
                      size={"2xl"}
                      src={plestia.src}
                      ring={"2px"}
                      ringColor={"facebook.400"}
                    />
                    <span className="flex-col flex justify-center text-xl font-semibold">
                      Plestia
                    </span>
                  </div>
                </Link>

                <Link
                  href="https://www.instagram.com/motaz_azaiza/"
                  target="_blank"
                >
                  <div className="flex-col flex justify-center items-center cursor-pointer hover:animate-pulse">
                    <Avatar
                      mt={10}
                      size={"2xl"}
                      src={motaz.src}
                      ring={"2px"}
                      ringColor={"facebook.400"}
                    />
                    <span className="flex-col flex justify-center text-xl font-semibold">
                      Motaz
                    </span>
                  </div>
                </Link>
                <Link
                  href="https://www.instagram.com/byplestia/"
                  target="_blank"
                >
                  <div className="flex-col flex justify-center items-center hover:animate-pulse">
                    <Avatar
                      mt={10}
                      size={"2xl"}
                      src={bisan.src}
                      ring={"2px"}
                      ringColor={"facebook.400"}
                    />
                    <span className="flex-col flex justify-center text-xl font-semibold">
                      Bisan
                    </span>
                  </div>
                </Link>
                <Link
                  href="https://www.instagram.com/alijadallah66/"
                  target="_blank"
                >
                  <div className="flex-col flex justify-center items-center hover:animate-pulse">
                    <Avatar
                      mt={10}
                      size={"2xl"}
                      src={ali.src}
                      ring={"2px"}
                      ringColor={"facebook.400"}
                    />
                    <span className="flex-col flex justify-center text-xl font-semibold">
                      Ali
                    </span>
                  </div>
                </Link>
                <Link
                  href="https://www.instagram.com/shaunking/"
                  target="_blank"
                >
                  <div className="flex-col flex justify-center items-center hover:animate-pulse">
                    <Avatar
                      mt={10}
                      size={"2xl"}
                      src={saleh.src}
                      ring={"2px"}
                      ringColor={"facebook.400"}
                    />
                    <span className="flex-col flex justify-center text-xl font-semibold">
                      Saleh
                    </span>
                  </div>
                </Link>
              </div>
              <span className="flex font-semibold text-xl  bg-red-400 rounded-md mt-4 pl-2">
                Global
              </span>
              <div className="grid grid-cols-3 grid-flow-col space-x-4 mt-4">
                <Link
                  href="https://www.instagram.com/eyeonpalestine/"
                  target="_blank"
                >
                  <div className="flex-col flex justify-center items-center hover:animate-pulse">
                    <Avatar
                      mt={10}
                      size={"2xl"}
                      src={eyeonpalestine.src}
                      ring={"2px"}
                      ringColor={"facebook.400"}
                    />
                    <span className="flex-col flex justify-center text-xl font-semibold">
                      Eye on Palestine
                    </span>
                  </div>
                </Link>

                <Link
                  href="https://www.instagram.com/shaunking/"
                  target="_blank"
                >
                  <div className="flex-col flex justify-center items-center hover:animate-pulse">
                    <Avatar
                      mt={10}
                      size={"2xl"}
                      src={shaun.src}
                      ring={"2px"}
                      ringColor={"facebook.400"}
                    />
                    <span className="flex-col flex justify-center text-xl font-semibold">
                      Shaun
                    </span>
                  </div>
                </Link>

                <Link
                  href="https://www.instagram.com/aljazeeraenglish/"
                  target="_blank"
                >
                  <div className="flex-col flex justify-center items-center hover:animate-pulse">
                    <Avatar
                      mt={10}
                      size={"2xl"}
                      src={aljazeeraenglish.src}
                      ring={"2px"}
                      ringColor={"facebook.400"}
                    />
                    <span className="flex-col flex justify-center text-xl font-semibold">
                      Aljazeera
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default News;
