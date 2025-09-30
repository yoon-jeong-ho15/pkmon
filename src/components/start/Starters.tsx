import { useStartStore } from "../../store/useStartStore";

export default function Starters() {
  const starters = ["red", "blue", "green"];
  return (
    <>
      {starters.map((name) => (
        <StarterCard name={name} />
      ))}
    </>
  );
}

export function StarterCard({ name }: { name: string }) {
  const starter = useStartStore((state) => state.starter);
  const setStarter = useStartStore((state) => state.setStarter);

  return (
    <div
      className={`border-2 flex flex-col items-center ${
        starter === name ? "bg-gray-300" : ""
      }`}
    >
      <div
        className="h-5/6 w-full border"
        onClick={() => setStarter(name)}
      ></div>
      <span>{name}</span>
    </div>
  );
}
