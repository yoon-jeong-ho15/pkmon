import PkmonCard from "./PkmonCard";
import ItemList from "./ItemList";
import { useBattleState } from "../../hooks/useBattleState";
import type { Pkmon } from "../../data/type";

interface BattleFieldProps {
  leadPkmon: Pkmon;
  encounteredPkmon: Pkmon;
  onAttack: (playerDamage: number, monsterDamage: number | null) => void;
  onVictory: (expGained: number) => void;
  onDefeat: () => void;
  onFlee: () => void;
}

export default function BattleField({
  leadPkmon,
  encounteredPkmon,
  onAttack,
  onVictory,
  onDefeat,
  onFlee,
}: BattleFieldProps) {
  const {
    battleLog,
    isProcessingTurn,
    battleEnded,
    itemOpened,
    handleAttack,
    handleItemToggle,
    onItemUsed,
  } = useBattleState(leadPkmon, encounteredPkmon, {
    onAttack,
    onVictory,
    onDefeat,
  });

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
                onClick={handleItemToggle}
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
