import {create} from 'zustand';

const useStore = create((set) => ({
  userID: null,
  condition: "control",
  tempDistance1: null,
  tempDistance2: null,
  societalWill1: null,
  societalWill2: null,
  societalWill3: null,
  societalWill4: null,
  societalWill5: null,
  societalWill6: null,
  societalWill7: null,
  personalWill1: null,
  personalWill2: null,
  personalWill3: null,
  personalWill4: null,
  personalWill5: null,
  personalWill6: null,
  advocacyIndex1: null,
  advocacyIndex2: null,
  advocacyIndex3: null,
  advocacyIndex4: null,


  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}))
