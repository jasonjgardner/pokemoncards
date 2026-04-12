import type { Meta, StoryObj } from "@storybook/react-vite";
import { BottomRow } from "./BottomRow";

const meta = {
  title: "Card/Molecules/BottomRow",
  component: BottomRow,
  parameters: { layout: "padded", backgrounds: { default: "neutral" } },
  argTypes: {
    regulationMark: { control: "radio", options: ["D", "E", "F", "G"] },
    rarityShape: { control: "radio", options: ["common", "uncommon", "rare"] },
    rarityFill: { control: "radio", options: ["white", "black"] },
    flavor: { control: "object" },
  },
  args: {
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
  },
  decorators: [
    (Story) => <div style={{ inlineSize: "700px", position: "relative" }}><Story /></div>,
  ],
} satisfies Meta<typeof BottomRow>;

export default meta;
type S = StoryObj<typeof meta>;

export const Playground: S = {};
export const Default: S = {};
