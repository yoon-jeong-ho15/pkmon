import { useGameStore } from "../../store/useGameStore";

export default function TrainerStatus() {
  const { username, joinedAt, playTime, pkmonsCaught, totalEncounters } =
    useGameStore();

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatPlayTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="border-2 border-gray-800 p-4 pixel-font text-xl pixel-gradient rounded">
      <div className="flex h-full gap-4 items-center">
        {/* sprite*/}
        <div className="w-1/2 h-full flex flex-col">
          <div>
            <h3>Trainer</h3>
          </div>
          <div className="w-full flex items-center justify-center border bg-white">
            <img
              src="/sprites/t1.svg"
              alt="Trainer"
              className="pixelated max-w-full max-h-full"
            />
          </div>
        </div>

        {/* 트레이너 정보 */}
        <div className="w-1/2 h-full flex flex-col just">
          <div className="">
            <h3 className="text-4xl">{username}</h3>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-600">Joined:</span>
              <span>{formatDate(joinedAt)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Play Time:</span>
              <span>{formatPlayTime(playTime)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Caught:</span>
              <span>{pkmonsCaught}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Encounters:</span>
              <span>{totalEncounters}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
