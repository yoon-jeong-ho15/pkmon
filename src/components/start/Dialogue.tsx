import { useState } from "react";
import { useStartStore } from "../../store/useStartStore";

export default function Dialogue() {
  const [index, setIndex] = useState(0);
  const goNext = useStartStore((state) => state.goNext);

  return (
    <>
      <div className="h-5/6">{dialogues[index]}</div>

      <div className="flex h-1/6 justify-between items-center">
        <div className="flex gap-5">
          <button
            onClick={() => setIndex((prev) => prev - 1)}
            disabled={index === 0}
            className="bg-black text-white text-lg px-3 py-1 hover:bg-gray-800 disabled:bg-gray-400"
          >
            Prev
          </button>

          <button
            onClick={() => setIndex((prev) => prev + 1)}
            disabled={index === dialogues.length - 1}
            className="bg-black text-white text-lg px-3 py-1 hover:bg-gray-800 disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
        <div className="">
          {index === dialogues.length - 1 && (
            <button
              onClick={goNext}
              className="bg-black text-white px-3 py-1 text-xl hover:bg-gray-800"
            >
              Ready
            </button>
          )}
        </div>
      </div>
    </>
  );
}

const dialogues = [
  "Welcome to the World of Packet Monsters, Trainer! I am Dr.Oak. Nice to meet you.",
  "Packet Monsters are monsters living on Web. They appear randomly while you are on Web. My job is to protect people from Packet Monsters. Can you help me with this?",
  "Are you ready?",
];
