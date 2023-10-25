import { Claim } from "@/constants";
import React from "react";

interface IClaimCard {
  claim: Claim;
}

export default function ClaimCard({ claim }: IClaimCard) {
  const { claimId, title, description, date, rating, refrences } = claim;

  return (
    <table className="min-w-full divide-y divide-gray-300 overflow-auto">
      <thead>
        <tr>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
          >
            Name
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Title
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Email
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Vote
          </th>
          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        <tr key={claimId}>
          <td className="whitespace min-w-fit py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
            {date}
          </td>
          <td className="whitespace-wrap sm:max-w-xs max-w-sm truncate px-3 py-4 text-sm text-gray-500">
            {title}
          </td>
          <td className="whitespace max-w-md truncate px-3 py-4 text-sm text-gray-500">
            {description}
          </td>
          <td className="whitespace max-w-md truncate px-3 py-4 text-sm text-gray-500">
            {refrences[0].title}
          </td>
          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
            <a href="#" className="text-indigo-600 hover:text-indigo-900">
              Edit<span className="sr-only">, {title}</span>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

// <div className="bg-app-primary flex justify-between items-center border-l-2 border-app--primary p-4 rounded-lg">
//       <div className="text-3 w-1/2">{date}</div>
//       <div className="text-1 w-1/2">{description}</div>
//     </div>
