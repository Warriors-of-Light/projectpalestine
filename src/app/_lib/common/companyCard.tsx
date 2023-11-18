// Company Card

"use client";

import { useMemo } from "react"
import { useRouter } from "next/navigation"
import { COMPANY_TYPE } from "@/data/modules"
import { Icon, Rating } from "@/app/_lib/modules"

export function CompanyCard({ company }: { company: COMPANY_TYPE }) {

    // Initialize
    const router = useRouter()
    const defaultLogo = 'https://cdn0.iconfinder.com/data/icons/phosphor-fill-vol-4/256/placeholder-fill-64.png'
    const { _id, logo, name, description, rating } = company
    const cardColors = useMemo(() => {
        return [
            "bg-danger text-t-danger ring-t-danger",
            "bg-alert text-t-alert ring-t-alert",
            "bg-success text-t-success ring-t-success",
        ][rating - 1]
    }, [rating])

    return (

        <div
            className={`${cardColors} w-full grid grid-cols-10 items-center
            padding gap rd cursor-pointer shadow hover:ring-2 animate-appear`}
            onClick={() => router.push(`/company/${_id}`)}
        >

            {/* Logo */}
            <div className="center">
                <img src={logo || defaultLogo} width={64} height={64} alt={"logo"} />
            </div>

            {/* Name And Description */}
            <div className="col-span-8 flex flex-col items-start">
                <span className="text-3 title">{name}</span>
                <span className="text-1 capitalize">{description}</span>
            </div>

            {/* Rating */}
            <div className="center">
                <Rating rating={rating} />
            </div>

        </div>

    )

}

export default CompanyCard;
