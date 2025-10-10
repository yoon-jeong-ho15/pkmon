import { useGameStore } from "../../store/useGameStore";

interface ItemListProps {
  onItemUsed?: () => void;
}

export default function ItemList({ onItemUsed }: ItemListProps) {
  const { inventory, leadPkmon, healLeadPkmon, consumeItem } = useGameStore();

  const handleUseItem = (item: (typeof inventory)[0]) => {
    if (item.type === "potion") {
      if (!leadPkmon) return;
      if (leadPkmon.hp >= leadPkmon.maxHp) return;

      healLeadPkmon(item.healAmount);
      consumeItem(item.id);
      onItemUsed?.();
    }
  };

  return (
    <div className="flex flex-col w-full flex-1">
      {inventory.map((item) => (
        <div
          key={item.id}
          className="
          h-25 w-full p-2
          flex items-center border-b
          justify-between gap-5
          "
        >
          <div className="size-20 bg-white border rounded">
            <img />
          </div>

          <div className="flex flex-col flex-1 h-full justify-between">
            <span className="">{item.name}</span>
            <span>
              {item.type === "potion"
                ? `heal : ${item.healAmount}`
                : `rate : ${item.catchRate * 100}%`}
            </span>
            <span>Qt : {item.quantity}</span>
          </div>

          <button
            className="size-15 pixel-gradient rounded-xl border cursor-pointer"
            onClick={() => handleUseItem(item)}
          >
            use
          </button>
        </div>
      ))}
    </div>
  );
}
