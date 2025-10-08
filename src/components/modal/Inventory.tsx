import { useGameStore } from "../../store/useGameStore";

export default function Inventory() {
  const { inventory, money } = useGameStore();
  return (
    <div
      className="
    pixel-gradient-10 flex-1 grid grid-cols-3 
    overflow-y-scroll gap-5 p-4"
    >
      <div>
        <span>money :</span>
        <span>{money}</span>
      </div>
      {inventory.map((item) => (
        <div
          key={item.id}
          className="h-50 pixel-gradient rounded-xl border p-2
          "
          style={{ boxShadow: "3px 3px 0 #000000" }}
        >
          <span className="text-2xl">{item.name}</span>
          <div className="h-2/3 bg-white border rounded-lg">
            <img />
          </div>
          <div className="flex gap-6 justify-between">
            <span>{item.type}</span>
            <span>Qt : {item.quantity}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
