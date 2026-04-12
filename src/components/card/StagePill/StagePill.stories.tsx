import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ReactNode } from "react";
import { StagePill } from "./StagePill";

const meta = {
  title: "Card/Primitives/StagePill",
  component: StagePill,
  parameters: { layout: "centered", backgrounds: { default: "neutral" } },
  argTypes: {
    stage: { control: "radio", options: ["basic", "stage-1", "stage-2"] },
    evolvesFrom: { control: "text" },
    evolvesFromPortraitSrc: { control: "text" },
  },
  args: { stage: "basic" },
} satisfies Meta<typeof StagePill>;

export default meta;
type S = StoryObj<typeof meta>;

/* Standalone stage-pill stories emulate the `.card__stage` slot from the
   main card: a 105×33 absolute-positioned pill at the top-left of a wider
   stage (576×128) so Stage 1/2 ribbon + portrait-frame overflow stays
   visible. */
function StageSlot({ children }: { children: ReactNode }) {
  return (
    <div style={{ inlineSize: "36rem", blockSize: "8rem", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          inlineSize: "105px",
          blockSize: "33px",
          insetBlockStart: "1rem",
          insetInlineStart: "1rem",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export const Playground: S = {
  decorators: [(Story) => <StageSlot><Story /></StageSlot>],
};

export const Basic: S = {
  args: { stage: "basic" },
  decorators: [(Story) => <StageSlot><Story /></StageSlot>],
};

export const Stage1: S = {
  args: { stage: "stage-1", evolvesFrom: "Pokemon" },
  decorators: [(Story) => <StageSlot><Story /></StageSlot>],
};

export const Stage2: S = {
  args: { stage: "stage-2", evolvesFrom: "Pokemon" },
  decorators: [(Story) => <StageSlot><Story /></StageSlot>],
};
