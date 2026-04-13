import type { Meta, StoryObj } from "@storybook/react-vite";
import { HolographicCard } from "./HolographicCard";
import { CARROTS_DATA } from "../../card/carrots";

const meta = {
  title: "HoverTilt/HolographicCard",
  component: HolographicCard,
  parameters: { layout: "centered" },
  argTypes: {
    tiltFactor: { control: { type: "range", min: 0, max: 3, step: 0.1 } },
    scaleFactor: { control: { type: "range", min: 1, max: 1.5, step: 0.05 } },
    shadow: { control: "boolean" },
    blendMode: {
      control: "select",
      options: [
        undefined,
        "overlay",
        "luminosity",
        "color-dodge",
        "plus-lighter",
        "screen",
        "soft-light",
      ],
    },
    glareIntensity: { control: { type: "range", min: 0, max: 8, step: 0.25 } },
    glareHue: { control: { type: "range", min: 0, max: 360, step: 1 } },
    glareMask: { control: "text" },
    glareMaskMode: {
      control: "select",
      options: [undefined, "luminance", "alpha", "match-source"],
    },
    glareMaskComposite: {
      control: "select",
      options: [undefined, "add", "subtract", "intersect", "exclude"],
    },
    shine: { control: { type: "range", min: 0, max: 2, step: 0.05 } },
    innerBrightness: { control: { type: "range", min: 0, max: 2, step: 0.05 } },
    outerBrightness: { control: { type: "range", min: 0, max: 2, step: 0.05 } },
    rainbowSaturation: { control: { type: "range", min: 0, max: 3, step: 0.1 } },
    tileSize: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div style={{ transform: "scale(0.8)", transformOrigin: "top center" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HolographicCard>;

export default meta;
type S = StoryObj<typeof meta>;

export const Default: S = {};

export const BespokePokemon: S = {
  args: {
    tiltFactor: 1.5,
    scaleFactor: 1.1,
    shadow: true,
    blendMode: "luminosity",
    glareIntensity: 4,
    glareMaskMode: "luminance",
  },
};

export const HotRainbow: S = {
  args: {
    shine: 1.3,
    innerBrightness: 1,
    outerBrightness: 0.85,
    rainbowSaturation: 1.8,
    glareIntensity: 2,
  },
};

export const VideoPortrait: S = {
  args: {
    portrait: (
      <video
        autoPlay
        loop
        muted
        playsInline
        src="https://cdn.jsdelivr.net/npm/big-buck-bunny-1080p@0.0.6/video.mp4"
      />
    ),
  },
};

export const Carrots: S = {
  args: {
    data: CARROTS_DATA,
    tiltFactor: 1.5,
    scaleFactor: 1.1,
    shadow: true,
    blendMode: "luminosity",
    glareIntensity: 4,
    glareMaskMode: "luminance",
    rainbowSaturation: 1.6,
  },
};
