// Sign up : create account

'use client'

import Link from "next/link"
import { useState } from "react"
import { Icon, Loader } from "@/app/_lib/modules"
import { useRouter } from "next/navigation"

export default function Signup() {

    // Initialize //
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [verifying, setVerifying] = useState(0)
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    // Functions //
    const isValidEmail = () => {
        // Regular expression for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }
    const isValidName = () => {
        const nameRegex = /^[A-Za-z\u00C0-\u017F '-]+$/ // Allow alphabetical characters, spaces, hyphens, and apostrophes
        return nameRegex.test(name)
    }
    const isValidPassword = () => {
        // Password should be at least 8 characters long
        // Should contain at least one uppercase letter, one lowercase letter, one number,
        // and allowed special characters: @$!%*?&
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/
        return passwordRegex.test(password)
    }
    const isValidConfirmPassword = () => {
        return isValidPassword() && password === confirmPassword
    }
    const sendCode = () => {
        if (isValidEmail() && !verifying) {
            setVerifying(1)
            fetch('/api/auth/mailer', {
                method: 'POST',
                body: JSON.stringify({ email })
            })
                .then(res => res.json())
                .then(res => { if (!res.error) setVerifying(2) })
        }
    }
    const signup = () => {
        if (
            isValidEmail() &&
            isValidName() &&
            isValidPassword() &&
            isValidConfirmPassword() &&
            verifying === 2
        ) {
            const body = { email, name, password, }
            fetch('/api/auth/singup', {
                method: 'POST',
                body: JSON.stringify(body)
            })
            .then(res => res.json())
            .then(res => {if(res.status) router.push('/')} )
        }
    }

    return (

        <div className="w-full h-screen center padding">

            <div className="box h-fit stack gap rd max-w-[400px] shadow">

                <div className="full text-3 title text-center padding">Sign in</div>

                {/* Email */}
                <div className="relative full">
                    <input
                        className={`input ${email.length && !isValidEmail() ? 'ring-danger' : ''}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="example@email.com"
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

                {/* Name */}
                <div className="relative full">
                    <input
                        className={`input ${name.length && !isValidName() ? 'ring-danger' : ''}`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="full name"
                    />
                    <Icon type="user" style="absolute right-0 top-1/2 -translate-y-1/2 mr-2" />
                </div>

                {/* Password */}
                <div className="relative full">
                    <input
                        className={`input ${password.length && !isValidPassword() ? 'ring-danger' : ''}`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="password"
                    />
                    <Icon type="lock" style="absolute right-0 top-1/2 -translate-y-1/2 mr-2" />
                </div>
                <div className="relative full">
                    <input
                        className={`input ${confirmPassword.length && (!isValidPassword() || password !== confirmPassword) ? 'ring-danger' : ''}`}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        placeholder="password"
                    />
                    <Icon type="lock" style="absolute right-0 top-1/2 -translate-y-1/2 mr-2" />
                </div>

                {/* Submit */}
                <button className="btn-primary w-full" onClick={signup}>
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

        </div>

    )

}