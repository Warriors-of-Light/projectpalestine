import { User } from "@/constants";
import { UserCredential } from "firebase/auth";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface IUserStore {
  user: UserCredential | null;
  setUser: (user: UserCredential | null) => void;
}

export const useUserStore = create<IUserStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user: UserCredential | null) => set({ user }),
      }),
      {
        name: "user-storage",
      }
    )
  )
);
