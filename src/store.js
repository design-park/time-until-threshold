import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useStore = create()(
  persist(
    (set, get) => ({
      userID: "",
      condition: "",
      startTimestamp: null,
      endTimestamp: null,

      // Demographic variables
      gender: "",
      age: "",
      education: "",
      climateScienceKnowledge: "",
      climateDiscussionFrequency: "",
      climateGraphConfidency: "",

      //Emotion
      valence: null,
      arousal: null,

      // Temporal Distance
      tempDistance1: null,
      tempDistance2: null,
      yearsUntilImpact: null,

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
      postYearsUntilImpact: null,

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

      // Quiz
      q1Answer: null,
      q1Confidence: null,
      q2Answer: null,
      q2Confidence: null,
      q3Answer: null,
      q3Confidence: null,
      q4Answer: null,
      q4Confidence: null,
      q5Answer: null,
      q5Confidence: null,
      quizCompleted: false,

      // Training
      trainingStep: 1,

      submitted: false,

      // Stored responses (not reset on reset)
      storedResponses: [],

      storeParticipantInfo: (userID, condition) =>
        set({ userID, condition, startTimestamp: Date.now() }),
      storeEndTimestamp: () => set({ endTimestamp: Date.now() }),
      storeDemographicInfo: (
        gender,
        age,
        education,
        climateScienceKnowledge,
        climateDiscussionFrequency,
        climateGraphConfidency
      ) => set({ gender, age, education, climateScienceKnowledge, climateDiscussionFrequency, climateGraphConfidency }),
      storeEmotionInfo(step, valence, arousal) {
        if (step === "pre") {
          set({ valence, arousal });
        } else {
          set({ postValence: valence, postArousal: arousal });
        }
      },
      storeTempDistanceInfo: (
        step,
        tempDistance1,
        tempDistance2,
        yearsUntilImpact
      ) =>
        step === "pre"
          ? set({ tempDistance1, tempDistance2, yearsUntilImpact })
          : set({
              postTempDistance1: tempDistance1,
              postTempDistance2: tempDistance2,
              postYearsUntilImpact: yearsUntilImpact,
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
      setQuizCompleted: (completed) => set({ quizCompleted: completed }),
      setTrainingStep: (step) => set({ trainingStep: step }),

      reset: () =>
        set({
          userID: "",
          condition: "",
          startTimestamp: null,
          endTimestamp: null,
          gender: "",
          age: "",
          education: "",
          climateScienceKnowledge: "",
          climateDiscussionFrequency: "",
          climateGraphConfidency: "",
          valence: null,
          arousal: null,
          tempDistance1: null,
          tempDistance2: null,
          yearsUntilImpact: null,
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
          postYearsUntilImpact: null,
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
          q1Answer: null,
          q1Confidence: null,
          q2Answer: null,
          q2Confidence: null,
          q3Answer: null,
          q3Confidence: null,
          q4Answer: null,
          q4Confidence: null,
          q5Answer: null,
          q5Confidence: null,
          quizCompleted: false,
          trainingStep: 1,
          submitted: false,
        }),
      setQ1Answer: (answer) => set({ q1Answer: answer }),
      setQ1Confidence: (confidence) => set({ q1Confidence: confidence }),
      setQ2Answer: (answer) => set({ q2Answer: answer }),
      setQ2Confidence: (confidence) => set({ q2Confidence: confidence }),
      setQ3Answer: (answer) => set({ q3Answer: answer }),
      setQ3Confidence: (confidence) => set({ q3Confidence: confidence }),
      setQ4Answer: (answer) => set({ q4Answer: answer }),
      setQ4Confidence: (confidence) => set({ q4Confidence: confidence }),
      setQ5Answer: (answer) => set({ q5Answer: answer }),
      setQ5Confidence: (confidence) => set({ q5Confidence: confidence }),
      getCurrentResponse: () => {
        return {
          userID: get().userID,
          condition: get().condition,
          startTimestamp: get().startTimestamp,
          endTimestamp: get().endTimestamp,
          gender: get().gender,
          age: get().age,
          education: get().education,
          climateScienceKnowledge: get().climateScienceKnowledge,
          climateDiscussionFrequency: get().climateDiscussionFrequency,
          climateGraphConfidency: get().climateGraphConfidency,
          valence: get().valence,
          arousal: get().arousal,
          tempDistance1: get().tempDistance1,
          tempDistance2: get().tempDistance2,
          yearsUntilImpact: get().yearsUntilImpact,
          societal1: get().societal1,
          societal2: get().societal2,
          societal3: get().societal3,
          societal4: get().societal4,
          societal5: get().societal5,
          societal6: get().societal6,
          societal7: get().societal7,
          personal1: get().personal1,
          personal2: get().personal2,
          personal3: get().personal3,
          personal4: get().personal4,
          personal5: get().personal5,
          personal6: get().personal6,
          advocacy1: get().advocacy1,
          advocacy2: get().advocacy2,
          advocacy3: get().advocacy3,
          advocacy4: get().advocacy4,
          postValence: get().postValence,
          postArousal: get().postArousal,
          postTempDistance1: get().postTempDistance1,
          postTempDistance2: get().postTempDistance2,
          postYearsUntilImpact: get().postYearsUntilImpact,
          postSocietal1: get().postSocietal1,
          postSocietal2: get().postSocietal2,
          postSocietal3: get().postSocietal3,
          postSocietal4: get().postSocietal4,
          postSocietal5: get().postSocietal5,
          postSocietal6: get().postSocietal6,
          postSocietal7: get().postSocietal7,
          postPersonal1: get().postPersonal1,
          postPersonal2: get().postPersonal2,
          postPersonal3: get().postPersonal3,
          postPersonal4: get().postPersonal4,
          postPersonal5: get().postPersonal5,
          postPersonal6: get().postPersonal6,
          postAdvocacy1: get().postAdvocacy1,
          postAdvocacy2: get().postAdvocacy2,
          postAdvocacy3: get().postAdvocacy3,
          postAdvocacy4: get().postAdvocacy4,
          q1Answer: get().q1Answer,
          q1Confidence: get().q1Confidence,
          q2Answer: get().q2Answer,
          q2Confidence: get().q2Confidence,
          q3Answer: get().q3Answer,
          q3Confidence: get().q3Confidence,
          q4Answer: get().q4Answer,
          q4Confidence: get().q4Confidence,
          q5Answer: get().q5Answer,
          q5Confidence: get().q5Confidence,
        };
      },
      storeResponse() {
        const responses = get().storedResponses;
        const newResponse = {
          userID: get().userID,
          condition: get().condition,
          startTimestamp: get().startTimestamp,
          endTimestamp: get().endTimestamp,
          gender: get().gender,
          age: get().age,
          education: get().education,
          climateScienceKnowledge: get().climateScienceKnowledge,
          climateDiscussionFrequency: get().climateDiscussionFrequency,
          climateGraphConfidency: get().climateGraphConfidency,
          valence: get().valence,
          arousal: get().arousal,
          tempDistance1: get().tempDistance1,
          tempDistance2: get().tempDistance2,
          yearsUntilImpact: get().yearsUntilImpact,
          societal1: get().societal1,
          societal2: get().societal2,
          societal3: get().societal3,
          societal4: get().societal4,
          societal5: get().societal5,
          societal6: get().societal6,
          societal7: get().societal7,
          personal1: get().personal1,
          personal2: get().personal2,
          personal3: get().personal3,
          personal4: get().personal4,
          personal5: get().personal5,
          personal6: get().personal6,
          advocacy1: get().advocacy1,
          advocacy2: get().advocacy2,
          advocacy3: get().advocacy3,
          advocacy4: get().advocacy4,
          postValence: get().postValence,
          postArousal: get().postArousal,
          postTempDistance1: get().postTempDistance1,
          postTempDistance2: get().postTempDistance2,
          postYearsUntilImpact: get().postYearsUntilImpact,
          postSocietal1: get().postSocietal1,
          postSocietal2: get().postSocietal2,
          postSocietal3: get().postSocietal3,
          postSocietal4: get().postSocietal4,
          postSocietal5: get().postSocietal5,
          postSocietal6: get().postSocietal6,
          postSocietal7: get().postSocietal7,
          postPersonal1: get().postPersonal1,
          postPersonal2: get().postPersonal2,
          postPersonal3: get().postPersonal3,
          postPersonal4: get().postPersonal4,
          postPersonal5: get().postPersonal5,
          postPersonal6: get().postPersonal6,
          postAdvocacy1: get().postAdvocacy1,
          postAdvocacy2: get().postAdvocacy2,
          postAdvocacy3: get().postAdvocacy3,
          postAdvocacy4: get().postAdvocacy4,
          q1Answer: get().q1Answer,
          q1Confidence: get().q1Confidence,
          q2Answer: get().q2Answer,
          q2Confidence: get().q2Confidence,
          q3Answer: get().q3Answer,
          q3Confidence: get().q3Confidence,
          q4Answer: get().q4Answer,
          q4Confidence: get().q4Confidence,
          q5Answer: get().q5Answer,
          q5Confidence: get().q5Confidence,
        };
        set({ storedResponses: [...responses, newResponse], submitted: true });
      },
      getFewestCondition: () => {
        const responses = get().storedResponses;
        const controlCount = responses.filter(
          (response) => response.condition === "control"
        ).length;
        const treatmentCount = responses.filter(
          (response) => response.condition === "treatment"
        ).length;
        return controlCount < treatmentCount ? "control" : "treatment";
      },
      deleteResponseWithID: (userID) => {
        const responses = get().storedResponses.filter(
          (response) => response.userID !== userID
        );
        set({ storedResponses: responses });
      },
      deleteAllResponses: () => set({ storedResponses: [] }),
    }),
    {
      name: "time-until-threshold-storage", // unique name
      storage: createJSONStorage(() => localStorage), // use localStorage as the storage
    }
  )
);
