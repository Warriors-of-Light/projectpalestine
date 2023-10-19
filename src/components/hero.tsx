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
import { CompanyCard } from "./modules";
import appStore from "../assets/appstore.svg";
import playStore from "../assets/playstore.svg";
import { collection, getFirestore, getDocs } from "firebase/firestore";
import firebase_app from "./firebase/config";
import { Company } from "@/constants";
import { Spinner } from "@chakra-ui/react";
import SearchBar from "./common/searchbar";

const Hero = () => {
  const [companies, setCompanies] = useState<Array<Company>>([]);
  const [filteredResults, setFilteredResults] = useState<Array<string>>([]);

  const companiesIDs: Array<string> = useMemo(() => {
    return [];
  }, []);

  const onSearch = useCallback((filteredResults: string[] | undefined) => {
    setFilteredResults(filteredResults ?? [...filteredResults!]);
  }, []);

  const retrieveData = useCallback(async () => {
    const db = getFirestore(firebase_app);

    await getDocs(collection(db, "Companies")).then((querySnapshot) => {
      const array: Array<Company> = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        array.push({
          companyId: doc.id,
          description: data.description,
          name: data.name,
          logo: data.logo,
          rating: data.rating,
          claims: [],
        });
      });
      const ids = array.map((x) => x.companyId);
      companiesIDs.push(...ids);
      setCompanies(array);
    });
  }, [companiesIDs]);

  useEffect(() => {
    if (companies.length === 0) {
      retrieveData();
    }
  }, [companies, retrieveData]);

  useEffect(() => {
    if (companiesIDs !== filteredResults) {
      companiesIDs.length = 0;
      companiesIDs.push(...filteredResults);
      setCompanies((prev) =>
        prev.filter((company) => filteredResults.includes(company.companyId))
      );
    }
  }, [companiesIDs, filteredResults]);

  return (
    <div className="h-full w-full flex flex-col-reverse md:flex-row items-center justify-center gap-6">
      <div className="bg-app-light app-container w-full md:w-1/2 flex flex-col justify-center content-end gap-4 p-8">
        <div className="w-full text-4xl font-black mb-10">
          A way for us to boycott the occupation and it’s supporters
        </div>
        <SearchBar
          label="Search a product or a company"
          onSearch={onSearch}
          placeholder="Search here"
          searchableContent={companiesIDs}
        />

        {companies.length === 0 ? (
          <Spinner />
        ) : (
          companies.map((company, index) => {
            return <CompanyCard key={index} company={company} />;
          })
        )}
      </div>

      <div className="h-full w-full md:w-1/2 center flex-col xs:h-900">
        <Image
          src={app}
          alt="Logo"
          width={300}
          height={300}
          className="lg:mt-0 md:mt-0 xs:flex xs:mt-96"
        />
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
