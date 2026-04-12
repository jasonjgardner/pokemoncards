import type { Preview } from "@storybook/react-vite";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "neutral",
      values: [
        { name: "neutral", value: "#e2e2e2" },
        { name: "dark", value: "#0b0b0b" },
        { name: "light", value: "#ffffff" },
      ],
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: { light: "light", dark: "dark" },
      defaultTheme: "dark",
      attributeName: "class",
    }),
  ],
};

export default preview;
