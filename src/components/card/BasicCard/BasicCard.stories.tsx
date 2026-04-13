import type { Meta, StoryObj } from "@storybook/react-vite";
import { BasicCard } from "./BasicCard";
import { SMEARGLE_DATA } from "../smeargle";
import { CARROTS_DATA } from "../carrots";

const meta = {
  title: "Card/BasicCard",
  component: BasicCard,
  parameters: { layout: "centered" },
  args: { data: SMEARGLE_DATA },
  argTypes: {
    data: { control: "object" },
  },
  decorators: [
    (Story) => (
      <div style={{ transform: "scale(0.8)", transformOrigin: "top center" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BasicCard>;

export default meta;
type S = StoryObj<typeof meta>;

export const Smeargle: S = {};

export const Charmander: S = {
  args: {
    data: {
      name: "Charmander",
      hp: 70,
      type: "Fire",
      stage: "basic",
      portraitSrc: "/src/assets/charmander.png",
      bgSrc: "/src/assets/imgBg.png",
      holoMaskSrc: SMEARGLE_DATA.holoMaskSrc,

      attacks: [
        {
          variant: "combo",
          name: "Blazing Destruction",
          description: "Discard a Stadium in play.",
          damage: "",
          energyCount: 1,
          energyType: "Fire",
        },
        {
          variant: "basic",
          name: "Steady Firebreathing",
          damage: "30",
          energyCount: 2,
          energyType: "Fire",
        },
      ],

      weaknessType: "Water",
      weaknessMultiplier: 2,
      retreatCost: 1,
      speciesStripVariant: "default",
      pokedexNumber: 4,
      category: "Lizard Pokémon",
      height: "2'",
      weight: "18.7 lbs.",
      regulationMark: "G",
      copyright: "©2023 Pokémon / Nintendo / Creatures / GAME FREAK",
      illustrator: "Illus. GIDORA",
      rarityShape: "common",
      rarityFill: "black",
      cardNumber: "004/165",

      flavor: [
        "From the time it is born, a flame burns at the tip of its",
        "tail. Its life would end if the flame were to go out.",
      ],

      setMark: "silver-tempest",
    },
  },
};

export const Radiant: S = {
  args: {
    data: {
      ...SMEARGLE_DATA,
      speciesStripVariant: "radiant",
      radiantRuleText: "You can't have more than 1 Radiant Pokémon in your deck.",
    },
  },
};

export const Stage2: S = {
  args: {
    data: {
      ...SMEARGLE_DATA,
      stage: "stage-2",
      evolvesFrom: "Squirtle",
    },
  },
};

export const Carrots: S = {
  args: { data: CARROTS_DATA },
};
