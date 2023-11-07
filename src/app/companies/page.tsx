"use client";
import CompanyDisplay from "@/components/common/companyDisplay";
import SearchBar from "@/components/common/searchbar";
import Header from "@/components/common/header";
import { useCompaniesStore } from "@/store/useCompaniesStore";
import { HStack, Link, Stack } from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import { useSubmittedCompaniesStore } from "@/store/useSubmittedCompaniesStore";

export default function Companies() {
  const [filteredResults, setFilteredResults] = useState<Array<string>>([]);
  // const searchableContent = useRef([""]);
  const [displaySubmittedCompanies, setDisplaySubmittedCompanies] =
    useState(false);
  const { companiesMap } = useCompaniesStore();
  const { submittedCompaniesMap } = useSubmittedCompaniesStore();

  const [companies, setCompanies] = useState<Array<string>>(
    companiesMap instanceof Map
      ? Array.from(companiesMap.values(), (company) => company.name)
      : [""]
  );

  const companiesArray = Array.from(
    companiesMap.values(),
    (company) => company
  );

  const submittedCompaniesArray =
    submittedCompaniesMap.size > 0
      ? Array.from(submittedCompaniesMap.values(), (company) => company)
      : [];

  const [selectedLetter, setSelectedLetter] = useState("All");
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
      if (filteredResults![0] === "No Results") return [];
      setFilteredResults(filteredResults ?? [...companies.map((x) => x)]);
    },
    [companies]
  );

  return (
    <main className="bg-app-light flex flex-1 flex-col items-center justify-start h-full w-screen gap-4 min-h-screen">
      <div>
        <Header />
      </div>

      <div className="lg:w-500 mt-24">
        {/* <SearchBar
          label="Search companies"
          onSearch={onSearch}
          placeholder="Search here"
          searchableContent={searchableContent.current}
        /> */}
      </div>
      <div className="flex mt-4 min-w-fit pl-20 pr-20 ">
        <Link>
          <span
            className={`${selectedLetter === "All" && "text-green-600"}`}
            onClick={() => setSelectedLetter("All")}
          >
            All
          </span>
        </Link>
        <Stack>
          <HStack>
            {charArray.slice(0, 14).map((char, index) => (
              <Link
                key={index}
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
            ))}
          </HStack>
          <HStack>
            {charArray.slice(14, 27).map((char, index) => (
              <Link
                key={index}
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
            ))}
          </HStack>
        </Stack>
      </div>
      <div className="grid grid-cols-5 w-full p-20 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 ">
        {companiesArray
          .filter((company) =>
            selectedLetter === "All"
              ? true
              : company.name.toUpperCase()[0] === selectedLetter
          )
          .map((c, index) => (
            <div
              key={index}
              className="lg:w-1500 mb-10 max-h-96 min-h-max md:w-1000"
            >
              <CompanyDisplay
                id={c.companyId}
                name={c.name}
                src={c.logo}
                tags={c.tags}
                description={c.description}
              />
            </div>
          ))}
      </div>
      <span className="text-xl text-black"> Submitted Companies </span>
      <div
        className="w-5 cursor-pointer pb-20"
        onClick={() => setDisplaySubmittedCompanies((prev) => !prev)}
      >
        {displaySubmittedCompanies ? <ArrowDownIcon /> : <ArrowUpIcon />}
      </div>
      {displaySubmittedCompanies && (
        <div className="grid grid-cols-5 w-full p-20 xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 ">
          {submittedCompaniesArray
            ?.filter((company) =>
              selectedLetter === "All"
                ? true
                : company.name.toUpperCase()[0] === selectedLetter
            )
            .map((c, index) => (
              <div
                key={index}
                className="lg:w-1500 mb-10 max-h-96 min-h-max md:w-1000"
              >
                <CompanyDisplay
                  id={c.companyId}
                  name={c.name}
                  src={c.logo}
                  tags={c.tags}
                  description={c.description}
                />
              </div>
            ))}
        </div>
      )}
    </main>
  );
}
