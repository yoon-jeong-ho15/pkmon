import type { Pkmon, PkmonSpecies } from "../data/type";

/**
 * 데미지 계산
 */
export function calculateDamage(
  attackerAtk: number,
  defenderDef: number
): number {
  return Math.max(1, attackerAtk - defenderDef);
}

/**
 * 공격 결과 계산
 */
export interface AttackResult {
  damage: number;
  attackerName: string;
  defenderName: string;
  defenderRemainingHp: number;
}

export function computeAttack(attacker: Pkmon, defender: Pkmon): AttackResult {
  const damage = calculateDamage(attacker.atk, defender.def);
  const defenderRemainingHp = Math.max(0, defender.hp - damage);

  return {
    damage,
    attackerName: attacker.name,
    defenderName: defender.name,
    defenderRemainingHp,
  };
}

/**
 * 전투 턴 시뮬레이션
 */
export interface BattleTurnResult {
  playerAttack: AttackResult;
  monsterAttack: AttackResult | null;
  playerHp: number;
  monsterHp: number;
  battleEnded: boolean;
  winner: "player" | "monster" | null;
}

export function simulateBattleTurn(
  player: Pkmon,
  monster: Pkmon
): BattleTurnResult {
  // 플레이어 공격
  const playerAttack = computeAttack(player, monster);
  const monsterHp = playerAttack.defenderRemainingHp;

  // 몬스터가 죽었으면 전투 종료
  if (monsterHp <= 0) {
    return {
      playerAttack,
      monsterAttack: null,
      playerHp: player.hp,
      monsterHp: 0,
      battleEnded: true,
      winner: "player",
    };
  }

  // 몬스터 반격
  const monsterAttack = computeAttack(monster, player);
  const playerHp = monsterAttack.defenderRemainingHp;

  // 플레이어가 죽었으면 전투 종료
  if (playerHp <= 0) {
    return {
      playerAttack,
      monsterAttack,
      playerHp: 0,
      monsterHp,
      battleEnded: true,
      winner: "monster",
    };
  }

  // 전투 계속
  return {
    playerAttack,
    monsterAttack,
    playerHp,
    monsterHp,
    battleEnded: false,
    winner: null,
  };
}

/**
 * 레벨업 계산
 */
export interface LevelUpResult {
  newLevel: number;
  newExp: number;
  newMaxHp: number;
  newAtk: number;
  newDef: number;
  leveledUp: boolean;
  levelsGained: number;
}

export function calculateLevelUp(
  currentPkmon: Pkmon,
  species: PkmonSpecies,
  expGained: number,
  getLevelFromExpFn: (exp: number) => number
): LevelUpResult {
  const newExp = currentPkmon.exp + expGained;
  const newLevel = getLevelFromExpFn(newExp);
  const oldLevel = currentPkmon.level;

  // 레벨업 안함
  if (newLevel <= oldLevel) {
    return {
      newLevel: oldLevel,
      newExp,
      newMaxHp: currentPkmon.maxHp,
      newAtk: currentPkmon.atk,
      newDef: currentPkmon.def,
      leveledUp: false,
      levelsGained: 0,
    };
  }

  // 레벨업 계산
  const levelDiff = newLevel - oldLevel;
  const newMaxHp = currentPkmon.maxHp + species.growth.hp * levelDiff;
  const newAtk = currentPkmon.atk + species.growth.atk * levelDiff;
  const newDef = currentPkmon.def + species.growth.def * levelDiff;

  return {
    newLevel,
    newExp,
    newMaxHp,
    newAtk,
    newDef,
    leveledUp: true,
    levelsGained: levelDiff,
  };
}
