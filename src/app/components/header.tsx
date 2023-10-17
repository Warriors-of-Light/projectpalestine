"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/app/components/modules";

const Header = () => {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    setMenu(false);
  }, []);

  const toggleMenu = () => setMenu((state) => !state);

  return (
    <header className="fixed flex justify-between items-center w-screen p-4">
      {/* Title - Logo */}
      <div className="center p-2">
        <Image src="/logo.svg" width="20" height="20" alt="Logo" />
        <span className="text-2 title uppercase">Project Palestine</span>
      </div>

      {/* Links - Routes */}
      <div className="hidden md:flex items-center gap-2">
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

        <Link className="app-btn" href="/">
          <Icon type="donate" />
          Log in
        </Link>
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
        </div>
      )}
    </header>
  );
};

export default Header;
