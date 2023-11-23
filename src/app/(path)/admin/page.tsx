// Admin page //

'use client'

import Link from "next/link"
import { useState, useEffect } from "react"
import { COMPANY_TYPE } from "@/data/modules"
import { CompanyCard, Icon, Loader } from "@/app/_lib/modules"

export default function Admin() {

    // Initialize //
    const [companies, setCompanies] = useState<COMPANY_TYPE[]>([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('')
    const [companiesRange, setCompaniesRange] = useState(0)
    useEffect(() => fetchCompanies, [])

    // Functions //
    const fetchCompanies = () => {
        setLoading(true)
        fetch(`/api/data?range=${companiesRange}`)
            .then(res => res.json())
            .then(res => {
                setCompanies(res.data)
                setLoading(false)
            })
    }

    return (

        <div className="full stack gap">
            <SearchBar fetchCompanies={fetchCompanies} setFilter={(filter: string) => setFilter(filter)} />
            {
                !loading
                    ? <>
                        <CompaniesList companies={companies} fetchCompanies={fetchCompanies} companiesRange={companiesRange} filter={filter} />
                        <Range companiesRange={companiesRange} setCompaniesRange={setCompaniesRange} companiesLength={companies.length} />
                    </>
                    : <div className="full min-h-[300px] center"><Loader /></div>
            }
        </div>

    )

}

function SearchBar({
    fetchCompanies,
    setFilter
}: {
    fetchCompanies: () => void,
    setFilter: (filter: string) => void
}) {
    return (
        <div className={`box center gap animate-toright`}>
            <input
                className="input"
                onChange={(e) => setFilter(e.target.value)}
                placeholder="search for company..."
            />
            <button className='btn' onClick={fetchCompanies}>
                <Icon type="refresh" />
            </button>
            <Link className="btn" href="/admin/add">
                <Icon type="add" />
            </Link>
        </div>
    )
}

function CompaniesList({
    companies,
    fetchCompanies,
    companiesRange,
    filter
}: {
    companies: COMPANY_TYPE[],
    fetchCompanies: () => void,
    companiesRange: number,
    filter: string
}) {

    // Functions //
    const deleteCompany = (id: any) => {
        fetch(`/api/data?id=${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(res => fetchCompanies())
    }

    // No company is found
    if (!companies.length) return (
        <div className="box w-full min-h-[300px] center animate-toright">
            <div className="title opacity-50">No company is found :(</div>
        </div>
    )

    // Compnies list
    return (
        <div className="box stack gap min-h-[300px] animate-toright">
            {
                filter.length
                    ? companies.map((company: COMPANY_TYPE) => {
                        if (
                            company.name.toLowerCase().includes(filter.toLowerCase())
                            ||
                            company.description.toLowerCase().includes(filter.toLowerCase())
                        ) {
                            return (
                                <CompanyCard
                                    key={Math.random()}
                                    company={company}
                                    control={true}
                                    animation={false}
                                    deleteCompany={() => deleteCompany(company._id)}
                                />
                            )
                        }
                    })
                    : companies.map((company: COMPANY_TYPE, index: number) => {
                        if (companiesRange * 10 <= index && index < (companiesRange + 1) * 10) {
                            return (
                                <CompanyCard
                                    key={company._id}
                                    company={company}
                                    control={true}
                                    deleteCompany={() => deleteCompany(company._id)}
                                />
                            )
                        }
                    })
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
        <div className="box center gap animate-toleft">
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