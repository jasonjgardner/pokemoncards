import svgPaths from "../svg-2xxt8uep3y";
import { imgRectangle12 } from "../svg-3mfyb";
import imgBg from "./assets/imgBg.png";
import imgPortraitImage from "./assets/imgPortraitImage.png";
import "./BasicCard.css";

type TypeName =
  | "Normal"
  | "Fire"
  | "Darkness"
  | "Dragon"
  | "Metal"
  | "Psychic"
  | "Fighting"
  | "Lightning"
  | "Water"
  | "Grass";

interface ITypeStop {
  offset?: string;
  color: string;
  opacity?: string;
}

interface ITypeConfig {
  baseFill: string;
  gradientTransform: string;
  stops: ITypeStop[];
  symbolPath: string;
  symbolViewBox: string;
  isGrass?: boolean;
  isPsychic?: boolean;
}

const GRADIENT_STANDARD = "translate(17 16.5) rotate(48.3665) scale(24.0832)";
const GRADIENT_LIGHTNING = "translate(15.5 14) rotate(49.514) scale(26.9537)";
const GRADIENT_DARKNESS = "translate(16 15.5) rotate(48.1798) scale(25.4951)";

const TYPE_CONFIG: Record<TypeName, ITypeConfig> = {
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

function TypeInnerShadow({ id }: { id: string }) {
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

function TypeRadialGradient({ id, cfg }: { id: string; cfg: ITypeConfig }) {
  return (
    <radialGradient cx="0" cy="0" gradientTransform={cfg.gradientTransform} gradientUnits="userSpaceOnUse" id={id} r="1">
      {cfg.stops.map((stop, i) => (
        <stop key={i} offset={stop.offset} stopColor={stop.color} stopOpacity={stop.opacity} />
      ))}
    </radialGradient>
  );
}

function GrassDropShadow({ id }: { id: string }) {
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

interface ITypeProps {
  className?: string;
  property1?: TypeName;
}

function Type({ className, property1 = "Normal" }: ITypeProps) {
  const cfg = TYPE_CONFIG[property1];
  const filterId = `type-${property1}-innerShadow`;
  const gradientId = `type-${property1}-gradient`;
  const grassShadowId = `type-${property1}-grassShadow`;

  return (
    <div className={className ? `type ${className}` : "type"} data-type={property1}>
      <div className={"type__ring"}>
        <svg className={"card__svgFill"} fill="none" preserveAspectRatio="none" viewBox="0 0 41 41">
          <g>
            <g filter={`url(#${filterId})`}>
              <circle cx="20.5" cy="20.5" fill={cfg.baseFill} r="19" />
              <circle cx="20.5" cy="20.5" fill={`url(#${gradientId})`} r="19" />
            </g>
            <circle cx="20.5" cy="20.5" r="19.75" stroke="white" strokeWidth="1.5" />
          </g>
          <defs>
            <TypeInnerShadow id={filterId} />
            <TypeRadialGradient id={gradientId} cfg={cfg} />
          </defs>
        </svg>
      </div>
      {!cfg.isGrass && (
        <div className={"type__symbol"}>
          <svg className={"card__svgAbsFill"} fill="none" preserveAspectRatio="none" viewBox={cfg.symbolViewBox}>
            <path d={cfg.symbolPath} fill="black" />
          </svg>
        </div>
      )}
      {cfg.isGrass && (
        <div className={"type__symbol"}>
          <div className={"type__symbolGrassShadow"}>
            <svg className={"card__svgFill"} fill="none" preserveAspectRatio="none" viewBox="0 0 38 41">
              <g filter={`url(#${grassShadowId})`}>
                <path d={cfg.symbolPath} fill="black" />
              </g>
              <defs>
                <GrassDropShadow id={grassShadowId} />
              </defs>
            </svg>
          </div>
        </div>
      )}
      {cfg.isPsychic && (
        <div className={"type__psychicExtra"}>
          <svg className={"card__svgAbsFill"} fill="none" preserveAspectRatio="none" viewBox="0 0 32 24">
            <path clipRule="evenodd" d={svgPaths.p388629f0} fill="black" fillRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
}

interface IAttackEnergyProps {
  className?: string;
  count: 1 | 2;
  type?: TypeName;
}

function AttackEnergy({ className, count, type = "Normal" }: IAttackEnergyProps) {
  const slots = Array.from({ length: count }, (_, i) => i);
  return (
    <div className={className || "attackEnergy"} data-count={count}>
      {slots.map((i) => (
        <Type key={i} className={"attackEnergy__slot"} property1={type} />
      ))}
    </div>
  );
}

interface IAttackProps {
  name: string;
  description?: string;
  damage?: string;
  energyCount: 1 | 2;
  energyType?: TypeName;
}

function Attack({ name, description, damage, energyCount, energyType }: IAttackProps) {
  const variant = description ? "attack--withDescription" : "attack--basic";
  return (
    <div className={`attack ${variant}`}>
      <p className={"attack__name"}>{name}</p>
      {description && <p className={"attack__description"}>{description}</p>}
      {damage && <p className={"attack__damage"}>{damage}</p>}
      <AttackEnergy className={"attack__energy"} count={energyCount} type={energyType} />
    </div>
  );
}

interface IBasicCardProps {
  className?: string;
  attackFrame?: React.ReactNode | null;
  portrait?: React.ReactNode | null;
}

export default function BasicCard({ className, attackFrame = null, portrait = null }: IBasicCardProps) {
  return (
    <div className={className || "card"} data-name="Basic Card">
      {/* Card base: outer yellow border + inner surface with bg/overlay/holo */}
      <div className={"card__border"} data-name="Border" />
      <div className={"card__surface"} data-name="Surface">
        <div aria-hidden="true" className={"card__surfaceBase"} />
        <div className={"card__surfaceBg"} data-name="BG">
          <img alt="" className={"card__surfaceBgImg"} src={imgBg} />
        </div>
        <div className={"card__surfaceOverlay"} data-name="Overlay" />
        <div className={"card__surfaceHolo"} data-name="Holo">
          <div
            className={"card__surfaceHoloLayer"}
            style={{ maskImage: `url('${imgRectangle12}')` }}
          />
        </div>
        <div className={"card__surfaceInsetShadow"} />
      </div>

      {/* Bottom metadata row (copyright, illustrator, rarity, number, flavor, set mark) */}
      <div className={"card__bottom"} data-name="Bottom">
        <div className={"card__regulationMark"} data-name="Regulation Mark">
          <div className={"card__regulationMarkBase"}>
            <svg className={"card__svgFill"} fill="none" preserveAspectRatio="none" viewBox="0 0 17.5 26">
              <path d={svgPaths.p31d5ee00} fill="white" stroke="black" />
            </svg>
          </div>
          <div className={"card__regulationMarkLetter"}>
            <svg className={"card__svgAbsFill"} fill="none" preserveAspectRatio="none" viewBox="0 0 7 14">
              <path d="M7 0V2H3V6H7V8H3V14H0V0H7Z" fill="black" />
            </svg>
          </div>
        </div>

        <p className={"card__copyright"}>©2022 Pokémon / Nintendo / Creatures / GAME FREAK </p>
        <p className={"card__illustrator"}>Illus. Mizue</p>

        <div className={"card__rarity"} data-name="Rarity">
          <svg className={"card__svgAbsFill"} fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
            <circle cx="8.5" cy="8.5" fill="black" r="8.5" />
          </svg>
        </div>

        <p className={"card__number"}>137/195</p>

        <div className={"card__flavor"}>
          <p className={"card__flavorLine"}>it draws symbols with the fluid that oozes from</p>
          <p className={"card__flavorLine"}>the tip of its tail. Depending on the symbol,</p>
          <p className={"card__flavorLine"}>Smeargle fanatics will pay big money for them</p>
        </div>

        <div className={"card__setMark"} data-name="Silver Tempest Mark">
          <div className={"card__setMarkInner"}>
            <svg className={"card__svgFill"} fill="none" preserveAspectRatio="none" viewBox="0 0 29 29">
              <g>
                <path d={svgPaths.p529a1c0} fill="black" stroke="white" strokeMiterlimit="10" strokeWidth="2" />
                <path d={svgPaths.p18614080} fill="white" />
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Battle bar: weakness / resistance / retreat cost */}
      <div className={"card__battleBar"} data-name="Battle Bar">
        <div className={"card__retreat"} data-name="Retreat">
          <div className={"card__retreatBase"}>
            <div className={"card__retreatShadowWrap"}>
              <div className={"card__retreatShadow"}>
                <svg className={"card__svgFill"} fill="none" preserveAspectRatio="none" viewBox="0 0 296 37">
                  <g filter="url(#filter0_d_1_639)">
                    <path d={svgPaths.p3064c000} fill="url(#paint0_linear_1_639)" />
                  </g>
                  <defs>
                    <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="37" id="filter0_d_1_639" width="296" x="0" y="0">
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                      <feOffset dx="2" dy="2" />
                      <feGaussianBlur stdDeviation="1" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                      <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_639" />
                      <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_639" mode="normal" result="shape" />
                    </filter>
                    <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_639" x1="17.5" x2="17.5" y1="0" y2="33.8057">
                      <stop stopColor="#888D91" />
                      <stop offset="0.217589" stopColor="#969694" />
                      <stop offset="0.377254" stopColor="#F3F3F4" />
                      <stop offset="0.501698" stopColor="#707172" />
                      <stop offset="0.674328" stopColor="#545454" />
                      <stop offset="0.864352" stopColor="#C7C7C7" />
                      <stop offset="1" stopColor="#888A8B" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div className={"card__retreatBar"}>
              <svg className={"card__svgAbsFill"} fill="none" preserveAspectRatio="none" viewBox="0 0 277.486 33">
                <path d={svgPaths.p39dd5680} fill="url(#paint0_linear_1_637)" />
                <defs>
                  <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_637" x1="79.9884" x2="79.9884" y1="0" y2="33">
                    <stop stopColor="#FDFDFD" />
                    <stop offset="0.183929" stopColor="#D9DADA" />
                    <stop offset="0.329061" stopColor="white" />
                    <stop offset="0.580005" stopColor="white" />
                    <stop offset="0.750786" stopColor="#DFE0E1" />
                    <stop offset="0.900655" stopColor="#AEB1B3" />
                    <stop offset="1" stopColor="#E8E6E5" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className={"card__retreatBarCapEnd"}>
              <svg className={"card__svgAbsFill"} fill="none" preserveAspectRatio="none" viewBox="0 0 27 33">
                <path d={svgPaths.p158fa080} fill="url(#paint0_linear_1_507)" />
                <defs>
                  <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_507" x1="13.5" x2="13.5" y1="0" y2="33.8057">
                    <stop stopColor="#888D91" />
                    <stop offset="0.217589" stopColor="#969694" />
                    <stop offset="0.377254" stopColor="#F3F3F4" />
                    <stop offset="0.501698" stopColor="#707172" />
                    <stop offset="0.674328" stopColor="#545454" />
                    <stop offset="0.864352" stopColor="#C7C7C7" />
                    <stop offset="1" stopColor="#888A8B" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className={"card__retreatBarCapStart"}>
              <svg className={"card__svgAbsFill"} fill="none" preserveAspectRatio="none" viewBox="0 0 35 33">
                <path d={svgPaths.p305bdc0} fill="url(#paint0_linear_1_607)" />
                <defs>
                  <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_607" x1="17.5" x2="17.5" y1="0" y2="33.8057">
                    <stop stopColor="#888D91" />
                    <stop offset="0.217589" stopColor="#969694" />
                    <stop offset="0.377254" stopColor="#F3F3F4" />
                    <stop offset="0.501698" stopColor="#707172" />
                    <stop offset="0.674328" stopColor="#545454" />
                    <stop offset="0.864352" stopColor="#C7C7C7" />
                    <stop offset="1" stopColor="#888A8B" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <p className={"card__retreatLabel"}>retreat</p>
          </div>
        </div>

        <div className={"card__weaknessBase"}>
          <div className={"card__weaknessBaseShadow"}>
            <svg className={"card__svgFill"} fill="none" preserveAspectRatio="none" viewBox="0 0 414 37">
              <g filter="url(#filter0_d_1_583)">
                <path d={svgPaths.p7432c00} fill="url(#paint0_linear_1_583)" />
              </g>
              <path d={svgPaths.p1fad7d90} fill="url(#paint1_linear_1_583)" />
              <path d={svgPaths.p36b4b070} fill="url(#paint2_linear_1_583)" />
              <path d={svgPaths.p8f31730} fill="url(#paint3_linear_1_583)" />
              <path d={svgPaths.p305bdc0} fill="url(#paint4_linear_1_583)" />
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="37" id="filter0_d_1_583" width="414" x="0" y="0">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                  <feOffset dx="2" dy="2" />
                  <feGaussianBlur stdDeviation="1" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                  <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_583" />
                  <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_583" mode="normal" result="shape" />
                </filter>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_583" x1="17.5" x2="17.5" y1="0" y2="33.8057">
                  <stop stopColor="#888D91" />
                  <stop offset="0.217589" stopColor="#969694" />
                  <stop offset="0.377254" stopColor="#F3F3F4" />
                  <stop offset="0.501698" stopColor="#707172" />
                  <stop offset="0.674328" stopColor="#545454" />
                  <stop offset="0.864352" stopColor="#C7C7C7" />
                  <stop offset="1" stopColor="#888A8B" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_1_583" x1="204.5" x2="204.5" y1="0" y2="33">
                  <stop stopColor="#FDFDFD" />
                  <stop offset="0.183929" stopColor="#D9DADA" />
                  <stop offset="0.329061" stopColor="white" />
                  <stop offset="0.580005" stopColor="white" />
                  <stop offset="0.750786" stopColor="#DFE0E1" />
                  <stop offset="0.900655" stopColor="#AEB1B3" />
                  <stop offset="1" stopColor="#E8E6E5" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_1_583" x1="197.25" x2="197.25" y1="3" y2="30.6592">
                  <stop stopColor="#888D91" />
                  <stop offset="0.0818818" stopColor="#969694" />
                  <stop offset="0.317599" stopColor="#F3F3F4" />
                  <stop offset="0.501698" stopColor="#707172" />
                  <stop offset="0.674328" stopColor="#545454" />
                  <stop offset="0.864352" stopColor="#C7C7C7" />
                  <stop offset="1" stopColor="#888A8B" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint3_linear_1_583" x1="396.5" x2="396.5" y1="0" y2="33.8057">
                  <stop stopColor="#888D91" />
                  <stop offset="0.217589" stopColor="#969694" />
                  <stop offset="0.377254" stopColor="#F3F3F4" />
                  <stop offset="0.501698" stopColor="#707172" />
                  <stop offset="0.674328" stopColor="#545454" />
                  <stop offset="0.864352" stopColor="#C7C7C7" />
                  <stop offset="1" stopColor="#888A8B" />
                </linearGradient>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint4_linear_1_583" x1="17.5" x2="17.5" y1="0" y2="33.8057">
                  <stop stopColor="#888D91" />
                  <stop offset="0.217589" stopColor="#969694" />
                  <stop offset="0.377254" stopColor="#F3F3F4" />
                  <stop offset="0.501698" stopColor="#707172" />
                  <stop offset="0.674328" stopColor="#545454" />
                  <stop offset="0.864352" stopColor="#C7C7C7" />
                  <stop offset="1" stopColor="#888A8B" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <div className={"card__resistanceGroup"} data-name="Resistance">
          <p className={"card__battleText card__resistanceLabel"}>resistance</p>
          <p className={"card__battleText card__resistanceMinus"}>-</p>
          <p className={"card__battleText card__resistanceNum"}>30</p>
        </div>

        <div className={"card__weaknessGroup"} data-name="Weakness">
          <p className={"card__battleText card__weaknessLabel"}>weakness</p>
          <p className={"card__battleText card__weaknessMult"}>x</p>
          <p className={"card__battleText card__weaknessNum"}>2</p>
        </div>

        <div className={"card__retreatCost"} data-name="Retreat Cost">
          <SmallTypeBadge className={"card__retreatCostType card__retreatCostType--second"} />
          <SmallTypeBadge className={"card__retreatCostType card__retreatCostType--first"} />
        </div>

        <div className={"card__resistanceType"} data-name="Resistance Type">
          <ResistanceTypeBadge />
        </div>

        <div className={"card__weaknessType"} data-name="Weakness Type">
          <WeaknessTypeBadge />
        </div>
      </div>

      {/* Attack frame (slot; defaults show Smeargle's attacks) */}
      <div className={"card__attackFrame"} data-name="Attack Frame">
        {attackFrame || (
          <>
            <Attack
              name="Colorful Palette"
              description="Look at the top 5 cards of your deck. You may attach any number of basic Energy cards you find there to 1 of your Pokémon. Shuffle the other cards back into your deck."
              energyCount={1}
            />
            <Attack name="Ram" damage="30" energyCount={2} />
          </>
        )}
      </div>

      {/* Portrait artwork slot + surrounding metallic frame */}
      <div className={"card__portraitSlot"} data-name="Portrait Image">
        <div className={"card__portraitSlotBg"} />
        <img alt="" className={"card__portraitSlotImg"} src={imgPortraitImage} />
      </div>
      <div className={"card__portraitFrame"} data-name="Portrait Frame Mask">
        <div className={"card__portraitFrameShadow"}>
          <svg className={"card__svgFill"} fill="none" preserveAspectRatio="none" viewBox="0 0 631 397">
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

      {/* Species strip with NO. / category / HT / WT */}
      <div className={"card__speciesStrip"} data-name="Species Strip">
        <div className={"card__speciesStripShadow"}>
          <svg className={"card__svgFill"} fill="none" preserveAspectRatio="none" viewBox="0 0 660.5 32">
            <g filter="url(#filter0_d_1_488)">
              <path d={svgPaths.p271b79c0} fill="url(#paint0_linear_1_488)" />
              <g>
                <path d={svgPaths.p2e22bd00} fill="url(#paint1_linear_1_488)" />
                <path d={svgPaths.p38aed680} fill="url(#paint2_linear_1_488)" />
              </g>
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="32" id="filter0_d_1_488" width="660.5" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dx="2" dy="2" />
                <feGaussianBlur stdDeviation="1" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_488" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_488" mode="normal" result="shape" />
              </filter>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_488" x1="315" x2="315" y1="0" y2="28">
                <stop stopColor="#FDFDFD" />
                <stop offset="0.183929" stopColor="#D9DADA" />
                <stop offset="0.329061" stopColor="white" />
                <stop offset="0.580005" stopColor="white" />
                <stop offset="0.750786" stopColor="#DFE0E1" />
                <stop offset="0.900655" stopColor="#AEB1B3" />
                <stop offset="1" stopColor="#969696" />
              </linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_1_488" x1="326.5" x2="326.5" y1="0.451613" y2="28.21">
                <stop stopColor="#888D91" />
                <stop offset="0.217589" stopColor="#969694" />
                <stop offset="0.377254" stopColor="#F3F3F4" />
                <stop offset="0.501698" stopColor="#707172" />
                <stop offset="0.674328" stopColor="#545454" />
                <stop offset="0.864352" stopColor="#C7C7C7" />
                <stop offset="1" stopColor="#888A8B" />
              </linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_1_488" x1="326.5" x2="326.5" y1="0.451613" y2="28.21">
                <stop stopColor="#888D91" />
                <stop offset="0.217589" stopColor="#969694" />
                <stop offset="0.377254" stopColor="#F3F3F4" />
                <stop offset="0.501698" stopColor="#707172" />
                <stop offset="0.674328" stopColor="#545454" />
                <stop offset="0.864352" stopColor="#C7C7C7" />
                <stop offset="1" stopColor="#888A8B" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <svg className={"card__svgAbsFill"} fill="none" preserveAspectRatio="none" viewBox="0 0 656.5 28">
          <g>
            <path d={svgPaths.p271b79c0} fill="url(#paint0_linear_1_551)" />
            <g>
              <path d={svgPaths.p2e22bd00} fill="url(#paint1_linear_1_551)" />
              <path d={svgPaths.p38aed680} fill="url(#paint2_linear_1_551)" />
            </g>
          </g>
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_551" x1="315" x2="315" y1="0" y2="28">
              <stop stopColor="#FDFDFD" />
              <stop offset="0.183929" stopColor="#D9DADA" />
              <stop offset="0.329061" stopColor="white" />
              <stop offset="0.40625" stopColor="white" />
              <stop offset="0.552083" stopColor="#DFE0E1" />
              <stop offset="0.900655" stopColor="#AEB1B3" />
              <stop offset="1" stopColor="#969696" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_1_551" x1="326.5" x2="326.5" y1="0.451613" y2="28.21">
              <stop stopColor="#888D91" />
              <stop offset="0.217589" stopColor="#969694" />
              <stop offset="0.377254" stopColor="#F3F3F4" />
              <stop offset="0.501698" stopColor="#707172" />
              <stop offset="0.674328" stopColor="#545454" />
              <stop offset="0.864352" stopColor="#C7C7C7" />
              <stop offset="1" stopColor="#888A8B" />
            </linearGradient>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_1_551" x1="326.5" x2="326.5" y1="0.451613" y2="28.21">
              <stop stopColor="#888D91" />
              <stop offset="0.217589" stopColor="#969694" />
              <stop offset="0.377254" stopColor="#F3F3F4" />
              <stop offset="0.501698" stopColor="#707172" />
              <stop offset="0.674328" stopColor="#545454" />
              <stop offset="0.864352" stopColor="#C7C7C7" />
              <stop offset="1" stopColor="#888A8B" />
            </linearGradient>
          </defs>
        </svg>
        <div className={"card__speciesStripText"} data-name="Text">
          <p className={"card__speciesItem card__speciesItem--number"}>
            <span className={"card__speciesItem"}>NO.</span>
            <span className={"card__speciesItem card__speciesItem--species"}>{` `}</span>
            <span className={"card__speciesItem"}>235</span>
          </p>
          <p className={"card__speciesItem card__speciesItem--species"}>Painter Pokémon</p>
          <p className={"card__speciesItem"}>HT: 3´11´´</p>
          <p className={"card__speciesItem"}>WT: 127.9 lbs.</p>
        </div>
      </div>

      {/* HP + type badge (top-right) */}
      <div className={"card__hpType"} data-name="HP / Type">
        <div className={"card__hpGroup"} data-name="HP">
          <div className={"card__hpText"}>
            <p>
              <span className={"card__hpLabel"}>HP</span>
              <span className={"card__hpValue"}>70</span>
            </p>
          </div>
        </div>
        <div className={"card__hpBadge"} data-name="Pokemon Type">
          <HpBadge />
        </div>
      </div>

      {/* Name */}
      <p className={"card__name"}>Smeargle</p>

      {/* Stage pill (BASIC) */}
      <div className={"card__stage"} data-name="Stage">
        <div className={"card__stageShadow"}>
          <svg className={"card__svgFill"} fill="none" preserveAspectRatio="none" viewBox="0 0 109 37">
            <g filter="url(#filter0_d_1_543)">
              <path d={svgPaths.p1ac5e700} fill="url(#paint0_linear_1_543)" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="37" id="filter0_d_1_543" width="109" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dx="1" dy="1" />
                <feGaussianBlur stdDeviation="1" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_543" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_543" mode="normal" result="shape" />
              </filter>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_543" x1="53.5" x2="53.5" y1="1" y2="34">
                <stop stopColor="#FEFFFF" />
                <stop offset="0.0935292" stopColor="#FEFFFF" />
                <stop offset="0.182883" stopColor="#BDBCC1" />
                <stop offset="0.272236" stopColor="#FEFFFF" />
                <stop offset="0.544999" stopColor="#FEFFFF" />
                <stop offset="0.838956" stopColor="#969694" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className={"card__stageLetters"}>
          <StageLetter x="calc(50% - 31.81px)" y="calc(50% - 0.98px)" width={18.928} height={12.988} path={svgPaths.p2e78e8c0} viewBox="0 0 20.7568 14.9883" insetClass="inset-[-7.7%_-5.28%_-7.7%_-4.38%]" />
          <StageLetter x="calc(50% + 6.07px)" y="calc(50% - 0.99px)" width={17.996} height={12.981} path={svgPaths.p19191e00} viewBox="0 0 19.9246 14.9808" insetClass="inset-[-7.7%_-5.56%_-7.7%_-5.16%]" />
          <StageLetter x="calc(50% - 14.3px)" y="calc(50% - 0.97px)" width={19.727} height={12.958} path={svgPaths.pd4b4c00} viewBox="0 0 21.2712 14.958" insetClass="inset-[-7.72%_-5.07%_-7.72%_-2.76%]" />
          <StageLetter x="calc(50% + 30.93px)" y="calc(50% - 0.97px)" width={17.596} height={12.993} path={svgPaths.p31405800} viewBox="0 0 19.5956 14.9931" insetClass="inset-[-7.7%_-5.68%]" />
          <StageLetter x="calc(50% + 18.18px)" y="calc(50% - 0.97px)" width={6.914} height={12.984} path={svgPaths.p1b4a0270} viewBox="0 0 8.64056 14.9836" insetClass="inset-[-7.7%_-14.46%_-7.7%_-10.5%]" />
        </div>
      </div>

      {/* Portrait (optional custom overlay) */}
      <div className={"card__portrait"} data-name="Portrait">
        {portrait || null}
      </div>
    </div>
  );
}

interface IStageLetterProps {
  x: string;
  y: string;
  width: number;
  height: number;
  path: string;
  viewBox: string;
  insetClass: string;
}

function StageLetter({ x, y, width, height, path, viewBox, insetClass }: IStageLetterProps) {
  return (
    <div
      className={"card__stageLetter"}
      style={{
        blockSize: `${height}px`,
        inlineSize: `${width}px`,
        insetBlockStart: y,
        insetInlineStart: x,
        position: "absolute",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className={`absolute ${insetClass}`}>
        <svg className={"card__svgFill"} fill="none" preserveAspectRatio="none" viewBox={viewBox}>
          <path d={path} fill="#545454" stroke="white" />
        </svg>
      </div>
    </div>
  );
}

function HpBadge() {
  return (
    <>
      <div className={"card__hpBadgeBase"}>
        <svg className={"card__svgFill"} fill="none" preserveAspectRatio="none" viewBox="0 0 57 57">
          <g>
            <g filter="url(#filter0_i_1_539)">
              <circle cx="28.5" cy="28.5" fill="black" r="24.5" />
              <circle cx="28.5" cy="28.5" fill="url(#paint0_radial_1_539)" r="24.5" />
            </g>
            <circle cx="28.5" cy="28.5" r="26.5" stroke="white" strokeWidth="4" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="57" id="filter0_i_1_539" width="57" x="0" y="0">
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
            <radialGradient cx="0" cy="0" gradientTransform="translate(23.9868 23.3421) rotate(48.3665) scale(31.0546)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_539" r="1">
              <stop offset="0.232381" stopColor="white" />
              <stop offset="0.699526" stopColor="#DAD1C9" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className={"type__symbol"} data-name="Symbol" style={{ inset: "10.53% 15.81%", position: "absolute" }}>
        <svg className={"card__svgAbsFill"} fill="none" preserveAspectRatio="none" viewBox="0 0 33.5015 38.6842">
          <path d={svgPaths.p6185800} fill="black" />
        </svg>
      </div>
    </>
  );
}

function SmallTypeBadge({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg className={"card__svgAbsFill"} fill="none" preserveAspectRatio="none" viewBox="0 0 23 23">
        <g filter="url(#filter0_i_1_613)">
          <circle cx="11.5" cy="11.5" fill="black" r="11.5" />
          <circle cx="11.5" cy="11.5" fill="url(#paint0_radial_1_613)" r="11.5" />
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="23" id="filter0_i_1_613" width="23" x="0" y="0">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feMorphology in="SourceAlpha" operator="erode" radius="1.21053" result="effect" />
            <feOffset />
            <feGaussianBlur stdDeviation="1.21053" />
            <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
            <feBlend in2="shape" mode="overlay" result="effect" />
          </filter>
          <radialGradient cx="0" cy="0" gradientTransform="translate(9.38158 9.07895) rotate(48.3665) scale(14.5767)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_613" r="1">
            <stop offset="0.232381" stopColor="white" />
            <stop offset="0.699526" stopColor="#DAD1C9" />
          </radialGradient>
        </defs>
      </svg>
      <div style={{ inset: "10.53% 15.81%", position: "absolute" }}>
        <svg className={"card__svgAbsFill"} fill="none" preserveAspectRatio="none" viewBox="0 0 15.7252 18.1579">
          <path d={svgPaths.p1c7dea00} fill="black" />
        </svg>
      </div>
    </div>
  );
}

function ResistanceTypeBadge() {
  return (
    <>
      <svg className={"card__svgAbsFill"} fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g filter="url(#filter0_i_1_531)">
          <circle cx="12" cy="12" fill="black" r="12" />
          <circle cx="12" cy="12" fill="url(#paint0_radial_1_531)" r="12" />
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="24" id="filter0_i_1_531" width="24" x="0" y="0">
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
          <radialGradient cx="0" cy="0" gradientTransform="translate(9.78947 9.47368) rotate(48.3665) scale(15.2104)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_531" r="1">
            <stop offset="0.232381" stopColor="white" />
            <stop offset="0.699526" stopColor="#DAD1C9" />
          </radialGradient>
        </defs>
      </svg>
      <div style={{ inset: "10.53% 15.81%", position: "absolute" }}>
        <svg className={"card__svgAbsFill"} fill="none" preserveAspectRatio="none" viewBox="0 0 16.4089 18.9474">
          <path d={svgPaths.p39f8b5f2} fill="black" />
        </svg>
      </div>
    </>
  );
}

function WeaknessTypeBadge() {
  return (
    <>
      <svg className={"card__svgAbsFill"} fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g filter="url(#filter0_i_1_597)">
          <circle cx="12" cy="12" fill="#CD4D27" r="12" />
          <circle cx="12" cy="12" fill="url(#paint0_radial_1_597)" r="12" />
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="24" id="filter0_i_1_597" width="24" x="0" y="0">
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
          <radialGradient cx="0" cy="0" gradientTransform="translate(9.78947 9.47368) rotate(48.3665) scale(15.2104)" gradientUnits="userSpaceOnUse" id="paint0_radial_1_597" r="1">
            <stop stopColor="white" stopOpacity="0.9" />
            <stop offset="0.748008" stopColor="#CD4D27" />
          </radialGradient>
        </defs>
      </svg>
      <div style={{ inset: "15.79% 18.42% 15.79% 21.05%", position: "absolute" }}>
        <svg className={"card__svgAbsFill"} fill="none" preserveAspectRatio="none" viewBox="0 0 14.5264 16.4219">
          <path d={svgPaths.p382d2a00} fill="black" />
        </svg>
      </div>
    </>
  );
}
