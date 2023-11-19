// Admin / Add Company //

'use client'

import Link from "next/link"
import { useState, useEffect } from "react"
import { COMPANY_TYPE } from "@/data/modules"
import { Icon, Loader, Rating, CompanyCard, Message } from "@/app/_lib/modules"

export default function Add() {

    // Initialize //
    const [message, setMessage] = useState('')
    const [icons, setIcons] = useState<{ src: string, width: number, height: number }[]>([])
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('');
    const [description, setDescription] = useState('')
    const [rating, setRating] = useState<1 | 2 | 3>(3)
    const [logo, setLogo] = useState('');
    const [website, setWebsite] = useState('')
    const [tags, setTags] = useState('Other')
    const companyPreview: COMPANY_TYPE = { name, description, rating, logo, website, tags: [tags] }

    useEffect(() => getIcons(logo), [logo])

    // Functions //
    const clearForm = () => {
        setName('')
        setDescription('')
        setRating(3)
        setLogo('')
        setWebsite('')
        setTags('Other')
    }
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
                    clearForm()
                    setMessage('Company is added to list :)')
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

        <>
            <CompanyCard company={companyPreview} />
            <form className="box stack gap animate-toright" onSubmit={addCompany}>

                <div className="full flex flex-col md:flex-row gap">

                    {/* Logo */}
                    <div className="full relative">
                        <input
                            className="input peer"
                            onChange={(e) => setLogo(e.target.value)}
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
                            <input
                                type="radio"
                                name="radio"
                                checked={rating === 1}
                                onChange={() => setRating(1)}
                            />
                            <Rating rating={1} />
                        </label>
                        <label className="radio">
                            <input
                                type="radio"
                                name="radio" checked={rating === 2}
                                onChange={() => setRating(2)}
                            />
                            <Rating rating={2} />
                        </label>

                        <label className="radio">
                            <input
                                type="radio"
                                name="radio"
                                checked={rating === 3}
                                onChange={() => setRating(3)}
                            />
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
                    <select className="select" value={tags} onChange={(e) => setTags(e.target.value)}>
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

                <div className="full flex items-center justify-end gap">
                    <Link className="btn" href="/admin">
                        <Icon type="goback" />
                        <span>go back</span>
                    </Link>
                    <button className="btn-primary" type='submit'>
                        {loading ? <Loader /> : <><Icon type="add" /><span>add</span></>}
                    </button>
                </div>

            </form>
            <Message
                type="success"
                message={message}
                closeMessage={() => setMessage('')}
            />
        </>

    )

}
