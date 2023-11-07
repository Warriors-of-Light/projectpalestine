import { Company } from "@/constants";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ISubmittedCompanyStore {
  submittedCompaniesMap: Map<string, Company>;
  setSubmittedCompaniesMap: (
    submittedCompaniesMap: Map<string, Company>
  ) => void;
}

export const useSubmittedCompaniesStore = create<ISubmittedCompanyStore>()(
  devtools(
    persist(
      (set) => ({
        submittedCompaniesMap: new Map(),
        setSubmittedCompaniesMap: (
          submittedCompaniesMap: Map<string, Company>
        ) => set({ submittedCompaniesMap }),
      }),
      {
        name: "submitted-companies-storage",
      }
    )
  )
);
