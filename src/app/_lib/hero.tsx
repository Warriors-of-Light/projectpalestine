// Hero : contain introduction - search bar

'use client'

import { useState, useEffect } from "react"
import { CompanyCard, Icon, Loader } from "@/app/_lib/modules"
import { COMPANY_TYPE } from "@/data/modules"

export function Hero() {

    // Initialize //
    const [companies, setCompanies] = useState<COMPANY_TYPE[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('')
    const [companiesRange, setCompaniesRange] = useState(0)
    useEffect(() => fetchCompanies, [])

    // Functions //
    const fetchCompanies = () => {
        setLoading(true)
        fetch(`/api/data`)
            .then(res => res.json())
            .then(res => {
                setCompanies(res.data)
                setLoading(false)
            })
    }

    return (
        <div className="box stack gap-10 pt-10">
            <BigTitle />
            <SearchBar filter={filter} setFilter={setFilter} />
            {
                !loading
                    ? <>
                        <Companies companies={companies} companiesRange={companiesRange} filter={filter} />
                        <Range companiesRange={companiesRange} setCompaniesRange={setCompaniesRange} companiesLength={companies.length} />
                    </>
                    : <div className="full min-h-[300px] center"><Loader /></div>
            }
        </div>
    )
}

function BigTitle() {
    return (
        <div className="full flex items-center text-3xl md:text-4xl xl:text-6xl title max-width animate-totop">
            A way for us to boycott the genocide and its supporters
        </div>
    )
}

function SearchBar({
    filter,
    setFilter
}: {
    filter: string,
    setFilter: (value: string) => void
}) {

    return (
        <div className="relative w-full max-width">
            <input
                className="input peer"
                type="text"
                placeholder="search..."
                onChange={(e) => setFilter(e.target.value)}
                value={filter}
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

function Companies({
    companies,
    companiesRange,
    filter
}: {
    companies: COMPANY_TYPE[],
    companiesRange: number,
    filter: string
}) {

    return (
        <div className="full stack gap-4 max-width">
            {
                companies.length ? (
                    filter.length ? companies.map((company: COMPANY_TYPE) => {
                        if (
                            company.name.toLowerCase().includes(filter.toLowerCase())
                            ||
                            company.description.toLowerCase().includes(filter.toLowerCase())
                        ) {
                            return <CompanyCard key={company._id} company={company} animation={false} />
                        }
                    }) : companies.map((company: COMPANY_TYPE, index: number) => {
                        if (companiesRange * 10 <= index && index < (companiesRange + 1) * 10)
                            return <CompanyCard key={company._id} company={company} />
                    })
                ) : <div className="center full"><Loader type={1} /></div>
            }
        </div>
    )
}

function Range({
    companiesRange,
    setCompaniesRange,
    companiesLength,
}: {
    companiesRange: number,
    setCompaniesRange: (range: number) => void,
    companiesLength: number
}) {

    // Initilize //
    const companiesPerList = 10
    const calcLength = Math.floor(companiesLength / companiesPerList)
    const plusLength = companiesLength % 10 ? 1 : 0

    // Functions //
    const incrementRange = () => {
        if (companiesRange + 1 < calcLength || (companiesRange + 1 === calcLength && plusLength)) {
            setCompaniesRange(companiesRange + 1)
            window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
            })
        }
    }
    const decerementRange = () => {
        if (companiesRange > 0) {
            setCompaniesRange(companiesRange - 1)
            window.scroll({
                top: 0,
                left: 0,
                behavior: "smooth",
            })
        }
    }

    return (
        <div className="box center gap">
            <button className="btn" onClick={decerementRange}>
                <Icon type="left" />
            </button>
            <span className="bg-background rd px-4 py-2">{companiesRange + 1} / {calcLength + plusLength}</span>
            <button className="btn" onClick={incrementRange}>
                <Icon type="right" />
            </button>
        </div>
    )
}