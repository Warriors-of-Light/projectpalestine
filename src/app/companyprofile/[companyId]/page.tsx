/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/modules";
import Status from "@/components/company/status";
import { Incident, Alternative, Company, WORLD_COUNTRIES } from "@/constants";
import { Spinner } from "@chakra-ui/spinner";
import ClaimTable from "@/components/common/claimTable";
import { useCompaniesStore } from "@/store/useCompaniesStore";
import Custom404 from "@/app/not-found";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { firebase_app } from "@/firebase/config";
import { useUserStore } from "@/store/useUserStore";
import { Divider, HStack, Stack } from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid";
//import { getAlternativesForCountry } from '@/helpers';
import { Avatar } from "@chakra-ui/react";

interface ICompanyProfileProps {
  params: { companyId: string };
}

export default function CompanyProfile({ params }: ICompanyProfileProps) {
  const router = useRouter();
  const { companiesMap } = useCompaniesStore();
  const initialize = useRef(0);
  const [incidents, setIncidents] = useState<Array<Incident>>();
  const [displayPendingClaims, setDisplayPendingClaims] = useState(false);
  const [submittedIncidents, setSubmittedIncidents] = useState<Array<Incident>>();

  // Alternatives
  const [selectedCountry, setSelectedCountry] = useState(""); //next step: make it according to API adress
  const [countryInput, setCountryInput] = useState(""); 
  const [displayedCountries, setDisplayedCountries] = useState(WORLD_COUNTRIES);
  const [isCountriesListVisible, setIsCountriesListVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [alternatives, setAlternatives] = useState<Array<Company>>([]); //need to modify this according to the type of alternatives
  const [visibleAlternatives, setVisibleAlternatives] = useState<Array<Company>>([]);
  const [startIndex, setStartIndex] = useState(0);
  //const alternatives = [{name: 'alt1', logo: 'alt1', country: 'Egypt'}, {name: 'Abo Ramy', logo: 'alt1', country: 'Egypt'}, {name: 'alt2', logo: 'alt2', country: 'Egypt'}, {name: 'alt3', logo: 'alt3', country: 'Egypt'}];
  //let visibleAlternatives = [{name: 'Abo Ramy', logo: 'alt1', country: 'Egypt'}];
  const { user } = useUserStore();

  const company = companiesMap!.get(params.companyId);


  const retrieveIncidents = useCallback(async () => {
    const db = getFirestore(firebase_app);
    const companyRef = doc(db, "Companies", params.companyId);
    const companyDoc = await getDoc(companyRef);
    const incidents = companyDoc?.data()?.incidents;
    const submittedIncidents = companyDoc?.data()?.submittedIncidents;
    // const alternatives = companyDoc?.data()?.alternatives;  // HAVEN'T ADDED ALTERNATIVES TO DB YET
    // const filteredAlternatives = getAlternativesForCountry(alternatives, selectedCountry);

    setIncidents(incidents);
    setSubmittedIncidents(submittedIncidents);
    if (!submittedIncidents) {
      setDisplayPendingClaims(true);
    }

    // Iterate over companiesMap and append the values to alternatives array
    const alternativesArray: Array<Company> = [];
    companiesMap.forEach((company) => {
      alternativesArray.push(company);
    });

    setAlternatives(alternativesArray);
    setVisibleAlternatives(alternativesArray.slice(startIndex, startIndex + 3));

  }, [params.companyId]);

  useEffect(() => {
    // will happen once on mount
    if (initialize.current === 0) {
      retrieveIncidents();
      initialize.current++;
    }
  }, [retrieveIncidents]);

    // Handle the right arrow click
  const handleNextAlternatives = () => {
    const newStartIndex = startIndex + 3;
    if (newStartIndex < alternatives!.length) {
      setStartIndex(newStartIndex);
      //visibleAlternatives = alternatives!.slice(newStartIndex, newStartIndex + 3);
      setVisibleAlternatives(alternatives!.slice(newStartIndex, newStartIndex + 3));
    }
  };

  const handlePrevAlternatives = () => {
    const newStartIndex = Math.max(0, startIndex - 3);
    setStartIndex(newStartIndex);
    setVisibleAlternatives(alternatives!.slice(newStartIndex, newStartIndex + 3));
  };
  


  const filterCountriesList = (val: string) => {
    const value = val.toLowerCase();
    setSelectedCountry(value);

    const filteredCountries = WORLD_COUNTRIES.filter(country =>
      country.toLowerCase().includes(value)
    );
    setDisplayedCountries(filteredCountries);
  };  


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsCountriesListVisible(false);
      }
    };
  
    document.addEventListener('click', handleClickOutside);
  
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [inputRef, setIsCountriesListVisible]);

  const additionalInd = alternatives!.length % 3;
  
  

  return company === null ? (
    <Custom404 />
  ) : (
    <main className="bg-app-light flex flex-1 flex-col items-center justify-start h-screen w-screen gap-4">
      <div className="flex items-center justify-center w-full h-full">
        {company === undefined && <Spinner />}
      </div>
      {company && (
        <div className="layer animate-topdown">
          <div className="app-container flex flex-col items-center justify-center gap-4 p-4">
            {/* Logo & Name & description */}
            <div className="w-full flex absolute left-10 top-10 items-center">
              <div className="center">
                <img src={company?.logo} alt="Logo" width={100} height={100} />
                <div className="flex flex-col">
                  <span className="text-3 title capitalize text-4xl">
                    {company?.name}
                  </span>
                  <span className="text capitalize">
                    {company?.description}
                  </span>
                  <span className="text capitalize">{company?.website}</span>
                </div>
              </div>

              {/* Status */}
              <div className="flex w-1/2 pr-12 justify-center">
                <Status status={company?.rating!} />
              </div>
            </div>

            {/* History */}
            <div className="absolute left-14 h-full mt-300 lg:w-1000 md:w-full xs:w-full">
              <Stack>
                <ClaimTable
                  companyId={company.companyId}
                  incidents={incidents!}
                  displayClaimButton={false}
                />

                <Divider />
                <HStack>
                  <span className="flex text-xl relative ">Pending Claims</span>
                  <div
                    className="w-5 cursor-pointer"
                    onClick={() => setDisplayPendingClaims((prev) => !prev)}
                  >
                    {displayPendingClaims ? <ArrowDownIcon /> : <ArrowUpIcon />}
                  </div>
                </HStack>
                {displayPendingClaims && (
                  <ClaimTable
                    companyId={company.companyId}
                    incidents={submittedIncidents!}
                    displayClaimButton={true}
                  />
                )}
              </Stack>
            </div>

            {/*Alternatives*/}
            <div className="absolute top-8 right-4 mr-4 p-6 flex flex-col items-center">
              <label className="text-xl ml-2 font-bold">Alternatives</label>
              <div className="bg-white rounded-md h-300 shadow-md p-10 mt-2 relative">
                <div className="flex flex-row items-center space-x-4">
                  <label className="text-base font-bold mr-2">Country</label>
                  <div className="relative flex flex-col">
                    <div ref={inputRef} className="flex mt-2">
                      <input
                        className="relative rounded-md py-1.5 pl-3 pr-10 ring-1 placeholder:italic placeholder:text-slate-400 focus:border-green-500 focus:ring-green-300 focus:ring-1  ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                        type="text"
                        placeholder="Enter country"
                        value={countryInput}
                        onFocus={() => setIsCountriesListVisible(true)}
                        onChange={(e) => {
                          setCountryInput(e.target.value);
                          filterCountriesList(e.target.value);
                        }}
                      /> 
                    </div>
                    <div>
                        {isCountriesListVisible && ( // Conditionally render the list based on visibility state
                          <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {displayedCountries.map((country, index) => (
                              <li
                                key={index}
                                className="text-gray-900 relative cursor-pointer select-none py-2 pl-3 pr-9 transition duration-300 hover:bg-gray-100"
                                onClick={() => {
                                  setSelectedCountry(country);
                                  setCountryInput(country);
                                  filterCountriesList(country);
                                  setIsCountriesListVisible(false); // Hide the list when an option is clicked
                                  //next step: to filter the visible alternatives list according to the selected country
                                }}
                              >
                                <span className="font-normal ml-3 block truncate">{country}</span>

                                {/* {selectedCountry === country && ( // Display the checkmark only for the selected country
                                  <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="green">
                                      <path d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"/>
                                    </svg>
                                  </span>
                                )} */}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                  </div>

                </div>


                <div className="mt-4">
                  {visibleAlternatives!.length === 0 ? (
                    <p>There are no alternatives yet.</p>
                  ) : (
                    <div className="justify-center flex flex-col items-center">
                      <div className="flex flex-row justify-center pt-8 flex-wrap">
                        {visibleAlternatives!.map((alternative, index) => (
                          <div key={index} className="flex flex-col items-center m-2" style={{ width: '80px'}}>
                            <button onClick={() => router.push(`/companyprofile/${alternative.companyId}`)} className="w-20 h-20 rounded-full items-center bg-gray-300 mb-2">
                            <Avatar src={alternative.logo} style={{ width: '100%', height: '100%' }}/>
                            </button>
                            <span className="text-center font-bold max-w-full whitespace-normal line-clamp-2" >{alternative.name}</span>
                          </div>
                        ))}
                        {additionalInd != 0 && startIndex + 3 > alternatives!.length &&(
                          <div className="flex flex-col border-l-2 pl-5 items-center m-2" style={{ width: '100px'}}>
                          <button onClick={handleNextAlternatives} className="w-20 h-20 rounded-full items-center bg-gray-300 mb-2">
                            <span className="text-2xl text-white font-bold">+</span>
                          </button>
                          <span className="text-center font-bold max-w-full whitespace-normal line-clamp-2" >Add Alternative</span>
                        </div>
                        )}
                      </div>

                      {/* <div className="m-4">
                        {startIndex + 3 < alternatives!.length && (
                          <button onClick={handleNextAlternatives} className="bg-green-400 p-2 rounded-full hover:bg-green-500">
                            <span className="text-md text-white font-bold">Add Alternative</span>
                          </button>
                        )}
                      </div> */}

                    </div>
                  )}
                </div>

              </div>

              <div className="absolute top-52 right-10 -mr-4 round">
                {startIndex + 2 < alternatives!.length && (
                  <button onClick={handleNextAlternatives} className="bg-green-300 p-1 h-20 rounded-md hover:bg-green-500">
                    <span className="text-md text-white font-bold">→</span>
                  </button>
                )}
              </div>

              <div className="absolute top-52 left-10 -ml-4 round">
                {startIndex > 0 && (
                  <button onClick={handlePrevAlternatives} className="bg-green-300 p-1 h-20 rounded-md hover:bg-green-500">
                    <span className="text-md text-white font-bold">←</span>
                  </button>
                )}
              </div>

            </div>








            <div className="flex gap-4 w-full justify-start absolute left-14 bottom-20">
              {incidents && incidents.length > 0 && (
                <button
                  onClick={() =>
                    user
                      ? router.push(`/submitclaim/${params.companyId}`)
                      : router.push("/login")
                  }
                  className="app-btn"
                >
                  <Icon type="submit" />
                  <span>report an incident</span>
                </button>
              )}
              <button className="app-btn" onClick={() => router.back()}>
                <Icon type="return" />
                <span>go back</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
