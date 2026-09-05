export const STYLE_PACK_IDS = [
  "neo-brutalism",
  "acid-graphics",
  "maximalism",
  "minimalism",
  "liquid-glass-inspired",
  "material-expressive-inspired",
] as const;

export type StylePackId = (typeof STYLE_PACK_IDS)[number];

export const PREVIEW_TABS = [
  "landing",
  "commerce",
  "forms",
  "showcase",
] as const;

export type PreviewTab = (typeof PREVIEW_TABS)[number];

export const EFFECT_KEYS = [
  "motion",
  "depth",
  "border",
  "radius",
  "density",
  "glass",
] as const;

export type EffectKey = (typeof EFFECT_KEYS)[number];

export type EffectState = Record<EffectKey, number>;

export interface StylePack {
  id: StylePackId;
  label: string;
  shortLabel: string;
  description: string;
  mood: string[];
  preview: {
    eyebrow: string;
    headline: string;
    subhead: string;
    primaryCta: string;
    secondaryCta: string;
  };
  tokens: {
    colors: {
      background: string;
      surface: string;
      surfaceAlt: string;
      text: string;
      textMuted: string;
      primary: string;
      secondary: string;
      accent: string;
      line: string;
    };
    typography: {
      display: string;
      body: string;
      mono: string;
      displayWeight: number;
      bodyWeight: number;
      tracking: string;
    };
    spacing: {
      base: number;
      section: number;
      container: number;
    };
    shape: {
      radius: number;
      radiusLarge: number;
      panelTilt: number;
      spotlightSize: string;
    };
    borders: {
      width: number;
      style: "solid" | "dashed" | "double";
    };
    shadows: {
      color: string;
      x: number;
      y: number;
      blur: number;
      spread: number;
      softness: number;
    };
    backgrounds: {
      canvas: string;
      spotlight: string;
      mesh: string;
      textureOpacity: number;
    };
    motion: {
      duration: number;
      easing: string;
      hoverScale: number;
      floatDistance: number;
    };
    surface: {
      blur: number;
      alpha: number;
    };
  };
  overrides?: {
    heroAlign?: "left" | "center";
    panelChrome?: "outlined" | "soft" | "glass";
    badgeShape?: "burst" | "pill" | "chip";
    ctaStyle?: "stacked" | "pill" | "soft";
  };
}

export interface PlaygroundState {
  stylePack: StylePackId;
  effectState: EffectState;
  previewTab: PreviewTab;
}
