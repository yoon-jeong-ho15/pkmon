export type Pkmon = {
  id: number;
  name: string;
  level: number;
  exp: number;
  hp: number;
  maxHp: number;
  atk: number;
  def: number;
};

export type PkmonSpecies = {
  id: number;
  name: string;
  rarity: "starter" | "common" | "uncommon" | "rare" | "epic" | "legendary";
  baseStats: {
    hp: number;
    atk: number;
    def: number;
  };
  growth: {
    hp: number;
    atk: number;
    def: number;
  };
};

export type ModalType = "pakeDex" | "myPkMons" | "inventory";

export const MODAL_LABELS: Record<ModalType, string> = {
  pakeDex: "PakeDex",
  myPkMons: "My PkMons",
  inventory: "Inventory",
};
