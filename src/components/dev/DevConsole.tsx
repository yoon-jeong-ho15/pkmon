import { useState } from "react";
import { useGameStore } from "../../store/useGameStore";
import EncounterControls from "./EncounterControls";
import StorageControls from "./StorageControls";

export const DevConsole = () => {
  const [isOpen, setIsOpen] = useState(false);

  if (import.meta.env.PROD) return null;

  return (
    <>
      {/* 토글 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-[9999] bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-700 text-xs font-mono"
      >
        DEV
      </button>

      {/* 콘솔 패널 */}
      {isOpen && (
        <div
          className={`
            fixed bottom-13 right-4 z-[9999] bg-gray-900
             text-white rounded-lg shadow-2xl border-2 
             border-gray-700 font-mono text-xs 
          `}
        >
          {/* 헤더 */}
          <div className="flex items-center justify-between bg-gray-800 px-3 py-2 rounded-t-lg border-b border-gray-700">
            <span className="font-bold">Dev Console</span>
          </div>

          {/* 콘텐츠 */}
          <div className="p-3 space-y-2 max-h-96 overflow-y-auto">
            <EncounterControls />
            <StatsControls />
            <StorageControls />
          </div>
        </div>
      )}
    </>
  );
};

// 스탯 관련 컨트롤
const StatsControls = () => {
  const addExpToLeadPkmon = useGameStore((state) => state.addExpToLeadPkmon);

  const addExp = () => {
    addExpToLeadPkmon(1000);
    console.log("[DEV] Added 1000 EXP to lead Pkmon");
  };

  return (
    <div className="border border-gray-700 rounded p-2 space-y-2">
      <div className="text-yellow-400 font-bold mb-1">Stats</div>
      <button
        onClick={addExp}
        className="w-full bg-green-600 hover:bg-green-700 px-3 py-1.5 rounded"
      >
        +1000 EXP
      </button>
    </div>
  );
};
