// Sign up : create account

'use client'

import Link from "next/link";
import { useState } from "react";
import { Icon, Loader } from "@/app/_lib/modules";

export default function Signup() {

    // Initialize //
    const [email, setEmail] = useState('')
    const [verifying, setVerifying] = useState(0)
    const [name, setName] = useState('')
    const [passoword, setPassoword] = useState('')

    // Functions //
    const isValidEmail = (email: string) => {
        // Regular expression for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    const sendCode = () => {
        if (isValidEmail(email) && !verifying) {
            setVerifying(1)
            fetch('/api/auth/mailer', {
                method: 'POST',
                body: JSON.stringify({ email })
            })
                .then(res => res.json())
                .then(res => {if(!res.error) setVerifying(2)})
        }
    }
    const signup = (e: any) => {
        e.preventDefault()
    }

    return (
        <div className="w-full h-screen center padding">
            <div className="box h-fit stack gap rd max-w-[400px] shadow">
                <div className="full text-3 title text-center padding">Sign in</div>
                <form className="full stack gap" onSubmit={signup}>
                    <div className="relative full">
                        <input
                            className="input"
                            type="email"
                            placeholder="example@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Icon type="email" style="absolute right-0 top-1/2 -translate-y-1/2 mr-2" />
                    </div>
                    <button className="btn w-full" onClick={sendCode}>
                        {
                            verifying === 0 && <>
                                <span>send code</span>
                                <Icon type="submit" />
                            </>
                        }
                        {
                            verifying === 1 && <>
                                <Loader />
                            </>
                        }
                        {
                            verifying === 2 && <>
                                <span>verified</span>
                                <Icon type="check" />
                            </>
                        }
                    </button>
                    <div className="line" />
                    <div className="relative full">
                        <input className="input" type="text" placeholder="full name" />
                        <Icon type="user" style="absolute right-0 top-1/2 -translate-y-1/2 mr-2" />
                    </div>
                    <div className="relative full">
                        <input className="input" type="password" placeholder="password" />
                        <Icon type="lock" style="absolute right-0 top-1/2 -translate-y-1/2 mr-2" />
                    </div>
                    <div className="relative full">
                        <input className="input" type="password" placeholder="confirm password" />
                        <Icon type="lock" style="absolute right-0 top-1/2 -translate-y-1/2 mr-2" />
                    </div>
                    <button className="btn-primary w-full" type="submit">
                        <span>Sign up</span>
                    </button>
                </form>
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
        </div>
    )
}