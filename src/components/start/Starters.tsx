import { useStartStore } from "../../store/useStartStore";
import { PKMON_SPECIES } from "../../data/pkmons";
import type { PkmonSpecies } from "../../data/type";

export default function Starters() {
  const starters = PKMON_SPECIES.filter((pkmon) => pkmon.id <= 3);
  return (
    <>
      {starters.map((pkmon) => (
        <StarterCard key={pkmon.id} pkmon={pkmon} />
      ))}
    </>
  );
}

export function StarterCard({ pkmon }: { pkmon: PkmonSpecies }) {
  const starter = useStartStore((state) => state.starter);
  const setStarter = useStartStore((state) => state.setStarter);

  return (
    <div
      className={`border-2 flex flex-col items-center flex-1 ${
        starter === pkmon.id ? "bg-gray-300" : ""
      }`}
    >
      <div
        className="h-5/6 w-full flex items-center justify-center cursor-pointer border-b"
        onClick={() => setStarter(pkmon.id, pkmon.name)}
      >
        <img
          src={`/sprites/${pkmon.id}.svg`}
          alt={pkmon.name}
          className={`w-full h-full object-contain ${
            starter === pkmon.id ? "animate-bounce-fast" : ""
          }`}
        />
      </div>
      <span>{pkmon.name}</span>
    </div>
  );
}
