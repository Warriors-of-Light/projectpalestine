// Header

'use client'

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

// local
import { Icon } from "@/components/modules"

export function Header() {
    return (
        <header
            className={`animate-toleft bg-top-background
            shadow md:rounded-full md:mt-4 w-full sticky top-0
            flex items-center justify-between p-4 overflow-hidden z-20`}
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
            <Image src={'/palestine.png'} width={35} height={35} alt="palestine" />
            <span className="title">project palestine</span>
        </div>
    )
}

function LargeScreenLinks({ user }: { user: boolean }) {
    return (
        <div className="hidden md:center">
            <Link className="btn-alert" href="/upcomingfeatures">
                <Icon type="clock" style="fill-alert" />
                <span>upcoming features</span>
            </Link>
            <Link className="btn-primary" href="/download">
                <Icon type="download" />
                <span>download</span>
            </Link>
            <Link className="btn-primary" href="/donate">
                <Icon type="donate" />
                <span>donate</span>
            </Link>
            {
                user ?
                    <Link className="btn-success" href="/login">
                        <Icon type="login" />
                        <span>login</span>
                    </Link>
                    :
                    <Link className="btn-danger" href="/logout">
                        <Icon type="logout" />
                        <span>logout</span>
                    </Link>
            }
        </div>
    )
}

function SmallScreenLinks({ user }: { user: boolean }) {
    const [menu, setMenu] = useState(false)
    return (
        <div className="center md:hidden">
            <button className="btn-primary" onClick={() => setMenu(state => !state)}>
                <Icon type={menu ? 'close' : 'menu'} />
            </button>
            {
                menu &&
                <div className="fixed left-0 top-0 w-[80%] h-screen stack gap-4 p-4 bg-top-background shadow animate-toright z-50">
                    <Logo />
                    <div className="line" />
                    <Link className="btn-alert" href="/upcomingfeatures">
                        <Icon type="clock" style="fill-alert" />
                        <span>upcoming features</span>
                    </Link>
                    <Link className="btn-primary" href="/download">
                        <Icon type="download" />
                        <span>download</span>
                    </Link>
                    <Link className="btn-primary" href="/donate">
                        <Icon type="donate" />
                        <span>donate</span>
                    </Link>
                    {
                        user ?
                            <Link className="btn-success" href="/login">
                                <Icon type="login" />
                                <span>login</span>
                            </Link>
                            :
                            <Link className="btn-danger" href="/logout">
                                <Icon type="logout" />
                                <span>logout</span>
                            </Link>
                    }
                </div>
            }
        </div>
    )
}