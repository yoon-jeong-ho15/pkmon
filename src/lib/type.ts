export type Pkmon = {
  id: number;
  name: string;
  sprite: string;
  level: number;
  hp: number;
  maxHp: number;
  sp: number;
  maxSp: number;
  atk: number;
  def: number;
};

export type PkmonSpecies = {
  id: number;
  name: string;
  sprite: string;
  rarity: "starter" | "common" | "uncommon" | "rare" | "epic" | "legendary";
  baseStats: {
    hp: number;
    sp: number;
    atk: number;
    def: number;
  };
  growth: {
    hp: number;
    sp: number;
    atk: number;
    def: number;
  };
};
