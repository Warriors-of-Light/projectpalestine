"use client";

import Image from "next/image";
import Link from "next/link";
// import continueWithGoogle from "../assets/continuewithgoogle.svg";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import signIn from "@/firebase/auth/signIn";
import Palestine from "@/assets/palestineFlag.png";
import signUp from "@/firebase/auth/signUp";
import { useUserStore } from "@/store/useUserStore";

export default function Login() {
  const router = useRouter();

  /** UseState **/
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegisteration, setIsRegisteration] = useState(false);
  const { user, setUser } = useUserStore();

  const handleForm: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (isRegisteration) {
      if (password !== confirmPassword) {
        alert("password mismatch");
      } else {
        const { result, error } = await signUp(email, password);
        if (error) {
          alert("Sign up failed");
          return console.log(error);
        }
        alert("Sign up successful!");
        setUser(result);
        return router.push("/");
      }
      return;
    }

    const { result, error } = await signIn(email, password);

    if (error) {
      alert("sign in failed");
      return console.log(error);
    }
    alert("Sign in successful");
    setUser(result);
    return router.push("/");
  };

  return (
    <div className="bg-slate-100 h-1000 w-full flex flex-col justify-center items-center gap-4">
      <div className="flex flex-col w-full max-w-[550px] h-full justify-center">
        <div className="flex justify-start border-l-4 border-black pb-8 -rotate-6 mr-12 mb-10 ml-56">
          <Image
            className="object-cover"
            src={Palestine}
            width={150}
            height={150}
            alt="Project Palestine Logo"
          />
        </div>

        <div className="bg-app--light shadow-lg md:rounded-xl flex flex-col gap-6 p-6 border-2 border-app-primary">
          <h2 className="text-4 text-app--primary text-center">
            Project Palestine
          </h2>

          <form className="space-y-6" action="#" onSubmit={handleForm}>
            <div>
              <label className="flex text-green-800 text-lg font-semibold mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="free@palestine.com"
                required
                className="app-input p-3 bg-slate-50"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="flex text-green-800 text-lg font-semibold mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                placeholder="Password"
                required
                className="app-input p-3 bg-slate-50"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {isRegisteration && (
              <div>
                <label className="flex text-green-800 text-lg font-semibold mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="password"
                  placeholder="Password"
                  required
                  className="app-input p-3 bg-slate-50"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}

            <div className="flex flex-col items-center gap-4">
              <button type="submit" className="app-btn w-1/2">
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
                {isRegisteration ? "Already a member?" : "Not a member?"} {"  "}
                <Link
                  href="#"
                  className="app-link"
                  onClick={() => setIsRegisteration(true)}
                >
                  {isRegisteration ? "Sign in" : "Sign up"}
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
