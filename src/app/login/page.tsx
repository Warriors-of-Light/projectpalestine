"use client";

import Image from "next/image";
import Link from "next/link";
// import continueWithGoogle from "../assets/continuewithgoogle.svg";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import signIn from "@/components/firebase/auth/signIn";
import Palestine from "../../assets/palestineFlag.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleForm: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const { result, error } = await signIn(email, password);

    if (error) {
      alert("sign in failed");
      return console.log(error);
    }
    alert("Sign in successful");
    return router.push("/home");
  };

  return (
    <>
      <div className="bg-app--light h-full w-full flex flex-col justify-center items-center gap-4">
        <div className="w-full max-w-[550px]">
          <div className="flex justify-start border-l-4 border-app-primary pb-8 -rotate-3">
            <Image
              className="object-cover"
              src={Palestine}
              width={150}
              height={150}
              alt="Project Palestine Logo"
            />
          </div>

          <div className="bg-app--light shadow-lg md:rounded-xl flex flex-col gap-6 p-6 border-2 border-app-primary">
            <h2 className="text-4 text-app--primary">
              Become a member of Palestine
            </h2>

            <form className="space-y-6" action="#" onSubmit={handleForm}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email Address"
                required
                className="app-input p-3"
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="email"
                placeholder="Password"
                required
                className="app-input p-3"
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="flex flex-col items-center gap-4">
                <button type="submit" className="app-btn-dark w-1/2">
                  Login
                </button>
                <Link href="#" className="app-link">
                  Forgot password?
                </Link>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <hr className="w-full border-t border-app--primary" />
                  <span className="text-app--primary">Or</span>
                  <hr className="w-full border-t border-app--primary" />
                </div>
                <div className="text-center">
                  Not a member?{" "}
                  <Link href="#" className="app-link">
                    {"Sign up here"}
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
