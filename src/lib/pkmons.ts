import type { PkmonSpecies } from "./type";

export const PKMON_SPECIES: PkmonSpecies[] = [
  // Starters
  {
    id: 1,
    name: "Flambit",
    sprite: "🔥",
    rarity: "common",
    baseStats: { hp: 20, sp: 10, atk: 6 },
    growth: { hp: 3, sp: 2, atk: 1 },
  },
  {
    id: 2,
    name: "Aquabit",
    sprite: "💧",
    rarity: "common",
    baseStats: { hp: 22, sp: 12, atk: 5 },
    growth: { hp: 3, sp: 2, atk: 1 },
  },
  {
    id: 3,
    name: "Leafbit",
    sprite: "🌿",
    rarity: "common",
    baseStats: { hp: 21, sp: 11, atk: 5 },
    growth: { hp: 3, sp: 2, atk: 1 },
  },
  // Common
  {
    id: 4,
    name: "Bytebug",
    sprite: "🐛",
    rarity: "common",
    baseStats: { hp: 15, sp: 8, atk: 4 },
    growth: { hp: 2, sp: 1, atk: 1 },
  },
  {
    id: 5,
    name: "Cachecat",
    sprite: "🐱",
    rarity: "common",
    baseStats: { hp: 18, sp: 10, atk: 5 },
    growth: { hp: 3, sp: 2, atk: 1 },
  },
  // Uncommon
  {
    id: 6,
    name: "Pinguin",
    sprite: "🐧",
    rarity: "uncommon",
    baseStats: { hp: 25, sp: 15, atk: 7 },
    growth: { hp: 4, sp: 2, atk: 1 },
  },
  {
    id: 7,
    name: "Routowl",
    sprite: "🦉",
    rarity: "uncommon",
    baseStats: { hp: 23, sp: 18, atk: 6 },
    growth: { hp: 3, sp: 3, atk: 1 },
  },
  // Rare
  {
    id: 8,
    name: "Cryptowolf",
    sprite: "🐺",
    rarity: "rare",
    baseStats: { hp: 28, sp: 14, atk: 9 },
    growth: { hp: 4, sp: 2, atk: 2 },
  },
  {
    id: 9,
    name: "Cloudrake",
    sprite: "🐉",
    rarity: "rare",
    baseStats: { hp: 30, sp: 20, atk: 8 },
    growth: { hp: 5, sp: 3, atk: 1 },
  },
  // Epic
  {
    id: 10,
    name: "Hexaphoenix",
    sprite: "🔱",
    rarity: "epic",
    baseStats: { hp: 35, sp: 25, atk: 12 },
    growth: { hp: 5, sp: 4, atk: 2 },
  },
];
