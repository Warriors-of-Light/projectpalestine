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
import { Company } from "@/constants";

interface ICompanyProfileProps {
  params: { companyId: string };
}

export default function CompanyProfile({ params }: ICompanyProfileProps) {
  const router = useRouter();
  const [companyData, setCompanyData] = useState<Company>();
  alert(params.companyId);

  const retrieveData = useCallback(async () => {
    const db = getFirestore(firebase_app);
    let cd: Company;
    // const CompaniesRef = collection(db, 'Companies');
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
          alert("Document data exists");
        } else {
          console.log("Document does not exist");
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
      });
  }, []);

  useEffect(() => {
    if (companyData?.name.length === 0) {
      retrieveData();
    }
  }, []);

  const data = [
    {
      date: "March 16 2020",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula, ante eu cursus tincidunt, justo libero consequat tortor",
    },
    {
      date: "September 15 2022",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula, ante eu cursus tincidunt, justo libero consequat tortor",
    },
    {
      date: "October 16 2023",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vehicula, ante eu cursus tincidunt, justo libero consequat tortor",
    },
  ];

  const History = ({
    props,
  }: {
    props: {
      date: string;
      text: string;
    };
  }) => {
    return (
      <div className="bg-app-primary flex justify-between items-center border-l border-app--primary p-2 rounded-lg">
        <div className="text-3 w-1/2">{props.date}</div>
        <div className="text-1 w-1/2">{props.text}</div>
      </div>
    );
  };

  return (
    <main className="bg-app-light flex flex-col items-center justify-start h-screen w-screen gap-4">
      <Header />

      <div className="layer animate-topdown">
        <div className="app-container flex flex-col items-center justify-center gap-4 p-4">
          {/* Logo & Name & description */}
          <div className="w-full flex justify-between items-center">
            <div className="center">
              <Image
                className="rounded-full"
                src={companyData?.logo!}
                alt="Logo"
                width={100}
                height={100}
              />
              <div className="flex flex-col">
                <span className="text-3 title capitalize">
                  {companyData?.name}
                </span>
                <span className="text capitalize">
                  {companyData?.description}
                </span>
              </div>
            </div>

            {/* Status */}
            <Status status={companyData?.rating!} />
          </div>

          {/* History */}
          {data.map((props, index) => (
            <History key={index} props={props} />
          ))}

          {/* Submit a claim */}
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="app-btn-dark">
              <Icon type="submit" />
              <span>submit a claim</span>
            </Link>
            <button className="app-btn-dark" onClick={() => {}}>
              <Icon type="return" />
              <span>go back</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
