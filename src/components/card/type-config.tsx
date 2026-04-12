import svgPaths from "../../../svg-2xxt8uep3y";
import type { ITypeConfig, TypeName } from "./types";

export const GRADIENT_STANDARD = "translate(17 16.5) rotate(48.3665) scale(24.0832)";
export const GRADIENT_LIGHTNING = "translate(15.5 14) rotate(49.514) scale(26.9537)";
export const GRADIENT_DARKNESS = "translate(16 15.5) rotate(48.1798) scale(25.4951)";

export const TYPE_CONFIG: Record<TypeName, ITypeConfig> = {
  Normal: {
    baseFill: "black",
    gradientTransform: GRADIENT_STANDARD,
    stops: [
      { offset: "0.232381", color: "white" },
      { offset: "0.699526", color: "#DAD1C9" },
    ],
    symbolPath: svgPaths.p19630400,
    symbolViewBox: "0 0 25.9808 30",
  },
  Fire: {
    baseFill: "#E73A3E",
    gradientTransform: GRADIENT_STANDARD,
    stops: [
      { color: "white", opacity: "0.8" },
      { offset: "0.699526", color: "#E73A3E" },
    ],
    symbolPath: svgPaths.p21dd1800,
    symbolViewBox: "0 0 30 32",
  },
  Water: {
    baseFill: "#00B9F2",
    gradientTransform: GRADIENT_STANDARD,
    stops: [
      { offset: "0.232381", color: "white", opacity: "0.9" },
      { offset: "1", color: "#00B9F2" },
    ],
    symbolPath: svgPaths.pf4b6e00,
    symbolViewBox: "0 0 25 25.5068",
  },
  Lightning: {
    baseFill: "#FFC121",
    gradientTransform: GRADIENT_LIGHTNING,
    stops: [
      { color: "white", opacity: "0.9" },
      { offset: "0.797491", color: "#FFC121" },
    ],
    symbolPath: svgPaths.p1e3b400,
    symbolViewBox: "0 0 22 30",
  },
  Fighting: {
    baseFill: "#CD4D27",
    gradientTransform: GRADIENT_STANDARD,
    stops: [
      { color: "white", opacity: "0.9" },
      { offset: "0.748008", color: "#CD4D27" },
    ],
    symbolPath: svgPaths.p1f93a7f0,
    symbolViewBox: "0 0 23 26",
  },
  Psychic: {
    baseFill: "#8B5A9B",
    gradientTransform: GRADIENT_STANDARD,
    stops: [
      { color: "white", opacity: "0.9" },
      { offset: "0.833565", color: "#8B5A9B" },
    ],
    symbolPath: svgPaths.p20a02300,
    symbolViewBox: "0 0 16 16",
    isPsychic: true,
  },
  Metal: {
    baseFill: "#BBB6A5",
    gradientTransform: GRADIENT_STANDARD,
    stops: [
      { offset: "0.232381", color: "white", opacity: "0.9" },
      { offset: "1", color: "#BBB6A5" },
    ],
    symbolPath: svgPaths.p7a99b00,
    symbolViewBox: "0 0 28.4463 25",
  },
  Dragon: {
    baseFill: "#A79E39",
    gradientTransform: GRADIENT_STANDARD,
    stops: [
      { offset: "0.0962409", color: "white", opacity: "0.9" },
      { offset: "0.343388", color: "#CFCA93", opacity: "0.954294" },
      { offset: "1", color: "#A79E39" },
    ],
    symbolPath: svgPaths.p18fc47f0,
    symbolViewBox: "0 0 25.5 26",
  },
  Grass: {
    baseFill: "#00B44E",
    gradientTransform: GRADIENT_STANDARD,
    stops: [
      { color: "#EAF6CB" },
      { offset: "0.703125", color: "#71BD50" },
    ],
    symbolPath: svgPaths.p102e8700,
    symbolViewBox: "0 0 38 41",
    isGrass: true,
  },
  Darkness: {
    baseFill: "#4B7B8E",
    gradientTransform: GRADIENT_DARKNESS,
    stops: [
      { offset: "0.121524", color: "white", opacity: "0.75" },
      { offset: "0.880302", color: "#4B7B8E" },
    ],
    symbolPath: svgPaths.pcfdc400,
    symbolViewBox: "0 0 28 23.1807",
  },
};

export function TypeInnerShadow({ id }: { id: string }) {
  return (
    <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="41" id={id} width="41" x="0" y="0">
      <feFlood floodOpacity="0" result="BackgroundImageFix" />
      <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
      <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
      <feMorphology in="SourceAlpha" operator="erode" radius="2" result="effect" />
      <feOffset />
      <feGaussianBlur stdDeviation="2" />
      <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
      <feBlend in2="shape" mode="overlay" result="effect" />
    </filter>
  );
}

export function TypeRadialGradient({ id, cfg }: { id: string; cfg: ITypeConfig }) {
  return (
    <radialGradient cx="0" cy="0" gradientTransform={cfg.gradientTransform} gradientUnits="userSpaceOnUse" id={id} r="1">
      {cfg.stops.map((stop, i) => (
        <stop key={i} offset={stop.offset} stopColor={stop.color} stopOpacity={stop.opacity} />
      ))}
    </radialGradient>
  );
}

export function GrassDropShadow({ id }: { id: string }) {
  return (
    <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="41" id={id} width="38" x="0" y="0">
      <feFlood floodOpacity="0" result="BackgroundImageFix" />
      <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
      <feOffset />
      <feGaussianBlur stdDeviation="2.5" />
      <feComposite in2="hardAlpha" operator="out" />
      <feColorMatrix type="matrix" values="0 0 0 0 0.741176 0 0 0 0 0.803922 0 0 0 0 0.180392 0 0 0 1 0" />
      <feBlend in2="BackgroundImageFix" mode="normal" result="shadow" />
      <feBlend in="SourceGraphic" in2="shadow" mode="normal" result="shape" />
    </filter>
  );
}
