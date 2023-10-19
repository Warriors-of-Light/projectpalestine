"use client";

import Image from "next/image";
import React, {
  useCallback,
  useEffect,
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
  return (
    <div className="bg-app--light h-full w-full flex flex-col-reverse md:flex-row items-center justify-center">
      <SearchBarSection />
      <MobileVersionSection />
    </div>
  );
};

const SearchBarSection = () => {

  // Initialize
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

  // Handle searching event
  const searching = (e: any) => {
    const searchingText = e.value;
  };

  return (

    <div className="bg-app-light md:w-1/2 w-full h-full flex flex-col justify-center content-end gap-10 p-4 md:p-6">

      <div className="w-full text-4xl font-black">
        A way for us to boycott the occupation and it’s supporters
      </div>

      <div className="relative w-full center">
        <div className="bg-app-light absolute left-0 top-0 -translate-y-1/2 w-fit text-2 z-50 px-2">
          Search a product or company
        </div>
        <input
          className="app-input"
          type="text"
          placeholder="..."
          onChange={searching}
        />
        <Icon type="search" style="absolute right-0 mr-2" />
      </div>

      <div className="min-h-[100px] w-full flex flex-col items-center justify-center gap-4">
        {
          companies.length
            ? companies.map((company, index) => <CompanyCard company={company} key={index} />)
            : <Spinner />
        }
      </div>

    </div>

  )

}

const MobileVersionSection = () => {

  return (

    <div className="md:w-1/2 w-full h-full center flex-col">

      <Image src={app} alt="Logo" width={250} height={350} />

      <div className="center">
        <Image
          className="cursor-pointer"
          src={playStore}
          alt={"Google Play"}
        />
        <Image
          className="cursor-pointer"
          src={appStore}
          alt={"App Store"}
        />
      </div>

    </div>

  )

}

export default Hero;
