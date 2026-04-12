import svgPaths from "../../../../svg-2xxt8uep3y";
import "./PortraitFrame.css";

export interface IPortraitFrameProps {
  className?: string;
  portraitSrc: string;
}

/**
 * Portrait image slot + surrounding metallic frame with drop-shadow.
 * Renders as a fragment — the slot and frame each position themselves
 * against the card artboard.
 */
export function PortraitFrame({ className, portraitSrc }: IPortraitFrameProps) {
  return (
    <>
      <div className="card__portraitSlot" data-name="Portrait Image">
        <div className="card__portraitSlotBg" />
        <img alt="" className="card__portraitSlotImg" src={portraitSrc} />
      </div>
      <div
        className={className ? `card__portraitFrame ${className}` : "card__portraitFrame"}
        data-name="Portrait Frame Mask"
      >
        <div className="card__portraitFrameShadow">
          <svg className="card__svgFill" fill="none" preserveAspectRatio="none" viewBox="0 0 631 397">
            <g filter="url(#filter0_d_1_564)">
              <path d={svgPaths.p1c6faf00} fill="url(#paint0_linear_1_564)" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="397" id="filter0_d_1_564" width="631" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dx="2" dy="2" />
                <feGaussianBlur stdDeviation="1" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_564" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_564" mode="normal" result="shape" />
              </filter>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_564" x1="0" x2="626.137" y1="0" y2="394.37">
                <stop stopColor="#BDBEC0" />
                <stop offset="0.19154" stopColor="#F9FBFA" />
                <stop offset="0.655273" stopColor="#9FA3A3" />
                <stop offset="0.82283" stopColor="#F5F5F5" />
                <stop offset="1" stopColor="#D9D9D9" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </>
  );
}
