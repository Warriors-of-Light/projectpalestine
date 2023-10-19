"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Company } from "@/constants";
import Rating from "./rating";

interface ICompanyCardProps {
  company: Company;
}

const CompanyCard = ({ company }: ICompanyCardProps) => {

  const router = useRouter();
  const { logo, name, description, companyId, rating } = company;

  return (
    <div
      // If needed more than 8 class then put it in globals.css - @layer components
      className="company-card"
      onClick={() => router.push(`/companyprofile/${companyId}`)}
    >
      {/* Logo */}
      <div className="col-span-2 center">
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
        <span className="text-3 capitalize">{name}</span>
        <span className="text-1 capitalize">{description}</span>
      </div>

      {/* Rating */}
      <Rating rating={rating} />

    </div>
  );
};

export default CompanyCard;
