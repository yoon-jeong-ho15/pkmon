import { useState } from "react";
import { useStartStore } from "../../store/useStartStore";

export default function NameInput() {
  const [name, setName] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);
  const setUsername = useStartStore((state) => state.setUsername);
  const goNext = useStartStore((state) => state.goNext);

  const handleSubmit = () => {
    if (name.trim()) {
      setIsConfirming(true);
    }
  };

  const handleConfirm = () => {
    setUsername(name.trim());
    goNext();
  };

  const handleCancel = () => {
    setIsConfirming(false);
    setName("");
  };

  return (
    <>
      <div className="h-4/6">
        {isConfirming ? `${name} is your name, right?` : "What is your name?"}
      </div>

      <div className="h-2/6 flex gap-5 items-center">
        {isConfirming ? (
          <>
            <button
              onClick={handleCancel}
              className="bg-gray-600 text-white hover:bg-gray-700 flex-1 py-1"
            >
              No
            </button>
            <button
              onClick={handleConfirm}
              className="bg-black text-white hover:bg-gray-800 flex-1 py-1"
            >
              Yes
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-2 border-black px-3 py-1"
              placeholder="Enter your name"
              autoFocus
              maxLength={12}
            />
            <button
              onClick={handleSubmit}
              disabled={!name.trim()}
              className="bg-black text-white px-3 py-1 hover:bg-gray-800 disabled:bg-gray-400"
            >
              Submit
            </button>
          </>
        )}
      </div>
    </>
  );
}
