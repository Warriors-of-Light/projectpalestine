// Admin page //

'use client'

import { useState, useEffect } from "react"
import { COMPANY_TYPE } from "@/data/modules"
import { CompanyCard, Icon, Loader, Rating } from "@/app/_lib/modules"

export default function Admin() {

    // Initialize //
    const [companies, setCompanies] = useState({
        loading: true,
        data: []
    })
    const [form, setForm] = useState(false)
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
            <SearchBar openForm={() => setForm(true)} />
            {
                form
                    ? <Form fetchCompanies={fetchCompanies} cencelForm={() => setForm(false)} />
                    : <CompaniesList companies={companies} />
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

function SearchBar({ openForm }: { openForm: () => void }) {
    return (
        <div className="box center gap">
            <input
                className="input"
                placeholder="search for company..."
            />
            <button className="btn" onClick={openForm}>
                <Icon type="add" />
            </button>
        </div>
    )
}

function CompaniesList({ companies }: { companies: { loading: boolean, data: COMPANY_TYPE[] } }) {

    if (companies.loading) return (
        <div className="box min-h-[300px] center">
            <Loader />
        </div>
    )
    if (!companies.data.length) return (
        <div className="box min-h-[300px] center">
            <div className="title text-t-primary">No company is found :(</div>
        </div>
    )

    return (
        <div className="box stack gap overflow-hidden min-h-[300px]">
            {
                companies.data.map((company: COMPANY_TYPE) => <CompanyCard key={Math.random()} company={company} />)
            }
        </div>
    )
}

function Form({ fetchCompanies, cencelForm }: { fetchCompanies: () => void, cencelForm: () => void }) {

    // Initialize //
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState<0 | 1 | 2 | 3>(0);
    const [logo, setLogo] = useState('');
    const [website, setWebsite] = useState('');
    const [tags, setTags] = useState('Other');
    const [icons, setIcons] = useState<{ src: string, width: number, height: number }[]>([])

    useEffect(() => {
        getIcons(logo)
    }, [logo])

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
                    ? icons.map((icon, index) => {
                        return (
                            <img
                                key={Math.random()}
                                src={icon.src}
                                width={icon.width}
                                height={icon.height}
                                className="bg-t-background cursor-pointer"
                                onMouseDown={(e) => setLogo(icon.src)}
                            />
                        )
                    })
                    : <div className="full absolute center">Searching</div>
                }
            </div>
        )

    }

    return (

        <form className="box stack gap" onSubmit={addCompany}>

            <div className="full sm:stack md:flex-row gap">

                <input
                    onChange={(e) => setName(e.target.value)}
                    className="input"
                    type="text"
                    placeholder="name"
                    required
                />
                
                {/* Logo */}
                <div className="full relative">
                    <input
                        onChange={(e) => setLogo(e.target.value)}
                        value={logo}
                        className="input peer"
                        type="url"
                        placeholder="search logo or past link here"
                    />
                    {<IconsMenu />}
                </div>

                <div className="inputs-radio">
                    <label className="radio">
                        <input type="radio" name="radio" onChange={(e) => setRating(1)} />
                        <Rating rating={1} />
                    </label>
                    <label className="radio">
                        <input type="radio" name="radio" onChange={(e) => setRating(2)} />
                        <Rating rating={2} />
                    </label>

                    <label className="radio">
                        <input type="radio" name="radio" onChange={(e) => setRating(3)} />
                        <Rating rating={3} />
                    </label>
                </div>

            </div>

            <input
                onChange={(e) => setDescription(e.target.value)}
                className="input"
                type="text"
                placeholder="description"
                required
            />

            <div className="flex flex-col gap-4 md:flex-row md:items-center full">
                <input
                    onChange={(e) => setWebsite(e.target.value)}
                    className="input"
                    type="url"
                    placeholder="website" />
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

            <div className="flex flex-col gap-4 md:flex-row md:items-center full">
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
