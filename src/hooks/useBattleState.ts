import { useState, useEffect, useCallback } from "react";
import type { Pkmon } from "../data/type";
import { simulateBattleTurn } from "../lib/battle";

export interface BattleActions {
  onAttack: (playerDamage: number, monsterDamage: number | null) => void;
  onVictory: (expGained: number) => void;
  onDefeat: () => void;
}

export interface BattleState {
  battleLog: string[];
  isProcessingTurn: boolean;
  battleEnded: boolean;
  itemOpened: boolean;
  handleAttack: () => void;
  handleItemToggle: () => void;
  onItemUsed: () => void;
}

export function useBattleState(
  leadPkmon: Pkmon | null,
  encounteredPkmon: Pkmon | null,
  actions: BattleActions
): BattleState {
  const [itemOpened, setItemOpened] = useState(false);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [isProcessingTurn, setIsProcessingTurn] = useState(false);
  const [battleEnded, setBattleEnded] = useState(false);

  // 전투 종료 체크
  useEffect(() => {
    if (!encounteredPkmon || !leadPkmon || battleEnded) return;

    // 승리
    if (encounteredPkmon.hp <= 0) {
      setBattleEnded(true);
      setBattleLog((prev) => [
        ...prev,
        `${encounteredPkmon.name}을(를) 쓰러뜨렸다!`,
        `경험치 2를 획득했다!`,
      ]);
      actions.onVictory(2);
    }
    // 패배
    else if (leadPkmon.hp <= 0) {
      setBattleEnded(true);
      setBattleLog((prev) => [...prev, `${leadPkmon.name}이(가) 쓰러졌다...`]);
      actions.onDefeat();
    }
  }, [
    encounteredPkmon?.hp,
    leadPkmon?.hp,
    battleEnded,
    encounteredPkmon?.name,
    leadPkmon?.name,
    actions,
  ]);

  const handleAttack = useCallback(() => {
    if (!leadPkmon || !encounteredPkmon || isProcessingTurn) return;
    setIsProcessingTurn(true);

    // 순수 함수로 전투 턴 시뮬레이션
    const turnResult = simulateBattleTurn(leadPkmon, encounteredPkmon);

    // 플레이어 공격 적용
    actions.onAttack(turnResult.playerAttack.damage, null);
    setBattleLog((prev) => [
      ...prev,
      `${turnResult.playerAttack.attackerName}의 공격! ${turnResult.playerAttack.defenderName}에게 ${turnResult.playerAttack.damage} 데미지!`,
    ]);

    // 몬스터 반격 (있다면)
    setTimeout(() => {
      if (turnResult.monsterAttack) {
        actions.onAttack(0, turnResult.monsterAttack.damage);
        setBattleLog((prev) => [
          ...prev,
          `${turnResult.monsterAttack!.attackerName}의 반격! ${turnResult.monsterAttack!.defenderName}에게 ${turnResult.monsterAttack!.damage} 데미지!`,
        ]);
      }
      setIsProcessingTurn(false);
    }, 1000);
  }, [leadPkmon, encounteredPkmon, isProcessingTurn, actions]);

  const onItemUsed = useCallback(() => {
    if (!leadPkmon || !encounteredPkmon || isProcessingTurn) return;
    setIsProcessingTurn(true);
    setItemOpened(false);

    // 아이템 사용 후 몬스터 반격
    setTimeout(() => {
      if (encounteredPkmon.hp > 0 && leadPkmon.hp > 0) {
        const turnResult = simulateBattleTurn(leadPkmon, encounteredPkmon);
        // 몬스터만 공격 (플레이어는 아이템 사용했으므로)
        if (turnResult.monsterAttack) {
          actions.onAttack(0, turnResult.monsterAttack.damage);
          setBattleLog((prev) => [
            ...prev,
            `${turnResult.monsterAttack!.attackerName}의 공격! ${turnResult.monsterAttack!.defenderName}에게 ${turnResult.monsterAttack!.damage} 데미지!`,
          ]);
        }
      }
      setIsProcessingTurn(false);
    }, 1000);
  }, [leadPkmon, encounteredPkmon, isProcessingTurn, actions]);

  const handleItemToggle = useCallback(() => {
    setItemOpened((prev) => !prev);
  }, []);

  return {
    battleLog,
    isProcessingTurn,
    battleEnded,
    itemOpened,
    handleAttack,
    handleItemToggle,
    onItemUsed,
  };
}
