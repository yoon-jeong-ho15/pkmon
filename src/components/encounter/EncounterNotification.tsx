import { useEffect, useState } from "react";
import type { Pkmon } from "../../data/type";
import PkmonCard from "./PkmonCard";
import BattleField from "./BattleFIeld";

interface EncounterNotificationProps {
  pkmon: Pkmon;
  onCapture: () => void;
  onFlee: () => void;
}

export function EncounterNotification({
  pkmon,
  onCapture,
  onFlee,
}: EncounterNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isBattle, setIsBattle] = useState(false);

  useEffect(() => {
    // 등장 애니메이션
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleCapture = () => {
    setIsShaking(true);
    setTimeout(() => {
      onCapture();
    }, 600);
  };

  return (
    <div
      className={`
        fixed top-0 left-0 w-screen h-screen flex
        items-center justify-center z-[999999] transition-all
        duration-300
        ${
          isVisible
            ? "bg-black/50 pointer-events-auto"
            : "bg-black/0 pointer-events-none"
        }`}
    >
      {isBattle ? (
        <BattleField
          pkmon={pkmon}
          onFlee={onFlee}
          onBack={() => setIsBattle(false)}
        />
      ) : (
        <div
          className={`
            bg-gray-100 border-2 rounded-xl
            w-[400px] h-[600px]
            flex flex-col
            transition-all duration-300 ${
              isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
            }`}
        >
          <h3 className="flex justify-center items-center my-3 text-3xl animate-pulse">
            Wild Packet Monster Appeared!
          </h3>

          <PkmonCard pkmon={pkmon} />

          <div className="flex gap-3 mb-4 mx-4">
            <button
              className="
                flex-1 p-4 border rounded-lg
                cursor-pointer flex items-center
                justify-center gap-2 pixel-gradient"
              onClick={() => setIsBattle(true)}
            >
              <span>CAPTURE</span>
            </button>
            <button
              className="
                flex-1 p-4 border rounded-lg
                cursor-pointer flex items-center
                justify-center gap-2 pixel-gradient"
              onClick={onFlee}
            >
              <span>FLEE</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
