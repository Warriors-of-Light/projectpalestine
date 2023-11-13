"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CompanyCard } from "./modules";

import { collection, getFirestore, getDocs } from "firebase/firestore";
import { firebase_app } from "../firebase/config";
import { Company } from "@/constants";
import { Spinner } from "@chakra-ui/react";
import SearchBar from "./common/searchbar";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useCompaniesStore } from "@/store/useCompaniesStore";
import Link from "next/link";
import { useUserStore } from "@/store/useUserStore";
import { getAuth } from "firebase/auth";
import { useSubmittedCompaniesStore } from "@/store/useSubmittedCompaniesStore";

export default function Hero() {

  // Initialize
  const [companies, setCompanies] = useState<Array<Company>>([]);
  const [filteredResults, setFilteredResults] = useState<Array<string>>([]);
  // const firstFiveCompanies = useRef<Array<Company>>();
  const searchableContent = useRef([""]);
  const { setCompaniesMap } = useCompaniesStore();
  const { setSubmittedCompaniesMap } = useSubmittedCompaniesStore();
  const { user } = useUserStore();

  // Function
  const onSearch = useCallback(
    (filteredResults: string[] | undefined) => {
      if (filteredResults![0] === "No Results") {
        setFilteredResults([]);
      } else {
        setFilteredResults(
          filteredResults && filteredResults?.length > 0
            ? filteredResults
            : [...companies.map((x) => x.name)].splice(0, 5)
        );
      }
    },
    [companies]
  );
  const downloadLogo = useCallback(async (logoLocation: string) => {
    if (logoLocation === undefined) return;
    const storage = getStorage(firebase_app);
    const fileRef = ref(storage, `logos/${logoLocation}`);
    try {
      const url = await getDownloadURL(fileRef);
      return url;
    } catch (error) {
      console.error("Error downloading logo:", error);
      return "";
    }
  }, []);
  const retrieveData = useCallback(async () => {
    const db = getFirestore(firebase_app);
    const array: Array<Company> = [];
    const array2: Array<Company> = [];
    const querySnapshot = await getDocs(collection(db, "Companies"));
    const querySnapshot2 = await getDocs(collection(db, "SubmittedCompanies"));

    const downloadPromises = querySnapshot.docs.map(async (doc) => {
      const data = doc.data();
      const url = await downloadLogo(data.logo);

      return {
        companyId: doc.id,
        description: data.description,
        name: data.name,
        logo: url ?? "",
        tags: data.tags,
        rating: data.rating,
        incidents: data.incidents ?? [],
      };
    });
    array.push(...(await Promise.all(downloadPromises)));

    const downloadPromises2 = querySnapshot2.docs.map(async (doc) => {
      const data = doc.data();
      const url = await downloadLogo(data.logo);

      return {
        companyId: doc.id,
        description: data.description,
        name: data.name,
        logo: url ?? "",
        tags: data.tags,
        rating: data.rating,
        incidents: data.incidents ?? [],
      };
    });
    array2.push(...(await Promise.all(downloadPromises2)));

    if (array.length > 0) {
      const companiesMap = new Map<string, Company>();
      array.forEach((x) => {
        companiesMap.set(x.companyId, x);
        searchableContent.current.push(x.name);
      });
      setCompaniesMap(companiesMap); // storing list of companies in the store
    }

    if (array2.length > 0) {
      const companiesMap2 = new Map<string, Company>();
      array2.forEach((x) => {
        companiesMap2.set(x.companyId, x);
      });
      setSubmittedCompaniesMap(companiesMap2);
    }

    setFilteredResults(array.map((x) => x.name).splice(0, 5));
    setCompanies(array);
  }, [downloadLogo, setCompaniesMap, setSubmittedCompaniesMap]);

  useEffect(() => {
    if (companies.length === 0) {
      retrieveData();
    }
  }, [companies, retrieveData]);

  return (
    <div className="main see">

      <div className="center flex-col gap-8">

        {/* BIG TITLE */}
        <BigTitle />
        <SearchBar
          label="Search products or companies"
          onSearch={onSearch}
          placeholder="Search here..."
          searchableContent={searchableContent.current}
        />

      </div>

    </div>
  );
};


const BigTitle = () => {
  return (
    <div className="text-2xl md:text-4xl title">
      A way for us to boycott the genocide and its supporters
    </div>
  )
}