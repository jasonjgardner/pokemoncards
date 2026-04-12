import type { Meta, StoryObj } from "@storybook/react-vite";
import { NameHeader } from "./NameHeader";
import { TYPE_NAMES } from "../types";

const meta = {
  title: "Card/Molecules/NameHeader",
  component: NameHeader,
  parameters: { layout: "centered", backgrounds: { default: "neutral" } },
  argTypes: {
    type: { control: "select", options: TYPE_NAMES },
    hp: { control: { type: "number", min: 10, max: 340, step: 10 } },
  },
  args: { name: "Smeargle", hp: 70, type: "Normal" },
  decorators: [
    (Story) => <div style={{ inlineSize: "500px", position: "relative" }}><Story /></div>,
  ],
} satisfies Meta<typeof NameHeader>;

export default meta;
type S = StoryObj<typeof meta>;

export const Playground: S = {};
export const Smeargle: S = { args: { name: "Smeargle", hp: 70, type: "Normal" } };
export const Charmander: S = { args: { name: "Charmander", hp: 70, type: "Fire" } };
