'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { Icon } from "@/app/_lib/modules"

export function Header() {

    const [user, setUser] = useState(null)

    useEffect(() => {
        fetch('/api/auth/user', {
            method: 'POST',
            body: JSON.stringify({action: 'status'})
        })
        .then(res => res.json())
        .then(res => setUser(res.status))
    }, [])

    return user !== null && (
        <header
            className={`bg-t-background w-full animate-toleft shadow sticky top-0 md:rd
            flex items-center justify-between gap padding md:margin overflow-hidden z-20`}
        >
            <Logo />
            <LargeScreenLinks user={user} />
            <SmallScreenLinks user={user} />
        </header>
    )
}

function Logo() {
    return (
        <div className="flex items-center gap-2">
            <img src={'/palestine.png'} width={35} height={35} alt="palestine" />
            <span className="title">project palestine</span>
        </div>
    )
}

function LargeScreenLinks({ user }: { user: boolean }) {
    return (
        <div className="hidden md:center gap">
            <Link className="btn" href="/download">
                <Icon type="download" />
                <span>download</span>
            </Link>
            <Link className="btn" href="/donate">
                <Icon type="donate" />
                <span>donate</span>
            </Link>
            {
                !user &&
                <Link className="btn w-full" href="api/auth/google">
                    <Icon type="google" />
                    <span>Sign up with google</span>
                </Link>
            }
        </div>
    )
}

function SmallScreenLinks({ user }: { user: boolean }) {
    const [menu, setMenu] = useState(false)
    return (
        <div className="center gap md:hidden">
            <button className="btn p-2" onClick={() => setMenu(state => !state)}>
                <Icon type={menu ? 'close' : 'menu'} />
            </button>
            {
                menu &&
                <div className="box fixed left-0 top-0 w-[80%] h-screen stack gap shadow animate-toright z-50">
                    <Logo />
                    <div className="line" />
                    <Link className="btn w-full justify-start" href="/download">
                        <Icon type="download" />
                        <span>download</span>
                    </Link>
                    <Link className="btn w-full justify-start" href="/donate">
                        <Icon type="donate" />
                        <span>donate</span>
                    </Link>
                    {
                        !user &&
                        <Link className="btn w-full" href="api/auth/google">
                            <Icon type="google" />
                            <span>Sign up with google</span>
                        </Link>
                    }
                </div>
            }
        </div>
    )
}