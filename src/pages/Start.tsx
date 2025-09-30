import Dialogue from "../components/start/Dialogue";
import NameInput from "../components/start/NameInput";
import Starters from "../components/start/Starters";
import { useStartStore } from "../store/useStartStore";

export default function Start() {
  const step = useStartStore((state) => state.step);
  const goBack = useStartStore((state) => state.goBack);
  const goNext = useStartStore((state) => state.goNext);
  const starter = useStartStore((state) => state.starter);

  if (step === "menu") {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-amber-100">
        <div className="text-4xl">Packet Monster</div>
        <div>
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
        <div className="w-full h-1/2 border-4 bg-white grid grid-cols-3 gap-2 p-2">
          <Starters />
        </div>
        <div className="w-full h-1/2 border-4 bg-white p-5 flex flex-col">
          <div className="h-5/6">You chose '{starter}' right?</div>
          <div className="flex h-1/6 justify-end items-center">
            <button
              onClick={() => alert("save in localStorage")}
              className="bg-black text-white px-3 py-1 text-xl hover:bg-gray-800"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  }

  // return (
  //   <div className="flex flex-col items-center justify-center h-full p-8">
  //     <div className="bg-white border-4 border-black p-8 max-w-2xl w-full">
  //       <h1 className="text-2xl mb-2 text-center">Hello, {playerName}!</h1>
  //       <p className="text-lg mb-6 text-center">
  //         Choose your starter Packet Monster:
  //       </p>

  //       <div className="grid grid-cols-3 gap-4">
  //         {["FireMon", "WaterMon", "GrassMon"].map((starter) => (
  //           <button
  //             key={starter}
  //             onClick={() => handleStarterSelect(starter)}
  //             className={`border-4 border-black p-6 text-lg hover:bg-gray-100 ${
  //               selectedStarter === starter ? "bg-yellow-200" : "bg-white"
  //             }`}
  //           >
  //             <div className="text-4xl mb-2">🔥💧🌿</div>
  //             <div>{starter}</div>
  //           </button>
  //         ))}
  //       </div>

  //       {selectedStarter && (
  //         <button
  //           className="w-full mt-6 bg-black text-white px-6 py-3 text-lg hover:bg-gray-800"
  //           onClick={() => console.log("Start game with", selectedStarter)}
  //         >
  //           Start Adventure!
  //         </button>
  //       )}
  //     </div>
  //   </div>
  // );
}
