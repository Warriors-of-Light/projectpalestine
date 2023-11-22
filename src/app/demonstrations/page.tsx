"use client";

import DemonstrationCard from "@/components/common/demonstrationCard";
import SearchBar from "@/components/common/searchbar";
import { Demonstration } from "@/constants";
import { useRouter } from "next/navigation";
import React from "react";
import march from "../../assets/march.png";

const Demonstrations = () => {
  const router = useRouter();
  const demonstrations: Array<Demonstration> = [
    {
      date: "Nov 24th, 2023",
      location: "Everywhere",
      description:
        "13,000+ innocent people have been killed in Gaza. More than 5,500 children. Israel isn't just committing a masacre against Palestine, it's one against humanity.",
      title: "All Out For Justice",
      image: march,
      website: "www.projectpalestine.org/demonstrations/loveforjustice",
    },
  ];
  return (
    <main className="app-page-container border min-h-full">
      <div className="h-screen w-full flex flex-col-reverse md:flex-row items-start justify-start p-10 gap-6 mb-10  mt-40">
        <div className="flex flex-col text-left -mt-9">
          <span className="text-lg">
            We are aiming for true liberation and peace.
          </span>
          <span className="text-lg">
            To achieve this we need to unite and amplify the voice of humanity.
          </span>
          <span className="text-lg">
            Scattered demonstrations won&apos;t cut it anymore, we need to
            demonstrate our stance all together.
          </span>
          <span className="text-lg">
            All peace and liberations organizations need to unite, we will
            display our collective effort here.
          </span>
          <div className="mt-10">
            <SearchBar
              searchableContent={[]}
              onSearch={() => {}}
              placeholder="Boycott Friday"
              label="Find demonstrations nearby"
            />
          </div>
          <span className="mt-10 text-xl bg-green-400 p-1 rounded-sm">
            Upcoming demonstrations
          </span>
          <div className="mt-8">
            <DemonstrationCard demonstration={demonstrations[0]} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Demonstrations;
