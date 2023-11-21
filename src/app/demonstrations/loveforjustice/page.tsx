"use client";
import { firebase_app } from "@/firebase/config";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [counter, setCounter] = useState(0);

  const retrieveData = useCallback(async () => {
    const db = getFirestore(firebase_app);
    const querySnapshot = await getDocs(collection(db, "Signups"));
    setCounter(querySnapshot.size + 52);
  }, []);

  useEffect(() => {
    retrieveData();
  }, [retrieveData]);

  return (
    <main className="relative isolate min-h-screen">
      {/* <Header /> */}
      <img
        src="https://images.unsplash.com/photo-1698171782667-3734ab9f99a6?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover "
      />
      <div className="mx-auto max-w-3xl px-6 py-32 text-center sm:py-40 lg:px-8 bg-white flex-col top-40 relative drop-shadow-2xl rounded-md">
        <div className="h-full justify-start">
          <h1
            className=" text-3xl font-bold tracking-tight animate-colorChange sm:text-5xl p-0 -mt-24 "
            style={{ animationDelay: "3s" }}
          >
            11.24.2023
          </h1>
          <h1 className=" text-3xl font-bold tracking-tight text-black sm:text-5xl p-0 mt-8 text-animate animate-moveText1 relative ">
            Love for Peace
          </h1>
          <h1
            className=" text-3xl font-bold tracking-tight text-green-500 sm:text-5xl p-0  text-animate animate-moveText1 "
            style={{ animationDelay: "1s" }}
          >
            Love for Justice
          </h1>
          <h1
            className=" text-3xl font-bold tracking-tight text-red-500 sm:text-5xl p-0  text-animate animate-moveText3"
            style={{ animationDelay: "2s" }}
          >
            Love for Freedom
          </h1>
          <div>
            <span className="lg:text-lg md:text-lg font-bold tracking-tight text-black sm:text-lg ">
              Join us for a gathering to talk about justice, freedom and peace
            </span>
          </div>

          {/* <div className="mt-10 flex justify-center">
            <a href="#" className="font-semibold leading-7 text-white text-3xl">
              <span aria-hidden="true">&larr;</span> Back to home
            </a>
          </div> */}
          <button className="btn mt-10 border-green-400 border-2  ">
            <Link href={"/demonstrations/loveforjustice/about"}>
              <span className="text-black font-semibold">Learn more</span>
            </Link>
          </button>
        </div>

        <div className="flex-col flex ">
          <span className="text-black text-4xl relative top-20 font-semibold">
            {counter}
          </span>
          <span className="text-black text-lg relative top-20 font-semibold">
            People registered
          </span>
        </div>
      </div>
    </main>
  );
}
