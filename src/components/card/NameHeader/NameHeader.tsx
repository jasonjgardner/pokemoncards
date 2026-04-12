import type { TypeName } from "../types";
import { HpBadge } from "../HpBadge/HpBadge";
import "./NameHeader.css";

export interface INameHeaderProps {
  className?: string;
  name: string;
  hp: number;
  type?: TypeName;
}

/**
 * Pokémon name + HP value + type badge row at the top of the card.
 *
 * Renders as a fragment of two positioned children on the card artboard:
 *  - `<p className="card__name">` — the Pokémon's name. Its absolute
 *    `inset` values resolve relative to the `.card` ancestor, so it
 *    is intentionally emitted as a sibling of the HP group (not nested
 *    inside it).
 *  - `<div className="card__hpType">` — the HP label/value text block
 *    plus the type badge, positioned in the top-right corner of the
 *    card.
 *
 * @remarks
 * Because this component returns a fragment, consumers must render it
 * inside an element with its own positioning context (the 733×1024
 * `.card` artboard in production, or a `position: relative` wrapper
 * in stories).
 */
export function NameHeader({ className, name, hp, type = "Normal" }: INameHeaderProps) {
  return (
    <>
      <p className="card__name">{name}</p>
      <div className={className ? `card__hpType ${className}` : "card__hpType"} data-name="HP / Type">
        <div className="card__hpGroup" data-name="HP">
          <div className="card__hpText">
            <p>
              <span className="card__hpLabel">HP</span>
              <span className="card__hpValue">{hp}</span>
            </p>
          </div>
        </div>
        <HpBadge type={type} />
      </div>
    </>
  );
}
