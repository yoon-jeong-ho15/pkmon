import type { PkmonSpecies } from "./type";

export const PKMON_SPECIES: PkmonSpecies[] = [
  // Starters
  {
    id: 1,
    name: "Flambit",
    rarity: "starter",
    baseStats: { hp: 40, atk: 15, def: 7 },
    growth: { hp: 3, atk: 2, def: 1 },
  },
  {
    id: 2,
    name: "Aquabit",
    rarity: "starter",
    baseStats: { hp: 50, atk: 9, def: 12 },
    growth: { hp: 4, atk: 1, def: 2 },
  },
  {
    id: 3,
    name: "Leafbit",
    rarity: "starter",
    baseStats: { hp: 45, atk: 12, def: 10 },
    growth: { hp: 3, atk: 1, def: 1 },
  },
  // Common
  {
    id: 4,
    name: "Bytebug",
    rarity: "common",
    baseStats: { hp: 15, atk: 4, def: 4 },
    growth: { hp: 2, atk: 1, def: 1 },
  },
  // {
  //   id: 5,
  //   name: "Cachecat",
  //   rarity: "common",
  //   baseStats: { hp: 18, sp: 10, atk: 5, def: 5 },
  //   growth: { hp: 3, sp: 2, atk: 1, def: 1 },
  // },
  // // Uncommon
  // {
  //   id: 6,
  //   name: "Pinguin",,
  //   rarity: "uncommon",
  //   baseStats: { hp: 25, sp: 15, atk: 7, def: 8 },
  //   growth: { hp: 4, sp: 2, atk: 1, def: 1 },
  // },
  // {
  //   id: 7,
  //   name: "Routowl",
  //   rarity: "uncommon",
  //   baseStats: { hp: 23, sp: 18, atk: 6, def: 7 },
  //   growth: { hp: 3, sp: 3, atk: 1, def: 1 },
  // },
  // // Rare
  // {
  //   id: 8,
  //   name: "Cryptowolf",
  //   rarity: "rare",
  //   baseStats: { hp: 28, sp: 14, atk: 9, def: 7 },
  //   growth: { hp: 4, sp: 2, atk: 2, def: 1 },
  // },
  // {
  //   id: 9,
  //   name: "Cloudrake",
  //   rarity: "rare",
  //   baseStats: { hp: 30, sp: 20, atk: 8, def: 9 },
  //   growth: { hp: 5, sp: 3, atk: 1, def: 1 },
  // },
  // // Epic
  // {
  //   id: 10,
  //   name: "Hexaphoenix",
  //   rarity: "epic",
  //   baseStats: { hp: 35, sp: 25, atk: 12, def: 11 },
  //   growth: { hp: 5, sp: 4, atk: 2, def: 2 },
  // },
];
