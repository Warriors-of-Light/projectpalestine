"use client";

import { useCallback, useState, useEffect, createContext } from "react";
import Image from "next/image";
import React from "react";
import { Icon } from "../modules";
import Status from "./status";
import CompanyProfile from "./companyProfile";

type propsType = {
  logo: string;
  name: string;
  description: string;
  status: 1 | 2 | 3;
};

const Company = ({ props }: { props: propsType }) => {
  const [profile, setProfile] = useState(false);

  useEffect(() => console.log(profile), [profile]);

  return (
    <div
      className="bg-app-primary w-full grid grid-cols-12 items-center p-2 gap-4 rounded-lg cursor-pointer"
      onClick={() => setProfile(true)}
    >
      {/* Logo */}
      <div className="col-span-2 rounded-full">
        <Image
          className="rounded-full"
          src={props.logo}
          alt="Logo"
          width={100}
          height={100}
        />
      </div>

      {/* Name */}
      <div className="col-span-8 flex flex-col items-start">
        <span className="text-3 title capitalize">{props.name}</span>
        <span className="text capitalize">{props.description}</span>
      </div>

      {/* Status */}
      <Status status={props.status} />

      {profile && <CompanyProfile props={props} />}
    </div>
  );
};

export default Company;
