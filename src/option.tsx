import React from "react";
import ReactDOM from "react-dom/client";
import "./option.css";
import { useGameStore } from "./store/useGameStore";

export default function Options() {
  const { userId, username, settings, updateSettings } = useGameStore();

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  const handleReset = () => {
    updateSettings({
      notification: true,
      volume: 50,
    });
  };

  return (
    <div className="flex flex-col gap-3 text-2xl">
      <header className="flex flex-col border-b">
        <div className="flex gap-3 text-5xl px-2">
          <button onClick={() => window.close()}>←</button>
          <h1>SETTINGS</h1>
        </div>
        <p className="text-xl px-1">Customize your Packet Monster experience</p>
      </header>

      <main>
        <section className="flex flex-col border rounded p-2 mx-5 my-3 bg-white">
          <h2>TRAINER INFO</h2>
          <div className="flex gap-6 text-xl mt-2">
            <div className="flex items-center gap-2">
              <span className="font-bold">TRAINER:</span>
              <span>{username}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">ID:</span>
              <span>{userId}</span>
            </div>
          </div>
        </section>

        {/* <section className="flex flex-col border rounded p-2 mx-5 my-3">
          <h2>ENCOUNTER SETTINGS</h2>

          <div>
            <div>
              <label htmlFor="">Encounter Rate</label>
              <p>Probability of encountering a monster (0-100%)</p>
            </div>
            <div>
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
              />
              <span>{settings.encounterRate}%</span>
            </div>
          </div>

          <div>
            <div>
              <label htmlFor="autoCapture">Auto Capture</label>
              <p>Automatically capture encountered monsters</p>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  id="autoCapture"
                  checked={settings.autoCapture}
                  onChange={(e) =>
                    setSettings({ ...settings, autoCapture: e.target.checked })
                  }
                />
                <span></span>
              </label>
            </div>
          </div>
        </section> */}

        <section className="flex flex-col border rounded p-2 mx-5 my-3">
          <h2>NOTIFICATIONS & SOUND</h2>

          <div>
            <div>
              <label htmlFor="notification">Browser Notifications</label>
              <p>Show browser notifications for encounters</p>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  id="notification"
                  checked={settings.notification}
                  onChange={(e) =>
                    updateSettings({ notification: e.target.checked })
                  }
                />
                <span></span>
              </label>
            </div>
          </div>

          <div>
            <div>
              <label htmlFor="volume">Volume</label>
              <p>Sound effect volume (0-100)</p>
            </div>
            <div>
              <input
                type="range"
                id="volume"
                min="0"
                max="100"
                value={settings.volume}
                onChange={(e) =>
                  updateSettings({ volume: Number(e.target.value) })
                }
              />
              <span>{settings.volume}%</span>
            </div>
          </div>
        </section>

        <section className="flex flex-col border rounded p-2 mx-5 my-3">
          <h2>DATA</h2>

          <div>
            <button>
              <span>📤</span>
              Export Data
            </button>
            <button>
              <span>📥</span>
              Import Data
            </button>
            <button>
              <span>🗑️</span>
              Clear All Data
            </button>
          </div>
        </section>
      </main>

      <footer>
        <button onClick={handleReset}>Reset to Default</button>
        <button onClick={handleSave}>Save Settings</button>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>
);
