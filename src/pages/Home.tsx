import { useState } from "react";
import Header from "../components/home/Header";
import PkmonStatus from "../components/home/PkmonStatus";
import TrainerStatus from "../components/home/TrainerStatus";
import WalkingAnimation from "../components/home/WalkingAnimation";
import { useGameStore } from "../store/useGameStore";
import BasicModal from "../components/modal/BaiscModal";
import { DevConsole } from "../components/dev/DevConsole";

type ModalType = "pakeDex" | null;

export default function Home() {
  const encounterEnabled = useGameStore(
    (state) => state.settings.encounterEnabled
  );
  const [modalType, setModalType] = useState<ModalType>(null);

  return (
    <div className="flex flex-col items-center w-full h-full bg-green-100 text-xl">
      <Header className="h-1/10" />

      <div className="w-full h-9/10 flex flex-col">
        <div
          className={`w-full flex gap-3 p-3 ${
            encounterEnabled ? "h-2/3" : " h-1/2"
          }`}
        >
          {encounterEnabled ? (
            <>
              <WalkingAnimation />
              <PkmonStatus variant="compact" />
            </>
          ) : (
            <>
              <TrainerStatus />
              <PkmonStatus />
            </>
          )}
        </div>

        <div
          className={`w-full flex-1 grid grid-cols-3 gap-3 p-3 bg-sky-100 text-4xl`}
        >
          <button
            className="pixel-gradient rounded-xl border"
            onClick={() => setModalType("pakeDex")}
          >
            Pk Dex
          </button>
        </div>
      </div>
      {modalType && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10">
          <BasicModal type={modalType} onClose={() => setModalType(null)} />
        </div>
      )}
      <DevConsole />
    </div>
  );
}
