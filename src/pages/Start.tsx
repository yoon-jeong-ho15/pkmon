import Dialogue from "../components/start/Dialogue";
import NameInput from "../components/start/NameInput";
import Starters from "../components/start/Starters";
import { initializeGame } from "../lib/utils";
import { useStartStore } from "../store/useStartStore";

export default function Start() {
  const step = useStartStore((state) => state.step);
  const goBack = useStartStore((state) => state.goBack);
  const goNext = useStartStore((state) => state.goNext);
  const username = useStartStore((state) => state.username);
  const starter = useStartStore((state) => state.starter);
  const starterName = useStartStore((state) => state.starterName);

  if (step === "menu") {
    return (
      <div className="flex flex-col items-center h-full bg-amber-100">
        <div className="w-1/2 flex items-center justify-center">
          <img
            src={`/packetmonster.svg`}
            alt="logo"
            className="w-full h-full"
          />
        </div>

        <div className="flex flex-col">
          <div className="text-4xl">Packet Monster</div>
          <button
            onClick={goNext}
            className="bg-black text-white px-8 py-4 text-xl hover:bg-gray-800"
          >
            Start
          </button>
        </div>
      </div>
    );
  } else if (step !== "starter") {
    return (
      <div className="flex flex-col gap-3 items-center justify-center h-full p-8 bg-blue-200 text-2xl">
        <button
          onClick={goBack}
          className="self-baseline bg-black text-white px-3 text-lg"
        >
          back
        </button>
        <div className="w-full h-1/2 border-4 bg-white"></div>
        <div className="w-full h-1/2 border-4 bg-white p-5 flex flex-col">
          {step === "dialogue" ? <Dialogue /> : <NameInput />}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-3 items-center justify-center h-full p-8 bg-blue-200 text-2xl">
        <button
          onClick={goBack}
          className="self-baseline bg-black text-white px-3 text-lg"
        >
          back
        </button>
        <div className="w-full h-1/2 border-4 bg-white flex gap-2 p-2">
          <Starters />
        </div>
        <div className="w-full h-1/2 border-4 bg-white p-5 flex flex-col">
          <div className="h-5/6">You chose '{starterName}' right?</div>
          <div className="flex h-1/6 justify-end items-center">
            <button
              onClick={() => {
                initializeGame(username, starter);
                window.location.href = "/";
                //react-router의 navigate()를 써야할까?
              }}
              className="bg-black text-white px-3 py-1 text-xl hover:bg-gray-800"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  }
}
