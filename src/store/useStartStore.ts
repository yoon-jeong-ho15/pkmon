import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

type Step = "menu" | "dialogue" | "name" | "starter";

type StartState = {
  step: Step;
  goBack: () => void;
  goNext: () => void;
  userId: string;
  username: string;
  setUsername: (username: string) => void;
  starter: string;
  setStarter: (name: string) => void;
};

const stepOrder: Step[] = ["menu", "dialogue", "name", "starter"];

export const useStartStore = create<StartState>()(
  persist(
    (set, get) => ({
      step: "menu",
      goBack: () => {
        const currentStep = get().step;
        const currentIndex = stepOrder.indexOf(currentStep);
        if (currentIndex > 0) {
          set({ step: stepOrder[currentIndex - 1] });
        }
      },
      goNext: () => {
        const currentStep = get().step;
        const currentIndex = stepOrder.indexOf(currentStep);
        if (currentIndex < stepOrder.length) {
          set({ step: stepOrder[currentIndex + 1] });
        }
      },
      userId: uuidv4(),
      username: "",
      setUsername: (username) => set({ username }),
      starter: "red",
      setStarter: (starter) => set({ starter }),
    }),
    {
      name: "pkmon-storage",
      partialize: (state) => ({
        userId: state.userId,
        username: state.username,
        starter: state.starter,
      }),
    }
  )
);
