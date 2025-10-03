import { useEffect, useState } from "react";
import type { Pkmon } from "../data/type";

interface EncounterNotificationProps {
  monster: Pkmon;
  onCapture: () => void;
  onFlee: () => void;
}

export function EncounterNotification({
  monster,
  onCapture,
  onFlee,
}: EncounterNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

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
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-[999999] transition-all duration-300 ${
        isVisible
          ? "bg-black/85 pointer-events-auto"
          : "bg-black/0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-gradient-to-br from-[#16213e] to-[#0f3460] border-4 border-[#e94560] rounded-2xl p-6 max-w-[400px] w-[90%] shadow-[0_8px_32px_rgba(233,69,96,0.5)] font-mono transition-all duration-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
        } ${isShaking ? "animate-[shake_0.6s_ease]" : ""}`}
        style={{
          animation: isShaking ? "shake 0.6s ease" : undefined,
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <span
            className="text-lg font-bold text-[#e94560] tracking-wide animate-pulse"
            style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.3)" }}
          >
            ⚡ WILD MONSTER APPEARED!
          </span>
          <button
            className="bg-transparent border-2 border-[#e94560] text-[#e94560] w-8 h-8 rounded-full text-2xl cursor-pointer flex items-center justify-center transition-all duration-200 p-0 leading-none hover:bg-[#e94560] hover:text-white hover:rotate-90"
            onClick={onFlee}
          >
            ×
          </button>
        </div>

        <div className="bg-[#1a1a2e] border-[3px] border-[#0f3460] rounded-xl p-6 mb-6 flex flex-col items-center gap-4">
          <div className="text-[96px] w-32 h-32 flex items-center justify-center bg-[#0f3460] rounded-full border-4 border-[#e94560] shadow-[0_0_20px_rgba(233,69,96,0.5)] animate-[float_3s_ease-in-out_infinite]">
            <img
              src={`/sprites/${monster.id}.svg`}
              alt={monster.name}
              className="w-full h-full object-contain animate-bounce-fast"
              style={{ "--bounce-distance": "5px" } as React.CSSProperties}
            />
          </div>
          <div className="text-center">
            <h2
              className="text-[28px] font-bold text-[#e94560] m-0 mb-2"
              style={{ textShadow: "2px 2px 0 rgba(0,0,0,0.3)" }}
            >
              {monster.name}
            </h2>
            <p className="text-base text-gray-500 m-0">LV.{monster.level}</p>
          </div>
        </div>

        <div className="flex gap-3 mb-4">
          <button
            className="flex-1 p-4 border-[3px] border-[#ff5577] rounded-lg font-mono text-sm font-bold cursor-pointer flex items-center justify-center gap-2 transition-all duration-200 uppercase bg-[#e94560] text-white shadow-[0_4px_0_#c73850] hover:bg-[#ff5577] hover:-translate-y-0.5 hover:shadow-[0_6px_0_#c73850] active:translate-y-0.5 active:shadow-[0_2px_0_#c73850]"
            onClick={handleCapture}
          >
            <span className="text-xl">🎯</span>
            <span>CAPTURE</span>
          </button>
          <button
            className="flex-1 p-4 border-[3px] border-[#0f3460] rounded-lg font-mono text-sm font-bold cursor-pointer flex items-center justify-center gap-2 transition-all duration-200 uppercase bg-[#16213e] text-gray-500 hover:bg-[#0f3460] hover:text-[#eee] hover:-translate-y-0.5"
            onClick={onFlee}
          >
            <span className="text-xl">🏃</span>
            <span>FLEE</span>
          </button>
        </div>

        <div className="text-center text-[11px] text-gray-600 pt-2 border-t border-[#0f3460]">
          Press ESC to flee • Click outside to dismiss
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0) scale(1); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-8px) scale(1.02); }
          20%, 40%, 60%, 80% { transform: translateX(8px) scale(0.98); }
        }
      `}</style>
    </div>
  );
}
