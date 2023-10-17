"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Icon } from "./modules";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import logOut from "./firebase/auth/logout";
import Alert from "./common/alert";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const router = useRouter();
  const [displayAlert, setDisplayAlert] = useState(false);

  const navigateToPage = (location: string) => {
    router.push(`/${location}`);
  };

  const { user, setUser } = useUserStore();

  const dissmissAlert = () => {
    setDisplayAlert(false);
  };

  useEffect(() => {
    setMenu(false);
  }, []);
  const toggleMenu = () => setMenu((state) => !state);
  return (
    <header className="fixed flex justify-between items-center w-screen p-4">
      <div className="flex absolute left-800 top-2">
        {displayAlert &&
          Alert({
            color: "green",
            message: "Signed out Successfully!",
            dissmissAlert: dissmissAlert,
          })}
      </div>
      {/* Title - Logo */}
      <div className="center p-2">
        <Image src="/logo.svg" width="20" height="20" alt="Logo" />
        <span className="text-2 title uppercase">Project Palestine</span>
      </div>

      {/* Links - Routes */}
      <div className="hidden md:flex items-center gap-2">
        <Link className="app-btn-unique" href="/">
          upcoming features
        </Link>

        <Link className="app-btn" href="/">
          <Icon type="download" />
          Download
        </Link>
        <Link className="app-btn" href="/">
          <Icon type="about" />
          About
        </Link>
        <Link className="app-btn" href="/">
          <Icon type="contact" />
          Contact
        </Link>

        <Link className="app-btn" href="/">
          <Icon type="donate" />
          Donate
        </Link>
        {user?.user.email && user.user.email.length > 0 ? (
          <button
            className="app-btn w-36"
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
          <button
            className="app-btn w-36"
            onClick={() => navigateToPage("login")}
          >
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

          <Link className="app-btn" href="/">
            <Icon type="download" />
            Download
          </Link>
          <Link className="app-btn" href="/">
            <Icon type="about" />
            About
          </Link>
          <Link className="app-btn" href="/">
            <Icon type="contact" />
            Contact
          </Link>
          <Link className="app-btn" href="/">
            <Icon type="donate" />
            Donate
          </Link>
          <button className="app-btn" onClick={() => navigateToPage("login")}>
            <Icon type="login" />
            {user?.user.email && user.user.email.length > 0
              ? "Log out"
              : " Log in"}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
