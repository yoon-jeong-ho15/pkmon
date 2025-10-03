import { useGameStore } from "../store/useGameStore";
import { PKMON_SPECIES } from "../data/pkmons";
import { createMonster } from "./utils";

// 인카운터 발생 확률 (1/N)
const ENCOUNTER_RATE = 10; // 10번에 1번 (10% 확률)

/**
 * 랜덤 몬스터 생성
 */
function generateRandomPkmon() {
  // common 레어리티 몬스터만 선택
  const commonPkmons = PKMON_SPECIES.filter((p) => p.rarity === "common");

  const randomSpecies =
    commonPkmons[Math.floor(Math.random() * commonPkmons.length)];
  const randomLevel = Math.floor(Math.random() * 5) + 1; // 1-5 레벨
  return createMonster(randomSpecies, randomLevel);
}

/**
 * 스텝 증가 + 랜덤 확률로 인카운터 체크
 * @returns 인카운터 발생 여부
 */
export function checkEncounter(): boolean {
  const { incrementStepCount, incrementTotalEncounters, setEncounteredPkmon } =
    useGameStore.getState();

  incrementStepCount();

  const shouldEncounter = Math.random() < 1 / ENCOUNTER_RATE;

  if (shouldEncounter) {
    incrementTotalEncounters();
    const wildPkmon = generateRandomPkmon();
    setEncounteredPkmon(wildPkmon);
    console.log("[Encounter] Wild Pkmon appeared!", wildPkmon);
  }

  return shouldEncounter;
}

/**
 * 강제로 인카운터 발생 (개발용)
 */
export function triggerEncounter(): void {
  const { incrementTotalEncounters, setEncounteredPkmon } =
    useGameStore.getState();

  incrementTotalEncounters();
  const wildPkmon = generateRandomPkmon();
  setEncounteredPkmon(wildPkmon);
  console.log("[Dev] Forced encounter triggered!", wildPkmon);
}
