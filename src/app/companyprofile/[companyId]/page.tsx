/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { Icon } from "@/components/modules";
import Link from "next/link";
import Image from "next/image";
import Status from "@/components/company/status";

import { Claim, Company } from "@/constants";
import { Spinner } from "@chakra-ui/spinner";
import ClaimCard from "@/components/common/claimCard";
import { useCompaniesStore } from "@/store/useCompaniesStore";
import Custom404 from "@/app/not-found";

interface ICompanyProfileProps {
  params: { companyId: string };
}

export default function CompanyProfile({ params }: ICompanyProfileProps) {
  const router = useRouter();
  const { companiesMap, setCompaniesMap } = useCompaniesStore();

  const company = companiesMap!.get(params.companyId);

  return company === null ? (
    <Custom404 />
  ) : (
    <main className="bg-app-light flex flex-col items-center justify-start h-screen w-screen gap-4">
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
                </div>
              </div>

              {/* Status */}
              <div className="flex w-400 justify-end ">
                <Status status={company?.rating!} />
              </div>
            </div>

            {/* History */}
            <div className="absolute left-14 h-full mt-500">
              <div>
                {claims.map((claim, index) => (
                  <ClaimCard key={index} claim={claim} />
                ))}
              </div>
            </div>
            <div className="flex gap-4 w-full justify-start absolute left-14 bottom-20">
              <Link href="/submitclaim" className="app-btn">
                <Icon type="submit" />
                <span>submit a claim</span>
              </Link>
              <Link className="app-btn" href={"/"}>
                <Icon type="return" />
                <span>go back</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

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
