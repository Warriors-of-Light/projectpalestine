import Image from "next/image";
import React from "react";

type propsType = {
  logo: string;
  name: string;
  description: string;
  status: 1 | 2 | 3;
};

const Company = ({ props }: { props: propsType }) => {
  return (
    <div className="bg-app--light w-full grid grid-cols-6 items-center p-2 rounded-md">
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
      <div className="col-span-3 flex flex-col items-start">
        <span className="text-3">{props.name}</span>
        <span className="text">{props.description}</span>
      </div>

      {/* Info */}
      <div className="col-span-1 flex flex-col justify-start items-center">
        <div
          className={`p-4 rounded-full ${
            props.status == 1
              ? "bg-app-red"
              : props.status == 2
              ? "bg-app-yellow"
              : "bg-app-green"
          }`}
        ></div>
        <span className="text-2">
          {props.status == 1 ? "Poor" : props.status == 2 ? "Average" : "Good"}
        </span>
      </div>
    </div>
  );
};

export { Company };
