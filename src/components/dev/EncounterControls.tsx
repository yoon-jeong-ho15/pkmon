import { checkEncounter, triggerEncounter } from "../../lib/encounter";

export default function EncounterControls() {
  return (
    <div className="border border-gray-700 rounded p-2 space-y-2">
      <div className="text-yellow-400 font-bold mb-1">Encounter</div>
      <button
        onClick={triggerEncounter}
        className="w-full bg-purple-600 hover:bg-purple-700 px-3 py-1.5 rounded"
      >
        Force Encounter
      </button>
      <button
        onClick={checkEncounter}
        className="w-full bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded"
      >
        +1 Step
      </button>
    </div>
  );
}
