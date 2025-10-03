import { v4 as uuidv4 } from "uuid";
import { PKMON_SPECIES } from "../data/pkmons";
import type { PkmonSpecies, Pkmon } from "../data/type";

export function getExpForLevel(level: number): number {
  if (level <= 1) return 0;
  return Math.floor(Math.pow(level, 3) * 0.8);
}

export function getLevelFromExp(exp: number): number {
  let level = 1;
  while (getExpForLevel(level + 1) <= exp) {
    level++;
  }
  return level;
}

export function getExpToNextLevel(currentExp: number): {
  current: number;
  needed: number;
  percentage: number;
} {
  const currentLevel = getLevelFromExp(currentExp);
  const currentLevelExp = getExpForLevel(currentLevel);
  const nextLevelExp = getExpForLevel(currentLevel + 1);

  const expInCurrentLevel = currentExp - currentLevelExp;
  const expNeededForLevel = nextLevelExp - currentLevelExp;

  return {
    current: expInCurrentLevel,
    needed: expNeededForLevel,
    percentage: (expInCurrentLevel / expNeededForLevel) * 100,
  };
}

export function createMonster(species: PkmonSpecies, level: number = 1): Pkmon {
  const { baseStats, growth } = species;

  const exp = getExpForLevel(level);
  const maxHp = baseStats.hp + (level - 1) * growth.hp;
  const maxSp = baseStats.sp + (level - 1) * growth.sp;
  const atk = baseStats.atk + (level - 1) * growth.atk;
  const def = baseStats.def + (level - 1) * growth.def;

  return {
    id: species.id,
    name: species.name,
    level,
    exp,
    hp: maxHp,
    maxHp,
    sp: maxSp,
    maxSp,
    atk,
    def,
  };
}

export function initializeGame(username: string, starterId: number) {
  const species = PKMON_SPECIES.find((p) => p.id === starterId);

  if (!species) {
    throw new Error(`Starter with id ${starterId} not found`);
  }

  const starter = createMonster(species, 1);

  const gameData = {
    userId: uuidv4(),
    username,
    leadPkmon: starter,
    joinedAt: Date.now(),
    playTime: 0,
  };

  localStorage.setItem("pkmon-storage", JSON.stringify({ state: gameData }));
}
