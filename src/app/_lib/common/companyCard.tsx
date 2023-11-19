// Company Card

"use client";

import { useMemo, memo, useState } from "react"
import { useRouter } from "next/navigation"
import { COMPANY_TYPE } from "@/data/modules"
import { Icon, Rating } from "@/app/_lib/modules"

function CompanyCard({ company, control = false }: { company: COMPANY_TYPE, control?: boolean }) {

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

    const openControl = () => {
        if(!control) return
        setControlFrame(true)
    }
    const closeControl = () => {
        if(!control) return
        setControlFrame(false)
    }

    return (

        <div
            className={`${cardColors} w-full grid grid-cols-10 items-center relative
                padding gap rd cursor-pointer shadow hover:ring-2 animate-appear`}
            onMouseEnter={openControl}
            onMouseLeave={closeControl}
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
                <div className="absolute h-full top-0 right-0 bg-[#00000050] flex gap padding rd">
                    <button className="btn" onClick={() => router.push(`/company/${_id}`)}>
                        <Icon type="link"/>
                    </button>
                    <button className="btn">
                        <Icon type="edit"/>
                    </button>
                    <button className="btn">
                        <Icon type="delete"/>
                    </button>
                </div>
            }

        </div>

    )

}

export default memo(CompanyCard)
