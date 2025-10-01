import { create } from "zustand";

type Step = "menu" | "dialogue" | "name" | "starter";

type StartState = {
  step: Step;
  goBack: () => void;
  goNext: () => void;
  username: string;
  setUsername: (username: string) => void;
  starter: number;
  starterName: string;
  setStarter: (id: number, name: string) => void;
};

const stepOrder: Step[] = ["menu", "dialogue", "name", "starter"];

export const useStartStore = create<StartState>((set, get) => ({
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
  username: "",
  setUsername: (username) => set({ username }),
  starter: 1,
  starterName: "Flambit",
  setStarter: (starter, starterName) => set({ starter, starterName }),
}));
