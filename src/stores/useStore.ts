import { create } from "zustand";

interface IStoreState {
  number: number;
  appContent: {
    heading: string;
  };
  incrementNumber: VoidFunction;
}

export const useStore = create<IStoreState>((set) => ({
  number: 0,
  appContent: {
    heading: "React MUI Boilerplate",
  },

  incrementNumber: () => set((state) => ({ number: state.number + 1 })),
}));
