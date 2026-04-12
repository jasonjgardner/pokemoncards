import type { Meta, StoryObj } from "@storybook/react-vite";
import { SetMark } from "./SetMark";

const meta = {
  title: "Card/Primitives/SetMark",
  component: SetMark,
  parameters: { layout: "centered" },
  argTypes: { set: { control: "radio", options: ["silver-tempest"] } },
  args: { set: "silver-tempest" },
  decorators: [
    (Story) => <div style={{ inlineSize: "2.5rem", aspectRatio: 1 }}><Story /></div>,
  ],
} satisfies Meta<typeof SetMark>;

export default meta;
type S = StoryObj<typeof meta>;

export const Playground: S = {};
export const SilverTempest: S = { args: { set: "silver-tempest" } };
