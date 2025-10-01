import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Pkmon } from "../lib/type";

type Settings = {
  notification: boolean;
  volume: number;
};

const defaultSettings: Settings = {
  notification: true,
  volume: 50,
};

type GameState = {
  userId: string;
  username: string;
  leadPkmon: Pkmon | null;
  pkmons: Pkmon[];
  settings: Settings;
  setUsername: (username: string) => void;
  setLeadPkmon: (pkmon: Pkmon) => void;
  addPkmon: (pkmon: Pkmon) => void;
  updateSettings: (settings: Partial<Settings>) => void;
};

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      userId: "",
      username: "",
      leadPkmon: null,
      pkmons: [],
      settings: defaultSettings,
      setUsername: (username) => set({ username }),
      setLeadPkmon: (pkmon) => set({ leadPkmon: pkmon }),
      addPkmon: (pkmon) =>
        set((state) => ({ pkmons: [...state.pkmons, pkmon] })),
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
    }),
    {
      name: "pkmon-storage",
      version: 1,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      migrate: (state: unknown, version: number) => {
        const persistedState = state as Partial<GameState>;
        return {
          userId: persistedState?.userId || "",
          username: persistedState?.username || "",
          leadPkmon: persistedState?.leadPkmon || null,
          pkmons: persistedState?.pkmons || [],
          settings: {
            // 설정 덮어쓰기
            ...defaultSettings,
            ...(persistedState?.settings || {}),
          },
        };
      },
    }
  )
);
