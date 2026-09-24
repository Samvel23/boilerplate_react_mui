import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";

interface IUser {
  accessToken: string;
}

interface IUserState {
  user: IUser | null;
  setCredentials: (user: IUser) => void;
  removeCredentials: VoidFunction;
}

const userStoreSlice: StateCreator<IUserState> = (set) => ({
  user: null,
  setCredentials: (user) => set({ user }),
  removeCredentials: () => set({ user: null }),
});

const persistedUserStore = persist<IUserState>(userStoreSlice, {
  name: "user",
});

export const useUserStore = create(persistedUserStore);
