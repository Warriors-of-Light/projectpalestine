import { Company } from "@/constants";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ICompanyStore {
  companiesMap: Map<string, Company>;
  setCompaniesMap: (companiesMap: Map<string, Company>) => void;
}


export const useCompaniesStore = create<ICompanyStore>()(
  devtools(
    persist(
      (set) => ({
        companiesMap: new Map(),
        setCompaniesMap: (companiesMap: Map<string, Company>) =>
          set({ companiesMap }),
      }),
      {
        name: "companies-storage",
      }
    )
  )
);
