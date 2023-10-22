import React from "react";
import Image from "next/image";
import app from "../../assets/app.svg";
import appStore from "../../assets/appstore.svg";
import playStore from "../../assets/playstore.svg";
import Header from "@/components/header";

export default function Download() {
  const appReleased = false; // delete once app is ready
  return (
    <>
      <Header />
      <div className="w-full min-h-screen flex flex-col justify-end items-center bg-app-light ">
        <div className="h-full w-full md:w-1/2 center flex-col xs:h-900">
          <Image
            src={app}
            alt="Logo"
            width={300}
            height={300}
            className="lg:mt-0 md:mt-0 xs:flex xs:mt-96"
          />
          {appReleased ? (
            <div className="center">
              <Image
                alt={"Google Play button"}
                src={playStore}
                className="cursor-pointer"
              />
              <Image
                alt={"App Store button"}
                src={appStore}
                className="cursor-pointer"
              />
            </div>
          ) : (
            <div className="sparkle-image mt-8">
              <div className="sparkle-image ml-14 " />
              <span className="text-2xl  bg-yellow-200 p-2 rounded-full pl-4 pr-4 animate-pulse shadow-lg border-black-600">
                Coming Soon{" "}
              </span>
              <div className="sparkle-image ml-14" />
              <div className="sparkle-image flex mb-4 ml-4 p-2" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
