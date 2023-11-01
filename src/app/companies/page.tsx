"use client";
import CompanyCards from "@/components/common/companyCard";
import SearchBar from "@/components/common/searchbar";
import Header from "@/components/header";
import { Company } from "@/constants";
import { useCompaniesStore } from "@/store/useCompaniesStore";
import { HStack, Link } from "@chakra-ui/react";
import { useCallback, useMemo, useRef, useState } from "react";

export default function Companies() {
  const [filteredResults, setFilteredResults] = useState<Array<string>>([]);
  const searchableContent = useRef([""]);
  const { companiesMap } = useCompaniesStore();
  const [companies, setCompanies] = useState<Array<string>>(
    companiesMap instanceof Map
      ? Array.from(companiesMap.values(), (company) => company.name)
      : [""]
  );

  const [selectedLetter, setSelectedLetter] = useState("A");
  const charArray = useMemo(() => {
    const chars = [];
    for (let charCode = 65; charCode <= 90; charCode++) {
      const char = String.fromCharCode(charCode);
      chars.push(char);
    }
    return chars;
  }, []);

  const onSearch = useCallback(
    (filteredResults: string[] | undefined) => {
      if(filteredResults![0] === 'No Results') return []
      setFilteredResults(filteredResults ?? [...companies.map((x) => x)]);
    },
    [companies]
  );

  return (
    <main className="bg-app-light flex flex-1 flex-col items-center justify-start h-screen w-screen gap-4">
      <div>
        <Header />
      </div>

      <div className="lg:w-500 mt-24">
        <SearchBar
          label="Search companies"
          onSearch={onSearch}
          placeholder="Search here"
          searchableContent={searchableContent.current}
        />
      </div>
      <div className="flex mt-4">
        {charArray.map((char, index) => (
          <HStack key={index}>
            <Link
              ml={5}
              onClick={() => {
                setSelectedLetter(char);
              }}
            >
              <span
                className={`${selectedLetter === char && "text-green-600"}`}
              >
                {char}
              </span>
            </Link>
          </HStack>
        ))}
      </div>
      <CompanyCards />
    </main>
  );
}
