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
import { useTranslation } from "react-i18next";

export default function Login() {
  const router = useRouter();

  /** UseState **/
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegisteration, setIsRegisteration] = useState(false);
  const { user, setUser } = useUserStore();
  const { t } = useTranslation();

  const handleForm: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (isRegisteration) {
      if (password !== confirmPassword) {
        alert(
          t("login.password-mismatch", { defaultValue: "password mismatch" })
        );
      } else {
        const { result, error } = await signUp(name, email, password);
        if (error) {
          alert(t("login.sign-up-failed", { defaultValue: "Sign up failed" }));
          return console.log(error);
        }
        alert(
          t("login.sign-up-success", { defaultValue: "Sign up successful!" })
        );
        setUser(result);
        setIsRegisteration(false);
        return router.push("/login");
      }
      return;
    }

    const { result, error } = await signIn(email, password);

    if (error) {
      alert(t("login.sign-in-failed", { defaultValue: "sign in failed" }));
      return console.log(error);
    }
    alert(t("login.sign-in-success", { defaultValue: "Sign in successful" }));
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
            {t("header.project-name")}
          </h2>

          <form className="space-y-6" action="#" onSubmit={handleForm}>
            {isRegisteration && (
              <div>
                <label className="flex text-green-800 text-lg font-semibold mb-2">
                  {t("login.display-name", { defaultValue: "Display Name" })}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="email"
                  placeholder="Palestinian"
                  required
                  className=" border-0 w-full bg-white"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div>
              <label className="flex text-green-800 text-lg font-semibold mb-2">
                {t("login.email", { defaultValue: "Email Address" })}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder={t("login.email-placeholder", {
                  defaultValue: "free@palestine.com",
                })}
                required
                className="app-input p-3 bg-slate-50"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="flex text-green-800 text-lg font-semibold mb-2">
                {t("login.password", { defaultValue: "Password" })}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                placeholder={t("login.password-placeholder", {
                  defaultValue: "Password",
                })}
                required
                className="app-input p-3 bg-slate-50"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {isRegisteration && (
              <div>
                <label className="flex text-green-800 text-lg font-semibold mb-2">
                  {t("login.confirm-password", {
                    defaultValue: "Confirm Password",
                  })}
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
                {isRegisteration
                  ? t("login.sign-up", { defaultValue: "Sign up" })
                  : t("login.login-button", { defaultValue: "Login" })}
              </button>
              <Link href="#" className="app-link">
                {t("login.forgot-password", {
                  defaultValue: "Forgot password?",
                })}
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <hr className="w-full border-t border-app--primary" />
                <span className="text-app--primary">
                  {t("login.or", { defaultValue: "Or" })}
                </span>
                <hr className="w-full border-t border-app--primary" />
              </div>
              <div className="text-center">
                {isRegisteration
                  ? t("login.already-account", {
                      defaultValue: "Already a member?",
                    })
                  : t("login.no-account", {
                      defaultValue: "Not a member?",
                    })}{" "}
                {"  "}
                <Link
                  href="#"
                  className="app-link"
                  onClick={() => setIsRegisteration(!isRegisteration)}
                >
                  {isRegisteration
                    ? t("login.sign-in", { defaultValue: "Sign in" })
                    : t("login.sign-up", { defaultValue: "Sign up" })}
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
