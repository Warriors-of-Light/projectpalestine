"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Header, Icon } from "@/components/modules";
import CompanyHistory from "@/components/company/companyHistory";
import Link from "next/link";
import Image from "next/image";
import Status from "@/components/company/status";
import firebase_app from "@/components/firebase/config";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { Claim, Company } from "@/constants";
import { Spinner } from "@chakra-ui/spinner";
import ClaimCard from "@/components/common/IncidentCard";

interface ICompanyProfileProps {
  params: { companyId: string };
}

export default function CompanyProfile({ params }: ICompanyProfileProps) {

  const [companyData, setCompanyData] = useState<Company>();

  const retrieveData = useCallback(async () => {
    const db = getFirestore(firebase_app);
    let cd: Company;
    const documentRef = doc(db, "Companies", params.companyId);

    getDoc(documentRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          cd = {
            claims: data.claims,
            companyId: params.companyId,
            rating: data.rating,
            description: data.description,
            logo: data.logo,
            name: data.name,
          };
          setCompanyData(cd);
        } else {
          console.log("Document does not exist");
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
      });
  }, [params.companyId]);

  useEffect(() => {
    if (!companyData) {
      retrieveData();
    }
  }, [companyData, retrieveData]);

  //fake data
  const claims: Array<Claim> = [
    {
      claimId: "11111",
      date: "March 16 2020",
      description:
        "Provided Israeli Soldiers with 4000 Meals during the the second bombing of Gaza",
      rating: "2",
      title:
        "Funded Israeli Soldiers with Mealsa sadadsadsaihdisajdsiaojdsiaojdsiaojdsaiojdsiaojdsaiodjsiodjs",
      refrences: [
        {
          link: "nolink",
          refrenceId: "1111",
          title: "Macdonalds provided Israeli soldiers ",
        },
      ],
    },
  ];

  return (

    <main className="layer animate-topdown">

      {
        companyData === undefined &&
        <div className="flex items-center justify-center w-full h-full">
          <Spinner />
        </div>
      }

      {
        companyData &&
        <div className="app-container flex flex-col">

          {/* Logo & Name & description */}
          <div className="w-full flex justify-between items-center p-4">

            <div className="center">
              <Image
                className="rounded-full -translate-x-4"
                src={companyData?.logo!}
                alt="Logo"
                width={150}
                height={150}
              />
              <div className="flex flex-col">
                <span className="text-3 title capitalize text-4xl">
                  {companyData?.name}
                </span>
                <span className="text capitalize">
                  {companyData?.description}
                </span>
              </div>
            </div>

            {/* Status */}
            <div className="">
              <Status status={companyData?.rating!} />
            </div>

          </div>

          {/* History */}
          <div className="flex flex-col gap-4 p-4">
            <div>
              {claims.map((claim, index) => (
                <ClaimCard key={index} claim={claim} />
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 p-4">
            <Link href="/" className="app-btn">
              <Icon type="submit" />
              <span>submit a claim</span>
            </Link>
            <Link href="/" className="app-btn">
              <Icon type="return" style="stroke-app--primary" />
              <span>go back</span>
            </Link>
          </div>

        </div>
      }

    </main>

  );
}
