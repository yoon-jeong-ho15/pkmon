import type { ModalType } from "../../data/type";
import { MODAL_LABELS } from "../../data/type";
import Inventory from "./Inventory";
import MyPkMons from "./MyPkMons";
import PakeDex from "./PakeDex";

interface BasicModalProps {
  type: ModalType;
  onClose: () => void;
}

export default function BasicModal({ type, onClose }: BasicModalProps) {
  const renderContent = () => {
    switch (type) {
      case "pakeDex":
        return <PakeDex />;
      case "myPkMons":
        return <MyPkMons />;
      case "inventory":
        return <Inventory />;
      default:
        return null;
    }
  };

  const title = MODAL_LABELS[type];

  return (
    <div className="bg-white border rounded-lg w-9/10 h-9/10 flex flex-col overflow-hidden">
      <header className="bg-gray-100 h-1/16 border-b flex items-center px-4 justify-center relative">
        <button
          onClick={onClose}
          className="
          absolute left-4
          size-4 bg-red-500 hover:bg-red-600
          rounded-full flex items-center justify-center
           text-white font-bold text-sm"
        />
        <h2 className="text-2xl font-bold">{title}</h2>
      </header>
      {renderContent()}
    </div>
  );
}
