import { describe, it, expect } from "vitest";
import {
  calculateDamage,
  computeAttack,
  simulateBattleTurn,
  calculateLevelUp,
} from "../battle";
import type { Pkmon, PkmonSpecies } from "../../data/type";

describe("battle.ts - 순수 함수 테스트", () => {
  describe("calculateDamage", () => {
    it("기본 데미지 계산: 공격력 - 방어력", () => {
      expect(calculateDamage(10, 5)).toBe(5);
      expect(calculateDamage(20, 8)).toBe(12);
    });

    it("최소 데미지는 1", () => {
      expect(calculateDamage(5, 10)).toBe(1);
      expect(calculateDamage(3, 100)).toBe(1);
    });

    it("방어력이 0이면 공격력 전체", () => {
      expect(calculateDamage(15, 0)).toBe(15);
    });
  });

  describe("computeAttack", () => {
    const attacker: Pkmon = {
      id: 1,
      name: "공격자",
      level: 5,
      exp: 0,
      hp: 50,
      maxHp: 50,
      atk: 15,
      def: 5,
    };

    const defender: Pkmon = {
      id: 2,
      name: "방어자",
      level: 3,
      exp: 0,
      hp: 30,
      maxHp: 30,
      atk: 8,
      def: 7,
    };

    it("공격 결과를 올바르게 계산", () => {
      const result = computeAttack(attacker, defender);

      expect(result.damage).toBe(8); // 15 - 7
      expect(result.attackerName).toBe("공격자");
      expect(result.defenderName).toBe("방어자");
      expect(result.defenderRemainingHp).toBe(22); // 30 - 8
    });

    it("방어자 HP가 0 이하로 내려가지 않음", () => {
      const weakDefender = { ...defender, hp: 3 };
      const result = computeAttack(attacker, weakDefender);

      expect(result.defenderRemainingHp).toBe(0);
    });
  });

  describe("simulateBattleTurn", () => {
    const player: Pkmon = {
      id: 1,
      name: "플레이어",
      level: 5,
      exp: 0,
      hp: 50,
      maxHp: 50,
      atk: 20,
      def: 10,
    };

    const monster: Pkmon = {
      id: 2,
      name: "몬스터",
      level: 3,
      exp: 0,
      hp: 25,
      maxHp: 30,
      atk: 12,
      def: 5,
    };

    it("플레이어가 먼저 공격하고 몬스터가 반격", () => {
      const result = simulateBattleTurn(player, monster);

      expect(result.playerAttack.damage).toBe(15); // 20 - 5
      expect(result.monsterHp).toBe(10); // 25 - 15
      expect(result.monsterAttack).not.toBeNull();
      expect(result.monsterAttack!.damage).toBe(2); // 12 - 10
      expect(result.playerHp).toBe(48); // 50 - 2
      expect(result.battleEnded).toBe(false);
      expect(result.winner).toBeNull();
    });

    it("몬스터가 죽으면 반격 없이 전투 종료", () => {
      const weakMonster = { ...monster, hp: 10 };
      const result = simulateBattleTurn(player, weakMonster);

      expect(result.monsterHp).toBe(0);
      expect(result.monsterAttack).toBeNull();
      expect(result.battleEnded).toBe(true);
      expect(result.winner).toBe("player");
    });

    it("플레이어가 죽으면 전투 종료", () => {
      const weakPlayer = { ...player, hp: 1 };
      const result = simulateBattleTurn(weakPlayer, monster);

      expect(result.playerHp).toBe(0);
      expect(result.battleEnded).toBe(true);
      expect(result.winner).toBe("monster");
    });
  });

  describe("calculateLevelUp", () => {
    const species: PkmonSpecies = {
      id: 1,
      name: "테스트몬",
      rarity: "common",
      baseStats: { hp: 50, atk: 10, def: 8 },
      growth: { hp: 5, atk: 2, def: 1 },
    };

    const pkmon: Pkmon = {
      id: 1,
      name: "테스트몬",
      level: 5,
      exp: 100,
      hp: 70,
      maxHp: 70,
      atk: 18,
      def: 12,
    };

    const mockGetLevelFromExp = (exp: number): number => {
      if (exp < 150) return 5;
      if (exp < 200) return 6;
      return 7;
    };

    it("레벨업 안하면 경험치만 증가", () => {
      const result = calculateLevelUp(pkmon, species, 10, mockGetLevelFromExp);

      expect(result.leveledUp).toBe(false);
      expect(result.newLevel).toBe(5);
      expect(result.newExp).toBe(110);
      expect(result.newMaxHp).toBe(70);
      expect(result.levelsGained).toBe(0);
    });

    it("레벨업하면 스탯 증가", () => {
      const result = calculateLevelUp(pkmon, species, 60, mockGetLevelFromExp);

      expect(result.leveledUp).toBe(true);
      expect(result.newLevel).toBe(6);
      expect(result.newExp).toBe(160);
      expect(result.newMaxHp).toBe(75); // 70 + 5
      expect(result.newAtk).toBe(20); // 18 + 2
      expect(result.newDef).toBe(13); // 12 + 1
      expect(result.levelsGained).toBe(1);
    });

    it("여러 레벨 동시에 상승", () => {
      const result = calculateLevelUp(pkmon, species, 110, mockGetLevelFromExp);

      expect(result.leveledUp).toBe(true);
      expect(result.newLevel).toBe(7);
      expect(result.newExp).toBe(210);
      expect(result.newMaxHp).toBe(80); // 70 + (5 * 2)
      expect(result.newAtk).toBe(22); // 18 + (2 * 2)
      expect(result.newDef).toBe(14); // 12 + (1 * 2)
      expect(result.levelsGained).toBe(2);
    });
  });
});
