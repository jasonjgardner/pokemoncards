import "hover-tilt/web-component";
import type { CSSProperties, ReactNode } from "react";
import BasicCard from "../../card/BasicCard/BasicCard";
import type { ICardData } from "../../card/types";
import pokeballOuter from "./pokeball-outer.svg";
import pokeballInner from "./pokeball-inner.svg";
import "./HolographicCard.css";

/**
 * HolographicCard
 *
 * Wraps a `<BasicCard />` in the `<hover-tilt>` web component and layers two
 * pokéball-masked rainbow foils on top. All visual knobs are configurable:
 * hover-tilt's native glare/tilt/shadow props pass through to the element as
 * kebab-case attributes, and the foil-specific knobs are set as `data-holo-*`
 * attributes that the CSS reads via Baseline 2026 `attr(... type(<number>))`.
 *
 * Design notes:
 *  - hover-tilt exposes `--hover-tilt-x`, `--hover-tilt-y`, `--hover-tilt-opacity`,
 *    `--hover-tilt-from-center` on its `::slotted(*)` children. Those drive the
 *    rainbow pan and the radial spotlight subtract mask.
 *  - Hover-tilt's built-in glare layer (`::before` on the tilt element) handles
 *    the specular highlight, configured via `glareIntensity` / `glareHue` /
 *    `blendMode` etc. The component does not ship its own radial glare.
 */
export interface IHolographicCardProps {
  /** hover-tilt rotation multiplier (default 1.5). */
  tiltFactor?: number;
  /** Scale applied while the card is active (default 1.1). */
  scaleFactor?: number;
  /** Enable hover-tilt's drop shadow (default true). */
  shadow?: boolean;
  /** mix-blend-mode for hover-tilt's glare layer. */
  blendMode?: string;
  /** Opacity multiplier for hover-tilt's glare (0..n). */
  glareIntensity?: number;
  /** Hue (deg) for hover-tilt's default glare gradient. */
  glareHue?: number;
  /** CSS image(s) used as the mask of hover-tilt's glare layer. */
  glareMask?: string;
  /** luminance | alpha | match-source — glare mask interpretation. */
  glareMaskMode?: "luminance" | "alpha" | "match-source";
  /** How the glare mask composites with its backdrop. */
  glareMaskComposite?: "add" | "subtract" | "intersect" | "exclude";
  /** Grayscale shine brightness 0..1 (default 0.8). */
  shine?: number;
  /** Inner-pokéball rainbow brightness 0..1 (default 0.7). */
  innerBrightness?: number;
  /** Outer-pokéball rainbow brightness 0..1 (default 0.55). */
  outerBrightness?: number;
  /** Extra saturation multiplier on the rainbow pseudos (default 1.1). */
  rainbowSaturation?: number;
  /** Pokéball tile size as a CSS `<length-percentage>` (default "20%"). */
  tileSize?: string;
  /** Portrait slot override forwarded to the underlying BasicCard (e.g. `<video>`). */
  portrait?: ReactNode;
  /** Card data forwarded to the underlying BasicCard. Falls back to SMEARGLE_DATA. */
  data?: Partial<ICardData>;
}

const defined = <T,>(v: T | undefined, key: string): Record<string, T> =>
  v === undefined ? {} : { [key]: v };

export function HolographicCard({
  tiltFactor = 1.5,
  scaleFactor = 1.1,
  shadow = true,
  blendMode,
  glareIntensity,
  glareHue,
  glareMask,
  glareMaskMode,
  glareMaskComposite,
  shine,
  innerBrightness,
  outerBrightness,
  rainbowSaturation,
  tileSize,
  portrait,
  data,
}: IHolographicCardProps) {

  const tiltAttrs: Record<string, unknown> = {
    "tilt-factor": tiltFactor,
    "scale-factor": scaleFactor,
    ...(shadow ? { shadow: true } : {}),
    ...defined(blendMode, "blend-mode"),
    ...defined(glareIntensity, "glare-intensity"),
    ...defined(glareHue, "glare-hue"),
    ...defined(glareMask, "glare-mask"),
    ...defined(glareMaskMode, "glare-mask-mode"),
    ...defined(glareMaskComposite, "glare-mask-composite"),
  };

  const foilStyle = {
    "--pokeball-outer": `url('${pokeballOuter}')`,
    "--pokeball-inner": `url('${pokeballInner}')`,
  } as CSSProperties;

  return (
    /* @ts-ignore - hover-tilt is a Web Component, not a known JSX intrinsic */
    <hover-tilt {...tiltAttrs}>
      <div
        className="holographic-card"
        data-holo-shine={shine}
        data-holo-inner-brightness={innerBrightness}
        data-holo-outer-brightness={outerBrightness}
        data-holo-rainbow-saturation={rainbowSaturation}
        data-holo-tile-size={tileSize}
        style={foilStyle}
      >
        <BasicCard data={data} portrait={portrait} />
        <div aria-hidden="true" className="holographic-card__shine" />
      </div>
      {/* @ts-ignore */}
    </hover-tilt>
  );
}
