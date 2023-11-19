// Admin page //

'use client'

import { useState, useEffect, memo } from "react"
import { COMPANY_TYPE } from "@/data/modules"
import { CompanyCard, Icon, Loader, Rating } from "@/app/_lib/modules"

export default function Admin() {

    // Initialize //
    const [companies, setCompanies] = useState({
        loading: true,
        data: []
    })
    const [form, setForm] = useState(false)
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

        <div className="full stack gap padding max-width">
            <Label fetchCompanies={fetchCompanies} />
            <SearchBar form={form} openForm={() => setForm(true)} setFilter={(filter: string) => setFilter(filter)} />
            {
                form
                    ? <Form fetchCompanies={fetchCompanies} cencelForm={() => setForm(false)} />
                    : <CompaniesList companies={companies} filter={filter} />
            }
        </div>

    )

}

function Label({ fetchCompanies }: { fetchCompanies: () => void }) {
    return (
        <div className="box center gap">
            <span className="text-3 title">Control Panel</span>
            <span className='cursor-pointer' onClick={fetchCompanies}><Icon type="refresh" /></span>
        </div>
    )
}

function SearchBar({
    form,
    openForm,
    setFilter
}: {
    form: boolean,
    openForm: () => void,
    setFilter: (filter: string) => void
}) {
    return (
        <div className={`box center gap overflow-hidden duration-500 ${form ? '-mt-24 scale-0 opacity-0' : ''}`}>
            <input
                className="input"
                onChange={(e) => setFilter(e.target.value)}
                placeholder="search for company..."
            />
            <button className="btn" onClick={openForm}>
                <Icon type="add" />
            </button>
        </div>
    )
}

function CompaniesList({
    companies,
    filter
}: {
    companies: { loading: boolean, data: COMPANY_TYPE[] }
    filter: string
}) {

    // Loading
    if (companies.loading) return (
        <div className="box min-h-[300px] center">
            <Loader />
        </div>
    )

    // No company is found
    if (!companies.data.length) return (
        <div className="box min-h-[300px] center">
            <div className="title text-t-primary">No company is found :(</div>
        </div>
    )

    // Compnies list
    return (
        <div className="box stack gap overflow-hidden min-h-[300px]">
            {
                filter
                    ? companies.data.map((company: COMPANY_TYPE) => {
                        if (
                            company.name.toLowerCase().includes(filter.toLowerCase())
                            ||
                            company.description.toLowerCase().includes(filter.toLowerCase())
                        ) {
                            return <CompanyCard key={Math.random()} company={company} control={true} />
                        }
                    })
                    : companies.data.map((company: COMPANY_TYPE) => {
                        return <CompanyCard key={Math.random()} company={company} control={true} />
                    })
            }
        </div>
    )
}

function Form({ fetchCompanies, cencelForm }: { fetchCompanies: () => void, cencelForm: () => void }) {

    // Initialize //
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('');
    const [description, setDescription] = useState('')
    const [rating, setRating] = useState<0 | 1 | 2 | 3>(0)
    const [logo, setLogo] = useState('');
    const [website, setWebsite] = useState('')
    const [tags, setTags] = useState('Other')
    const [icons, setIcons] = useState<{ src: string, width: number, height: number }[]>([])

    useEffect(() => getIcons(logo), [logo])

    // Functions //
    const addCompany = (e: any) => {

        e.preventDefault()
        if (!name || !rating || !description || !tags) return
        const data = { name, rating, description, logo, website, tags }
        setLoading(true)
        fetch('/api/data', {
            method: 'POST',
            headers: {
                "Content-Type": "applcation/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                if (res.status) {
                    setLoading(false)
                    cencelForm()
                    fetchCompanies()
                }
            })

    }

    const getIcons = (query: string) => {

        fetch(`/api/logo?query=${query}`)
            .then(response => response.json())
            .then(response => setIcons(response))
            .catch(err => console.error(err))

    }

    const IconsMenu = () => {

        return (
            <div
                className="hidden peer-focus:grid grid-cols-6
                gap-2 bg-background absolute top-full left-0 z-50 full
                rd h-[200px] overflow-y-auto p-2 mt-1 shadow"
            >
                {
                    icons.length
                        ? icons.map(icon => {
                            return (
                                <img
                                    key={Math.random()}
                                    src={icon.src}
                                    width={icon.width}
                                    height={icon.height}
                                    className="bg-t-background cursor-pointer"
                                    onMouseDown={() => setLogo(icon.src)}
                                />
                            )
                        })
                        : <div className="full absolute center"><Loader /></div>
                }
            </div>
        )

    }

    return (

        <form className="box stack gap animate-totop" onSubmit={addCompany}>

            <div className="full flex flex-col md:flex-row gap">

                {/* Logo */}
                <div className="full relative">
                    <input
                        className="input peer"
                        onChange={(e) => setLogo(e.target.value)}
                        onFocus={() => setLogo('')}
                        value={logo}
                        type="url"
                        placeholder="search logo or past link here"
                    />
                    {<IconsMenu />}
                </div>

                {/* Name */}
                <input
                    className="input"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    placeholder="name"
                    required
                />

                {/* Rating */}
                <div className="inputs-radio">
                    <label className="radio">
                        <input type="radio" name="radio" onChange={() => setRating(1)} />
                        <Rating rating={1} />
                    </label>
                    <label className="radio">
                        <input type="radio" name="radio" onChange={() => setRating(2)} />
                        <Rating rating={2} />
                    </label>

                    <label className="radio">
                        <input type="radio" name="radio" onChange={() => setRating(3)} />
                        <Rating rating={3} />
                    </label>
                </div>

            </div>

            <textarea
                className="input resize-none"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="description"
                required
            ></textarea>

            <div className="flex flex-col gap md:flex-row md:items-center full">
                {/* Website */}
                <input
                    className="input"
                    onChange={(e) => setWebsite(e.target.value)}
                    value={website}
                    type="url"
                    placeholder="website"
                />
                {/* Tags */}
                <select className="select" onChange={(e) => setTags(e.target.value)}>
                    <option value="Technology">Technology</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Pharmaceuticals">Pharmaceuticals</option>
                    <option value="Cosmetics">Cosmetics</option>
                    <option value="FoodAndBeverages">Food and Beverages</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="FashionAndApparel">Fashion and Apparel</option>
                    <option value="FinanceAndBanking">Finance and Banking</option>
                    <option value="Retail">Retail</option>
                    <option value="Telecommunications">Telecommunications</option>
                    <option value="TravelAndHospitality">Travel and Hospitality</option>
                    <option value="SportsAndFitness">Sports and Fitness</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div className="center gap">
                <button className="btn-primary" type='submit'>
                    {loading ? <Loader /> : <span>add</span>}
                </button>
                <button className="btn-primary" onClick={cencelForm}>
                    <span>Cencel</span>
                </button>
            </div>

        </form>

    )

}
