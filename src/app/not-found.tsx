"use client";
import { Icon } from "@/components/modules";
import Link from "next/link";

export default function Custom404() {
  return (
    <main className="relative flex justify-center items-start h-full p-4">
      <img
        src="https://images.unsplash.com/photo-1573322867455-fc97c490c14c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3000&q=80"
        alt=""
        className="absolute left-0 top-0 -z-10 h-full w-full object-cover"
      />
      <div className="bg-app-shadow backdrop-blur-[1px] flex flex-col justify-start items-start rounded-lg p-4 gap-4">
        <div className="text-4xl font-black text-app-light">404</div>
        <div className="text-4xl font-black text-app-light">
          This page not found
        </div>
        <div className="text-3 text-app-light">
          Sorry, we couldn’t find the page you’re looking for.
        </div>
        <Link
          href="/"
          className="app-btn-dark"
        >
          <Icon type="return"/>
          <span>Back to home</span>
        </Link>
      </div>
    </main>
  );
}
