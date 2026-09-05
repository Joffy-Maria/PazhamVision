import {
  EFFECT_KEYS,
  PlaygroundState,
  PREVIEW_TABS,
  PreviewTab,
  STYLE_PACK_IDS,
  StylePackId,
} from "@/lib/types";
import {
  DEFAULT_EFFECT_STATE,
  DEFAULT_STYLE_PACK_ID,
} from "@/lib/styles/style-packs";

type SearchParamsInput =
  | URLSearchParams
  | Record<string, string | string[] | undefined>;

const DEFAULT_TAB: PreviewTab = "landing";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function getValue(input: SearchParamsInput, key: string) {
  if (input instanceof URLSearchParams) {
    return input.get(key) ?? undefined;
  }

  const raw = input[key];
  return Array.isArray(raw) ? raw[0] : raw;
}

function isStylePackId(value: string | undefined): value is StylePackId {
  return Boolean(value && STYLE_PACK_IDS.includes(value as StylePackId));
}

function isPreviewTab(value: string | undefined): value is PreviewTab {
  return Boolean(value && PREVIEW_TABS.includes(value as PreviewTab));
}

export function parsePlaygroundState(input: SearchParamsInput): PlaygroundState {
  const stylePack = isStylePackId(getValue(input, "style"))
    ? (getValue(input, "style") as StylePackId)
    : DEFAULT_STYLE_PACK_ID;

  const previewTab = isPreviewTab(getValue(input, "tab"))
    ? (getValue(input, "tab") as PreviewTab)
    : DEFAULT_TAB;

  const effectState = EFFECT_KEYS.reduce((accumulator, key) => {
    const rawValue = Number(getValue(input, key));
    accumulator[key] = Number.isFinite(rawValue)
      ? clamp(Math.round(rawValue), 0, 100)
      : DEFAULT_EFFECT_STATE[key];
    return accumulator;
  }, { ...DEFAULT_EFFECT_STATE });

  return {
    stylePack,
    effectState,
    previewTab,
  };
}

export function serializePlaygroundState(state: PlaygroundState) {
  const params = new URLSearchParams();

  params.set("style", state.stylePack);
  params.set("tab", state.previewTab);

  for (const key of EFFECT_KEYS) {
    params.set(key, String(Math.round(state.effectState[key])));
  }

  return `?${params.toString()}`;
}

export function toShareUrl(state: PlaygroundState, origin: string, pathname = "/") {
  return `${origin}${pathname}${serializePlaygroundState(state)}`;
}
