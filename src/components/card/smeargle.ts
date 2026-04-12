import type { ICardData } from "./types";
import imgBg from "../../assets/imgBg.png";
import imgPortraitImage from "../../assets/imgPortraitImage.png";
import { imgRectangle12 } from "../../../svg-3mfyb";

export const SMEARGLE_DATA: ICardData = {
  name: "Smeargle",
  hp: 70,
  type: "Normal",
  stage: "basic",

  portraitSrc: imgPortraitImage,
  bgSrc: imgBg,
  holoMaskSrc: imgRectangle12,

  attacks: [
    {
      variant: "combo",
      name: "Colorful Palette",
      description:
        "Look at the top 5 cards of your deck. You may attach any number of basic Energy cards you find there to 1 of your Pokémon. Shuffle the other cards back into your deck.",
      damage: "",
      energyCount: 1,
      energyType: "Normal",
    },
    { variant: "basic", name: "Ram", damage: "30", energyCount: 2, energyType: "Normal" },
  ],

  weaknessType: "Fighting",
  weaknessMultiplier: 2,
  resistanceType: "Normal",
  resistanceAmount: 30,
  retreatCost: 2,

  speciesStripVariant: "default",
  pokedexNumber: 235,
  category: "Painter Pokémon",
  height: "3´11´´",
  weight: "127.9 lbs.",

  regulationMark: "F",
  copyright: "©2022 Pokémon / Nintendo / Creatures / GAME FREAK ",
  illustrator: "Illus. Mizue",
  rarityShape: "common",
  rarityFill: "black",
  cardNumber: "137/195",
  flavor: [
    "it draws symbols with the fluid that oozes from",
    "the tip of its tail. Depending on the symbol,",
    "Smeargle fanatics will pay big money for them",
  ],
  setMark: "silver-tempest",
};
