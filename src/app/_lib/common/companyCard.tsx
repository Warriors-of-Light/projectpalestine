// Company Card

"use client";

import { useMemo } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { Status } from "./status";
import { Company } from "@/data/modules";
import Image from "next/image";

export function CompanyCard({ company }: { company: Company }) {

    // Initialize
    const router = useRouter()
    const { id, logo, name, description, status } = company;
    const cardColors = useMemo(() => {
        return [
            "bg-danger text-top-danger ring-top-danger",
            "bg-alert text-top-alert ring-top-alert",
            "bg-success text-top-success ring-top-success",
        ][status - 1]
    }, [status])

    return (
        <div
            className={`${cardColors} grid grid-cols-10 duration-300 items-center p-4
            gap-4 rounded-lg cursor-pointer shadow-md hover:ring-2 animate-appear`}
            onClick={() => router.push(`/companyprofile/${id}`)}
        >
            {/* Logo */}
            <div className="col-span-2 center">
                {logo ? <img src={`${logo}`} width={100} height={100} alt={"logo"} /> : <></>}
            </div>

            {/* Name */}
            <div className="col-span-6 flex flex-col items-start">
                <span className="text-3 title capitalize">{name}</span>
                <span className="text-1 capitalize">{description}</span>
            </div>

            {/* Rating */}
            <div className="col-span-2 center">
                <Status status={status} />
            </div>
        </div>
    );
};

export default CompanyCard;
