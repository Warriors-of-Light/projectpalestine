import { Icon } from "@/app/_lib/modules";
import Link from "next/link";

export default function Login() {
    return (
        <div className="w-full h-screen center padding">
            <div className="box h-fit stack gap rd max-w-[400px] shadow">
                <div className="full text-3 title text-center">Sign in</div>
                <form className="full stack gap">
                    <div className="relative full">
                        <input className="input" type="email" placeholder="email" />
                        <Icon type="email" style="absolute right-0 top-1/2 -translate-y-1/2 mr-2" />
                    </div>
                    <div className="relative full">
                        <input className="input" type="password" placeholder="password" />
                        <Icon type="lock" style="absolute right-0 top-1/2 -translate-y-1/2 mr-2" />
                    </div>
                    <button className="btn-primary w-full" type="submit">
                        <span>Sign in</span>
                    </button>
                </form>
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