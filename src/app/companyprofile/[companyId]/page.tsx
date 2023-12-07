/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/modules";
import Status from "@/components/company/status";
import { Incident } from "@/constants";
import { Spinner } from "@chakra-ui/spinner";
import ClaimTable from "@/components/common/claimTable";
import { useCompaniesStore } from "@/store/useCompaniesStore";
import Custom404 from "@/app/not-found";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { firebase_app } from "@/firebase/config";
import { useUserStore } from "@/store/useUserStore";
import { Divider, HStack, Stack } from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid";
import AlternativesSection from '@/components/company/alternatives/alternativesSection';

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
  const { user } = useUserStore();
  const company = companiesMap!.get(params.companyId);


  const retrieveIncidents = useCallback(async () => {
    const db = getFirestore(firebase_app);
    const companyRef = doc(db, "Companies", params.companyId);
    const companyDoc = await getDoc(companyRef);
    const incidents = companyDoc?.data()?.incidents;
    const submittedIncidents = companyDoc?.data()?.submittedIncidents;
    setIncidents(incidents);
    setSubmittedIncidents(submittedIncidents);
    if (!submittedIncidents) {
      setDisplayPendingClaims(true);
    }
  }, [params.companyId]);

  useEffect(() => {
    // will happen once on mount
    if (initialize.current === 0) {
      retrieveIncidents();
      initialize.current++;
    }
  }, [retrieveIncidents]);
  

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
            {/*TEMPORARY: Should be boycottedCompany.alternatives */}
            <AlternativesSection alternatives={company.alternatives!}/>

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
