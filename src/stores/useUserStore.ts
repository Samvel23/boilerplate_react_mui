import { create, type StateCreator } from "zustand";
import { persist } from "zustand/middleware";

interface IUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  image: string;
}

type ICredentials = {
  accessToken: string;
  refreshToken: string;
};

interface IUserState {
  user: IUser | null;
  credentials: ICredentials | null;

  isInitializing: boolean;

  setUser: (user: IUser) => void;
  setCredentials: (credentials: ICredentials) => void;
  setInitializing: (value: boolean) => void;
  removeCredentials: () => void;
}

const userStoreSlice: StateCreator<IUserState> = (set) => ({
  user: null,
  credentials: {
    accessToken: "",
    refreshToken: "",
  },
  isInitializing: true,
  setUser: (user) => set({ user }),
  setCredentials: (credentials) => set({ credentials }),
  setInitializing: (value) => set({ isInitializing: value }),
  removeCredentials: () => set({ user: null, credentials: null }),
});

const persistedUserStore = persist<IUserState>(userStoreSlice, {
  name: "user",
});

export const useUserStore = create(persistedUserStore);
