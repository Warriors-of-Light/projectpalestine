import React from "react";
import { Claim } from "../../app/constants";

interface IComapnyHistory {
  claims: Array<Claim>;
}

export default function CompanyHistory({ claims }: IComapnyHistory) {
  return (
    <table className="mt-16 w-full whitespace-nowrap text-left text-sm leading-6">
      <colgroup>
        <col className="w-full" />
        <col />
        <col />
        <col />
      </colgroup>
      <thead className="border-b border-gray-200 text-gray-900">
        <tr>
          <th scope="col" className="px-0 py-3 font-semibold">
            Incident
          </th>
          <th
            scope="col"
            className="hidden py-3 pl-8 pr-0 text-left font-semibold sm:table-cell"
          >
            Reference
          </th>
          <th
            scope="col"
            className="hidden py-3 pl-8 pr-0 text-left font-semibold sm:table-cell"
          >
            Rating
          </th>
          <th
            scope="col"
            className="hidden py-3 pl-8 pr-0 text-left font-semibold sm:table-cell"
          >
            Vote
          </th>
        </tr>
      </thead>
      <tbody>
        {claims.map((claim) => (
          <tr key={claim.claimId} className="border-b border-gray-100">
            <td className="max-w-0 w-96 px-0 py-5 align-top">
              <div className="truncate font-medium text-gray-900">
                {claim.title}
              </div>
              <div className="truncate text-gray-500">{claim.description}</div>
            </td>
            <td className="hidden py-5 pl-8 pr-0 text-left align-middle tabular-nums truncate max-w-xs  text-gray-700 sm:table-cell">
              {claim.title}
            </td>
            <td className="hidden py-5 pl-8 pr-0 text-center align-middle tabular-nums text-xl text-gray-700 sm:table-cell">
              {claim.rating}
            </td>
            <td className="py-5 pl-8 pr-0 text-center align-middle tabular-nums text-xl text-gray-700">
              {claim.rating}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        {/* <tr>
          <th
            scope="row"
            className="px-0 pb-0 pt-6 font-normal text-gray-700 sm:hidden"
          >
            Subtotal
          </th>
          <th
            scope="row"
            colSpan={3}
            className="hidden px-0 pb-0 pt-6 text-right font-normal text-gray-700 sm:table-cell"
          >
            Subtotal
          </th>
          <td className="pb-0 pl-8 pr-0 pt-6 text-right tabular-nums text-gray-900">
            {invoice.subTotal}
          </td>
        </tr>
        <tr>
          <th scope="row" className="pt-4 font-normal text-gray-700 sm:hidden">
            Tax
          </th>
          <th
            scope="row"
            colSpan={3}
            className="hidden pt-4 text-right font-normal text-gray-700 sm:table-cell"
          >
            Tax
          </th>
          <td className="pb-0 pl-8 pr-0 pt-4 text-right tabular-nums text-gray-900">
            {invoice.tax}
          </td>
        </tr>
        <tr>
          <th
            scope="row"
            className="pt-4 font-semibold text-gray-900 sm:hidden"
          >
            Total
          </th>
          <th
            scope="row"
            colSpan={3}
            className="hidden pt-4 text-right font-semibold text-gray-900 sm:table-cell"
          >
            Total
          </th>
          <td className="pb-0 pl-8 pr-0 pt-4 text-right font-semibold tabular-nums text-gray-900">
            {invoice.total}
          </td>
        </tr> */}
      </tfoot>
    </table>
  );
}
