import svgPaths from "../../../../svg-2xxt8uep3y";
import "./SetMark.css";

const SET_PATHS = {
  "silver-tempest": { outline: svgPaths.p529a1c0, fill: svgPaths.p18614080 },
} as const;

export type SetMarkVariant = keyof typeof SET_PATHS;

export interface ISetMarkProps {
  className?: string;
  set?: SetMarkVariant;
}

/**
 * Expansion set mark — small icon denoting the card's set.
 * Currently only "silver-tempest" is supported; add more entries to SET_PATHS.
 */
export function SetMark({ className, set = "silver-tempest" }: ISetMarkProps) {
  const paths = SET_PATHS[set];
  return (
    <div className={className ? `card__setMark ${className}` : "card__setMark"} data-name="Set Mark" data-set={set}>
      <div className="card__setMarkInner">
        <svg className="card__svgFill" fill="none" preserveAspectRatio="none" viewBox="0 0 29 29">
          <g>
            <path d={paths.outline} fill="black" stroke="white" strokeMiterlimit="10" strokeWidth="2" />
            <path d={paths.fill} fill="white" />
          </g>
        </svg>
      </div>
    </div>
  );
}
