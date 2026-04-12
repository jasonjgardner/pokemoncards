import { imgRectangle12 } from "../svg-3mfyb";
import imgBg from "./assets/imgBg.png";
import imgPortraitImage from "./assets/imgPortraitImage.png";
import "./BasicCard.css";
import { Attack } from "./components/card/Attack/Attack";
import { BattleBar } from "./components/card/BattleBar/BattleBar";
import { BottomRow } from "./components/card/BottomRow/BottomRow";
import { NameHeader } from "./components/card/NameHeader/NameHeader";
import { PortraitFrame } from "./components/card/PortraitFrame/PortraitFrame";
import { SpeciesStrip } from "./components/card/SpeciesStrip/SpeciesStrip";
import { StagePill } from "./components/card/StagePill/StagePill";

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
      <BottomRow
        regulationMark="F"
        copyright="©2022 Pokémon / Nintendo / Creatures / GAME FREAK "
        illustrator="Illus. Mizue"
        rarityShape="common"
        rarityFill="black"
        cardNumber="137/195"
        flavor={[
          "it draws symbols with the fluid that oozes from",
          "the tip of its tail. Depending on the symbol,",
          "Smeargle fanatics will pay big money for them",
        ]}
        setMark="silver-tempest"
      />

      {/* Battle bar: weakness / resistance / retreat cost */}
      <BattleBar
        weaknessType="Fighting"
        weaknessMultiplier={2}
        resistanceType="Normal"
        resistanceAmount={30}
        retreatCost={2}
      />

      {/* Attack frame (slot; defaults show Smeargle's attacks) */}
      <div className={"card__attackFrame"} data-name="Attack Frame">
        {attackFrame || (
          <>
            <Attack
              variant="combo"
              name="Colorful Palette"
              description="Look at the top 5 cards of your deck. You may attach any number of basic Energy cards you find there to 1 of your Pokémon. Shuffle the other cards back into your deck."
              damage=""
              energyCount={1}
              energyType="Normal"
            />
            <Attack variant="basic" name="Ram" damage="30" energyCount={2} energyType="Normal" />
          </>
        )}
      </div>

      {/* Portrait artwork slot + surrounding metallic frame */}
      <PortraitFrame portraitSrc={imgPortraitImage} />

      {/* Species strip with NO. / category / HT / WT */}
      <SpeciesStrip
        variant="default"
        pokedexNumber={235}
        category="Painter Pokémon"
        height="3´11´´"
        weight="127.9 lbs."
      />

      {/* Name + HP + type badge (top-right header row) */}
      <NameHeader name="Smeargle" hp={70} type="Normal" />

      {/* Stage pill (BASIC) */}
      <StagePill stage="basic" />

      {/* Portrait (optional custom overlay) */}
      <div className={"card__portrait"} data-name="Portrait">
        {portrait || null}
      </div>
    </div>
  );
}

