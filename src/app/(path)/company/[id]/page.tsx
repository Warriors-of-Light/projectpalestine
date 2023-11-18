// Compnay detailers

'use client'

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

        <div className="w-full md:h-screen md:center padding max-width">
            <div className="full stack gap">

                {/* Header */}
                <div className="w-full flex items-center justify-between">
                    <div className="center gap">
                        {/* Logo */}
                        <div className="center">
                            <img src={company.logo || defaultLogo} width={64} height={64} alt={"logo"} />
                        </div>

                        {/* Name And Description */}
                        <div className="col-span-8 flex flex-col items-start">
                            <span className="text-3 title">{company.name}</span>
                            <span className="text-1 capitalize">{company.description}</span>
                        </div>
                    </div>

                    {/* Rating */}
                    <div className="center">
                        <Rating rating={company.rating} type={2} />
                    </div>
                </div>

            </div>
        </div>

    ) : (
        <div className="w-full h-screen"><Loader /></div>
    )
}