import { v4 as uuidv4 } from "uuid";
import { PKMON_SPECIES } from "./pkmons";
import type { Pkmon, PkmonSpecies } from "./type";

export function createMonster(species: PkmonSpecies, level: number = 1): Pkmon {
  const { baseStats, growth } = species;

  const maxHp = baseStats.hp + (level - 1) * growth.hp;
  const maxSp = baseStats.sp + (level - 1) * growth.sp;
  const atk = baseStats.atk + (level - 1) * growth.atk;

  return {
    id: species.id,
    name: species.name,
    sprite: species.sprite,
    level,
    hp: maxHp,
    maxHp,
    sp: maxSp,
    maxSp,
    atk,
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
