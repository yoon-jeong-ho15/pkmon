import PkmonCard from "./PkmonCard";
import { useGameStore } from "../../store/useGameStore";
import { useState, useEffect } from "react";
import ItemList from "./ItemList";
import { simulateBattleTurn } from "../../lib/battle";

interface BattleFieldProps {
  onFlee: () => void;
}

export default function BattleField({ onFlee }: BattleFieldProps) {
  const encounteredPkmon = useGameStore((state) => state.encounteredPkmon);
  const leadPkmon = useGameStore((state) => state.leadPkmon);
  const damageEncounteredPkmon = useGameStore(
    (state) => state.damageEncounteredPkmon
  );
  const damageLeadPkmon = useGameStore((state) => state.damageLeadPkmon);
  const addExpToLeadPkmon = useGameStore((state) => state.addExpToLeadPkmon);
  const setEncounterEnabled = useGameStore(
    (state) => state.setEncounterEnabled
  );

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
      addExpToLeadPkmon(2);
    }
    // 패배
    else if (leadPkmon.hp <= 0) {
      setBattleEnded(true);
      setBattleLog((prev) => [...prev, `${leadPkmon.name}이(가) 쓰러졌다...`]);
      setEncounterEnabled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    encounteredPkmon?.hp,
    leadPkmon?.hp,
    battleEnded,
    encounteredPkmon?.name,
    leadPkmon?.name,
    addExpToLeadPkmon,
    setEncounterEnabled,
    onFlee,
  ]);

  if (!encounteredPkmon || !leadPkmon) return null;

  const handleAttack = () => {
    if (isProcessingTurn) return;
    setIsProcessingTurn(true);

    // 순수 함수로 전투 턴 시뮬레이션
    const turnResult = simulateBattleTurn(leadPkmon, encounteredPkmon);

    // 플레이어 공격 적용
    damageEncounteredPkmon(turnResult.playerAttack.damage);
    setBattleLog((prev) => [
      ...prev,
      `${turnResult.playerAttack.attackerName}의 공격! ${turnResult.playerAttack.defenderName}에게 ${turnResult.playerAttack.damage} 데미지!`,
    ]);

    // 몬스터 반격 (있다면)
    setTimeout(() => {
      if (turnResult.monsterAttack) {
        damageLeadPkmon(turnResult.monsterAttack.damage);
        setBattleLog((prev) => [
          ...prev,
          `${turnResult.monsterAttack!.attackerName}의 반격! ${turnResult.monsterAttack!.defenderName}에게 ${turnResult.monsterAttack!.damage} 데미지!`,
        ]);
      }
      setIsProcessingTurn(false);
    }, 1000);
  };

  const onItemUsed = () => {
    if (isProcessingTurn) return;
    setIsProcessingTurn(true);
    setItemOpened(false);

    // 아이템 사용 후 몬스터 반격
    setTimeout(() => {
      if (encounteredPkmon.hp > 0 && leadPkmon.hp > 0) {
        const turnResult = simulateBattleTurn(leadPkmon, encounteredPkmon);
        // 몬스터만 공격 (플레이어는 아이템 사용했으므로)
        if (turnResult.monsterAttack) {
          damageLeadPkmon(turnResult.monsterAttack.damage);
          setBattleLog((prev) => [
            ...prev,
            `${turnResult.monsterAttack!.attackerName}의 공격! ${turnResult.monsterAttack!.defenderName}에게 ${turnResult.monsterAttack!.damage} 데미지!`,
          ]);
        }
      }
      setIsProcessingTurn(false);
    }, 1000);
  };

  return (
    <div
      className="
        bg-gray-100 border-2 rounded-xl
        w-[400px] h-[600px]
        flex flex-col
        transition-all duration-300"
    >
      <div
        className="
          flex flex-1 flex-col items-center bg-gray-100 gap-3
          mx-3 mt-2 rounded-lg border"
      >
        {itemOpened ? (
          <ItemList onItemUsed={onItemUsed} />
        ) : (
          <div className="flex-1 w-full">
            <PkmonCard battle pkmon={encounteredPkmon} />
            <PkmonCard player pkmon={leadPkmon} />
            <div className="text-xs text-gray-600 font-mono px-2 h-20 overflow-y-auto flex flex-col gap-1">
              {battleLog.map((log, index) => (
                <span key={index}>{log}</span>
              ))}
            </div>
          </div>
        )}

        <div className="border-t pixel-gradient-10 w-full rounded-lg flex gap-2 p-2">
          {battleEnded ? (
            <button
              className="flex-1 p-4 border rounded-lg
              cursor-pointer flex items-center
              justify-center gap-2
              pixel-gradient hover:opacity-80 transition-opacity"
              onClick={onFlee}
            >
              <span>Confirm</span>
            </button>
          ) : (
            <>
              <button
                className={`flex-1 p-4 border rounded-lg
                cursor-pointer flex items-center
                justify-center gap-2
                transition-opacity
                ${
                  itemOpened || isProcessingTurn
                    ? "bg-gray-400"
                    : "pixel-gradient hover:opacity-80"
                }`}
                onClick={handleAttack}
                disabled={itemOpened || isProcessingTurn}
              >
                <span>ATTACK</span>
              </button>
              <button
                className={`
                flex-1 p-4 border rounded-lg
                cursor-pointer flex items-center
                justify-center gap-2
                hover:opacity-80 transition-opacity
                ${isProcessingTurn ? "bg-gray-400" : "pixel-gradient"}`}
                onClick={() => setItemOpened(!itemOpened)}
                disabled={isProcessingTurn}
              >
                <span>ITEM</span>
              </button>
              <button
                className={`flex-1 p-4 border rounded-lg
                cursor-pointer flex items-center
                justify-center gap-2
                transition-opacity
                ${
                  itemOpened || isProcessingTurn
                    ? "bg-gray-400"
                    : "pixel-gradient hover:opacity-80 "
                }`}
                onClick={onFlee}
                disabled={itemOpened || isProcessingTurn}
              >
                <span>BACK</span>
              </button>
            </>
          )}
        </div>
      </div>
      <div className="text-xs text-gray-600 font-mono px-2 flex flex-col">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint inventore
        eveniet molestias labore odit
      </div>
    </div>
  );
}
