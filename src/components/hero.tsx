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

const Hero = () => {
  const [companies, setCompanies] = useState<Array<Company>>([]);
  const [filteredResults, setFilteredResults] = useState<Array<string>>([]);
  const firstFiveCompanies = useRef<Array<Company>>();
  const { setCompaniesDic } = useCompaniesStore();

  const companiesIDs: Array<string> = useMemo(() => {
    return [];
  }, []);

  const onSearch = useCallback((filteredResults: string[] | undefined) => {
    setFilteredResults(filteredResults ?? [...filteredResults!]);
  }, []);

  const downloadLogo = useCallback(async (logoLocation: string) => {
    const storage = getStorage(firebase_app);
    const fileRef = ref(storage, `logos/${logoLocation}`);
    const url = await getDownloadURL(fileRef);
    return url;
  }, []);

  const retrieveData = useCallback(async () => {
    const db = getFirestore(firebase_app);
    const array: Array<Company> = [];
    const querySnapshot = await getDocs(collection(db, "Companies"));

    const downloadPromises = querySnapshot.docs.map(async (doc) => {
      const data = doc.data();
      const url = await downloadLogo(data.logo);

      return {
        companyId: doc.id,
        description: data.description,
        name: data.name,
        logo: url,
        rating: data.rating,
        claims: [],
      };
    });

    array.push(...(await Promise.all(downloadPromises)));
    const ids = array.map((x) => x.companyId);
    companiesIDs.push(...ids);

    if (array.length > 0) {
      const companiesDic: { [key: string]: Company } = {};
      array.forEach((company) => (companiesDic[company.companyId] = company));
      setCompaniesDic(companiesDic); // storing list of companies in the store
    }
    firstFiveCompanies.current = array.splice(0, 5);
    setCompanies(firstFiveCompanies.current);
  }, [companiesIDs, downloadLogo, setCompaniesDic]);

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
      
      <div className="bg-app-light flex flex-col justify-start content-start gap-4 p-8">
        <div className="w-full text-4xl font-black mb-10">
          A way for us to boycott the genocide and it’s supporters
        </div>
        <SearchBar
          label="Search products or companies"
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

      {/* Mobile Version */}
    </div>
  );
};

export default Hero;
