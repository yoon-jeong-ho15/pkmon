import { useGameStore } from "../../store/useGameStore";
import { getExpToNextLevel } from "../../lib/utils";

type PkmonStatusProps = {
  className?: string;
  variant?: "compact" | "full";
};

export default function PkmonStatus({
  className,
  variant = "full",
}: PkmonStatusProps) {
  const { leadPkmon } = useGameStore();

  if (!leadPkmon) {
    return (
      <div className="border-2 border-gray-800 p-4 pixel-font pixel-gradient">
        <p className="text-gray-500">No Pkmon selected</p>
      </div>
    );
  }

  const hpPercentage = (leadPkmon.hp / leadPkmon.maxHp) * 100;
  const expProgress = getExpToNextLevel(leadPkmon.exp);

  if (variant === "compact") {
    return (
      <div
        className={`
          h-full w-1/4 border-2 border-gray-800 
          p-2 text-xl pixel-gradient-10
          rounded flex flex-col gap-2 items-center
          `}
      >
        <div className="flex flex-col w-full h-1/2">
          {/* 이름/레벨 */}
          <div className="flex gap-2 justify-between">
            <h3 className="font-bold">{leadPkmon.name}</h3>
            <p className="text-gray-600">Lv. {leadPkmon.level}</p>
          </div>

          {/* sprite */}
          <div className="w-full flex-1 flex items-center justify-center border bg-white min-h-0">
            <img
              src={`/sprites/pkmon/${leadPkmon.id}.svg`}
              alt={leadPkmon.name}
              className="w-full h-full object-contain animate-bounce-fast"
              style={{ "--bounce-distance": "5px" } as React.CSSProperties}
            />
          </div>
        </div>

        <div className="w-full h-1/2 gap-1">
          {/* HP */}
          <div className="">
            <div className="flex justify-between mb-1">
              <span>HP</span>
              <span>
                {leadPkmon.hp}/{leadPkmon.maxHp}
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
          </div>

          {/* EXP */}
          <div className="">
            <div className="flex justify-between mb-1">
              <span>EXP</span>
              <span>
                {expProgress.current}/{expProgress.needed}
              </span>
            </div>
            <div className="w-full bg-gray-300 h-2 border border-gray-800">
              <div
                className="h-full bg-purple-500"
                style={{ width: `${expProgress.percentage}%` }}
              />
            </div>
          </div>

          {/* ATK & DEF */}
          <div className="flex gap-4 justify-center">
            <span>ATK: {leadPkmon.atk}</span>
            <span>DEF: {leadPkmon.def}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        border-2 border-gray-800 p-4 h-full 
        text-xl pixel-gradient rounded 
        w-1/2
        ${className}`}
    >
      <div className="flex h-full gap-4 items-center">
        {/* sprite*/}
        <div className="w-1/2 h-full flex flex-col">
          <div>
            <h3>Packet Mon</h3>
          </div>
          <div className="w-full flex items-center justify-center border bg-white">
            <img
              src={`/sprites/pkmon/${leadPkmon.id}.svg`}
              alt={leadPkmon.name}
              className="w-full h-full animate-bounce-fast"
              style={{ "--bounce-distance": "5px" } as React.CSSProperties}
            />
          </div>
        </div>

        {/* 상태 정보 */}
        <div className="w-1/2 h-full flex flex-col">
          {/* 이름, 레벨 */}
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-3xl">{leadPkmon.name}</h3>
            <p className="text-gray-600">Lv. {leadPkmon.level}</p>
          </div>

          {/* HP */}
          <div className="mb-2">
            <div className="flex justify-between mb-1">
              <span>HP</span>
              <span>
                {leadPkmon.hp}/{leadPkmon.maxHp}
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
          </div>

          {/* EXP */}
          <div className="mb-2">
            <div className="flex justify-between mb-1">
              <span>EXP</span>
              <span>
                {expProgress.current}/{expProgress.needed}
              </span>
            </div>
            <div className="w-full bg-gray-300 h-2 border border-gray-800">
              <div
                className="h-full bg-purple-500"
                style={{ width: `${expProgress.percentage}%` }}
              />
            </div>
          </div>

          {/* 공격력 & 방어력 */}
          <div className="flex text-2xl justify-around">
            <span>ATK: {leadPkmon.atk}</span>
            <span>DEF: {leadPkmon.def}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
