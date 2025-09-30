import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import "./index.css";

export default function Options() {
  const [settings, setSettings] = useState({
    encounterRate: 30,
    soundEnabled: true,
    notificationsEnabled: true,
    autoCapture: false,
  });

  const handleSave = () => {
    // 나중에 chrome.storage에 저장
    console.log("Settings saved:", settings);
    alert("Settings saved successfully!");
  };

  const handleReset = () => {
    setSettings({
      encounterRate: 30,
      soundEnabled: true,
      notificationsEnabled: true,
      autoCapture: false,
    });
  };

  return (
    <div className="max-w-[800px] min-h-screen mx-auto bg-[#1a1a2e] text-[#eee] font-mono flex flex-col">
      <header className="relative bg-gradient-to-br from-[#0f3460] to-[#16213e] p-8 text-center border-b-4 border-[#e94560] shadow-[0_4px_16px_rgba(233,69,96,0.3)]">
        <button
          onClick={() => window.close()}
          className="absolute top-6 left-6 text-gray-500 text-2xl bg-transparent border-none cursor-pointer hover:text-gray-300"
        >
          ←
        </button>
        <h1 className="text-[32px] font-bold tracking-[3px] [text-shadow:3px_3px_0_#e94560] m-0 mb-2">
          ⚙️ SETTINGS
        </h1>
        <p className="text-gray-500 text-sm m-0">
          Customize your Packet Monster experience
        </p>
      </header>

      <main className="flex-1 p-8 overflow-y-auto">
        <section className="bg-[#16213e] border-2 border-[#0f3460] rounded-xl p-6 mb-6">
          <h2 className="text-lg font-bold text-[#e94560] m-0 mb-6 tracking-[2px]">
            ENCOUNTER SETTINGS
          </h2>

          <div className="flex justify-between items-center py-4 border-b border-[#0f3460]">
            <div className="flex-1">
              <label
                htmlFor="encounterRate"
                className="block text-base font-bold text-[#eee] mb-1"
              >
                Encounter Rate
              </label>
              <p className="text-xs text-gray-500 m-0">
                Probability of encountering a monster (0-100%)
              </p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                id="encounterRate"
                min="0"
                max="100"
                value={settings.encounterRate}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    encounterRate: Number(e.target.value),
                  })
                }
                className="w-[200px] h-2 rounded bg-[#0f3460] outline-none cursor-pointer appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#e94560] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_2px_4px_rgba(0,0,0,0.3)] [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-200 [&::-webkit-slider-thumb]:hover:bg-[#ff5577] [&::-webkit-slider-thumb]:hover:scale-110 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#e94560] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-[0_2px_4px_rgba(0,0,0,0.3)] [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-200 [&::-moz-range-thumb]:hover:bg-[#ff5577] [&::-moz-range-thumb]:hover:scale-110"
              />
              <span className="text-lg font-bold text-[#e94560] min-w-[50px] text-right">
                {settings.encounterRate}%
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center py-4">
            <div className="flex-1">
              <label
                htmlFor="autoCapture"
                className="block text-base font-bold text-[#eee] mb-1"
              >
                Auto Capture
              </label>
              <p className="text-xs text-gray-500 m-0">
                Automatically capture encountered monsters
              </p>
            </div>
            <div className="flex items-center gap-3">
              <label className="relative inline-block w-[60px] h-[30px]">
                <input
                  type="checkbox"
                  id="autoCapture"
                  checked={settings.autoCapture}
                  onChange={(e) =>
                    setSettings({ ...settings, autoCapture: e.target.checked })
                  }
                  className="opacity-0 w-0 h-0 peer"
                />
                <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[#0f3460] transition-all duration-300 rounded-[30px] border-2 border-[#1a1a2e] before:absolute before:content-[''] before:h-5 before:w-5 before:left-[3px] before:bottom-[3px] before:bg-gray-500 before:transition-all before:duration-300 before:rounded-full peer-checked:bg-[#e94560] peer-checked:before:translate-x-[30px] peer-checked:before:bg-white"></span>
              </label>
            </div>
          </div>
        </section>

        <section className="bg-[#16213e] border-2 border-[#0f3460] rounded-xl p-6 mb-6">
          <h2 className="text-lg font-bold text-[#e94560] m-0 mb-6 tracking-[2px]">
            NOTIFICATIONS
          </h2>

          <div className="flex justify-between items-center py-4 border-b border-[#0f3460]">
            <div className="flex-1">
              <label
                htmlFor="soundEnabled"
                className="block text-base font-bold text-[#eee] mb-1"
              >
                Sound Effects
              </label>
              <p className="text-xs text-gray-500 m-0">
                Play sound effects during encounters
              </p>
            </div>
            <div className="flex items-center gap-3">
              <label className="relative inline-block w-[60px] h-[30px]">
                <input
                  type="checkbox"
                  id="soundEnabled"
                  checked={settings.soundEnabled}
                  onChange={(e) =>
                    setSettings({ ...settings, soundEnabled: e.target.checked })
                  }
                  className="opacity-0 w-0 h-0 peer"
                />
                <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[#0f3460] transition-all duration-300 rounded-[30px] border-2 border-[#1a1a2e] before:absolute before:content-[''] before:h-5 before:w-5 before:left-[3px] before:bottom-[3px] before:bg-gray-500 before:transition-all before:duration-300 before:rounded-full peer-checked:bg-[#e94560] peer-checked:before:translate-x-[30px] peer-checked:before:bg-white"></span>
              </label>
            </div>
          </div>

          <div className="flex justify-between items-center py-4">
            <div className="flex-1">
              <label
                htmlFor="notificationsEnabled"
                className="block text-base font-bold text-[#eee] mb-1"
              >
                Browser Notifications
              </label>
              <p className="text-xs text-gray-500 m-0">
                Show browser notifications for encounters
              </p>
            </div>
            <div className="flex items-center gap-3">
              <label className="relative inline-block w-[60px] h-[30px]">
                <input
                  type="checkbox"
                  id="notificationsEnabled"
                  checked={settings.notificationsEnabled}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      notificationsEnabled: e.target.checked,
                    })
                  }
                  className="opacity-0 w-0 h-0 peer"
                />
                <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-[#0f3460] transition-all duration-300 rounded-[30px] border-2 border-[#1a1a2e] before:absolute before:content-[''] before:h-5 before:w-5 before:left-[3px] before:bottom-[3px] before:bg-gray-500 before:transition-all before:duration-300 before:rounded-full peer-checked:bg-[#e94560] peer-checked:before:translate-x-[30px] peer-checked:before:bg-white"></span>
              </label>
            </div>
          </div>
        </section>

        <section className="bg-[#16213e] border-2 border-[#0f3460] rounded-xl p-6 mb-6">
          <h2 className="text-lg font-bold text-[#e94560] m-0 mb-6 tracking-[2px]">
            DATA
          </h2>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
            <button className="p-4 bg-[#0f3460] border-2 border-[#1a1a2e] rounded-lg text-[#eee] font-mono text-sm font-bold cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 hover:border-[#e94560] hover:-translate-y-0.5">
              <span>📤</span>
              Export Data
            </button>
            <button className="p-4 bg-[#0f3460] border-2 border-[#1a1a2e] rounded-lg text-[#eee] font-mono text-sm font-bold cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 hover:border-[#e94560] hover:-translate-y-0.5">
              <span>📥</span>
              Import Data
            </button>
            <button className="p-4 bg-[#5a1a1a] border-2 border-[#8b0000] rounded-lg text-[#eee] font-mono text-sm font-bold cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 hover:border-[#ff3333] hover:-translate-y-0.5">
              <span>🗑️</span>
              Clear All Data
            </button>
          </div>
        </section>
      </main>

      <footer className="flex gap-4 px-8 py-6 bg-[#16213e] border-t-2 border-[#0f3460]">
        <button
          className="flex-1 p-4 border-[3px] border-[#0f3460] rounded-lg font-mono text-base font-bold cursor-pointer transition-all duration-200 uppercase bg-transparent text-gray-500 hover:bg-[#0f3460] hover:text-[#eee] hover:-translate-y-0.5"
          onClick={handleReset}
        >
          Reset to Default
        </button>
        <button
          className="flex-1 p-4 border-[3px] border-[#ff5577] rounded-lg font-mono text-base font-bold cursor-pointer transition-all duration-200 uppercase bg-[#e94560] text-white shadow-[0_4px_0_#c73850] hover:bg-[#ff5577] hover:-translate-y-0.5 hover:shadow-[0_6px_0_#c73850] active:translate-y-0.5 active:shadow-[0_2px_0_#c73850]"
          onClick={handleSave}
        >
          Save Settings
        </button>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>
);
