"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import React from "react";
import Status from "./status";
import { Company } from "@/constants";
import { useRouter } from "next/navigation";

interface ICompanyCardProps {
  company: Company;
}

const CompanyCard = ({ company }: ICompanyCardProps) => {
  const [profile, setProfile] = useState(false);
  const router = useRouter();
  const { logo, name, description, companyId, rating, claims } = company;

  useEffect(() => console.log(profile), [profile]);

  return (
    <div
      className="bg-app--light w-full grid grid-cols-12 items-center p-2 gap-4 rounded-lg cursor-pointer"
      onClick={() => router.push(`/companyprofile/${companyId}`)}
    >
      {/* Logo */}
      <div className="col-span-2 rounded-full">
        <Image
          className="rounded-full"
          src={logo}
          alt="Logo"
          width={100}
          height={100}
        />
      </div>

      {/* Name */}
      <div className="col-span-8 flex flex-col items-start">
        <span className="text-3 title capitalize">{name}</span>
        <span className="text capitalize">{description}</span>
      </div>

      {/* Rating */}
      <Status status={rating} />
    </div>
  );
};

export default CompanyCard;
