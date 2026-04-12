import type { RarityShape, RarityFill } from "../types";
import "./RarityMark.css";

export interface IRarityMarkProps {
  className?: string;
  rarity?: RarityShape;
  fill?: RarityFill;
}

/**
 * Rarity mark — small shape indicating card rarity.
 * common → filled circle, uncommon → filled diamond, rare → filled 5-point star.
 * fill controls ink color (white for dark backgrounds, black for light).
 */
export function RarityMark({ className, rarity = "common", fill = "black" }: IRarityMarkProps) {
  const color = fill === "white" ? "white" : "black";
  return (
    <div
      className={className ? `card__rarity ${className}` : "card__rarity"}
      data-rarity={rarity}
      data-fill={fill}
    >
      <svg className="card__svgAbsFill" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
        {rarity === "common" && <circle cx="8.5" cy="8.5" fill={color} r="8.5" />}
        {rarity === "uncommon" && (
          <rect x="2" y="2" width="13" height="13" fill={color} transform="rotate(45 8.5 8.5)" />
        )}
        {rarity === "rare" && (
          <path
            d="M8.5 0.5L10.6 6.1L16.5 6.5L11.9 10.3L13.5 16L8.5 12.8L3.5 16L5.1 10.3L0.5 6.5L6.4 6.1L8.5 0.5Z"
            fill={color}
          />
        )}
      </svg>
    </div>
  );
}
