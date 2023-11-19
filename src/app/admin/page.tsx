// Admin page //

'use client'

import Link from "next/link"
import { useState, useEffect } from "react"
import { COMPANY_TYPE } from "@/data/modules"
import { CompanyCard, Icon, Loader } from "@/app/_lib/modules"

export default function Admin() {

    // Initialize //
    const [companies, setCompanies] = useState({
        loading: true,
        data: []
    })
    const [filter, setFilter] = useState('')
    useEffect(() => fetchCompanies(), [])

    // Functions //
    const fetchCompanies = () => {
        setCompanies(state => ({ ...state, loading: true }))
        fetch('/api/data')
            .then(res => res.json())
            .then(res => setCompanies({ loading: false, data: res.data }))
    }

    return (

        <div className="full stack gap">
            <SearchBar fetchCompanies={fetchCompanies} setFilter={(filter: string) => setFilter(filter)} />
            <CompaniesList companies={companies} fetchCompanies={fetchCompanies} filter={filter} />
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
    filter
}: {
    companies: { loading: boolean, data: COMPANY_TYPE[] }
    fetchCompanies: () => void,
    filter: string
}) {

    // Loading
    if (companies.loading) return (
        <div className="w-full min-h-[300px] center">
            <Loader />
        </div>
    )

    // No company is found
    if (!companies.data.length) return (
        <div className="w-full min-h-[300px] center">
            <div className="title text-t-primary">No company is found :(</div>
        </div>
    )

    const deleteCompany = (id: any) => {
        fetch(`/api/data?id=${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(res => fetchCompanies())
    }

    // Compnies list
    return (
        <div className="box stack gap min-h-[300px] animate-toleft">
            {
                filter
                    ? companies.data.map((company: COMPANY_TYPE) => {
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
                                    deleteCompany={() => deleteCompany(company._id)}
                                />
                            )
                        }
                    })
                    : companies.data.map((company: COMPANY_TYPE) => {
                        return (
                            <CompanyCard
                                key={Math.random()}
                                company={company}
                                control={true}
                                deleteCompany={() => deleteCompany(company._id)}
                            />
                        )
                    })
            }
        </div>
    )
}