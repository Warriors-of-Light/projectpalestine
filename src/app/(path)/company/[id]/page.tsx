'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { Icon, Loader, Rating } from "@/app/_lib/modules"
import { COMPANY_TYPE } from "@/data/modules"

export default function Company({ params }: { params: { id: string } }) {

    const [company, setCompany] = useState<COMPANY_TYPE | null>(null)
    // const defaultLogo = 'https://cdn0.iconfinder.com/data/icons/phosphor-fill-vol-4/256/placeholder-fill-64.png'

    // fetch company data
    useEffect(() => {

        fetch(`/api/data?id=${params.id}`)
            .then(res => res.json())
            .then(res => setCompany(res.data))

    }, [])

    return company ? (

        <div className="max-width full stack gap padding animate-totop">

            <Header logo={company.logo} name={company.name} rating={company.rating} />
            <Info description={company.description} website={company.website} />
            <Incidents />

        </div>

    ) : (
        <div className="w-full h-screen"><Loader /></div>
    )
}

function Header({
    logo,
    name,
    rating
}: {
    logo: string,
    name: string,
    rating: 1 | 2 | 3,
}) {
    return (
        <div className="full flex items-center justify-between">
            <div className="center gap">
                {/* Logo */}
                <div className="center">
                    <img src={logo} width={64} height={64} alt={"logo"} />
                </div>
                {/* Name */}
                <span className="text-3 title">{name}</span>
            </div>
            {/* Rating */}
            <div className="center">
                <Rating rating={rating} type={2} />
            </div>
        </div>
    )
}

function Info({
    description,
    website,
}: {
    description: string,
    website: string
}) {
    return (
        <div className="box stack gap">
            <div className="text-2 title">Description</div>
            <div className="text-1 first-letter:uppercase lowercase">{description}</div>
            <Link href={website} className="link">
                <Icon type="link" />
                <span>website</span>
            </Link>
        </div>
    )
}

function Incidents() {
    return (
        <div className="box stack gap">
            <div className="text-2 title">incidents</div>
        </div>
    )
}