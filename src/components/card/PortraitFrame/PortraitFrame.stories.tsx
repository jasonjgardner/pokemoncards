import type { Meta, StoryObj } from "@storybook/react-vite";
import { PortraitFrame } from "./PortraitFrame";
import imgPortraitImage from "../../../assets/imgPortraitImage.png";

const meta = {
  title: "Card/Organisms/PortraitFrame",
  component: PortraitFrame,
  parameters: { layout: "centered", backgrounds: { default: "neutral" } },
  args: { portraitSrc: imgPortraitImage },
  decorators: [
    (Story) => (
      <div style={{ inlineSize: "635px", blockSize: "400px", position: "relative" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PortraitFrame>;

export default meta;
type S = StoryObj<typeof meta>;

export const Playground: S = {};
export const Default: S = {};
