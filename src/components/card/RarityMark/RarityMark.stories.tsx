import type { Meta, StoryObj } from "@storybook/react-vite";
import { RarityMark } from "./RarityMark";

const meta = {
  title: "Card/Primitives/RarityMark",
  component: RarityMark,
  parameters: { layout: "centered" },
  argTypes: {
    rarity: { control: "radio", options: ["common", "uncommon", "rare"] },
    fill: { control: "radio", options: ["white", "black"] },
  },
  args: { rarity: "common", fill: "black" },
  decorators: [
    (Story) => <div style={{ inlineSize: "1.5rem", aspectRatio: 1 }}><Story /></div>,
  ],
} satisfies Meta<typeof RarityMark>;

export default meta;
type S = StoryObj<typeof meta>;

export const Playground: S = {};
export const CommonBlack: S = { args: { rarity: "common", fill: "black" } };
export const CommonWhite: S = { args: { rarity: "common", fill: "white" }, parameters: { backgrounds: { default: "dark" } } };
export const UncommonBlack: S = { args: { rarity: "uncommon", fill: "black" } };
export const UncommonWhite: S = { args: { rarity: "uncommon", fill: "white" }, parameters: { backgrounds: { default: "dark" } } };
export const RareBlack: S = { args: { rarity: "rare", fill: "black" } };
export const RareWhite: S = { args: { rarity: "rare", fill: "white" }, parameters: { backgrounds: { default: "dark" } } };
