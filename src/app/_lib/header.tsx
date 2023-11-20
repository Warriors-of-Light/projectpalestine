// Header

'use client'

import { useState } from "react"
import Link from "next/link"

// local
import { Icon } from "@/app/_lib/modules"

export function Header() {
    return (
        <header
            className={`box animate-toleft shadow sticky top-0
            flex items-center justify-between gap overflow-hidden z-20`}
        >
            <Logo />
            <LargeScreenLinks user={false} />
            <SmallScreenLinks user={false} />
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
                user ?
                    <Link className="btn" href="/logout">
                        <Icon type="logout" />
                        <span>logout</span>
                    </Link>
                    :
                    <Link className="btn" href="/signin">
                        <Icon type="login" />
                        <span>sign in</span>
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
                        user ?
                            <Link className="btn w-full justify-start" href="/logout">
                                <Icon type="logout" />
                                <span>logout</span>
                            </Link>
                            :
                            <Link className="btn w-full justify-start" href="/signin">
                                <Icon type="login" />
                                <span>login</span>
                            </Link>
                    }
                </div>
            }
        </div>
    )
}