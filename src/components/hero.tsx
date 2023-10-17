"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import app from "../assets/app.svg";
import { Company, Icon } from "./modules";
import appStore from "../assets/appstore.svg";
import playStore from "../assets/playstore.svg";
import {
  collection,
  getFirestore,
  doc,
  setDoc,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import firebase_app from "./firebase/config";

const Hero = () => {

  // Testing Data
  // type dataType = {
  //   logo: string;
  //   name: string;
  //   description: string;
  //   status: 1 | 2 | 3;
  // };
  // const data: dataType[] = [
  //   {
  //     logo: "https://img.icons8.com/color/100/mcdonalds-app.png",
  //     name: "mcdonalds",
  //     description: "company",
  //     status: 3,
  //   },
  //   {
  //     logo: "https://img.icons8.com/ios-filled/100/mac-os.png",
  //     name: "apple",
  //     description: "company",
  //     status: 2,
  //   },
  //   {
  //     logo: "https://img.icons8.com/color/100/coca-cola.png",
  //     name: "coca cola",
  //     description: "company",
  //     status: 1,
  //   },
  // ];

  const retrieveOnce = useRef(0);

  const companies: Array<dataType> = useMemo(() => {
    return [];
  }, []);

  const retrieveData = useCallback(async () => {
    const db = getFirestore(firebase_app);
    // const CompaniesRef = collection(db, 'Companies');

    const querySnapshot = await getDocs(collection(db, "Companies"));
    querySnapshot.forEach((doc) => {
      alert(JSON.stringify(doc.data()));
      companies.push({
        description: doc.data().description,
        name: doc.data().name,
        logo: doc.data().logo,
        status: doc.data().score,
      });
    });
  }, [companies]);

  useEffect(() => {
    if (retrieveOnce.current < 3) {
      retrieveData();
      retrieveOnce.current++;
    }
  }, [companies, retrieveData]);

  const searching = (e: HTMLInputElement) => {
    const searchingText = e.value;
  };

  return (
    <div className="h-full w-full flex flex-col-reverse md:flex-row items-center justify-center gap-6">

      <div className="bg-app-light app-container w-full md:w-1/2 flex flex-col justify-center content-end gap-4 p-8">
        <div className="w-full text-4xl font-black mb-10">
          A way for us to boycott the occupation and it’s supporters
        </div>
        <div className="w-full relative center">
          <div className="bg-app-light absolute left-0 top-0 -translate-y-1/2 w-fit text-3 z-50 px-2">
            Search a product or company
          </div>
          <input
            className="app-input"
            type="text"
            placeholder=".."
            onChange={() => searching}
          />
          <Icon type="search" style="absolute right-0 mr-2" />
        </div>

        {companies.map((company, index) => {
          return (
            <Company
              key={index}
              props={{
                name: company.name,
                description: company.description,
                logo: company.logo,
                status: company.status,
              }}
            />
          );
        })}
      </div>

      <div className="h-full w-full md:w-1/2 center flex-col">
        <Image src={app} alt="Logo" width={300} height={300} />
        <div className="center">
          <Image
            alt={"Google Play button"}
            src={playStore}
            className=" cursor-pointer"
          />
          <Image
            alt={"App Store button"}
            src={appStore}
            className=" cursor-pointer"
          />
        </div>
      </div>

    </div>
  );
};

export default Hero;
