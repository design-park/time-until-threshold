import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useStore = create()(
  persist(
    (set, get) => ({
      userID: "",
      condition: "",

      // Demographic variables
      gender: "",
      age: "",
      education: "",
      partyAffiliation: "",
      income: "",
      religion: "",

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

      // info seen
      trainingVisInfoSeen: false,
      targetVisInfoSeen: false,

      // Chart seen
      trainingChartSeen: false,
      chartSeen: false,

      // Post Emotion
      postValence: null,
      postArousal: null,

      // Post Temporal Distance
      postTempDistance1: null,
      postTempDistance2: null,

      // Post Behavioral Willigness
      postSocietal1: null,
      postSocietal2: null,
      postSocietal3: null,
      postSocietal4: null,
      postSocietal5: null,
      postSocietal6: null,
      postSocietal7: null,
      postPersonal1: null,
      postPersonal2: null,
      postPersonal3: null,
      postPersonal4: null,
      postPersonal5: null,
      postPersonal6: null,
      postAdvocacy1: null,
      postAdvocacy2: null,
      postAdvocacy3: null,
      postAdvocacy4: null,

      storeParticipantInfo: (userID, condition) => set({ userID, condition }),
      storeDemographicInfo: (
        gender,
        age,
        education,
        partyAffiliation,
        income,
        religion
      ) => set({ gender, age, education, partyAffiliation, income, religion }),
      storeEmotionInfo(step, valence, arousal) {
        if (step === "pre") {
          set({ valence, arousal });
        } else {
          set({ postValence: valence, postArousal: arousal });
        }
      },
      storeTempDistanceInfo: (step, tempDistance1, tempDistance2) =>
        step === "pre"
          ? set({ tempDistance1, tempDistance2 })
          : set({
              postTempDistance1: tempDistance1,
              postTempDistance2: tempDistance2,
            }),
      storeWillingnessInfo: (
        step,
        societal1,
        societal2,
        societal3,
        societal4,
        societal5,
        societal6,
        societal7,
        personal1,
        personal2,
        personal3,
        personal4,
        personal5,
        personal6,
        advocacy1,
        advocacy2,
        advocacy3,
        advocacy4
      ) => {
        console.log("HEY");
        if (step === "pre") {
          console.log("Storing pre willingness info");

          return set({
            societal1,
            societal2,
            societal3,
            societal4,
            societal5,
            societal6,
            societal7,
            personal1,
            personal2,
            personal3,
            personal4,
            personal5,
            personal6,
            advocacy1,
            advocacy2,
            advocacy3,
            advocacy4,
          });
        } else {
          return set({
            postSocietal1: societal1,
            postSocietal2: societal2,
            postSocietal3: societal3,
            postSocietal4: societal4,
            postSocietal5: societal5,
            postSocietal6: societal6,
            postSocietal7: societal7,
            postPersonal1: personal1,
            postPersonal2: personal2,
            postPersonal3: personal3,
            postPersonal4: personal4,
            postPersonal5: personal5,
            postPersonal6: personal6,
            postAdvocacy1: advocacy1,
            postAdvocacy2: advocacy2,
            postAdvocacy3: advocacy3,
            postAdvocacy4: advocacy4,
          });
        }
      },

      setTrainingVisInfoSeen: (seen) => set({ trainingVisInfoSeen: seen }),
      setTargetVisInfoSeen: (seen) => set({ targetVisInfoSeen: seen }),
      setTrainingChartSeen: (seen) => set({ trainingChartSeen: seen }),
      setChartSeen: (seen) => set({ chartSeen: seen }),

      reset: () =>
        set({
          userID: "",
          condition: "",
          gender: "",
          age: "",
          education: "",
          partyAffiliation: "",
          income: "",
          religion: "",
          valence: null,
          arousal: null,
          tempDistance1: null,
          tempDistance2: null,
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
          trainingVisInfoSeen: false,
          targetVisInfoSeen: false,
          trainingChartSeen: false,
          chartSeen: false,
          postValence: null,
          postArousal: null,
          postTempDistance1: null,
          postTempDistance2: null,
          postSocietal1: null,
          postSocietal2: null,
          postSocietal3: null,
          postSocietal4: null,
          postSocietal5: null,
          postSocietal6: null,
          postSocietal7: null,
          postPersonal1: null,
          postPersonal2: null,
          postPersonal3: null,
          postPersonal4: null,
          postPersonal5: null,
          postPersonal6: null,
          postAdvocacy1: null,
          postAdvocacy2: null,
          postAdvocacy3: null,
          postAdvocacy4: null,
        }),
    }),
    {
      name: "time-until-threshold-storage", // unique name
      storage: createJSONStorage(() => localStorage), // use localStorage as the storage
    }
  )
);
