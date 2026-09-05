import { EffectState, StylePack, StylePackId } from "@/lib/types";

export const DEFAULT_STYLE_PACK_ID: StylePackId = "neo-brutalism";

export const DEFAULT_EFFECT_STATE: EffectState = {
  motion: 68,
  depth: 74,
  border: 58,
  radius: 52,
  density: 50,
  glass: 42,
};

export const STYLE_PACKS: StylePack[] = [
  {
    id: "neo-brutalism",
    label: "Neo Brutalism",
    shortLabel: "Brutal",
    description:
      "Sticker-like cards, bright yellow poster framing, lilac capsule type, and black outlines with comic confidence.",
    mood: ["yellow board", "lilac capsule", "sticker bursts"],
    preview: {
      eyebrow: "Play loud, ship louder",
      headline: "Interfaces with the confidence of a hand-painted sign.",
      subhead:
        "Push chunky cards, rigid outlines, and candy-box color collisions until your layout feels impossible to ignore.",
      primaryCta: "Launch the noisy version",
      secondaryCta: "Inspect the framing system",
    },
    tokens: {
      colors: {
        background: "#f2da14",
        surface: "#fffdf7",
        surfaceAlt: "#ccb4ff",
        text: "#151515",
        textMuted: "#4d4d4d",
        primary: "#9a79ff",
        secondary: "#ffffff",
        accent: "#ff7a00",
        line: "#111111",
      },
      typography: {
        display:
          "\"Cooper Black\", Impact, Haettenschweiler, \"Franklin Gothic Heavy\", sans-serif",
        body: "\"Gill Sans\", \"Trebuchet MS\", sans-serif",
        mono: "\"Courier New\", Courier, monospace",
        displayWeight: 900,
        bodyWeight: 600,
        tracking: "-0.05em",
      },
      spacing: {
        base: 18,
        section: 88,
        container: 1240,
      },
      shape: {
        radius: 18,
        radiusLarge: 30,
        panelTilt: -1.5,
        spotlightSize: "48rem",
      },
      borders: {
        width: 3,
        style: "solid",
      },
      shadows: {
        color: "rgba(17,17,17,0.78)",
        x: 10,
        y: 10,
        blur: 0,
        spread: 0,
        softness: 18,
      },
      backgrounds: {
        canvas:
          "linear-gradient(180deg, #f2da14 0%, #f6df29 100%)",
        spotlight:
          "radial-gradient(circle at 88% 18%, rgba(255,255,255,0.24), transparent 18%), radial-gradient(circle at 16% 78%, rgba(255,122,0,0.2), transparent 20%)",
        mesh:
          "linear-gradient(rgba(17,17,17,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,0.06) 1px, transparent 1px)",
        textureOpacity: 0.18,
      },
      motion: {
        duration: 320,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        hoverScale: 1.03,
        floatDistance: 12,
      },
      surface: {
        blur: 8,
        alpha: 92,
      },
    },
    overrides: {
      heroAlign: "left",
      panelChrome: "outlined",
      badgeShape: "burst",
      ctaStyle: "stacked",
    },
  },
  {
    id: "acid-graphics",
    label: "Acid Graphics",
    shortLabel: "Acid",
    description:
      "Layered poster typography, hot orange and magenta collisions, and stacked letterforms with real graphic tension.",
    mood: ["stacked type", "orange shadow", "poster clash"],
    preview: {
      eyebrow: "Signal louder than static",
      headline: "Turn every section into a midnight flyer for tomorrow's launch.",
      subhead:
        "Flood the canvas with neon color, orbital blur, and sliced layouts that feel like motion even when paused.",
      primaryCta: "Boost the fluorescence",
      secondaryCta: "Rewire the motion profile",
    },
    tokens: {
      colors: {
        background: "#4b35e8",
        surface: "#3929c9",
        surfaceAlt: "#ff7f4d",
        text: "#fff8ef",
        textMuted: "#ffd0ea",
        primary: "#ff5a36",
        secondary: "#ff43cf",
        accent: "#ffbe3d",
        line: "#f8f7ff",
      },
      typography: {
        display:
          "Impact, \"Franklin Gothic Heavy\", \"Trebuchet MS\", sans-serif",
        body: "\"Trebuchet MS\", \"Century Gothic\", sans-serif",
        mono: "\"Lucida Console\", Monaco, monospace",
        displayWeight: 800,
        bodyWeight: 600,
        tracking: "-0.03em",
      },
      spacing: {
        base: 18,
        section: 96,
        container: 1280,
      },
      shape: {
        radius: 28,
        radiusLarge: 40,
        panelTilt: 1.2,
        spotlightSize: "56rem",
      },
      borders: {
        width: 2,
        style: "solid",
      },
      shadows: {
        color: "rgba(240,0,255,0.32)",
        x: 0,
        y: 18,
        blur: 54,
        spread: -12,
        softness: 24,
      },
      backgrounds: {
        canvas:
          "linear-gradient(135deg, #4b35e8 0%, #6f39ff 46%, #f36d41 100%)",
        spotlight:
          "radial-gradient(circle at 24% 18%, rgba(255,190,61,0.24), transparent 24%), radial-gradient(circle at 78% 22%, rgba(255,67,207,0.18), transparent 26%)",
        mesh:
          "linear-gradient(130deg, rgba(255,248,239,0.12), transparent 38%), radial-gradient(circle, rgba(255,248,239,0.14) 1px, transparent 1px)",
        textureOpacity: 0.24,
      },
      motion: {
        duration: 380,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        hoverScale: 1.05,
        floatDistance: 16,
      },
      surface: {
        blur: 18,
        alpha: 76,
      },
    },
    overrides: {
      heroAlign: "center",
      panelChrome: "glass",
      badgeShape: "pill",
      ctaStyle: "pill",
    },
  },
  {
    id: "maximalism",
    label: "Maximalism",
    shortLabel: "Max",
    description:
      "Decorative framing, festival warmth, saturated accents, and collected ornament with a poster sensibility.",
    mood: ["arched frame", "festival warmth", "ornamental rhythm"],
    preview: {
      eyebrow: "More texture, more theater",
      headline: "Compose a homepage like a gallery opening with a launch date.",
      subhead:
        "Wrap every block in dramatic contrast, decorative rhythm, and enough visual flavor to feel collected over time.",
      primaryCta: "Stage the grand version",
      secondaryCta: "Dial the ornamentation",
    },
    tokens: {
      colors: {
        background: "#f5d8a8",
        surface: "#fff2d4",
        surfaceAlt: "#ff8a63",
        text: "#341c1d",
        textMuted: "#765253",
        primary: "#2b3e8b",
        secondary: "#b83d2f",
        accent: "#ff8a63",
        line: "#4b2b27",
      },
      typography: {
        display:
          "\"Palatino Linotype\", \"Book Antiqua\", Palatino, Georgia, serif",
        body: "Cambria, Georgia, serif",
        mono: "\"Courier New\", Courier, monospace",
        displayWeight: 700,
        bodyWeight: 500,
        tracking: "-0.04em",
      },
      spacing: {
        base: 20,
        section: 104,
        container: 1280,
      },
      shape: {
        radius: 24,
        radiusLarge: 44,
        panelTilt: -0.6,
        spotlightSize: "62rem",
      },
      borders: {
        width: 2,
        style: "double",
      },
      shadows: {
        color: "rgba(39,28,28,0.24)",
        x: 0,
        y: 20,
        blur: 44,
        spread: -10,
        softness: 28,
      },
      backgrounds: {
        canvas:
          "linear-gradient(160deg, #f5d8a8 0%, #ffe9c7 58%, #ffd6b7 100%)",
        spotlight:
          "radial-gradient(circle at 18% 18%, rgba(255,138,99,0.26), transparent 24%), radial-gradient(circle at 82% 42%, rgba(43,62,139,0.18), transparent 24%)",
        mesh:
          "linear-gradient(90deg, rgba(75,43,39,0.06) 1px, transparent 1px), linear-gradient(rgba(75,43,39,0.06) 1px, transparent 1px)",
        textureOpacity: 0.12,
      },
      motion: {
        duration: 420,
        easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
        hoverScale: 1.02,
        floatDistance: 10,
      },
      surface: {
        blur: 10,
        alpha: 88,
      },
    },
    overrides: {
      heroAlign: "left",
      panelChrome: "soft",
      badgeShape: "chip",
      ctaStyle: "soft",
    },
  },
  {
    id: "minimalism",
    label: "Minimalism",
    shortLabel: "Minimal",
    description:
      "Quiet margins, serif restraint, and hairline framing that feel editorial rather than plain.",
    mood: ["editorial margin", "serif quiet", "hairline grid"],
    preview: {
      eyebrow: "Reduce until it breathes",
      headline: "Let proportion, restraint, and pacing carry the whole experience.",
      subhead:
        "Trim every flourish back to intention while preserving enough depth and movement for the UI to feel alive.",
      primaryCta: "Set the quiet default",
      secondaryCta: "Inspect spacing cadence",
    },
    tokens: {
      colors: {
        background: "#f5f0e6",
        surface: "#fbfaf7",
        surfaceAlt: "#ece2d2",
        text: "#1d1a17",
        textMuted: "#72675c",
        primary: "#314d42",
        secondary: "#8d9a8b",
        accent: "#b67d40",
        line: "#c9bcab",
      },
      typography: {
        display: "\"Baskerville Old Face\", Garamond, serif",
        body: "\"Book Antiqua\", Cambria, serif",
        mono: "\"Courier New\", Courier, monospace",
        displayWeight: 600,
        bodyWeight: 450,
        tracking: "-0.05em",
      },
      spacing: {
        base: 18,
        section: 112,
        container: 1160,
      },
      shape: {
        radius: 24,
        radiusLarge: 44,
        panelTilt: 0,
        spotlightSize: "54rem",
      },
      borders: {
        width: 1,
        style: "solid",
      },
      shadows: {
        color: "rgba(18,18,18,0.09)",
        x: 0,
        y: 18,
        blur: 46,
        spread: -18,
        softness: 18,
      },
      backgrounds: {
        canvas:
          "linear-gradient(180deg, #f5f0e6 0%, #fbfaf7 62%, #f2eadf 100%)",
        spotlight:
          "radial-gradient(circle at 24% 12%, rgba(49,77,66,0.08), transparent 20%), radial-gradient(circle at 76% 18%, rgba(182,125,64,0.08), transparent 18%)",
        mesh:
          "linear-gradient(rgba(29,26,23,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(29,26,23,0.04) 1px, transparent 1px)",
        textureOpacity: 0.05,
      },
      motion: {
        duration: 260,
        easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
        hoverScale: 1.01,
        floatDistance: 4,
      },
      surface: {
        blur: 6,
        alpha: 96,
      },
    },
    overrides: {
      heroAlign: "left",
      panelChrome: "soft",
      badgeShape: "chip",
      ctaStyle: "soft",
    },
  },
  {
    id: "liquid-glass-inspired",
    label: "Liquid Glass Inspired",
    shortLabel: "Glass",
    description:
      "Floating capsules, frosted white edges, sky-blue bloom, and soft depth reserved for the glass surfaces.",
    mood: ["frosted capsule", "sky bloom", "soft suspension"],
    preview: {
      eyebrow: "Surface as atmosphere",
      headline: "Shape translucent panels that feel poured, polished, and gently suspended.",
      subhead:
        "Blend soft gradients, glass blur, and cinematic depth to make interaction feel light but tactile.",
      primaryCta: "Pour the glass version",
      secondaryCta: "Tune the translucency",
    },
    tokens: {
      colors: {
        background: "#d4ebff",
        surface: "#f7fbff",
        surfaceAlt: "#dceeff",
        text: "#10253e",
        textMuted: "#53708b",
        primary: "#73a7ff",
        secondary: "#97beff",
        accent: "#ffbce8",
        line: "rgba(255,255,255,0.72)",
      },
      typography: {
        display: "Optima, \"Segoe UI\", sans-serif",
        body: "\"Gill Sans\", \"Segoe UI\", sans-serif",
        mono: "\"Courier New\", Courier, monospace",
        displayWeight: 700,
        bodyWeight: 500,
        tracking: "-0.05em",
      },
      spacing: {
        base: 18,
        section: 100,
        container: 1240,
      },
      shape: {
        radius: 28,
        radiusLarge: 48,
        panelTilt: -0.4,
        spotlightSize: "68rem",
      },
      borders: {
        width: 1,
        style: "solid",
      },
      shadows: {
        color: "rgba(42,91,167,0.18)",
        x: 0,
        y: 24,
        blur: 54,
        spread: -18,
        softness: 24,
      },
      backgrounds: {
        canvas:
          "linear-gradient(180deg, #d4ebff 0%, #e8f5ff 52%, #d9ebff 100%)",
        spotlight:
          "radial-gradient(circle at 18% 18%, rgba(255,255,255,0.58), transparent 30%), radial-gradient(circle at 80% 20%, rgba(255,188,232,0.2), transparent 26%)",
        mesh:
          "radial-gradient(circle at center, rgba(255,255,255,0.55) 1px, transparent 1px)",
        textureOpacity: 0.08,
      },
      motion: {
        duration: 360,
        easing: "cubic-bezier(0.19, 1, 0.22, 1)",
        hoverScale: 1.02,
        floatDistance: 8,
      },
      surface: {
        blur: 20,
        alpha: 64,
      },
    },
    overrides: {
      heroAlign: "center",
      panelChrome: "glass",
      badgeShape: "pill",
      ctaStyle: "pill",
    },
  },
  {
    id: "material-expressive-inspired",
    label: "Material Expressive Inspired",
    shortLabel: "Material",
    description:
      "Friendly hierarchy, rounded motion, saturated accent tones, and compositional clarity with playful warmth.",
    mood: ["soft geometry", "friendly color", "expressive structure"],
    preview: {
      eyebrow: "Systemic but warm",
      headline: "Build a design system that feels precise, tactile, and instantly approachable.",
      subhead:
        "Balance crisp navigation, color-led emphasis, and adaptable cards so experimentation still feels structured.",
      primaryCta: "Test the system version",
      secondaryCta: "Compare tonal layers",
    },
    tokens: {
      colors: {
        background: "#f5f7ff",
        surface: "#ffffff",
        surfaceAlt: "#dfe4ff",
        text: "#1e1f2c",
        textMuted: "#5c6179",
        primary: "#3867ff",
        secondary: "#00a6a6",
        accent: "#ff7b54",
        line: "#cad0f5",
      },
      typography: {
        display: "Verdana, Geneva, sans-serif",
        body: "\"Segoe UI\", Tahoma, Geneva, Verdana, sans-serif",
        mono: "\"Courier New\", Courier, monospace",
        displayWeight: 700,
        bodyWeight: 500,
        tracking: "-0.05em",
      },
      spacing: {
        base: 18,
        section: 96,
        container: 1220,
      },
      shape: {
        radius: 26,
        radiusLarge: 42,
        panelTilt: 0,
        spotlightSize: "58rem",
      },
      borders: {
        width: 1,
        style: "solid",
      },
      shadows: {
        color: "rgba(56,103,255,0.16)",
        x: 0,
        y: 16,
        blur: 44,
        spread: -16,
        softness: 20,
      },
      backgrounds: {
        canvas:
          "radial-gradient(circle at 12% 18%, rgba(255,123,84,0.16), transparent 24%), radial-gradient(circle at 82% 14%, rgba(56,103,255,0.14), transparent 22%), linear-gradient(180deg, #f5f7ff 0%, #ffffff 60%, #eef2ff 100%)",
        spotlight:
          "radial-gradient(circle at 20% 18%, rgba(56,103,255,0.12), transparent 30%), radial-gradient(circle at 82% 48%, rgba(0,166,166,0.12), transparent 28%)",
        mesh:
          "linear-gradient(135deg, rgba(56,103,255,0.08), transparent 36%), radial-gradient(circle at center, rgba(56,103,255,0.1) 1px, transparent 1px)",
        textureOpacity: 0.14,
      },
      motion: {
        duration: 300,
        easing: "cubic-bezier(0.2, 0.9, 0.2, 1)",
        hoverScale: 1.02,
        floatDistance: 6,
      },
      surface: {
        blur: 12,
        alpha: 90,
      },
    },
    overrides: {
      heroAlign: "left",
      panelChrome: "soft",
      badgeShape: "pill",
      ctaStyle: "soft",
    },
  },
];

export function getStylePack(stylePackId: StylePackId): StylePack {
  return STYLE_PACKS.find((pack) => pack.id === stylePackId) ?? STYLE_PACKS[0];
}
