"use client";

import Image from "next/image";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import app from "../assets/app.svg";
import { CompanyCard, Icon } from "./modules";
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
import { Company } from "@/constants";
import { Spinner } from "@chakra-ui/react";

const Hero = () => {
  const retrieveOnce = useRef(0);
  const [companies, setCompanies] = useState<Array<Company>>([]);

  const retrieveData = useCallback(async () => {
    const db = getFirestore(firebase_app);
    // const CompaniesRef = collection(db, 'Companies');

    await getDocs(collection(db, "Companies")).then((querySnapshot) => {
      const array: Array<Company> = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        array.push({
          companyId: data.id,
          description: data.description,
          name: data.name,
          logo: data.logo,
          rating: data.rating,
          claims: [],
        });
      });
      setCompanies(array);
    });
  }, []);

  useEffect(() => {
    if (companies.length === 0) {
      retrieveData();
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

        {companies.length === 0 ? (
          <Spinner />
        ) : (
          companies.map((company, index) => {
            return <CompanyCard key={index} company={company} />;
          })
        )}
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
