import {create} from 'zustand';

const useStore = create((set) => ({
  bears: 0,
  answer1: null,
  userID: null,

  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}))