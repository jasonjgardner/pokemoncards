import type { ICardData } from "./types";
import imgBg from "../../assets/imgBg.png";
import carrotsPortrait from "../../assets/carrots.png";
import { imgRectangle12 } from "../../../svg-3mfyb";

export const CARROTS_DATA: ICardData = {
  name: "Carrots",
  hp: 160,
  type: "Normal",
  stage: "stage-2",
  evolvesFrom: "Loafcat",

  portraitSrc: carrotsPortrait,
  bgSrc: imgBg,
  holoMaskSrc: imgRectangle12,

  attacks: [
    {
      variant: "combo",
      name: "Disapproving Stare",
      description:
        "Your opponent's Active Pokémon is now Confused. They know what they did.",
      damage: "20",
      energyCount: 1,
      energyType: "Normal",
    },
    {
      variant: "basic",
      name: "Chonky Flop",
      damage: "120",
      energyCount: 3,
      energyType: "Normal",
    },
  ],

  weaknessType: "Water",
  weaknessMultiplier: 2,
  resistanceType: "Fighting",
  resistanceAmount: 30,
  retreatCost: 4,

  speciesStripVariant: "default",
  pokedexNumber: 404,
  category: "Grumpy Loaf Pokémon",
  height: "1'2\"",
  weight: "18.5 lbs.",

  regulationMark: "G",
  copyright: "©2026 Gardner Feline Dynasty",
  illustrator: "Illus. Jason Gardner",
  rarityShape: "rare",
  rarityFill: "black",
  cardNumber: "042/151",
  flavor: [
    "Do not, under any circumstances, pet the belly.",
  ],
  setMark: "silver-tempest",
};
