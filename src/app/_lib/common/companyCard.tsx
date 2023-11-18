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
            "bg-danger text-t-danger ring-t-danger",
            "bg-alert text-t-alert ring-t-alert",
            "bg-success text-t-success ring-t-success",
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
                        ? <img src={logo} width={64} height={64} alt={"logo"} />
                        : <div className="center w-[64px] h-[64px]">
                            <Icon type="company" size={50} />
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
