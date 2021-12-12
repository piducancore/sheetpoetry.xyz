import { system } from "@theme-ui/presets";
import { merge } from "theme-ui";
import prismPreset from "@theme-ui/prism/presets/night-owl.json";

import "@fontsource/space-grotesk/300.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/700.css";

const theme = merge(system, {
  fonts: { body: "Space Grotesk", heading: "Space Grotesk", monospace: "monospace" },
  fontWeights: {
    body: 500,
    heading: 700,
    bold: 700,
  },
  colors: {
    text: "#1E212B",
    primary: "#D90368",
    secondary: "#FFD400",
    background: "#FFFFFF",
  },
  sizes: { container: 960 },
  layout: {
    container: {
      maxWidth: "container",
      mx: "auto",
      px: 3,
    },
    footer: {
      py: 4,
      textAlign: "center",
    },
  },
  forms: { fontFamily: "body", label: { fontWeight: "bold" }, input: { mb: 3 }, textarea: { mb: 3 } },
  buttons: {
    primary: {
      color: "background",
      bg: "primary",
      border: (theme) => `solid 1px ${theme.colors.primary}`,
      cursor: "pointer",
      ":hover": {
        color: "primary",
        bg: "background",
      },
    },
  },
  styles: {
    a: {
      fontWeight: "bold",
      textDecoration: "none",
      "&:hover": {
        color: "secondary",
      },
    },
    h1: { mb: 0 },
    h2: { mb: 0 },
    h4: { mb: 0 },
    code: {
      ...prismPreset,
      borderRadius: 4,
    },
    inlineCode: {
      color: "primary",
    },
    img: {
      maxWidth: "100%",
    },
  },
});

export default theme;
