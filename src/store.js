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
  PostTemporalDistance1: null,
  PostTemporalDistance2: null,

  // Post Behavioral Willigness
  PostAocietalWill1: null,
  PostAocietalWill2: null,
  PostAocietalWill3: null,
  PostAocietalWill4: null,
  PostAocietalWill5: null,
  PostAocietalWill6: null,
  PostAocietalWill7: null,
  PostAersonalWill1: null,
  PostAersonalWill2: null,
  PostAersonalWill3: null,
  PostAersonalWill4: null,
  PostAersonalWill5: null,
  PostAersonalWill6: null,
  PostAdvocacyIndex1: null,
  PostAdvocacyIndex2: null,
  PostAdvocacyIndex3: null,
  PostAdvocacyIndex4: null,
}))
