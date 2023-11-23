'use client'

import Link from "next/link"
import { useState } from "react"
import { Icon } from "@/app/_lib/modules"
import { verifyData } from "@/utils/modules"
import { useRouter } from "next/navigation"

export default function Signin() {

    // Initialize //
    const router = useRouter()
    const [data, setData] = useState({
        email: {
            value: '',
            verified: true
        },
        password: {
            value: '',
            verified: true
        },
    })

    // Functions //
    const funcSetEmail = (e: any) => {
        setData(state => {
            return {
                ...state,
                email: {
                    value: e.target.value,
                    verified: verifyData({ type: 'email', value: e.target.value })
                }
            }
        })
    }
    const funcSetPassword = (e: any) => {
        setData(state => {
            return {
                ...state,
                password: {
                    value: e.target.value,
                    verified: verifyData({ type: 'password', value: e.target.value })
                }
            }
        })
    }
    const signin = () => {
        if (data.email.verified && data.password.verified) {
            fetch('/api/auth/signin', {
                method: 'POST',
                body: JSON.stringify({
                    email: data.email.value,
                    password: data.password.value
                })
            })
            .then(res => res.json())
                .then(res => {
                    if (res.status) router.push('/')
                    else setData({
                        email: {
                            value: '',
                            verified: false
                        },
                        password: {
                            value: '',
                            verified: false
                        },
                    })
                })
        }
    }

    return (

        <div className="w-full h-screen center padding">

            <div className="box h-fit max-w-[400px] stack gap rd shadow animate-toleft">
                <div className="full text-3 title center padding">Sign in</div>
                <div className="relative full">
                    <input
                        className={`input ${data.email.verified ? '' : 'ring-danger'}`}
                        onChange={(e) => funcSetEmail(e)}
                        type="email"
                        placeholder="email"
                    />
                    <Icon type="email" style="absolute right-0 top-1/2 -translate-y-1/2 mr-2" />
                </div>
                <div className="relative full">
                    <input
                        className={`input ${data.password.verified ? '' : 'ring-danger'}`}
                        onChange={(e) => funcSetPassword(e)}
                        type="password"
                        placeholder="password"
                    />
                    <Icon type="lock" style="absolute right-0 top-1/2 -translate-y-1/2 mr-2" />
                </div>
                <button className="btn-primary w-full" onClick={signin}>
                    <span>Sign in</span>
                </button>
                <div className="opacity-50 full text-center">No account?</div>
                <div className="full stack gap md:flex-row">
                    <Link className="btn w-full" href="/signup">
                        <span>Sign up</span>
                    </Link>
                    <Link className="btn w-full" href="api/auth/google">
                        <Icon type="google" />
                        <span>Sign up with google</span>
                    </Link>
                </div>
            </div>

        </div>

    )

}