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
                {company.claims.map((claim, index) => (
                  <ClaimCard key={index} claim={claim} />
                ))}
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                  <button
                    type="button"
                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add user
                  </button>
                </div>
              </div>
              <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Title
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Email
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                              Role
                            </th>
                            <th
                              scope="col"
                              className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                            >
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {claims.map((claim: Claim) => (
                            <tr key={claim.claimId}>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                {claim.date}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {claim.title}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {claim.description}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {claim.rating}
                              </td>
                              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <a
                                  href="#"
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  Edit
                                  <span className="sr-only">
                                    , {claim.rating}
                                  </span>
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
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
