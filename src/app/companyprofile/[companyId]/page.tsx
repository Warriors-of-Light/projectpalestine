"use client";

import { useRouter } from "next/navigation";
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
  const router = useRouter();
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
    <main className="bg-app-light flex flex-col items-center justify-start h-screen w-screen gap-4">
      <div className="flex items-center justify-center w-full h-full">
        {companyData === undefined && <Spinner />}
      </div>
      {companyData && (
        <div className="layer animate-topdown">
          <div className="app-container flex flex-col items-center justify-center gap-4 p-4">
            {/* Logo & Name & description */}
            <div className="w-full flex absolute left-10 top-10 items-center">
              <div className="center">
                <Image
                  className="rounded-full"
                  src={companyData?.logo!}
                  alt="Logo"
                  width={200}
                  height={200}
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
              <div className="flex w-80 justify-end p-20">
                <Status status={companyData?.rating!} />
              </div>
            </div>

            {/* History */}
            <div className="absolute left-14 h-full mt-500 pr-10 ">
              <div>
                {claims.map((claim, index) => (
                  <ClaimCard key={index} claim={claim} />
                ))}
              </div>
            </div>
            <div className="flex gap-4 w-full justify-start absolute left-14 bottom-20">
              <Link href="/" className="app-btn-dark">
                <Icon type="submit" />
                <span>submit a claim</span>
              </Link>
              <button className="app-btn-dark" onClick={() => router.push("/")}>
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
