export default function StorageControls() {
  const resetGame = () => {
    if (confirm("Reset all game data?")) {
      localStorage.removeItem("pkmon-storage");
      window.location.reload();
    }
  };

  const exportData = () => {
    const data = localStorage.getItem("pkmon-storage");
    console.log("[DEV] Game data:", data);
    if (data) {
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `pkmon-save-${Date.now()}.json`;
      a.click();
    }
  };

  return (
    <div className="border border-gray-700 rounded p-2 space-y-2">
      <div className="text-yellow-400 font-bold mb-1">Storage</div>
      <button
        onClick={exportData}
        className="w-full bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded"
      >
        Export Save
      </button>
      <button
        onClick={resetGame}
        className="w-full bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded"
      >
        Reset Game
      </button>
    </div>
  );
}
