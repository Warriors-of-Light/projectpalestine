"use client";

import { Card } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { FcCancel } from "react-icons/fc";
import { FcAdvertising } from "react-icons/fc";
import { FcNews } from "react-icons/fc";
import { FcIdea } from "react-icons/fc";

const Home = () => {
  const router = useRouter();
  return (
    <div className="h-70-screen w-full flex flex-col-reverse md:flex-row items-center justify-center gap-6 mb-10  mt-40">
      <div className="bg-app-light flex flex-col justify-start content-start gap-4 p-8 m-8 ">
        <div className="w-full text-4xl font-black mb-10 flex-col flex text-center justify-center items-center ">
          A free palestine starts with you
          <span className="text-md text-center justify-center items-center animate-pulse mt-2">
            Join us in the fight for liberation, justice and real peace
          </span>
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 xs:grid-cols-2 gap-4 md:justify-center md: left-7 md:relative">
            <div
              className="flex flex-col cursor-pointer "
              onClick={() => router.push("/boycott")}
            >
              <Card
                w={150}
                h={150}
                p={4}
                marginRight={10}
                marginTop={10}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <FcCancel size={100} />
              </Card>
              <span className="lg:mr-10 md:mr-10 xs:mr-2 mt-2">
                Boycott & Dinvestment
              </span>
            </div>
            <div className="flex flex-col ">
              <Card
                w={150}
                h={150}
                p={4}
                marginRight={10}
                marginTop={10}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <FcAdvertising size={100} />
              </Card>
              <span className="lg:mr-10 md:mr-10 xs:mr-2 mt-2">
                Demonstrations
              </span>
            </div>
            <div
              className="flex flex-col cursor-pointer"
              onClick={() => router.push("/news")}
            >
              <Card
                w={150}
                h={150}
                p={4}
                marginRight={10}
                marginTop={10}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <FcNews size={100} />
              </Card>
              <span className="lg:mr-10 md:mr-10 xs:mr-2 mt-2">News</span>
            </div>
            <div className="flex flex-col ">
              <Card
                w={150}
                h={150}
                p={4}
                marginRight={10}
                marginTop={10}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <FcIdea size={100} />
              </Card>
              <span className="lg:mr-10 md:mr-10 xs:mr-2 mt-2">Education</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
