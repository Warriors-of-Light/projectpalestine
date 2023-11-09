"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Icon, ToggleTheme } from "@/components/modules";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import logOut from "../../firebase/auth/logout";
import Alert from "./alert";
import { Avatar } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";

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

  // const currentUser = getAuth().currentUser;

  const dissmissAlert = () => {
    setDisplayAlert(false);
  };

  const toggleMenu = () => setMenu((state) => !state);

  return (
    <header
      className={`app-header dark:bg-app-dark  xl:px-64 lg:px-32 md:px-4 flex justify-center md:justify-between align-center ${
        showBackground
          ? " dark:bg-app--dark bg-app-light shadow-sm shadow-app-shadow  "
          : ""
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
        <div className="center p-4 cursor-pointer  ">
          <Image src="/logo.svg" width="35" height="35" alt="Logo" />

          <span className=" dark:text-white text-4 title uppercase">
            Project Palestine
          </span>
        </div>
      </Link>

      {/* Links - Routes */}

      <div className="hidden md:flex items-center gap-2">
        <ToggleTheme />
        <Link className="app-btn-yellow" href="/upcomingfeatures">
          <Icon type="clock" style="stroke-app--yellow" />
          <span className="xl:text-3 text-2 ">upcoming features</span>
        </Link>
        {/* <HeaderLink */}
        {/*   className="app-btn-yellow" */}
        {/*   href="/upcomingfeatures" */}
        {/*   type="clock" */}
        {/*   styles="stroke-app--yellow" */}
        {/*   label="upcoming features" */}
        {/* /> */}
        <Link
          className="app-btn relative overflow-hidden"
          href="/download"
          onMouseEnter={() => setComingSoon(true)}
          onMouseLeave={() => setComingSoon(false)}
        >
          {comingSoon && (
            <div className="absolute w-full h-full center bg-blue-500 text-app-light">
              <span className="xl:text-3 text-2">Coming Soon</span>
            </div>
          )}
          <Icon type="download" />
          <span className="xl:text-3 text-2">Download</span>
        </Link>
        <Link className="app-btn" href="/donate">
          <Icon type="donate" />
          <span className="xl:text-3 text-2">Donate</span>
        </Link>
        {/* <HeaderLink */}
        {/*   className="app-btn" */}
        {/*   href="/donate" */}
        {/*   type="donate" */}
        {/*   label="Donate" */}
        {/* /> */}
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
            <span className="xl:text-3 text-2">Log Out</span>
          </button>
        ) : (
          <button className="app-btn" onClick={() => navigateToPage("login")}>
            <Icon type="login" />
            <span className="xl:text-3 text-2">Log In</span>
          </button>
        )}

        {user?.user && (
          <Avatar
            name={currentUser?.displayName!}
            size={"sm"}
            cursor={"pointer"}
            onClick={() => router.push("/account")}
          />
        )}
      </div>
      {/* Menu btn */}
      <button
        className=" absolute app-btn md:hidden  w-12 h-12 top-4 right-4 "
        onClick={toggleMenu}
      >
        <Icon type="menu" />
      </button>

      {/* Menu */}
      {menu && (
        <div className=" dark:bg-app-dark bg-app-light absolute top-0 left-0 w-screen h-screen flex flex-col pt-20 gap-2 p-2 z-50 animate-leftright">
          <button
            className="app-btn w-12 h-12 absolute top-4 right-4 w-fit md:hidden"
            onClick={toggleMenu}
          >
            <Icon type="close" />
          </button>
          <ToggleTheme style="absolute top-6 right-16" />

          <Link className="app-btn-yellow" href="/upcomingfeatures">
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
          <Link className="app-btn" href="/donate">
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
