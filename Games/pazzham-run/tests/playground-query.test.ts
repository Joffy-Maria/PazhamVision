import { describe, expect, it } from "vitest";

import { DEFAULT_EFFECT_STATE } from "@/lib/styles/style-packs";
import {
  parsePlaygroundState,
  serializePlaygroundState,
  toShareUrl,
} from "@/lib/url/playground-query";

describe("playground query state", () => {
  it("falls back to safe defaults for invalid params", () => {
    const state = parsePlaygroundState({
      style: "unknown-style",
      tab: "mystery",
      motion: "120",
      depth: "-20",
      border: "abc",
    });

    expect(state.stylePack).toBe("neo-brutalism");
    expect(state.previewTab).toBe("landing");
    expect(state.effectState.motion).toBe(100);
    expect(state.effectState.depth).toBe(0);
    expect(state.effectState.border).toBe(DEFAULT_EFFECT_STATE.border);
  });

  it("serializes the current state into a stable shareable query string", () => {
    const search = serializePlaygroundState({
      stylePack: "maximalism",
      previewTab: "forms",
      effectState: {
        motion: 12,
        depth: 32,
        border: 48,
        radius: 72,
        density: 54,
        glass: 66,
      },
    });

    expect(search).toContain("style=maximalism");
    expect(search).toContain("tab=forms");
    expect(search).toContain("glass=66");
  });

  it("builds a full share url", () => {
    const url = toShareUrl(
      {
        stylePack: "minimalism",
        previewTab: "showcase",
        effectState: {
          motion: 30,
          depth: 40,
          border: 50,
          radius: 60,
          density: 70,
          glass: 80,
        },
      },
      "https://example.com",
      "/playground",
    );

    expect(url).toBe(
      "https://example.com/playground?style=minimalism&tab=showcase&motion=30&depth=40&border=50&radius=60&density=70&glass=80",
    );
  });
});
