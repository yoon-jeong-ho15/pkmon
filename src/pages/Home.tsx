import { useState } from "react";
import Header from "../components/home/Header";
import PkmonStatus from "../components/home/PkmonStatus";
import TrainerStatus from "../components/home/TrainerStatus";
import WalkingAnimation from "../components/home/WalkingAnimation";
import MenuButton from "../components/home/MenuButton";
import { useGameStore } from "../store/useGameStore";
import BasicModal from "../components/modal/BaiscModal";
import { DevConsole } from "../components/dev/DevConsole";
import { EncounterNotification } from "../components/encounter/EncounterNotification";
import type { ModalType } from "../data/type";
import { usePlayTimeTracker } from "../hooks/usePlayTimeTracker";

export default function Home() {
  // playTime 자동 추적
  usePlayTimeTracker();
  const encounterEnabled = useGameStore((state) => state.encounterEnabled);
  const encounteredPkmon = useGameStore((state) => state.encounteredPkmon);
  const setEncounteredPkmon = useGameStore(
    (state) => state.setEncounteredPkmon
  );
  const addPkmon = useGameStore((state) => state.addPkmon);
  const incrementPkmonsCaught = useGameStore(
    (state) => state.incrementPkmonsCaught
  );
  const [modalType, setModalType] = useState<ModalType | null>(null);

  return (
    <div className="relative flex flex-col items-center w-full h-full bg-green-100 text-xl">
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
          <MenuButton type="pakeDex" onClick={setModalType} />
          <MenuButton type="myPkMons" onClick={setModalType} />
          <MenuButton type="inventory" onClick={setModalType} />
        </div>
      </div>
      {modalType && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10">
          <BasicModal type={modalType} onClose={() => setModalType(null)} />
        </div>
      )}
      {encounteredPkmon && (
        <EncounterNotification
          pkmon={encounteredPkmon}
          onCapture={() => {
            addPkmon(encounteredPkmon);
            incrementPkmonsCaught();
            setEncounteredPkmon(null);
          }}
          onFlee={() => {
            setEncounteredPkmon(null);
          }}
        />
      )}
      <DevConsole />
    </div>
  );
}
