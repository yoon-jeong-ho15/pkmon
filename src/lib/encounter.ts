import { useGameStore } from "../store/useGameStore";
import { PKMON_SPECIES } from "../data/pkmons";
import { createMonster } from "./utils";
import type { Pkmon, PkmonSpecies } from "../data/type";

// 인카운터 발생 확률 (1/N)
const ENCOUNTER_RATE = 10;

/**
 * 랜덤 몬스터 생성
 */
export function generateRandomPkmon(
  availableSpecies: PkmonSpecies[],
  randomFn: () => number = Math.random
): Pkmon {
  // common 레어리티 몬스터만 선택
  const commonPkmons = availableSpecies.filter((p) => p.rarity === "common");

  const randomSpecies =
    commonPkmons[Math.floor(randomFn() * commonPkmons.length)];
  const randomLevel = Math.floor(randomFn() * 5) + 1; // 1-5 레벨
  return createMonster(randomSpecies, randomLevel);
}

/**
 * 인카운터 발생 여부 확인
 */
export function shouldTriggerEncounter(
  encounterRate: number = ENCOUNTER_RATE,
  randomFn: () => number = Math.random
): boolean {
  return randomFn() < 1 / encounterRate;
}

/**
 * 인카운터 로직 인터페이스
 */
export interface EncounterActions {
  incrementStepCount: () => void;
  incrementTotalEncounters: () => void;
  setEncounteredPkmon: (pkmon: Pkmon) => void;
}

/**
 * 스텝 증가 + 랜덤 확률로 인카운터 체크
 * @returns 인카운터 발생 여부
 */
export function checkEncounter(
  actions?: EncounterActions,
  encounterRate: number = ENCOUNTER_RATE,
  randomFn: () => number = Math.random
): boolean {
  // actions가 없으면 실제 store 사용 (기본 동작)
  const { incrementStepCount, incrementTotalEncounters, setEncounteredPkmon } =
    actions || useGameStore.getState();

  incrementStepCount();

  const shouldEncounter = shouldTriggerEncounter(encounterRate, randomFn);

  if (shouldEncounter) {
    incrementTotalEncounters();
    const wildPkmon = generateRandomPkmon(PKMON_SPECIES, randomFn);
    setEncounteredPkmon(wildPkmon);
    console.log("[Encounter] Wild Pkmon appeared!", wildPkmon);
  }

  return shouldEncounter;
}

/**
 * 강제로 인카운터 발생 (개발용)
 */
export function triggerEncounter(
  actions?: EncounterActions,
  randomFn: () => number = Math.random
): void {
  const { incrementTotalEncounters, setEncounteredPkmon } =
    actions || useGameStore.getState();

  incrementTotalEncounters();
  const wildPkmon = generateRandomPkmon(PKMON_SPECIES, randomFn);
  setEncounteredPkmon(wildPkmon);
  console.log("[Dev] Forced encounter triggered!", wildPkmon);
}
