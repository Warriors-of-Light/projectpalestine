'use client'

import { useCallback, useState } from 'react'
import Image from "next/image"
import CompanyProfile from "./companyProfile"

type propsType = {
    logo: string,
    name: string,
    description: string,
    status: 1 | 2 | 3,
}

const Company = ({ props }: { props: propsType }) => {

    const [profile, setProfile] = useState(false)
    const closeProfile = useCallback(() => setProfile(false), [])

    return (

        <div
            className="bg-app-primary w-full grid grid-cols-12 items-center p-2 gap-4 rounded-lg cursor-pointer"
            onClick={() => setProfile(true)}
        >

            {/* Logo */}
            <div className="col-span-2 rounded-full">
                <Image className="rounded-full" src={props.logo} alt="Logo" width={100} height={100} />
            </div>

            {/* Name */}
            <div className="col-span-8 flex flex-col items-start">
                <span className="text-3 title capitalize">{props.name}</span>
                <span className="text capitalize">{props.description}</span>
            </div>

            {/* Info */}
            <div className="col-span-2 flex flex-col justify-start items-center gap-2">
                <div className={`p-4 rounded-full ${props.status == 1
                    ? 'bg-app-red'
                    : (
                        props.status == 2
                            ? 'bg-app-yellow'
                            : 'bg-app-green'
                    )
                    }
                `}></div>
                <span className="text">
                    {
                        props.status == 1
                            ? 'Poor' :
                            (
                                props.status == 2
                                    ? 'Meduim'
                                    : 'Good'
                            )
                    }
                </span>
            </div>

            {profile && <CompanyProfile props={props} closeProfile={closeProfile} />}

        </div>

    )

}

export default Company