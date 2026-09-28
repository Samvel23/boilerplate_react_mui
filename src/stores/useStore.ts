import { create } from "zustand";

interface IStoreState {
  appContent: {
    heading: string;
  };
}

export const useStore = create<IStoreState>(() => ({
  appContent: {
    heading: "React MUI Boilerplate",
  },
}));
