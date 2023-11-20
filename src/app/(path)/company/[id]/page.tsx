// Compnay detailers

'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { Loader, Rating } from "@/app/_lib/modules"
import { COMPANY_TYPE } from "@/data/modules"

export default function Company({ params }: { params: { id: string } }) {

    const [company, setCompany] = useState<COMPANY_TYPE | null>(null)
    const defaultLogo = 'https://cdn0.iconfinder.com/data/icons/phosphor-fill-vol-4/256/placeholder-fill-64.png'

    // fetch company data
    useEffect(() => {

        fetch(`/api/data?id=${params.id}`)
            .then(res => res.json())
            .then(res => setCompany(res.data))

    }, [])

    return company ? (

        <div className="stack gap padding w-full max-width">

            {/* Header */}
            <div className="full flex items-center justify-between animate-toright">
                <div className="center gap">
                    {/* Logo */}
                    <div className="center">
                        <img src={company.logo || defaultLogo} width={64} height={64} alt={"logo"} />
                    </div>

                    {/* Name */}
                    <span className="text-3 title">{company.name}</span>
                </div>

                {/* Rating */}
                <div className="center">
                    <Rating rating={company.rating} type={2} />
                </div>
            </div>

            {/* Description */}
            <div className="box flex gap animate-toleft">
                <Link href={company.website} className="btn">website</Link>
            </div>
            {/* Description */}
            <div className="box animate-toright">
                <p className="text-2 title">Description</p>
                <p className="text-1 first-letter:uppercase lowercase">{company.description}</p>
            </div>

        </div>

    ) : (
        <div className="w-full h-screen"><Loader /></div>
    )
}