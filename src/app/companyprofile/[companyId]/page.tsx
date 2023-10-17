"use client";

import CompanyHistory from "@/components/companyHistory";
import Header from "@/components/header";
import { useRouter } from "next/navigation";

interface ICompanyProfileProps {
  params: { companyId: string };
}

export default function CompanyProfile({ params }: ICompanyProfileProps) {
  const router = useRouter();
  return (
    <main className="bg-app-light flex flex-col items-center justify-start h-screen w-screen gap-4">
      <Header />
      <div className="flex w-full absolute">
        <div></div>
        <div className="flex lg:w-1200 p-10 mx-auto justify-start absolute left-0">
          <CompanyHistory
            claims={[
              {
                claimId: "11111",
                description:
                  "Provided Israeli Soldiers with 4000 Meals during the the second bombing of Gaza",
                rating: "2",
                title:
                  "Funded Israeli Soldiers with Mealsa sadadsadsaihdisajdsiaojdsiaojdsiaojdsaiojdsiaojdsaiodjsiodjs",
                refrences: [
                  {
                    link: "nolink",
                    refrenceId: "1111",

                    title: "Macdonalds provided Israeli soldiers ",
                  },
                ],
              },
            ]}
          />
        </div>
      </div>
    </main>
  );
}
