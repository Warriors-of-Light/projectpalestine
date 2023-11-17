// Company Card

"use client";

import { useMemo } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { Rating } from "./rating";
import { COMPANY_TYPE } from "@/data/modules";
import { Icon } from "./icon";

export function CompanyCard({ company }: { company: COMPANY_TYPE }) {

    // Initialize
    const router = useRouter()
    const { id, logo, name, description, rating } = company;
    const cardColors = useMemo(() => {
        return [
            "bg-danger text-top-danger ring-top-danger",
            "bg-alert text-top-alert ring-top-alert",
            "bg-success text-top-success ring-top-success",
        ][rating - 1]
    }, [rating])

    return (
        <div
            className={`${cardColors} w-full grid grid-cols-10 duration-300 items-center p-2
            rounded-lg cursor-pointer shadow hover:ring-1 animate-appear`}
            onClick={() => router.push(`/companyprofile/${id}`)}
        >
            {/* Logo */}
            <div className="col-span-2 center">
                {
                    logo
                        ? <img src={logo} width={100} height={100} alt={"logo"} />
                        : <div className="center w-[100px] h-[100px] bg-background rounded-full">
                            <Icon type="company" size={30} />
                        </div>
                }
            </div>

            {/* Name */}
            <div className="col-span-6 flex flex-col items-start">
                <span className="text-3 title capitalize">{name}</span>
                <span className="text-1 capitalize">{description}</span>
            </div>

            {/* Rating */}
            <div className="col-span-2 center">
                <Rating rating={rating} />
            </div>
        </div>
    );
};

export default CompanyCard;
