import type { Meta, StoryObj } from "@storybook/react-vite";
import { CardSurface, CARD_SURFACE_TINTS } from "./CardSurface";
import type { TypeName } from "../types";
import imgBg from "../../../assets/imgBg.png";
import { imgRectangle12 } from "../../../../svg-3mfyb";

const meta = {
  title: "Card/Organisms/CardSurface",
  component: CardSurface,
  parameters: { layout: "centered", backgrounds: { default: "neutral" } },
  args: { bgSrc: imgBg, holoMaskSrc: imgRectangle12 },
  argTypes: {
    type: {
      control: "select",
      options: Object.keys(CARD_SURFACE_TINTS) as TypeName[],
    },
  },
  decorators: [
    (Story) => (
      <div
        className="card"
        style={{ blockSize: "1024px", inlineSize: "733px", position: "relative" }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CardSurface>;

export default meta;
type S = StoryObj<typeof meta>;

export const Playground: S = {};

/** Default (no `type` prop) — neutral gray overlay. */
export const Normal: S = { args: { type: "Normal" } };
export const Fire: S = { args: { type: "Fire" } };
export const Water: S = { args: { type: "Water" } };
export const Grass: S = { args: { type: "Grass" } };
export const Lightning: S = { args: { type: "Lightning" } };
export const Fighting: S = { args: { type: "Fighting" } };
export const Psychic: S = { args: { type: "Psychic" } };
export const Metal: S = { args: { type: "Metal" } };
export const Darkness: S = { args: { type: "Darkness" } };
export const Dragon: S = { args: { type: "Dragon" } };

/**
 * All 10 variants on one canvas — mirrors the Figma component set
 * (node 28:252). Same imgBg.png reused across every tile; only the
 * `--card-surface-tint` custom property changes per card.
 */
export const AllTypes: StoryObj = {
  parameters: { layout: "fullscreen" },
  decorators: [],
  render: () => {
    const types = Object.keys(CARD_SURFACE_TINTS) as TypeName[];
    return (
      <div
        style={{
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          padding: "1.5rem",
        }}
      >
        {types.map((t) => (
          <figure
            key={t}
            style={{ display: "grid", gap: "0.5rem", justifyItems: "center", margin: 0 }}
          >
            <div
              className="card"
              style={{
                blockSize: "280px",
                inlineSize: "200px",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  transform: "scale(calc(200 / 733))",
                  transformOrigin: "top left",
                  inlineSize: "733px",
                  blockSize: "1024px",
                }}
              >
                <CardSurface bgSrc={imgBg} holoMaskSrc={imgRectangle12} type={t} />
              </div>
            </div>
            <figcaption style={{ fontFamily: "system-ui", fontSize: "0.85rem" }}>
              {t} — <code>{CARD_SURFACE_TINTS[t]}</code>
            </figcaption>
          </figure>
        ))}
      </div>
    );
  },
};
