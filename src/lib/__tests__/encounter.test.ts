import { describe, it, expect, vi } from "vitest";
import {
  generateRandomPkmon,
  shouldTriggerEncounter,
  checkEncounter,
  type EncounterActions,
} from "../encounter";
import type { PkmonSpecies } from "../../data/type";

describe("encounter.ts - 의존성 주입 테스트", () => {
  const mockSpecies: PkmonSpecies[] = [
    {
      id: 1,
      name: "몬스터A",
      rarity: "common",
      baseStats: { hp: 30, atk: 8, def: 5 },
      growth: { hp: 3, atk: 1, def: 1 },
    },
    {
      id: 2,
      name: "몬스터B",
      rarity: "common",
      baseStats: { hp: 35, atk: 10, def: 6 },
      growth: { hp: 4, atk: 2, def: 1 },
    },
    {
      id: 3,
      name: "레어몬",
      rarity: "rare",
      baseStats: { hp: 50, atk: 15, def: 10 },
      growth: { hp: 5, atk: 3, def: 2 },
    },
  ];

  describe("generateRandomPkmon", () => {
    it("랜덤 함수를 주입하여 결정적 테스트 가능", () => {
      // 첫 번째 호출은 종 선택, 두 번째 호출은 레벨 선택
      const mockRandom = vi
        .fn()
        .mockReturnValueOnce(0.0) // 첫 번째 common 몬스터 선택
        .mockReturnValueOnce(0.8); // 레벨 5 선택 (0.8 * 5 + 1 = 5)

      const pkmon = generateRandomPkmon(mockSpecies, mockRandom);

      expect(pkmon.name).toBe("몬스터A");
      expect(pkmon.level).toBe(5);
      expect(mockRandom).toHaveBeenCalledTimes(2);
    });

    it("common 레어리티만 선택", () => {
      const mockRandom = vi
        .fn()
        .mockReturnValueOnce(0.99) // 마지막 common
        .mockReturnValueOnce(0.0); // 레벨 1

      const pkmon = generateRandomPkmon(mockSpecies, mockRandom);

      // rare는 제외되므로 common 중에서만 선택
      expect(["몬스터A", "몬스터B"]).toContain(pkmon.name);
      expect(pkmon.name).not.toBe("레어몬");
    });

    it("레벨은 1-5 범위", () => {
      const mockRandom = vi
        .fn()
        .mockReturnValueOnce(0.5)
        .mockReturnValueOnce(0.0);

      const pkmon1 = generateRandomPkmon(mockSpecies, mockRandom);
      expect(pkmon1.level).toBe(1);

      mockRandom.mockReturnValueOnce(0.5).mockReturnValueOnce(0.99);
      const pkmon2 = generateRandomPkmon(mockSpecies, mockRandom);
      expect(pkmon2.level).toBeLessThanOrEqual(5);
      expect(pkmon2.level).toBeGreaterThanOrEqual(1);
    });
  });

  describe("shouldTriggerEncounter", () => {
    it("확률에 따라 true/false 반환", () => {
      const alwaysTrue = vi.fn().mockReturnValue(0.05);
      expect(shouldTriggerEncounter(10, alwaysTrue)).toBe(true);

      const alwaysFalse = vi.fn().mockReturnValue(0.15);
      expect(shouldTriggerEncounter(10, alwaysFalse)).toBe(false);
    });

    it("encounterRate 파라미터가 작동", () => {
      const mockRandom = vi.fn().mockReturnValue(0.3);

      // rate가 3이면 1/3 = 0.333... 이므로 0.3은 true
      expect(shouldTriggerEncounter(3, mockRandom)).toBe(true);

      // rate가 5이면 1/5 = 0.2 이므로 0.3은 false
      expect(shouldTriggerEncounter(5, mockRandom)).toBe(false);
    });
  });

  describe("checkEncounter", () => {
    it("mock actions로 store 없이 테스트 가능", () => {
      const mockActions: EncounterActions = {
        incrementStepCount: vi.fn(),
        incrementTotalEncounters: vi.fn(),
        setEncounteredPkmon: vi.fn(),
      };

      const mockRandom = vi
        .fn()
        .mockReturnValue(0.05) // encounter 발생, 기본값
        .mockReturnValueOnce(0.05)
        .mockReturnValueOnce(0.0) // 종 선택
        .mockReturnValueOnce(0.0); // 레벨 선택

      const result = checkEncounter(mockActions, 10, mockRandom);

      expect(result).toBe(true);
      expect(mockActions.incrementStepCount).toHaveBeenCalledTimes(1);
      expect(mockActions.incrementTotalEncounters).toHaveBeenCalledTimes(1);
      expect(mockActions.setEncounteredPkmon).toHaveBeenCalledTimes(1);
    });

    it("encounter가 발생하지 않으면 포켓몬 설정 안함", () => {
      const mockActions: EncounterActions = {
        incrementStepCount: vi.fn(),
        incrementTotalEncounters: vi.fn(),
        setEncounteredPkmon: vi.fn(),
      };

      const mockRandom = vi.fn().mockReturnValue(0.5); // encounter 미발생

      const result = checkEncounter(mockActions, 10, mockRandom);

      expect(result).toBe(false);
      expect(mockActions.incrementStepCount).toHaveBeenCalledTimes(1);
      expect(mockActions.incrementTotalEncounters).not.toHaveBeenCalled();
      expect(mockActions.setEncounteredPkmon).not.toHaveBeenCalled();
    });
  });
});
