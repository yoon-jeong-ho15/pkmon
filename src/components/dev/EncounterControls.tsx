import { checkEncounter, triggerEncounter } from "../../lib/encounter";
import { useGameStore } from "../../store/useGameStore";

export default function EncounterControls() {
  const encounterEnabled = useGameStore((state) => state.encounterEnabled);

  return (
    <div className="border border-gray-700 rounded p-2 space-y-2">
      <div className="text-yellow-400 font-bold mb-1">Encounter</div>
      <button
        onClick={triggerEncounter}
        disabled={!encounterEnabled}
        className="w-full bg-purple-600 hover:bg-purple-700 px-3 py-1.5 rounded
         disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Force Encounter
      </button>
      <button
        onClick={checkEncounter}
        disabled={!encounterEnabled}
        className="w-full bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded
        disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        +1 Step
      </button>
    </div>
  );
}
