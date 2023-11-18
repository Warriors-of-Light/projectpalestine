"use client";
import Header from "@/components/common/header";
import {
  NewspaperIcon,
  MagnifyingGlassIcon,
  CurrencyPoundIcon,
  DevicePhoneMobileIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const features: Array<IFeature> = [
    {
      title: t("upcoming-feature.feature-1-title",{defaultValue:"Voulnteer"} ),
      description:
        t("upcoming-feature.feature-1-desc",{defaultValue:"Voulnteer"} ),
      href: "#",
      icon: DevicePhoneMobileIcon,
      iconForeground: "text-red-700",
      iconBackground: "bg-red-50",
    },
    {
      title: t("upcoming-feature.feature-2-title",{defaultValue:"Voulnteer"} ),
      description:
        t("upcoming-feature.feature-2-desc",{defaultValue:"Voulnteer"} ),
      href: "#",
      icon: CurrencyPoundIcon,
      iconForeground: "text-teal-700",
      iconBackground: "bg-teal-50",
    },
    {
      title: t("upcoming-feature.feature-3-title",{defaultValue:"Voulnteer"} ),
      description: t("upcoming-feature.feature-3-desc",{defaultValue:"Voulnteer"} ),
      href: "#",
      icon: MagnifyingGlassIcon,
      iconForeground: "text-purple-700",
      iconBackground: "bg-purple-50",
    },
    {
      title: t("upcoming-feature.feature-4-title",{defaultValue:"Voulnteer"} ),
      description:
        t("upcoming-feature.feature-4-desc",{defaultValue:"Voulnteer"} ),
      href: "#",
      icon: UsersIcon,
      iconForeground: "text-sky-700",
      iconBackground: "bg-sky-50",
    },
    {
      title: t("upcoming-feature.feature-5-title",{defaultValue:"Voulnteer"} ),
      description:
        t("upcoming-feature.feature-5-desc",{defaultValue:"Voulnteer"} ),
      href: "#",
      icon: NewspaperIcon,
      iconForeground: "text-yellow-700",
      iconBackground: "bg-yellow-50",
    },
  ];

  return (
    <>
      <div className="w-full min-h-screen flex flex-col justify-center items-center bg-app--light ">
        <div className="flex divide-y divide-gray-200 overflow-hidden rounded-lg xs:grid xs:gap-px sm:grid sm:gap-px sm:divide-y-0 ">
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
                "group relative bg-white p-6 hover:ring-2 hover:ring-inset m-2 shadow w-500 cursor-pointer lg:w-600 xs:w-80 sm:w-96 text-center"
              )}
              onClick={() => setFocusedCard(feature.title)}
            >
              <div className="items-center ">
                <span
                  className={classNames(
                    feature.iconBackground,
                    feature.iconForeground,
                    "inline-flex rounded-lg p-3 ring-4 ring-white "
                  )}
                >
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="ml-2 relative text-xl ">{feature.title}</span>
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
                {t("upcoming-feature.volunteer-button",{defaultValue:"Voulnteer"} )}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
