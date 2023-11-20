// Company Card

"use client";

import { useMemo, memo, useState } from "react"
import { useRouter } from "next/navigation"
import { COMPANY_TYPE } from "@/data/modules"
import { Icon, Rating } from "@/app/_lib/modules"
import Link from "next/link";

function CompanyCard({
        company,
        control = false,
        deleteCompany,
    }
    : {
        company: COMPANY_TYPE,
        control?: boolean,
        deleteCompany?: () => void
    }) {

    // Initializez
    const [controlFrame, setControlFrame] = useState(false)
    const router = useRouter()
    const defaultLogo = 'https://cdn0.iconfinder.com/data/icons/phosphor-fill-vol-4/256/placeholder-fill-64.png'
    const { _id, logo, name, description, rating } = useMemo(() => company, [company])
    const cardColors = useMemo(() => {
        return [
            "bg-danger text-t-danger ring-t-danger",
            "bg-alert text-t-alert ring-t-alert",
            "bg-success text-t-success ring-t-success",
        ][rating - 1]
    }, [rating])

    // Functions //
    const openControl = () => {
        if (!control) return
        setControlFrame(true)
    }
    const closeControl = () => {
        if (!control) return
        setControlFrame(false)
    }
    const visitCompany = () => {
        router.push(`/company/${_id}`)
    }
    const editCompany = () => {
        router.push(`/admin/edit/${_id}`)
    }

    return (

        <Link
            className={`${cardColors} w-full grid grid-cols-10 items-center relative
                padding gap rd cursor-pointer shadow hover:ring-2 animate-appear`}
            onMouseEnter={openControl}
            onMouseLeave={closeControl}
            onClick={e => {controlFrame && e.preventDefault()}}
            href={`/company/${company._id}`}
        >

            {/* Logo */}
            <div className="center">
                <img src={logo || defaultLogo} width={64} height={64} alt={"logo"} />
            </div>

            {/* Name And Description */}
            <div className="col-span-8 flex flex-col items-start">
                <span className="text-3 title">
                    {name}
                </span>
                <span className="text-1 truncate w-1/2 first-letter:uppercase lowercase">
                    {description}
                </span>
            </div>

            {/* Rating */}
            <div className="center">
                <Rating rating={rating} />
            </div>

            {/* Control Frame */}
            {
                controlFrame &&
                <div className="absolute h-full top-0 right-0 bg-[#ffffff50] flex gap padding rounded-md rounded-l-none">
                    <button className="btn" onClick={visitCompany}>
                        <Icon type="link" />
                    </button>
                    <button className="btn" onClick={editCompany}>
                        <Icon type="edit" />
                    </button>
                    <button className="btn" onClick={deleteCompany}>
                        <Icon type="delete" />
                    </button>
                </div>
            }

        </Link>

    )

}

export default memo(CompanyCard)
