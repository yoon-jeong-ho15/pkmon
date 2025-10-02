import { useStartStore } from "../../store/useStartStore";
import { PKMON_SPECIES } from "../../lib/pkmons";
import type { PkmonSpecies } from "../../lib/type";

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
      className={`border-2 flex flex-col items-center ${
        starter === pkmon.id ? "bg-gray-300" : ""
      }`}
    >
      <div
        className="h-5/6 w-full border flex items-center justify-center cursor-pointer"
        onClick={() => setStarter(pkmon.id, pkmon.name)}
      >
        <img
          src={`/sprites/${pkmon.sprite}.svg`}
          alt={pkmon.name}
          className={`max-w-full max-h-full object-contain ${
            starter === pkmon.id ? "animate-bounce-fast" : ""
          }`}
        />
      </div>
      <span>{pkmon.name}</span>
    </div>
  );
}
