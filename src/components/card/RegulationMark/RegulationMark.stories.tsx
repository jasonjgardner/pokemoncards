import type { Meta, StoryObj } from "@storybook/react-vite";
import { RegulationMark } from "./RegulationMark";

const meta = {
  title: "Card/Primitives/RegulationMark",
  component: RegulationMark,
  parameters: { layout: "centered" },
  argTypes: { mark: { control: "radio", options: ["D", "E", "F", "G"] } },
  args: { mark: "F" },
  decorators: [
    (Story) => <div style={{ inlineSize: "2rem", blockSize: "3rem" }}><Story /></div>,
  ],
} satisfies Meta<typeof RegulationMark>;

export default meta;
type S = StoryObj<typeof meta>;

export const Playground: S = {};
export const D: S = { args: { mark: "D" } };
export const E: S = { args: { mark: "E" } };
export const F: S = { args: { mark: "F" } };
export const G: S = { args: { mark: "G" } };
