import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Item, Pkmon } from "../data/type";

type Settings = {
  notification: boolean;
  volume: number;
  encounterEnabled: boolean;
};

const defaultSettings: Settings = {
  notification: true,
  volume: 50,
  encounterEnabled: false,
};

type GameState = {
  userId: string;
  username: string;
  leadPkmon: Pkmon | null;
  pkmons: Pkmon[];
  settings: Settings;
  joinedAt: number;
  playTime: number;
  pkmonsCaught: number;
  totalEncounters: number;
  stepCount: number;
  encounteredPkmon: Pkmon | null;
  inventory: Item[];
  money: number;
  setUsername: (username: string) => void;
  setLeadPkmon: (pkmon: Pkmon) => void;
  addPkmon: (pkmon: Pkmon) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  updatePlayTime: (seconds: number) => void;
  incrementPkmonsCaught: () => void;
  incrementTotalEncounters: () => void;
  incrementStepCount: () => void;
  setEncounteredPkmon: (pkmon: Pkmon | null) => void;
  addItem: (item: Item) => void;
  removeItem: (itemId: number) => void;
  useItem: (itemId: number) => void;
  setMoney: (change: number) => void;
};

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      userId: "",
      username: "",
      leadPkmon: null,
      pkmons: [],
      settings: defaultSettings,
      joinedAt: Date.now(),
      playTime: 0,
      pkmonsCaught: 0,
      totalEncounters: 0,
      stepCount: 0,
      encounteredPkmon: null,
      inventory: [],
      money: 0,
      setUsername: (username) => set({ username }),
      setLeadPkmon: (pkmon) => set({ leadPkmon: pkmon }),
      addPkmon: (pkmon) =>
        set((state) => ({ pkmons: [...state.pkmons, pkmon] })),
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      updatePlayTime: (minutes) =>
        set((state) => ({ playTime: state.playTime + minutes })),
      incrementPkmonsCaught: () =>
        set((state) => ({ pkmonsCaught: state.pkmonsCaught + 1 })),
      incrementTotalEncounters: () =>
        set((state) => ({ totalEncounters: state.totalEncounters + 1 })),
      incrementStepCount: () =>
        set((state) => ({ stepCount: state.stepCount + 1 })),
      setEncounteredPkmon: (pkmon) => set({ encounteredPkmon: pkmon }),
      addItem: (item) =>
        set((state) => {
          const existingItem = state.inventory.find((i) => i.id === item.id);
          if (existingItem) {
            return {
              inventory: state.inventory.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { inventory: [...state.inventory, item] };
        }),
      removeItem: (itemId) =>
        set((state) => ({
          inventory: state.inventory.filter((i) => i.id !== itemId),
        })),
      useItem: (itemId) =>
        set((state) => {
          const item = state.inventory.find((i) => i.id === itemId);
          if (!item) return state;
          if (item.quantity <= 1) {
            return {
              inventory: state.inventory.filter((i) => i.id !== itemId),
            };
          }
          return {
            inventory: state.inventory.map((i) =>
              i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
            ),
          };
        }),
      setMoney: (change) => set((state) => ({ money: state.money + change })),
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
          joinedAt: persistedState?.joinedAt || Date.now(),
          playTime: persistedState?.playTime || 0,
          pkmonsCaught: persistedState?.pkmonsCaught || 0,
          totalEncounters: persistedState?.totalEncounters || 0,
          stepCount: persistedState?.stepCount || 0,
          inventory: persistedState?.inventory || [],
          moeny: persistedState?.money || 0,
        };
      },
    }
  )
);
