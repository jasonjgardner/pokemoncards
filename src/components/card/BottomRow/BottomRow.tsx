import type { RegulationLetter, RarityShape, RarityFill } from "../types";
import { RegulationMark } from "../RegulationMark/RegulationMark";
import { RarityMark } from "../RarityMark/RarityMark";
import { SetMark } from "../SetMark/SetMark";
import type { SetMarkVariant } from "../SetMark/SetMark";
import "./BottomRow.css";

export interface IBottomRowProps {
  className?: string;
  regulationMark: RegulationLetter;
  copyright: string;
  illustrator: string;
  rarityShape: RarityShape;
  rarityFill: RarityFill;
  cardNumber: string;
  flavor: string[];
  setMark: string;
}

/**
 * BottomRow — the card's bottom metadata strip.
 *
 * Aggregates the regulation mark, copyright line, illustrator credit, rarity
 * glyph, card number, multi-line flavor text, and expansion set mark. The
 * outer `.card__bottom` wrapper itself uses `display: contents` (positioning
 * lives in BasicCard.css); every child is absolutely positioned against the
 * 733×1024 card artboard via inset percentages defined in BottomRow.css.
 *
 * @example
 * ```tsx
 * <BottomRow
 *   regulationMark="F"
 *   copyright="©2022 Pokémon / Nintendo / Creatures / GAME FREAK "
 *   illustrator="Illus. Mizue"
 *   rarityShape="common"
 *   rarityFill="black"
 *   cardNumber="137/195"
 *   flavor={["line one", "line two", "line three"]}
 *   setMark="silver-tempest"
 * />
 * ```
 */
export function BottomRow({
  className,
  regulationMark,
  copyright,
  illustrator,
  rarityShape,
  rarityFill,
  cardNumber,
  flavor,
  setMark,
}: IBottomRowProps) {
  return (
    <div className={className ? `card__bottom ${className}` : "card__bottom"} data-name="Bottom">
      <RegulationMark mark={regulationMark} />
      <p className="card__copyright">{copyright}</p>
      <p className="card__illustrator">{illustrator}</p>
      <RarityMark rarity={rarityShape} fill={rarityFill} />
      <p className="card__number">{cardNumber}</p>
      <div className="card__flavor">
        {flavor.map((line, i) => (
          <p key={i} className="card__flavorLine">{line}</p>
        ))}
      </div>
      <SetMark set={setMark as SetMarkVariant} />
    </div>
  );
}
