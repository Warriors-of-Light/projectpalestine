
import { Claim } from "@/constants";
import React from "react";

interface IClaimCard {
  claim: Claim;
}

export default function ClaimCard({ claim }: IClaimCard) {
  const { claimId, title, description, date, rating, refrences } = claim;

  return (
    <div className="bg-app-primary flex justify-between items-center border-l-2 border-app--primary p-4 rounded-lg">
      <div className="text-3 w-1/2">{date}</div>
      <div className="text-1 w-1/2">{description}</div>
    </div>
  );
}
