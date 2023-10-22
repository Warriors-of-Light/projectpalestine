import { Company, User } from "@/constants";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ICompanyStore {
  companiesDic: { [key: string]: Company }[];
  setCompaniesDic: (companiesDic: { [key: string]: Company }) => void;
}

export const useCompaniesStore = create<ICompanyStore>()(
  devtools(
    persist(
      (set) => ({
        companiesDic: [],
        setCompaniesDic: (companiesDic: { [key: string]: Company }) =>
          set({ ...companiesDic }),
      }),
      {
        name: "companies-storage",
      }
    )
  )
);
