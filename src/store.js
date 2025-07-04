import {create} from 'zustand';

export const useStore = create((set, get) => ({
  userID: '',
  condition: "control",

  // Demographic variables
  gender: '',
  age: '',
  education: '',
  partyAffiliation: '',
  income: '',
  religion: '',
  
  //Emotion
  valence: null,
  arousal: null, 

  // Temporal Distance
  tempDistance1: null,
  tempDistance2: null,

  //Behavioral Willigness
  societal1: null,
  societal2: null,
  societal3: null,
  societal4: null,
  societal5: null,
  societal6: null,
  societal7: null,
  personal1: null,
  personal2: null,
  personal3: null,
  personal4: null,
  personal5: null,
  personal6: null,
  advocacy1: null,
  advocacy2: null,
  advocacy3: null,
  advocacy4: null,

  // Post Emotion
  postValence: null,
  postArousal: null,

  // Post Temporal Distance
  PostTempDistance1: null,
  PostTempDistance2: null,

  // Post Behavioral Willigness
  PostSocietal1: null,
  PostSocietal2: null,
  PostSocietal3: null,
  PostSocietal4: null,
  PostSocietal5: null,
  PostSocietal6: null,
  PostSocietal7: null,
  PostPersonal1: null,
  PostPersonal2: null,
  PostPersonal3: null,
  PostPersonal4: null,
  PostPersonal5: null,
  PostPersonal6: null,
  PostAdvocacy1: null,
  PostAdvocacy2: null,
  PostAdvocacy3: null,
  PostAdvocacy4: null,

  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),

  setUserID: (userID) => set({ userID }),
}))
