import type { CSSProperties } from "react";
import type { TypeName } from "../types";
import "./CardSurface.css";

/**
 * Per-type hard-light tint applied over `imgBg.png`. Lifted from the Figma
 * BackgroundBasic component set (node 28:252). The same neutral paper texture
 * is reused for every type; only the overlay color changes — no extra assets.
 */
export const CARD_SURFACE_TINTS: Record<TypeName, string> = {
  Normal: "#cdc8c4",
  Fire: "#f16542",
  Grass: "#a1c84e",
  Water: "#5b97ca",
  Lightning: "#fbae33",
  Fighting: "#d06838",
  Psychic: "#744b9e",
  Metal: "#839390",
  Darkness: "#0d2e2a",
  Dragon: "#756b24",
};

export interface ICardSurfaceProps {
  className?: string;
  bgSrc: string;
  holoMaskSrc: string;
  /**
   * Card type. Drives the hard-light overlay color via `--card-surface-tint`.
   * Omit (or pass `"Normal"`) for the neutral gray default.
   */
  type?: TypeName;
}

/**
 * Card surface — yellow outer border + inner base + background image +
 * blend-mode overlay + holographic shimmer + inner shadow. Renders as a
 * fragment: border and surface position independently on the card artboard.
 */
export function CardSurface({ className, bgSrc, holoMaskSrc, type = "Normal" }: ICardSurfaceProps) {
  const surfaceStyle = {
    "--card-surface-tint": CARD_SURFACE_TINTS[type],
  } as CSSProperties;

  return (
    <>
      <div className="card__border" data-name="Border" />
      <div
        className={className ? `card__surface ${className}` : "card__surface"}
        data-name="Surface"
        data-type={type}
        style={surfaceStyle}
      >
        <div aria-hidden="true" className="card__surfaceBase" />
        <div className="card__surfaceBg" data-name="BG">
          <img alt="" className="card__surfaceBgImg" src={bgSrc} />
        </div>
        <div className="card__surfaceOverlay" data-name="Overlay" />
        <div className="card__surfaceHolo" data-name="Holo">
          <div
            className="card__surfaceHoloLayer"
            style={{ maskImage: `url('${holoMaskSrc}')` }}
          />
        </div>
        <div className="card__surfaceInsetShadow" />
      </div>
    </>
  );
}
