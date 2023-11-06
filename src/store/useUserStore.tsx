import { User } from "@/constants";
import { UserCredential } from "firebase/auth";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface IUserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<IUserStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user: User | null) => set({ user }),
      }),
      {
        name: "user-storage",
      }
    )
  )
);
