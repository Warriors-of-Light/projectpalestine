// Sign up : create account

'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { verifyData } from "@/utils/modules"
import { Icon, Loader } from "@/app/_lib/modules"

export default function Signup() {

    // Initialize //
    const router = useRouter()
    const [data, setData] = useState({
        email: {
            value: '',
            verified: true
        },
        name: {
            value: '',
            verified: true
        },
        password: {
            value: '',
            verified: true
        },
        confirmPassword: {
            value: '',
            verified: true
        },
        code: {
            value: '',
            verified: true
        }
    })
    const [verifyingStage, setVerifyingStage] = useState(false)
    const [verifyingStatus, setVerifyingStatus] = useState(0)
    const [verificationInterval, setVerificationInterval] = useState(true)

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
    const funcSetName = (e: any) => {
        setData(state => {
            return {
                ...state,
                name: {
                    value: e.target.value,
                    verified: verifyData({ type: 'name', value: e.target.value })
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
    const funcSetConfirmPassword = (e: any) => {
        setData(state => {
            return {
                ...state,
                confirmPassword: {
                    value: e.target.value,
                    verified: e.target.value === state.password.value
                }
            }
        })
    }
    const funcSetCode = (e: any) => {
        setData(state => {
            return {
                ...state,
                code: {
                    value: e.target.value,
                    verified: verifyData({ type: 'code', value: e.target.value })
                }
            }
        })
    }
    const funcSendCode = () => {
        if (data.email.verified && verificationInterval) {
            setVerifyingStatus(1)
            fetch('/api/auth/mailer', {
                method: 'POST',
                body: JSON.stringify({ email: data.email.value })
            })
                .then(res => res.json())
                .then(res => {
                    if (!res.error) {
                        setVerifyingStatus(2)
                        funcStartVerifationInterval()
                    }
                })
        }
    }
    const funcStartVerifationInterval = () => {
        setVerificationInterval(false)
        setTimeout(() => setVerificationInterval(true), 30000)
    }
    const funcSignup = () => {
        if (
            data.email.verified &&
            data.name.verified &&
            data.password.verified &&
            data.confirmPassword.verified
        ) {
            setVerifyingStage(true)
        }
    }
    const funcPostData = () => {
        const body = {
            email: data.email.value,
            name: data.name.value,
            password: data.password.value,
            code: data.code.value
        }
        fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(res => {
                if (res.status) router.push('/')
                else setData(state => ({ ...state, code: { ...state.code, verified: false } }))
            })
    }

    useEffect(() => {
        if (data.code.verified) funcPostData()
    }, [data.code])

    return (

        <div className="w-full h-screen center padding">

            {
                !verifyingStage ?
                    <div className="box h-fit max-w-[400px] stack gap shadow rd animate-toleft">

                        <div className="full text-3 title center padding">Sign in</div>

                        {/* Email */}
                        <div className="relative full">
                            <input
                                className={`input ${data.email.verified ? '' : 'ring-danger'}`}
                                value={data.email.value}
                                onChange={(e) => funcSetEmail(e)}
                                type="email"
                                placeholder="example@email.com"
                            />
                            <Icon type="email" style="absolute right-0 top-1/2 -translate-y-1/2 mr-2" />
                        </div>

                        <div className="line" />

                        {/* Name */}
                        <div className="relative full">
                            <input
                                className={`input ${data.name.verified ? '' : 'ring-danger'}`}
                                value={data.name.value}
                                onChange={(e) => funcSetName(e)}
                                type="text"
                                placeholder="full name"
                            />
                            <Icon type="user" style="absolute right-0 top-1/2 -translate-y-1/2 mr-2" />
                        </div>

                        {/* Password */}
                        <div className="relative full">
                            <input
                                className={`input ${data.password.verified ? '' : 'ring-danger'}`}
                                value={data.password.value}
                                onChange={(e) => funcSetPassword(e)}
                                type="password"
                                placeholder="password"
                            />
                            <Icon type="lock" style="absolute right-0 top-1/2 -translate-y-1/2 mr-2" />
                        </div>
                        <div className="relative full">
                            <input
                                className={`input ${data.confirmPassword.verified ? '' : 'ring-danger'}`}
                                value={data.confirmPassword.value}
                                onChange={(e) => funcSetConfirmPassword(e)}
                                type="password"
                                placeholder="confirm password"
                            />
                            <Icon type="lock" style="absolute right-0 top-1/2 -translate-y-1/2 mr-2" />
                        </div>

                        {/* Submit */}
                        <button className="btn-primary w-full" onClick={funcSignup}>
                            <span>Sign up</span>
                        </button>

                        <div className="opacity-50 full text-center">Or</div>

                        <div className="full stack gap md:flex-row">
                            <Link className="btn w-full" href="/signin">
                                <span>Sign in</span>
                            </Link>
                            <Link className="btn w-full" href="api/auth/google">
                                <Icon type="google" />
                                <span>Sign up with google</span>
                            </Link>
                        </div>

                    </div>
                    :
                    <div className="box h-fit max-w-[400px] stack gap shadow rd animate-toleft">
                        <div>
                            We're going to send you a message via {data.email.value} with a six-digit code.
                        </div>
                        {
                            verifyingStatus === 0 &&
                            <button className="btn w-full" onClick={funcSendCode}>
                                <span>send code</span>
                                <Icon type="submit" />
                            </button>
                        }
                        {
                            verifyingStatus === 1 &&
                            <div className="p-4 w-full">
                                <Loader />
                            </div>
                        }
                        {
                            verifyingStatus === 2 &&
                            <input
                                className={`input animate-appear ${data.code.verified ? '' : 'ring-danger'}`}
                                onChange={(e) => funcSetCode(e)}
                                value={data.code.value}
                                type="text"
                                maxLength={6}
                            />
                        }
                        {
                            verifyingStatus === 2 &&
                            (
                                verificationInterval
                                    ?
                                    <button className="btn w-full" onClick={funcSendCode}>
                                        <span>resend code</span>
                                        <Icon type="submit" />
                                    </button>
                                    :
                                    <button className="btn p-4 w-full">
                                        <Loader />
                                    </button>
                            )
                        }
                    </div>
            }

        </div>

    )

}