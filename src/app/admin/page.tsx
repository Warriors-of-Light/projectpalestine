// Admin page //

'use client'

import { useState, useEffect } from 'react'
import { CompanyCard, Icon, Loader, Rating } from "../_lib/modules"
import { COMPANY_TYPE } from '@/data/modules'

export default function Admin() {

    // Initialize //
    const [companies, setCompanies] = useState({
        loading: true,
        data: []
    })
    const [addCompanyForm, setAddCompanyForm] = useState(false)
    useEffect(() => getCompanies(), [])

    // Functions //
    const getCompanies = () => {
        setCompanies(state => ({ ...state, loading: true }))
        fetch('/api/data')
            .then(res => res.json())
            .then(res => setCompanies({ loading: false, data: res.data }))
    }

    return (

        <main className="full-screen center pattern-atoms">

            <div className="flex flex-col gap-2 p-4 w-full max-w-[800px] mx-auto">

                {/* Title */}
                <div className="box center">
                    <span className="text-3 title">Control Panel</span>
                    <span className='cursur-pointer' onClick={getCompanies}><Icon type="refresh" /></span>
                </div>

                {/* Search bar */}
                <div className="box flex flex-col gap-4 md:flex-row md:items-center">
                    <input
                        className="input"
                        placeholder="search for company..."
                    />
                    <button className="btn-primary" onClick={() => setAddCompanyForm(true)}>
                        <Icon type="add" />
                        <span>add company</span>
                    </button>
                </div>

                <div className="box h-[600px] overflow-y-auto">
                    {/* Companies List */}
                    {!addCompanyForm && <CompaniesList companies={companies} />}
                    {/* Add company form */}
                    {addCompanyForm && <AddCompanyForm cencelForm={() => setAddCompanyForm(false)} />}
                </div>

            </div>

        </main>

    )

}

function CompaniesList({ companies }: { companies: { loading: boolean, data: COMPANY_TYPE[] } }) {

    if (companies.loading) return <Loader />
    if (!companies.data.length) return <div className='full text-2 title text-top-primary center'>No company is found :(</div>

    return (
        <div className="stack">
            {
                companies.data.map((company: COMPANY_TYPE) => <CompanyCard company={company} />)
            }
        </div>
    )
}

function AddCompanyForm({ cencelForm }: { cencelForm: () => void }) {

    // Initialize //
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState<0 | 1 | 2 | 3>(0);
    const [logo, setLogo] = useState('');
    const [website, setWebsite] = useState('');
    const [tags, setTags] = useState('Other');

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
                }
            })

    }

    return (

        <form className="stack" onSubmit={addCompany}>

            <div className="flex flex-col gap-4 md:flex-row md:items-center full">
                <input
                    onChange={(e) => setName(e.target.value)}
                    className="input"
                    type="text"
                    placeholder="name"
                    required />
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
                required />

            <div className="flex flex-col gap-4 md:flex-row md:items-center full">
                <input
                    onChange={(e) => setLogo(e.target.value)}
                    className="input"
                    type="url"
                    placeholder="logo link" />
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