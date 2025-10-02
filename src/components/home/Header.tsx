import { useGameStore } from "../../store/useGameStore";

export default function Header({ className }: { className: string }) {
  const { settings, updateSettings } = useGameStore();

  const openOptions = () => {
    window.open("/option.html", "_blank");
  };

  const toggleEncounter = () => {
    updateSettings({ encounterEnabled: !settings.encounterEnabled });
  };

  return (
    <header
      className={`${className} flex items-center bg-gray-100 w-full py-6 border rounded-xl p-1 pixel-gradient`}
    >
      <button
        onClick={toggleEncounter}
        className={`relative w-14 h-8 rounded-full transition-colors duration-300 ml-4 ${
          settings.encounterEnabled ? "bg-blue-500" : "bg-gray-400"
        }`}
      >
        <div
          className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
            settings.encounterEnabled ? "translate-x-6" : ""
          }`}
        />
      </button>

      <div className="text-5xl flex-1 flex justify-center mb-2 gap-2">
        <span
          style={{
            color: "#ffffff",
            WebkitTextStroke: "1px #000000",
            textShadow: "2px 2px 0 #dc2626, 4px 4px 0 #b91c1c",
          }}
        >
          Packet
        </span>
        <span
          style={{
            color: "#ffffff",
            WebkitTextStroke: "1px #000000",
            textShadow: "2px 2px 0 #3b82f6, 4px 4px 0 #2563eb",
          }}
        >
          Monster
        </span>
      </div>
      <button
        onClick={openOptions}
        className="p-1 px-2 text-lg bg-black text-white hover:bg-gray-800 rounded-lg m-2"
      >
        Options
      </button>
    </header>
  );
}
