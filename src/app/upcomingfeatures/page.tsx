"use client";
import Header from "@/components/header";
import {
  NewspaperIcon,
  MagnifyingGlassIcon,
  CurrencyPoundIcon,
  DevicePhoneMobileIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useCallback, useState } from "react";

interface IFeature {
  title: string;
  description: string;
  icon: any;
  href: string;
  iconForeground: string;
  iconBackground: string;
}

export default function UpcomingFeatures() {
  const [FocusedCard, setFocusedCard] = useState<string>();
  const onFocusCard = useCallback((feature: IFeature) => {
    setFocusedCard(feature.title);
  }, []);

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const features: Array<IFeature> = [
    {
      title: "Mobile app with barcode scanner",
      description:
        "An app to help you make purchases without supporting the occupation",
      href: "#",
      icon: DevicePhoneMobileIcon,
      iconForeground: "text-red-700",
      iconBackground: "bg-red-50",
    },
    {
      title: "Donation Extension",
      description:
        "A chrome extension to round up donations to Gaza and Palestine.",
      href: "#",
      icon: CurrencyPoundIcon,
      iconForeground: "text-teal-700",
      iconBackground: "bg-teal-50",
    },
    {
      title: "Demonstration Finder",
      description: "A tool to help you find demonstrations nearby.",
      href: "#",
      icon: MagnifyingGlassIcon,
      iconForeground: "text-purple-700",
      iconBackground: "bg-purple-50",
    },
    {
      title: "Martyer Honor Page",
      description:
        "A page to honor those who died in Gaza, sharing their stories, videos, pictures and dreams.",
      href: "#",
      icon: UsersIcon,
      iconForeground: "text-sky-700",
      iconBackground: "bg-sky-50",
    },
    {
      title: "News Validity Checker",
      description:
        "A tool to check the validity of news, categorize false ones and prevent the spread of propaganda.",
      href: "#",
      icon: NewspaperIcon,
      iconForeground: "text-yellow-700",
      iconBackground: "bg-yellow-50",
    },
  ];

  return (
    <>
      <Header />
      <div className="w-full min-h-screen flex flex-col justify-center items-center bg-app--light ">
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg  sm:grid sm:gap-px sm:divide-y-0 ">
          {features.map((feature, actionIdx) => (
            <div
              key={feature.title}
              className={classNames(
                actionIdx === 0
                  ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
                  : "",
                actionIdx === 1 ? "sm:rounded-tr-lg" : "",
                actionIdx === features.length - 2 ? "sm:rounded-bl-lg" : "",
                actionIdx === features.length - 1
                  ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                  : "",
                "group relative bg-white p-6 hover:ring-2 hover:ring-inset m-2 shadow w-500 cursor-pointer"
              )}
              onClick={() => setFocusedCard(feature.title)}
            >
              <div className="items-center">
                <span
                  className={classNames(
                    feature.iconBackground,
                    feature.iconForeground,
                    "inline-flex rounded-lg p-3 ring-4 ring-white"
                  )}
                >
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="ml-2 relative text-xl">{feature.title}</span>
              </div>
              {FocusedCard === feature.title && (
                <div className="mt-4">
                  <p className="mt-2  text-gray-500 ml-2 text-lg">
                    {feature.description}
                  </p>
                </div>
              )}
            </div>
          ))}
          <div className="flex justify-center mt-4">
            <Link href={"https://forms.gle/KYvobH2yhJUE68G79"} target="_blank">
              <button className="app-btn w-96 bg-red-300 text-black flex justify-center border-red-800 text-xl">
                Voulnteer
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
