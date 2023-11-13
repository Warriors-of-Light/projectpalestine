"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Icon } from "@/components/modules";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import logOut from "../../firebase/auth/logout";
import Alert from "./alert";
import { Avatar } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";

export default function Header() {
  // Initialize
  const [menu, setMenu] = useState(false);
  const [displayAlert, setDisplayAlert] = useState(false);
  const { user, setUser } = useUserStore();
  const currentUser = getAuth().currentUser;
  // Functions
  const dissmissAlert = () => {
    setDisplayAlert(false);
  };
  const toggleMenu = () => setMenu((state) => !state);

  return (
    <header className="app-header">
      {/* Alert */}
      <div className="flex absolute left-800 top-2">
        {displayAlert &&
          Alert({
            color: "green",
            message: "Signed out Successfully!",
            dissmissAlert: dissmissAlert,
          })}
      </div>
      {/* Logo */}
      <Logo />
      {/* Links */}
      <div className="hidden md:flex items-center gap-2">
        <Links user={user} />
      </div>
      {/* Menu */}
      <div className="md:hidden">
        <button className="app-btn" onClick={toggleMenu}>
          <Icon type={menu ? 'close' : 'menu'} />
        </button>
      </div>
      {
        menu &&
        <div className="bg-app--light fixed w-[80%] shadow-lg h-screen top-0 left-0 z-50 animate-leftright md:hidden">
          <div className="flex flex-col gap-4 p-4">
            <Logo />
            <Links user={user} />
          </div>
        </div>
      }

    </header>
  );
};

const Logo = () => {
  return (
    <div>
      <Link href={"/"}>
        <div className="flex items-center gap-2 cursor-pointer">
          <Image src="/logo.svg" width="30" height="30" alt="Logo" />
          <span className="title uppercase">Project Palestine</span>
        </div>
      </Link>
    </div>
  )
}

const Links = ({ user }: { user: any }) => {
  // Function
  const logout = () => {}

  return (
    <>
      <Link className="app-btn-yellow" href="/upcomingfeatures">
        <Icon type="clock" style="stroke-app--yellow" />
        upcoming features
      </Link>
      <Link className="app-btn-red" href="/download">
        <Icon type="download" />
        <span>Download</span>
      </Link>
      <Link className="app-btn-blue" href="/donate">
        <Icon type="donate" />
        Donate
      </Link>
      {
      user?.user.email &&
      user.user.email.length > 0
        ? (
          <button
            className="app-btn-red"
            onClick={logout}
          >
            <Icon type="login" />
            Log Out
          </button>
        ) : (
          <Link className="app-btn" href="/login">
            <Icon type="login" />
            <span>Log in</span>
          </Link>
        )
      }
        {/*
        {user?.user && (
          <Avatar
            name={currentUser?.displayName!}
            size={"sm"}
            cursor={"pointer"}
            onClick={() => router.push("/account")}
          />
        )}
        */}
    </>
  )
}