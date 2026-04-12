export type TypeName =
  | "Normal"
  | "Fire"
  | "Water"
  | "Lightning"
  | "Fighting"
  | "Psychic"
  | "Metal"
  | "Dragon"
  | "Grass"
  | "Darkness";

export const TYPE_NAMES: readonly TypeName[] = [
  "Normal",
  "Fire",
  "Water",
  "Lightning",
  "Fighting",
  "Psychic",
  "Metal",
  "Dragon",
  "Grass",
  "Darkness",
] as const;

export type StageName = "basic" | "stage-1" | "stage-2";
export type RegulationLetter = "D" | "E" | "F" | "G";
export type RarityShape = "common" | "uncommon" | "rare";
export type RarityFill = "white" | "black";
export type SpeciesStripVariant = "default" | "radiant";

export type IAttackEnergyCount = 1 | 2 | 3 | 4;
export type IRetreatCost = 0 | 1 | 2 | 3 | 4;

export type IAttackEntry =
  | { variant: "basic"; name: string; damage: string; energyCount: IAttackEnergyCount; energyType: TypeName }
  | { variant: "combo"; name: string; description: string; damage: string; energyCount: IAttackEnergyCount; energyType: TypeName }
  | { variant: "condition"; name: string; description: string; energyCount: IAttackEnergyCount; energyType: TypeName }
  | { variant: "ability"; name: string; description: string };

export interface IWeakness {
  type: TypeName;
  multiplier: number;
}

export interface IResistance {
  type: TypeName;
  amount: number;
}

export interface ICardData {
  name: string;
  hp: number;
  type: TypeName;
  stage: StageName;
  evolvesFrom?: string;
  evolvesFromPortraitSrc?: string;

  portraitSrc: string;
  bgSrc: string;
  holoMaskSrc: string;

  attacks: IAttackEntry[];

  weaknessType: TypeName;
  weaknessMultiplier: number;
  resistanceType?: TypeName;
  resistanceAmount?: number;
  retreatCost: IRetreatCost;

  speciesStripVariant: SpeciesStripVariant;
  pokedexNumber: number;
  category: string;
  height: string;
  weight: string;
  radiantRuleText?: string;

  regulationMark: RegulationLetter;
  copyright: string;
  illustrator: string;
  rarityShape: RarityShape;
  rarityFill: RarityFill;
  cardNumber: string;
  flavor: string[];
  setMark: string;
}

export interface ITypeStop {
  offset?: string;
  color: string;
  opacity?: string;
}

export interface ITypeConfig {
  baseFill: string;
  gradientTransform: string;
  stops: ITypeStop[];
  symbolPath: string;
  symbolViewBox: string;
  isGrass?: boolean;
  isPsychic?: boolean;
}
