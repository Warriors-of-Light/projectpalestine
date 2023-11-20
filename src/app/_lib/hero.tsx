// Hero : contain introduction - search bar

'use client'

import { useState, useEffect } from "react"
import { CompanyCard, Icon, Loader } from "@/app/_lib/modules"
import { COMPANY_TYPE } from "@/data/modules"

export function Hero() {
    const [companies, setCompanies] = useState<COMPANY_TYPE[]>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => fetchCompanies, [])

    // Functions //
    const fetchCompanies = () => {
        setLoading(true)
        fetch(`/api/data?range=${1}`)
            .then(res => res.json())
            .then(res => {
                setCompanies(res.data)
                setLoading(false)
            })
    }
    return (
        <div className="box animate-toright min-h-screen stack items-center gap-10 p-4 pt-10 rd shadow">
            <BigTitle />
            <SearchBar />
            {
                !loading
                    ? <Companies companies={companies} filter={[]} />
                    : <div className="full min-h-[300px] center"><Loader /></div>
            }
        </div>
    )
}

function BigTitle() {
    return (
        <div className="text-3xl md:text-4xl xl:text-6xl title max-width">
            A way for us to boycott the genocide and its supporters
        </div>
    )
}

function SearchBar() {
    const handleSearch = (e: any) => { console.log(e) }
    return (
        <div className="relative w-full max-width">
            <input
                className="input peer"
                type="text"
                placeholder="search..."
                onChange={handleSearch}
            />
            <div className="bg-foreground text-background text-xs font-sans absolute top-1/2 peer-focus:top-0 rounded-full -translate-y-1/2 w-fit px-2 py-1 ml-2">
                Search products or companies
            </div>
            <Icon
                type="search"
                style="absolute right-0 top-1/2 -translate-y-1/2 mr-4"
            />
        </div>
    )
}

function Companies({ companies, filter }: { companies: COMPANY_TYPE[], filter: string[] }) {

    return (
        <div className="full stack gap-4 max-width">
            {
                companies.length ? (
                    filter.length ? companies.map((company: any) => {
                        return (
                            filter.includes(company.name) &&
                            <CompanyCard key={company.companyId} company={company} />
                        );
                    })
                        : companies.map((company: any) => <CompanyCard key={company.companyId} company={company} />)
                ) : <div className="center full"><Loader type={1} /></div>
            }
        </div>
    )
}