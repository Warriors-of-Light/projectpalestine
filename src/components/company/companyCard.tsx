/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo } from "react";
import React from "react";
import Status from "./status";
import { Company } from "@/constants";
import { useRouter } from "next/navigation";
import { Avatar } from "@chakra-ui/react";

interface ICompanyCardProps {
  company: Company;
}

const CompanyCard = ({ company }: ICompanyCardProps) => {
  // Initialize
  const router = useRouter();
  const { logo, name, description, companyId, rating } = company;
  const cardColors = useMemo(() => {
    return [
      "bg-app-red text-app--red ring-app--red",
      "bg-app-yellow text-app--yellow ring-app--yellow",
      "bg-app-green text-app--green ring-app--green"
    ][rating-1]
  }, [rating])

  return (
    <div
      className={`${cardColors} app-max-w-element grid grid-cols-10 duration-300
      items-center p-4 gap-4 rounded-lg cursor-pointer shadow-md hover:ring-2 animate-appear`}
      onClick={() => router.push(`/companyprofile/${companyId}`)}
    >
      {/* Logo */}
      <div className="col-span-2 center">
        {logo ? <Avatar src={logo} size={"xl"}/> : <Avatar name={name} />}
      </div>

      {/* Name */}
      <div className="col-span-6 flex flex-col items-start">
        <span className="text-3 title capitalize">{name}</span>
        <span className="text-1 capitalize">{description}</span>
      </div>

      {/* Rating */}
      <div className="col-span-2 center">
        <Status status={rating} />
      </div>
    </div>
  );
};

export default CompanyCard;
