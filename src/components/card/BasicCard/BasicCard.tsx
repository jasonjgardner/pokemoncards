import type { ReactNode } from "react";
import type { ICardData } from "../types";
import { SMEARGLE_DATA } from "../smeargle";
import { CardSurface } from "../CardSurface/CardSurface";
import { PortraitFrame } from "../PortraitFrame/PortraitFrame";
import { NameHeader } from "../NameHeader/NameHeader";
import { StagePill } from "../StagePill/StagePill";
import { SpeciesStrip } from "../SpeciesStrip/SpeciesStrip";
import { Attack } from "../Attack/Attack";
import { BattleBar } from "../BattleBar/BattleBar";
import { BottomRow } from "../BottomRow/BottomRow";
import "./BasicCard.css";

export interface IBasicCardProps {
  className?: string;
  data?: Partial<ICardData>;
  /** Optional portrait slot override (e.g. `<video>`). Falls back to `<img src={data.portraitSrc}>`. */
  portrait?: ReactNode;
}

/**
 * Composed Pokémon card. Accepts a partial ICardData; any missing fields fall
 * back to SMEARGLE_DATA so `<BasicCard />` with no props renders the canonical
 * Smeargle test card. A custom `portrait` node may be passed to swap in video
 * or other media in place of the default image.
 */
export function BasicCard({ className, data, portrait }: IBasicCardProps) {
  const d: ICardData = { ...SMEARGLE_DATA, ...data };
  return (
    <div className={className || "card"} data-name="Basic Card">
      <CardSurface bgSrc={d.bgSrc} holoMaskSrc={d.holoMaskSrc} type={d.type} />
      <PortraitFrame>{portrait ?? <img alt="" src={d.portraitSrc} />}</PortraitFrame>
      <NameHeader name={d.name} hp={d.hp} type={d.type} />
      <StagePill stage={d.stage} evolvesFrom={d.evolvesFrom} evolvesFromPortraitSrc={d.evolvesFromPortraitSrc} />
      <SpeciesStrip
        variant={d.speciesStripVariant}
        pokedexNumber={d.pokedexNumber}
        category={d.category}
        height={d.height}
        weight={d.weight}
        radiantRuleText={d.radiantRuleText}
      />
      <div className="card__attackFrame" data-name="Attack Frame">
        {d.attacks.map((attack, i) => (
          <Attack
            key={i}
            variant={attack.variant}
            name={attack.name}
            description={"description" in attack ? attack.description : undefined}
            damage={"damage" in attack ? attack.damage : undefined}
            energyCount={"energyCount" in attack ? attack.energyCount : undefined}
            energyType={"energyType" in attack ? attack.energyType : undefined}
          />
        ))}
      </div>
      <BattleBar
        weaknessType={d.weaknessType}
        weaknessMultiplier={d.weaknessMultiplier}
        resistanceType={d.resistanceType}
        resistanceAmount={d.resistanceAmount}
        retreatCost={d.retreatCost}
      />
      <BottomRow
        regulationMark={d.regulationMark}
        copyright={d.copyright}
        illustrator={d.illustrator}
        rarityShape={d.rarityShape}
        rarityFill={d.rarityFill}
        cardNumber={d.cardNumber}
        flavor={d.flavor}
        setMark={d.setMark}
      />
    </div>
  );
}

export default BasicCard;
