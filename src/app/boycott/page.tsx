"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import { collection, getFirestore, getDocs } from "firebase/firestore";
import { Company } from "@/constants";
import { Spinner, chakra } from "@chakra-ui/react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useCompaniesStore } from "@/store/useCompaniesStore";
import Link from "next/link";
import { useUserStore } from "@/store/useUserStore";
import { useSubmittedCompaniesStore } from "@/store/useSubmittedCompaniesStore";
import { IoIosWarning } from "react-icons/io";
import { firebase_app } from "@/firebase/config";
import SearchBar from "@/components/common/searchbar";
import { CompanyCard } from "@/components/modules";
import { Text } from "@chakra-ui/react";

const Boycott = () => {
  const [companies, setCompanies] = useState<Array<Company>>([]);
  const [filteredResults, setFilteredResults] = useState<Array<string>>([]);
  const searchableContent = useRef([""]);
  const { setCompaniesMap } = useCompaniesStore();
  const { setSubmittedCompaniesMap } = useSubmittedCompaniesStore();
  const { user } = useUserStore();

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
    <main className="app-page-container border min-h-full">
      <div className="h-full w-full flex flex-col-reverse md:flex-row items-center justify-center gap-6 mb-10  mt-40">
        <div className="bg-app-light flex flex-col justify-start content-start gap-4 p-8">
          <div className="w-full text-4xl font-black">
            Boycott the genocide and its supporters
          </div>
          <span className="mb-4">
            <div className="flex flex-row items-center">
              <Text color={"yellow.400"} stroke={"black"}>
                <IoIosWarning size={20} />
              </Text>
              Note: Our tool is still a work in progress, check out Witness for
              a better compiled list
              <Link
                className="ml-1 text-blue-600 underline"
                href="https://boycott.thewitness.news/browse/1"
                target="_blank"
              >
                {" "}
                here{" "}
              </Link>
            </div>
          </span>
          <SearchBar
            label="Search products or companies"
            onSearch={onSearch}
            placeholder="Search here"
            searchableContent={searchableContent.current}
          />
          {companies.length === 0 ? (
            <Spinner />
          ) : (
            companies.map((company, index) => {
              return (
                filteredResults.includes(company.name) && (
                  <CompanyCard key={index} company={company} />
                )
              );
            })
          )}
          {filteredResults.length === 0 && (
            <span className="flex justify-center text-lg mb-20">
              No Results Found
            </span>
          )}
          <div className="flex justify-center w-full">
            <Link href="/companies">
              <span className="hover:text-green-500 text-md">
                See all companies
              </span>
            </Link>
          </div>
          <div className="flex justify-center w-full">
            <Link href={user ? "/addcompany" : "/login"}>
              <button className="app-btn bg-green-500 text-white w-40">
                Add Company
              </button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Boycott;
