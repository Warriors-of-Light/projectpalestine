"use client";

import { useRouter } from "next/navigation";

interface ICompanyProfileProps {
  params: { companyId: string };
}

export default function CompanyProfile({ params }: ICompanyProfileProps) {
  const router = useRouter();
  return (
    <>
      <p>Testing</p>

      <p>{params.companyId}</p>
    </>
  );
}
