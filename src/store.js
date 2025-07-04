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
