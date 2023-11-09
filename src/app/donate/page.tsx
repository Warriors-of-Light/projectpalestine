"use client";
import Header from "@/components/common/header";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Donate() {
  const router = useRouter();
  return (
    <>
      <main className="relative isolate min-h-screen">
        <img
          src="https://images.unsplash.com/photo-1573322867455-fc97c490c14c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3000&q=80"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-top"
        />
        <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Coming soon
          </h1>
          <div className="mt-10 flex justify-center">
            <a
              href="#"
              onClick={() => router.push("/")}
              className="font-semibold leading-7 text-white text-3xl"
            >
              <span aria-hidden="true">&larr;</span> Back to home
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
