import { Incident } from "@/constants";
import { useUserStore } from "@/store/useUserStore";
import { Stack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";

interface IClaimCard {
  incidents: Array<Incident>;
  companyId: string;
  displayClaimButton: boolean;
}

export default function ClaimTable({
  incidents,
  companyId,
  displayClaimButton,
}: IClaimCard) {
  const router = useRouter();
  const { user } = useUserStore();

  return !incidents || incidents.length == 0 ? (
    <div className="flex w-full h-full justify-center mt-20 ">
      {displayClaimButton && (
        <Stack>
          <span className="text-xl"> No incidents submitted yet </span>
          <button
            onClick={() =>
              router.push(user ? `/submitclaim/${companyId}` : "/login")
            }
            className="app-btn bg-red-400 text-black border-red-800"
          >
            {" "}
            Submit first incident{" "}
          </button>
        </Stack>
      )}
    </div>
  ) : (
    <div className=" overflow-x-scroll mr-20">
      <table className="min-w-full divide-y divide-gray-300 ">
        <thead>
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0 lg:w-40 "
            >
              <span className="relative left-4 "> Date </span>
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
              Validated
            </th>
            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {incidents.map((incident) => (
            <tr key={incident.incidentId}>
              <td className="whitespace text-left py-4 pl-4 pr-3 text-sm font-medium sm:max-w-sm text-gray-900 sm:pl-0">
                <span className="relative left-4 sm:w-400 ">
                  {" "}
                  {incident.date}
                </span>
              </td>
              <td className="whitespace-normal max-w-sm w-300 truncate px-3 py-4 text-sm sm:max-w-xs  text-gray-500">
                {incident.title}
              </td>
              <td className="whitespace-normal max-w-md w-500 truncate px-3 py-4 text-sm text-gray-500 sm:max-w-sm">
                {incident.description}
                <a
                  target="_blank"
                  className="text-blue-500 hover:text-blue-800"
                  href={incident.websites[0]}
                >
                  <div className="mt-4">{incident.websites[0]}</div>
                </a>
              </td>
              <td className="whitespace max-w-md truncate px-3 py-4 text-sm sm:max-w-sm text-gray-500">
                <span>1 </span>
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
