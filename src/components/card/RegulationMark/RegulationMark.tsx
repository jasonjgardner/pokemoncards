import svgPaths from "../../../../svg-2xxt8uep3y";
import type { RegulationLetter } from "../types";
import "./RegulationMark.css";

const LETTER_PATH: Record<RegulationLetter, string> = {
  D: "M0 0H4C5.5 0 7 1 7 3V11C7 13 5.5 14 4 14H0V0ZM3 2V12H4C4.5 12 5 11.5 5 11V3C5 2.5 4.5 2 4 2H3Z",
  E: "M7 0V2H3V6H6V8H3V12H7V14H0V0H7Z",
  F: "M7 0V2H3V6H7V8H3V14H0V0H7Z",
  G: "M4 0C6 0 7 1 7 3H5C5 2.5 4.5 2 4 2H3C2.5 2 2 2.5 2 3V11C2 11.5 2.5 12 3 12H4C4.5 12 5 11.5 5 11V8H4V6H7V14H0V0H4Z",
};

export interface IRegulationMarkProps {
  className?: string;
  mark?: RegulationLetter;
}

/**
 * Regulation mark — pentagon base + single letter (D/E/F/G). Lives in the
 * bottom-left corner of the card.
 */
export function RegulationMark({ className, mark = "F" }: IRegulationMarkProps) {
  return (
    <div className={className ? `card__regulationMark ${className}` : "card__regulationMark"} data-name="Regulation Mark">
      <div className="card__regulationMarkBase">
        <svg className="card__svgFill" fill="none" preserveAspectRatio="none" viewBox="0 0 17.5 26">
          <path d={svgPaths.p31d5ee00} fill="white" stroke="black" />
        </svg>
      </div>
      <div className="card__regulationMarkLetter">
        <svg className="card__svgAbsFill" fill="none" preserveAspectRatio="none" viewBox="0 0 7 14">
          <path d={LETTER_PATH[mark]} fill="black" />
        </svg>
      </div>
    </div>
  );
}
