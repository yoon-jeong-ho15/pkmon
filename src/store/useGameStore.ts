import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Item, Pkmon } from "../data/type";
import { getLevelFromExp } from "../lib/utils";
import { PKMON_SPECIES } from "../data/pkmons";
import { calculateLevelUp } from "../lib/battle";
import { storage } from "../lib/storage";

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
  joinedAt: number;
  playTime: number;
  pkmonsCaught: number;
  totalEncounters: number;
  stepCount: number;
  encounteredPkmon: Pkmon | null;
  inventory: Item[];
  money: number;
  encounterEnabled: boolean;
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
  consumeItem: (itemId: number) => void;
  setMoney: (change: number) => void;
  healLeadPkmon: (amount: number) => void;
  damageEncounteredPkmon: (damage: number) => void;
  damageLeadPkmon: (damage: number) => void;
  addExpToLeadPkmon: (exp: number) => void;
  setEncounterEnabled: (enabled: boolean) => void;
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
      encounterEnabled: false,
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
        set((state) => ({
          stepCount: state.stepCount + 1,
          money: state.money + 1
        })),
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
      consumeItem: (itemId) =>
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
      healLeadPkmon: (amount) =>
        set((state) => {
          if (!state.leadPkmon) return state;
          const newHp = Math.min(
            state.leadPkmon.hp + amount,
            state.leadPkmon.maxHp
          );
          return {
            leadPkmon: { ...state.leadPkmon, hp: newHp },
          };
        }),
      damageEncounteredPkmon: (damage) =>
        set((state) => {
          if (!state.encounteredPkmon) return state;
          const newHp = Math.max(0, state.encounteredPkmon.hp - damage);
          return {
            encounteredPkmon: { ...state.encounteredPkmon, hp: newHp },
          };
        }),
      damageLeadPkmon: (damage) =>
        set((state) => {
          if (!state.leadPkmon) return state;
          const newHp = Math.max(0, state.leadPkmon.hp - damage);
          return {
            leadPkmon: { ...state.leadPkmon, hp: newHp },
          };
        }),
      addExpToLeadPkmon: (exp) =>
        set((state) => {
          if (!state.leadPkmon) return state;

          const species = PKMON_SPECIES.find(
            (s) => s.id === state.leadPkmon!.id
          );
          if (!species) return state;

          // 순수 함수로 레벨업 계산
          const levelUpResult = calculateLevelUp(
            state.leadPkmon,
            species,
            exp,
            getLevelFromExp
          );

          return {
            leadPkmon: {
              ...state.leadPkmon,
              level: levelUpResult.newLevel,
              exp: levelUpResult.newExp,
              maxHp: levelUpResult.newMaxHp,
              atk: levelUpResult.newAtk,
              def: levelUpResult.newDef,
            },
          };
        }),
      setEncounterEnabled: (enabled) =>
        set((state) => {
          if (!enabled && state.leadPkmon) {
            // false로 바뀔 때 체력 회복
            return {
              encounterEnabled: enabled,
              leadPkmon: { ...state.leadPkmon, hp: state.leadPkmon.maxHp },
            };
          }
          return { encounterEnabled: enabled };
        }),
    }),
    {
      name: "pkmon-storage",
      version: 1,
      storage: createJSONStorage(() => storage),
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
