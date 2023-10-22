"use client";
import React, { useState } from "react";
import Image from "next/image";
import app from "../../assets/app.svg";
import appStore from "../../assets/appstore.svg";
import playStore from "../../assets/playstore.svg";
import Header from "@/components/header";

export default function Download() {
  const appReleased = false; // delete once app is ready
  const [onHover, setOnHover] = useState(false);

  return (
    <>
      <Header />
      <div className="w-full min-h-screen flex flex-col justify-end items-center bg-app--light ">
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
            <div
              className="mt-8 ml-4 cursor-pointer"
              onMouseEnter={() => setOnHover(true)}
              onMouseLeave={() => setOnHover(false)}
            >
              <span
                className={`text-2xl ${
                  onHover && "bg-blue-200"
                } bg-yellow-200 p-2 rounded-lg pl-4 pr-4 ${
                  onHover && "animate-pulse"
                } shadow-lg border-black-600`}
              >
                Coming Soon{" "}
              </span>
              <div className={`${onHover && "sparkle-image"} ml-14`} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
