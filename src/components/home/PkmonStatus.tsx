import { useGameStore } from "../../store/useGameStore";

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
  const spPercentage = (leadPkmon.sp / leadPkmon.maxSp) * 100;

  if (variant === "compact") {
    return (
      <div
        className={`
          h-full border-2 border-gray-800 
          p-2 text-xl pixel-gradient
          rounded overflow-hidden`}
      >
        <div className="flex flex-col gap-2 items-center h-full">
          <div className="flex gap-4">
            {/* 이름/레벨 */}
            <h3 className="font-bold">{leadPkmon.name}</h3>
            <p className="text-gray-600">Lv. {leadPkmon.level}</p>
          </div>

          {/* sprite */}
          <div className="w-full flex items-center justify-center border bg-white">
            <img
              src={`/sprites/${leadPkmon.sprite}.svg`}
              alt={leadPkmon.name}
              className="w-full h-full animate-bounce-fast"
              style={{ "--bounce-distance": "5px" } as React.CSSProperties}
            />
          </div>

          <div className="w-full  gap-2">
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

            {/* SP */}
            <div className="">
              <div className="flex justify-between mb-1">
                <span>SP</span>
                <span>
                  {leadPkmon.sp}/{leadPkmon.maxSp}
                </span>
              </div>
              <div className="w-full bg-gray-300 h-2 border border-gray-800">
                <div
                  className="h-full bg-blue-500"
                  style={{ width: `${spPercentage}%` }}
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
      </div>
    );
  }

  return (
    <div
      className={`border-2 border-gray-800 p-4 pixel-font text-xl pixel-gradient rounded ${className}`}
    >
      <div className="flex h-full gap-4 items-center">
        {/* sprite*/}
        <div className="w-1/2 h-full flex flex-col">
          <div>
            <h3>Packet Mon</h3>
          </div>
          <div className="w-full flex items-center justify-center border bg-white">
            <img
              src={`/sprites/${leadPkmon.sprite}.svg`}
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

          {/* SP */}
          <div className="mb-2">
            <div className="flex justify-between mb-1">
              <span>SP</span>
              <span>
                {leadPkmon.sp}/{leadPkmon.maxSp}
              </span>
            </div>
            <div className="w-full bg-gray-300 h-2 border border-gray-800">
              <div
                className="h-full bg-blue-500"
                style={{ width: `${spPercentage}%` }}
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
