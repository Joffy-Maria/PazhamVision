import { describe, expect, it } from "vitest";

import { getStylePack } from "@/lib/styles/style-packs";
import { buildThemeVariables } from "@/lib/styles/theme";

describe("theme variable generation", () => {
  it("creates root CSS variables from a style pack", () => {
    const stylePack = getStylePack("acid-graphics");
    const vars = buildThemeVariables(
      stylePack,
      {
        motion: 80,
        depth: 70,
        border: 60,
        radius: 50,
        density: 40,
        glass: 90,
      },
      false,
    ) as Record<string, string>;

    expect(vars["--primary"]).toBe(stylePack.tokens.colors.primary);
    expect(vars["--font-display"]).toContain("Trebuchet");
    expect(Number.parseFloat(vars["--motion-scale"])).toBeGreaterThan(0.9);
    expect(vars["--glass-blur"]).toMatch(/px$/);
  });

  it("softens motion when reduced motion is preferred", () => {
    const stylePack = getStylePack("material-expressive-inspired");
    const fullMotion = buildThemeVariables(
      stylePack,
      {
        motion: 100,
        depth: 70,
        border: 60,
        radius: 50,
        density: 40,
        glass: 90,
      },
      false,
    ) as Record<string, string>;
    const reducedMotion = buildThemeVariables(
      stylePack,
      {
        motion: 100,
        depth: 70,
        border: 60,
        radius: 50,
        density: 40,
        glass: 90,
      },
      true,
    ) as Record<string, string>;

    expect(Number.parseFloat(reducedMotion["--motion-scale"])).toBeLessThan(
      Number.parseFloat(fullMotion["--motion-scale"]),
    );
  });
});
