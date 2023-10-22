"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Icon } from "@/components/modules";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import logOut from "../firebase/auth/logout";
import Alert from "./common/alert";

const Header = () => {
  // Initialize
  const [menu, setMenu] = useState(false);
  const [displayAlert, setDisplayAlert] = useState(false);
  const [comingSoon, setComingSoon] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const router = useRouter();

  useEffect(() => {
    window.onscroll = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      )
        setShowBackground(true);
      else setShowBackground(false);
    };
  }, []);

  // Functions
  const navigateToPage = (location: string) => {
    router.push(`/${location}`);
  };

  const { user, setUser } = useUserStore();

  const dissmissAlert = () => {
    setDisplayAlert(false);
  };

  const toggleMenu = () => setMenu((state) => !state);

  return (
    <header
      className={`app-header ${
        showBackground ? "bg-app-light shadow-sm shadow-app-shadow" : ""
      }`}
    >
      {/* Alert */}
      <div className="flex absolute left-800 top-2">
        {displayAlert &&
          Alert({
            color: "green",
            message: "Signed out Successfully!",
            dissmissAlert: dissmissAlert,
          })}
      </div>

      {/* Title - Logo */}
      <Link href={"/"}>
        <div className="center p-2 cursor-pointer">
          <Image src="/logo.svg" width="25" height="25" alt="Logo" />

          <span className="text-2 title uppercase">Project Palestine</span>
        </div>
      </Link>

      {/* Links - Routes */}
      <div className="hidden md:flex items-center gap-2">
        <Link className="app-btn-yellow" href="/">
          <Icon type="clock" style="stroke-app--yellow" />
          upcoming features
        </Link>
        <Link
          className="app-btn relative overflow-hidden"
          href="/download"
          onMouseEnter={() => setComingSoon(true)}
          onMouseLeave={() => setComingSoon(false)}
        >
          {comingSoon && (
            <div className="absolute w-full h-full center bg-blue-500 text-app-light">
              Coming Soon
            </div>
          )}
          <Icon type="download" />
          <span>Download</span>
        </Link>
        <Link className="app-btn" href="/">
          <Icon type="donate" />
          Donate
        </Link>
        {user?.user.email && user.user.email.length > 0 ? (
          <button
            className="app-btn"
            onClick={() => {
              setUser(null);
              setDisplayAlert(true);
              logOut();
              navigateToPage("");
            }}
          >
            <Icon type="login" />
            Log Out
          </button>
        ) : (
          <button className="app-btn" onClick={() => navigateToPage("login")}>
            <Icon type="login" />
            Log in
          </button>
        )}
      </div>

      {/* Menu btn */}
      <button className="app-btn md:hidden" onClick={toggleMenu}>
        <Icon type="menu" />
      </button>

      {/* Menu */}
      {menu && (
        <div className="bg-app-light absolute top-0 left-0 w-screen h-screen flex flex-col gap-2 p-2 z-50 animate-leftright">
          <button className="app-btn w-fit md:hidden" onClick={toggleMenu}>
            <Icon type="close" />
          </button>

          <Link className="app-btn-yellow" href="/">
            <Icon type="clock" style="stroke-app--yellow" />
            upcoming features
          </Link>
          <Link
            className="app-btn relative overflow-hidden"
            href="/download"
            onMouseEnter={() => setComingSoon(true)}
            onMouseLeave={() => setComingSoon(false)}
          >
            {comingSoon && (
              <div className="absolute w-full h-full center bg-blue-500 text-app-light">
                Coming Soon
              </div>
            )}
            <Icon type="download" />
            <span>Download</span>
          </Link>
          <Link className="app-btn" href="/">
            <Icon type="donate" />
            Donate
          </Link>
          {user?.user.email && user.user.email.length > 0 ? (
            <button
              className="app-btn"
              onClick={() => {
                setUser(null);
                setDisplayAlert(true);
                logOut();
                navigateToPage("");
              }}
            >
              <Icon type="login" />
              Log Out
            </button>
          ) : (
            <button className="app-btn" onClick={() => navigateToPage("login")}>
              <Icon type="login" />
              Log in
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
