import Header from "../components/home/Header";
import PkmonStatus from "../components/home/PkmonStatus";
import TrainerStatus from "../components/home/TrainerStatus";
import WalkingAnimation from "../components/home/WalkingAnimation";
import { useGameStore } from "../store/useGameStore";

export default function Home() {
  const encounterEnabled = useGameStore(
    (state) => state.settings.encounterEnabled
  );

  return (
    <div className="flex flex-col items-center w-full h-full bg-green-100 text-xl">
      <Header className="h-1/10" />

      <div className="w-full h-9/10 flex flex-col">
        <div
          className={`w-full h-1/2 grid gap-3 p-3 ${
            encounterEnabled ? "grid-cols-4 h-2/3" : "grid-cols-2 h-1/2"
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

        <div className={`w-full flex-1 grid grid-cols-3 gap-3 p-3 bg-sky-100`}>
          <button className="pixel-gradient rounded border"></button>
          <button className="pixel-gradient rounded border"></button>
          <button className="pixel-gradient rounded border"></button>
          <button className="pixel-gradient rounded border"></button>
          <button className="pixel-gradient rounded border"></button>
          <button className="pixel-gradient rounded border"></button>
        </div>
      </div>
    </div>
  );
}
