import React, { useEffect, useRef, useState } from "react";
import { Alternative, WORLD_COUNTRIES, Company } from '@/constants';
import AlternativesList from './alternativesList';
import { filterAlternativesByCountry } from "./alternativesUtils";

interface AlternativesSectionProps {
    alternatives: Alternative[];
}

export default function AlternativesSection ({alternatives}: AlternativesSectionProps) {

    const [selectedCountry, setSelectedCountry] = useState("");
    const [countryInput, setCountryInput] = useState(""); 
    const [displayedCountries, setDisplayedCountries] = useState(WORLD_COUNTRIES);
    const [isCountriesListVisible, setIsCountriesListVisible] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [startIndex, setStartIndex] = useState(0);
    const [alternativesForCountry, setAlternativesForCountry] = useState<Array<Alternative>>([]);
    const [visibleAlternatives, setVisibleAlternatives] = useState<Array<Alternative>>([]);

    //it gets me EG not Egypt 
    // const fetchUserCountry = async () => {
    //   try {
    //     const response = await fetch('https://ipinfo.io/json');
    //     const data = await response.json();
    //     const userCountry = data.country || "";
    //     console.log(userCountry);
    //     setCountryInput(userCountry);
    //     setSelectedCountry(userCountry);
    //   } catch (error) {
    //     console.error('Error fetching user country:', error);
    //   }
    // };    

    //just for testing the UI
    // const retrieveAlternatives = (() => {
    //     // Iterate over companiesMap and append the values to alternatives array
    //     const alternativesArray: Array<Company> = [];
    //     companiesMap.forEach((company) => {
    //       alternativesArray.push(company);
    //     });
    //     setAlternatives(alternativesArray);
    //     setVisibleAlternatives(alternativesArray.slice(startIndex, startIndex + 3));
    //   });

    // useEffect(() => {
    //     //fetchUserCountry();
    //     //retrieveAlternatives();
    //    
    //   }, []);


    // useEffect(() => {
    //     const filteredAlternatives = filterAlternativesByCountry(alternatives, selectedCountry);
    //     setAlternativesForCountry(filteredAlternatives);
    //     setVisibleAlternatives(filteredAlternatives.slice(startIndex, startIndex + 3));
    //   }, [alternatives, selectedCountry]);

    const getNextAlternatives = () => {
        const newStartIndex = startIndex + 3;
        if (newStartIndex < alternativesForCountry!.length) {
          setStartIndex(newStartIndex);
          setVisibleAlternatives(alternativesForCountry!.slice(newStartIndex, newStartIndex + 3));
        }
      };
      
      const getPrevAlternatives = () => {
        const newStartIndex = Math.max(0, startIndex - 3);
        setStartIndex(newStartIndex);
        setVisibleAlternatives(alternativesForCountry!.slice(newStartIndex, newStartIndex + 3));
      };
    
      const filterCountriesList = (val: string) => {
        setCountryInput(val);
        const value = val.toLowerCase();
        const filteredCountries = WORLD_COUNTRIES.filter(country =>
          country.toLowerCase().includes(value)
        );
        setDisplayedCountries(filteredCountries);
      };  

      useEffect(() => {
        filterCountriesList(countryInput);
      }, [countryInput]);

      const hideCountriesList = (event: MouseEvent) => {
        if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
          setIsCountriesListVisible(false);
        }
      };

      useEffect(() => {
        document.addEventListener('click', hideCountriesList);
        return () => {
          document.removeEventListener('click', hideCountriesList);
        };
      }, [inputRef, setIsCountriesListVisible]);

  return (
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
                        onChange={(e) => {setCountryInput(e.target.value);}}
                        /> 
                    </div>
                    <div>
                        {isCountriesListVisible && (
                        <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {displayedCountries.map((country, index) => (
                            <li
                                key={index}
                                className="text-gray-900 relative cursor-pointer select-none py-2 pl-3 pr-9 transition duration-300 hover:bg-gray-100"
                                onClick={() => {
                                setSelectedCountry(country);
                                setCountryInput(country);
                                setIsCountriesListVisible(false);
                                }}
                            >
                                <span className="font-normal ml-3 block truncate">{country}</span>
                            </li>
                            ))}
                        </ul>
                        )}
                    </div>
                </div>
            </div>
            <div className="mt-2">
                {visibleAlternatives!.length === 0 ? (
                <div className="mt-8 flex justify-center pt-16" style={{ height:'130px'}}>
                    <p>There are no alternatives yet :&#39;)</p>
                </div>
                ) : (
                <AlternativesList alternatives={visibleAlternatives!}/>
                )}
            </div>
            <div className="m-4 flex justify-center">
                {/* To Do: implement the logic of this button */}
                <button className="bg-green-400 p-2 rounded-full hover:bg-green-500">
                    <span className="text-md text-white font-bold">Add Alternative</span>
                </button>
            </div>
            </div>
            <div className="absolute top-52 right-10 -mr-4 round">
                {startIndex + 2 < alternativesForCountry!.length && (
                    <button onClick={getNextAlternatives} className="bg-green-300 p-1 h-20 rounded-md hover:bg-green-500">
                    <span className="text-md text-white font-bold">→</span>
                    </button>
                )}
            </div>
            <div className="absolute top-52 left-10 -ml-4 round">
                {startIndex > 0 && (
                    <button onClick={getPrevAlternatives} className="bg-green-300 p-1 h-20 rounded-md hover:bg-green-500">
                    <span className="text-md text-white font-bold">←</span>
                    </button>
                )}
        </div>
    </div>
  );
}
