/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import React from "react";
import Status from "./status";
import { Company } from "@/constants";
import { useRouter } from "next/navigation";
import { Avatar } from "@chakra-ui/react";

interface ICompanyCardProps {
  company: Company;
}

const CompanyCard = ({ company }: ICompanyCardProps) => {
  const router = useRouter();
  const { logo, name, description, companyId, rating } = company;
  const windowSize = window.innerWidth;

  const bgColor = useMemo((): string => {
    if (rating == 1) {
      return "bg-red-400";
    }

    if (rating == 2) {
      return "bg-yellow-400";
    }

    return "bg- green-400";
  }, [rating]);

  return (
    <div
      className={`${bgColor} w-full grid grid-cols-12 items-center p-2 gap-4 rounded-lg cursor-pointer max-w-5xl`}
      onClick={() => router.push(`/companyprofile/${companyId}`)}
    >
      {/* Logo */}
      <div className="col-span-2  p-4 ">
        {logo.length > 0 ? (
          <Avatar src={logo} size={windowSize < 350 ? "sm" : "xl"} />
        ) : (
          <Avatar name={name} />
        )}
      </div>

      {/* Name */}
      <div className="col-span-8 flex flex-col items-start ml-10 lg:ml-0">
        <span className="text-3 title capitalize">{name}</span>
        <span className="text capitalize">{description}</span>
      </div>

      {/* Rating */}
      <div className="p-4 lg:p-0 ">
        <Status status={rating} />
      </div>
    </div>
  );
};

export default CompanyCard;
