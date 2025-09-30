import { useState } from "react";
import { EncounterNotification } from "../components/EncounterNotification";
import type { Monster } from "../lib/type";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"monsters" | "stats">("monsters");
  const [showEncounter, setShowEncounter] = useState(false);

  // Mock data - 나중에 chrome.storage에서 가져올 예정
  const [monsters] = useState<Monster[]>([
    { id: 1, name: "Byteon", level: 5, hp: 25, maxHp: 30, sprite: "🔵" },
    { id: 2, name: "Pixelmon", level: 3, hp: 18, maxHp: 20, sprite: "🟣" },
    { id: 3, name: "Dataur", level: 7, hp: 40, maxHp: 45, sprite: "🟢" },
  ]);

  const [playerStats] = useState({
    encounters: 15,
    captured: 3,
    visited: 127,
  });

  const handleCapture = () => {
    console.log("Monster captured!");
    setShowEncounter(false);
  };

  const handleFlee = () => {
    console.log("Fled from encounter");
    setShowEncounter(false);
  };

  return (
    <>
      <div className="w-[360px] min-h-[480px] bg-[#1a1a2e] text-[#eee] font-mono flex flex-col">
        <header className="bg-gradient-to-br from-[#0f3460] to-[#16213e] p-4 flex justify-between items-center border-b-[3px] border-[#e94560] shadow-[0_2px_8px_rgba(233,69,96,0.3)]">
          <h1
            className="text-lg font-bold tracking-[2px]"
            style={{ textShadow: "2px 2px 0 #e94560" }}
          >
            PACKET MONSTER
          </h1>
          <div className="flex gap-2 items-center">
            <div className="bg-[#e94560] px-3 py-1 rounded shadow-[0_2px_4px_rgba(0,0,0,0.3)] text-sm font-bold">
              LV.{Math.floor(playerStats.visited / 10)}
            </div>
            <button
              onClick={() => {
                window.open("/options.html", "_blank");
              }}
              className="text-gray-500 text-xl bg-transparent border-none cursor-pointer hover:text-gray-300"
            >
              ⚙️
            </button>
          </div>
        </header>

        <nav className="flex bg-[#16213e] border-b-2 border-[#0f3460]">
          <button
            className={`flex-1 p-3 bg-transparent border-none font-mono text-sm font-bold cursor-pointer transition-all border-b-[3px] border-transparent ${
              activeTab === "monsters"
                ? "text-[#e94560] border-b-[#e94560] bg-[rgba(233,69,96,0.15)]"
                : "text-gray-500 hover:bg-[rgba(233,69,96,0.1)] hover:text-[#eee]"
            }`}
            onClick={() => setActiveTab("monsters")}
          >
            MONSTERS
          </button>
          <button
            className={`flex-1 p-3 bg-transparent border-none font-mono text-sm font-bold cursor-pointer transition-all border-b-[3px] border-transparent ${
              activeTab === "stats"
                ? "text-[#e94560] border-b-[#e94560] bg-[rgba(233,69,96,0.15)]"
                : "text-gray-500 hover:bg-[rgba(233,69,96,0.1)] hover:text-[#eee]"
            }`}
            onClick={() => setActiveTab("stats")}
          >
            STATS
          </button>
        </nav>

        <main className="flex-1 overflow-y-auto p-4">
          {activeTab === "monsters" ? (
            <div className="flex flex-col gap-3">
              {monsters.length === 0 ? (
                <div className="text-center py-12 px-6 text-gray-500">
                  <p className="mb-2">No monsters captured yet!</p>
                  <p className="text-xs text-gray-600">
                    Keep browsing to encounter monsters
                  </p>
                </div>
              ) : (
                monsters.map((monster) => (
                  <div
                    key={monster.id}
                    className="bg-[#16213e] border-2 border-[#0f3460] rounded-lg p-3 flex gap-3 transition-all shadow-[0_2px_4px_rgba(0,0,0,0.2)] hover:border-[#e94560] hover:-translate-y-0.5 hover:shadow-[0_4px_8px_rgba(233,69,96,0.3)]"
                  >
                    <div className="text-5xl w-16 h-16 flex items-center justify-center bg-[#0f3460] rounded-lg border-2 border-[#1a1a2e]">
                      {monster.sprite}
                    </div>
                    <div className="flex-1 flex flex-col gap-1.5">
                      <div className="text-base font-bold text-[#e94560]">
                        {monster.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        LV.{monster.level}
                      </div>
                      <div className="flex items-center gap-2 text-[11px]">
                        <div className="text-[#e94560] font-bold">HP</div>
                        <div className="flex-1 h-3 bg-[#0f3460] border-2 border-[#1a1a2e] rounded-md overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#4ecca3] to-[#2ecc71] transition-all shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)]"
                            style={{
                              width: `${(monster.hp / monster.maxHp) * 100}%`,
                            }}
                          />
                        </div>
                        <div className="text-gray-500 min-w-[50px] text-right">
                          {monster.hp}/{monster.maxHp}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="bg-[#16213e] border-2 border-[#0f3460] rounded-lg p-4 flex justify-between items-center transition-all hover:border-[#e94560] hover:translate-x-1">
                <span className="text-sm text-gray-500">Total Encounters</span>
                <span
                  className="text-2xl font-bold text-[#e94560]"
                  style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.3)" }}
                >
                  {playerStats.encounters}
                </span>
              </div>
              <div className="bg-[#16213e] border-2 border-[#0f3460] rounded-lg p-4 flex justify-between items-center transition-all hover:border-[#e94560] hover:translate-x-1">
                <span className="text-sm text-gray-500">Monsters Captured</span>
                <span
                  className="text-2xl font-bold text-[#e94560]"
                  style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.3)" }}
                >
                  {playerStats.captured}
                </span>
              </div>
              <div className="bg-[#16213e] border-2 border-[#0f3460] rounded-lg p-4 flex justify-between items-center transition-all hover:border-[#e94560] hover:translate-x-1">
                <span className="text-sm text-gray-500">Pages Visited</span>
                <span
                  className="text-2xl font-bold text-[#e94560]"
                  style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.3)" }}
                >
                  {playerStats.visited}
                </span>
              </div>
              <div className="bg-[#16213e] border-2 border-[#0f3460] rounded-lg p-4 flex justify-between items-center transition-all hover:border-[#e94560] hover:translate-x-1">
                <span className="text-sm text-gray-500">Capture Rate</span>
                <span
                  className="text-2xl font-bold text-[#e94560]"
                  style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.3)" }}
                >
                  {playerStats.encounters > 0
                    ? Math.round(
                        (playerStats.captured / playerStats.encounters) * 100
                      )
                    : 0}
                  %
                </span>
              </div>
            </div>
          )}
        </main>

        <button
          onClick={() => setShowEncounter(true)}
          className="absolute bottom-5 right-5 px-6 py-3 bg-[#e94560] text-white border-none rounded-lg cursor-pointer font-mono font-bold text-sm hover:bg-[#ff5577]"
        >
          TEST ENCOUNTER
        </button>
      </div>

      {showEncounter && (
        <EncounterNotification
          monster={{ name: "Cryptomon", level: 8, sprite: "🔮" }}
          onCapture={handleCapture}
          onFlee={handleFlee}
        />
      )}
    </>
  );
}
