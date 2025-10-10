import type { Pkmon } from "../../data/type";

export default function PkmonCard({
  battle,
  player,
  pkmon,
}: {
  battle?: boolean;
  player?: boolean;
  pkmon: Pkmon;
}) {
  const hpPercentage = (pkmon.hp / pkmon.maxHp) * 100;

  if (player) {
    return (
      <div className="flex w-full p-1">
        <div className="size-32 flex items-center justify-center">
          <img
            src={`/sprites/pkmon/${pkmon.id}.svg`}
            alt={pkmon.name}
            className="w-full h-full object-contain animate-bounce-fast"
            style={{ "--bounce-distance": "5px" } as React.CSSProperties}
          />
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex w-full justify-center gap-5 items-center">
            <h2 className="text-xl font-bold m-0 mb-2">{pkmon.name}</h2>
            <p className="text-base text-gray-500 m-0">LV.{pkmon.level}</p>
          </div>
          <div className="w-full bg-gray-300 h-2 border border-gray-800">
            <div
              className={`h-full ${
                hpPercentage > 50
                  ? "bg-green-500"
                  : hpPercentage > 20
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${hpPercentage}%` }}
            />
          </div>
          <div className="flex justify-between mb-1">
            <span>HP</span>
            <span>
              {pkmon.hp}/{pkmon.maxHp}
            </span>
          </div>
        </div>
      </div>
    );
  }
  if (battle) {
    return (
      <div className="flex flex-row-reverse w-full p-1">
        <div className="size-32 flex items-center justify-center">
          <img
            src={`/sprites/pkmon/${pkmon.id}.svg`}
            alt={pkmon.name}
            className="w-full h-full object-contain animate-bounce-fast"
            style={{ "--bounce-distance": "5px" } as React.CSSProperties}
          />
        </div>
        <div className="flex flex-col flex-1">
          <div className="w-full bg-gray-300 h-2 border border-gray-800">
            <div
              className={`h-full ${
                hpPercentage > 50
                  ? "bg-green-500"
                  : hpPercentage > 20
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${hpPercentage}%` }}
            />
          </div>
          <div className="flex justify-between mb-1">
            <span>HP</span>
            <span>
              {pkmon.hp}/{pkmon.maxHp}
            </span>
          </div>
          <div className="flex w-full justify-center gap-5 items-center">
            <h2 className="text-xl font-bold m-0 mb-2">{pkmon.name}</h2>
            <p className="text-base text-gray-500 m-0">LV.{pkmon.level}</p>
          </div>
        </div>
      </div>
    );
  }

  // Default mode layout (vertical)
  return (
    <div
      className="
    flex flex-col items-center bg-gray-200 p-3 gap-3
    mb-8 rounded-lg pixel-gradient border-2
    mx-6"
    >
      <div className="size-60 flex items-center justify-center border bg-white min-h-0">
        <img
          src={`/sprites/pkmon/${pkmon.id}.svg`}
          alt={pkmon.name}
          className="w-full h-full object-contain animate-bounce-fast"
          style={{ "--bounce-distance": "5px" } as React.CSSProperties}
        />
      </div>
      <div className="text-center flex items-center justify-center gap-6 w-full ">
        <h2 className="text-3xl font-bold m-0 mb-2">{pkmon.name}</h2>
        <p className="text-base text-gray-500 m-0">LV.{pkmon.level}</p>
      </div>

      <div className="flex flex-col gap-2 w-full">
        {/* HP */}
        <div className="flex justify-between mb-1">
          <span>HP</span>
          <span>
            {pkmon.hp}/{pkmon.maxHp}
          </span>
        </div>
        <div className="w-full bg-gray-300 h-2 border border-gray-800">
          <div
            className={`h-full ${
              hpPercentage > 50
                ? "bg-green-500"
                : hpPercentage > 20
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
            style={{ width: `${hpPercentage}%` }}
          />
        </div>

        {/* ATK & DEF */}
        <div className="flex gap-4 justify-center">
          <span>ATK: {pkmon.atk}</span>
          <span>DEF: {pkmon.def}</span>
        </div>
      </div>
    </div>
  );
}
