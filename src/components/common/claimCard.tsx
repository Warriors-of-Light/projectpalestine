import { Claim } from "@/constants";
import React from "react";

interface IClaimCard {
  claims: Array<Claim>;
}

export default function ClaimTable({ claims }: IClaimCard) {
  return (
    <div className="min-w-fit overflow-scroll pr-10">
      <table className="min-w-full divide-y divide-gray-300 ">
        <thead>
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 absolute text-left left-4 text-sm font-semibold text-gray-900 sm:pl-0 lg:w-60 "
            >
              Date
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900  lg:w-40 "
            >
              Title
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900  lg:w-60 "
            >
              Reference
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900  lg:w-20 "
            >
              Score
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {claims.map((claim) => (
            <tr key={claim.claimId}>
              <td className="whitespace text-left py-4 pl-4 pr-3 text-sm font-medium sm:max-w-sm text-gray-900 sm:pl-0">
                <span className="relative left-4 "> {claim.date}</span>
              </td>
              <td className="whitespace  max-w-sm truncate px-3 py-4 text-sm sm:max-w-xs  text-gray-500">
                {claim.title}
              </td>
              <td className="whitespace max-w-md truncate px-3 py-4 text-sm text-gray-500 sm:max-w-sm">
                {claim.description}
              </td>
              <td className="whitespace max-w-md truncate px-3 py-4 text-sm sm:max-w-sm text-gray-500">
                {claim.rating}
              </td>
              <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0 ">
                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                  <span className="relative right-5"> validate </span>
                </a>
                {/** validate | flag |  */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
