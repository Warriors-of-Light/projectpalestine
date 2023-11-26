'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { Icon, Loader, Rating } from "@/app/_lib/modules"
import { COMPANY_TYPE, INCIDENT_TYPE } from "@/data/modules"

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
            <Incidents incidents={company.incidents} id={company._id} />

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

function Incidents({
    id,
    incidents,
}: {
    id: string | undefined,
    incidents: INCIDENT_TYPE[] | undefined
}) {

    function Incident({
        incident
    }: {
        incident: INCIDENT_TYPE
    }) {
        return incident && (
            <div className="w-full bg-background shadow rd stack p-2 gap-2">
                <div className="w-full flex items-center justify-between">
                    <div className="title text-2">{incident.title}</div>
                    <button className="btn-primary p-2 gap-2">
                        {incident.ups}
                        <Icon type="up" />
                    </button>
                </div>
                <div className="w-full opacity-50 text-xs">{incident.date}</div>
                <div className="w-full">
                    {incident.description}
                </div>
                <div className="stack gap-2">
                    {
                        incident.references?.map(reference => {
                            return <a className="link" href={reference}>{reference}</a>
                        })
                    }
                </div>
            </div>
        )
    }

    function AddIncident({
        id
    }: {
        id: string | undefined
    }) {

        const [submitForm, setSubmitForm] = useState(false)
        const [loading, setLoading] = useState(false)
        const [incident, setIncident] = useState<INCIDENT_TYPE>({
            title: '',
            description: '',
            date: '',
            references: [''],
        })

        const addIncident = () => {
            if (
                incident.title &&
                incident.description &&
                incident.date &&
                incident.references.length
            ) {
                setLoading(true)
                fetch('/api/data', {
                    method: 'POST',
                    body: JSON.stringify({ action: 'addIncident', id: id, incident: incident })
                })
                    .then(res => res.json())
                    .then(res => {
                        setLoading(false)
                        if (res.status) setSubmitForm(false)
                    })
            }
        }
        const addReference = () => {
            setIncident(state => {
                return { ...state, references: [...state.references, ''] }
            })
        }
        const removeReference = (index: number) => {
            setIncident(state => {
                return {
                    ...state,
                    references: state.references.filter((v, i) => i !== index)
                }
            })
        }
        const editReference = (value: string, index: number) => {
            setIncident(state => {
                return {
                    ...state,
                    references: state.references.map((v, i) => i === index ? value : v)
                }
            })
        }

        return (
            <>
                <button className="btn" onClick={() => setSubmitForm(true)}>
                    <span>submit incident</span>
                    <Icon type="submit" />
                </button>
                {
                    submitForm &&
                    <div className="fixed full top-0 left-0 bg-t-background animate-totop">
                        <div className="max-width w-full h-fit stack gap padding">
                            <div className="title text-2">Send incident</div>
                            <div>This information will be displayed publicly so make sure it is accurate.</div>
                            <div className="line" />
                            <input
                                className="input"
                                type="text"
                                placeholder="Title"
                                onChange={(e) => setIncident(state => ({ ...state, title: e.target.value }))}
                                value={incident.title}
                            />
                            <textarea
                                className="input"
                                placeholder="Description"
                                onChange={(e) => setIncident(state => ({ ...state, description: e.target.value }))}
                                value={incident.description}
                            ></textarea>
                            <div className="full flex flex-col md:flex-row gap">
                                <div className="full stack gap">
                                    {
                                        incident.references.map((reference, index) => {
                                            return (
                                                <div className="full relative">
                                                    <input
                                                        key={index}
                                                        className="input"
                                                        type="url"
                                                        placeholder="Reference link"
                                                        onChange={(e) => editReference(e.target.value, index)}
                                                        value={reference}
                                                    />
                                                    {
                                                        index ?
                                                            <button
                                                                className="btn absolute top-1/2 -translate-y-1/2 right-0 p-2 mr-2"
                                                                onClick={() => removeReference(index)}
                                                            >
                                                                <Icon type="close" />
                                                            </button>
                                                            : null
                                                    }
                                                </div>
                                            )
                                        })
                                    }
                                    <button className="btn" onClick={addReference}>Add another reference</button>
                                </div>
                                <input
                                    className="input"
                                    type="date"
                                    placeholder="Title"
                                    onChange={(e) => setIncident(state => ({ ...state, date: e.target.value }))}
                                    value={incident.date}
                                />
                            </div>
                            <div className="full flex items-center justify-end gap">
                                <button className="btn" onClick={() => setSubmitForm(false)}>cencel</button>
                                <button className="btn" onClick={addIncident}>
                                    {
                                        !loading ?
                                            <>
                                                <span>Submit</span>
                                                <Icon type="submit" />
                                            </>
                                            :
                                            <Loader />
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                }
            </>
        )
    }

    return incidents && (
        <div className="box stack gap">
            <div className="text-2 title">incidents</div>
            {incidents.map((incident: INCIDENT_TYPE) => <Incident incident={incident} />)}
            <div className="center full"><AddIncident id={id} /></div>
        </div>
    )
}
