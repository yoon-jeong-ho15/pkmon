import type { ModalType } from "../../data/type";
import { MODAL_LABELS } from "../../data/type";

type MenuButtonProps = {
  type: ModalType;
  onClick: (type: ModalType) => void;
  className?: string;
};

export default function MenuButton({
  type,
  onClick,
  className = "",
}: MenuButtonProps) {
  return (
    <button
      className={`pixel-gradient rounded-xl border ${className}`}
      onClick={() => onClick(type)}
    >
      {MODAL_LABELS[type]}
    </button>
  );
}
