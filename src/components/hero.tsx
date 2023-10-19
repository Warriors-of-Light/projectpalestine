"use client"

import Image from "next/image"
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import app from "../assets/app.svg"
import { CompanyCard } from "./modules"
import appStore from "../assets/appstore.svg"
import playStore from "../assets/playstore.svg"
import { collection, getFirestore, getDocs } from "firebase/firestore"
import firebase_app from "./firebase/config"
import { Company } from "@/constants"
import { Icon, Spinner } from "@chakra-ui/react"
import SearchBar from "./common/searchbar"

const Hero = () => {

  const [companies, setCompanies] = useState<Array<Company>>([])
  const [filteredResults, setFilteredResults] = useState<Array<string>>([])

  const companiesIDs: Array<string> = useMemo(() => {
    return []
  }, [])

  const onSearch = useCallback((filteredResults: string[] | undefined) => {
    setFilteredResults(filteredResults ?? [...filteredResults!])
  }, [])

  const retrieveData = useCallback(async () => {
    const db = getFirestore(firebase_app)

    await getDocs(collection(db, "Companies")).then((querySnapshot) => {
      const array: Array<Company> = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        array.push({
          companyId: doc.id,
          description: data.description,
          name: data.name,
          logo: data.logo,
          rating: data.rating,
          claims: [],
        })
      })
      const ids = array.map((x) => x.companyId)
      companiesIDs.push(...ids)
      setCompanies(array)
    })
  }, [companiesIDs])

  useEffect(() => {
    if (companies.length === 0) {
      retrieveData()
    }
  }, [companies, retrieveData])

  useEffect(() => {
    if (companiesIDs !== filteredResults) {
      companiesIDs.length = 0
      companiesIDs.push(...filteredResults)
      setCompanies((prev) =>
        prev.filter((company) => filteredResults.includes(company.companyId))
      )
    }
  }, [companiesIDs, filteredResults])

  return (

    <div className="bg-app--light flex flex-col-reverse md:flex-row h-fit w-full">
      
      {/* Search Bar */}
      <div className="bg-app-light w-full min-h-screen flex flex-col justify-start content-start gap-4 p-4 pt-32">

        {/* Primary Title */}
        <div className="font-visible text-4xl mb-10">
          A way for us to boycott the occupation
          <br />
          and it’s supporters
        </div>

        <SearchBar
          label="Search a product or a company"
          onSearch={onSearch}
          placeholder="Search here..."
          searchableContent={companiesIDs}
        />

        {/* Company Content */}
        <div className="center min-h-[80px]">
          {companies.length === 0 ? (
            <Spinner />
          ) : (
            companies.map((company, index) => {
              return <CompanyCard key={index} company={company} />
            })
          )}
        </div>

      </div>
      
      {/* Mobile Version */}
      <div className="w-full min-h-screen flex flex-col justify-end items-center pt-32">

        <Image
          src={app}
          alt="Logo"
          width={250}
        />
        <div className="center flex-col md:flex-row gap-0">
          <Image
            alt={"Google Play button"}
            src={playStore}
            className="cursor-pointer"
          />
          <Image
            alt={"App Store button"}
            src={appStore}
            className="cursor-pointer"
          />
        </div>

      </div>

    </div>

  )

}

export default Hero
