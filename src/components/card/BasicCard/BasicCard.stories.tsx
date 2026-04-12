import type { Meta, StoryObj } from "@storybook/react-vite";
import { BasicCard } from "./BasicCard";
import { SMEARGLE_DATA } from "../smeargle";

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

export const FireStarter: S = {
  args: {
    data: {
      ...SMEARGLE_DATA,
      name: "Charmander",
      type: "Fire",
      hp: 70,
      weaknessType: "Water",
      weaknessMultiplier: 2,
      resistanceType: undefined,
      resistanceAmount: undefined,
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
