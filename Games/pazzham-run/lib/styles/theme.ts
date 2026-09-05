import { CSSProperties } from "react";

import { EffectState, StylePack } from "@/lib/types";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function mix(min: number, max: number, value: number) {
  return min + (max - min) * (value / 100);
}

export function buildThemeVariables(
  stylePack: StylePack,
  effectState: EffectState,
  prefersReducedMotion: boolean,
): CSSProperties {
  const densityScale = mix(0.84, 1.16, effectState.density);
  const radiusScale = mix(0.68, 1.26, effectState.radius);
  const depthScale = mix(0.48, 1.32, effectState.depth);
  const borderScale = mix(0.72, 1.65, effectState.border);
  const glassScale = mix(0.2, 1.05, effectState.glass);
  const motionScale = prefersReducedMotion
    ? mix(0.08, 0.2, effectState.motion)
    : mix(0.55, 1.1, effectState.motion);

  const baseRadius = stylePack.tokens.shape.radius;
  const largeRadius = stylePack.tokens.shape.radiusLarge;
  const borderWidth = clamp(
    Math.round(stylePack.tokens.borders.width * borderScale * 10) / 10,
    1,
    6,
  );
  const softShadowBlur = Math.round(stylePack.tokens.shadows.blur * depthScale);
  const softShadowY = Math.round(stylePack.tokens.shadows.y * depthScale);
  const strongShadowX = Math.round(stylePack.tokens.shadows.x * depthScale);
  const strongShadowY = Math.round(stylePack.tokens.shadows.y * depthScale);
  const motionDuration = Math.round(
    stylePack.tokens.motion.duration * (prefersReducedMotion ? 0.5 : motionScale),
  );
  const glassBlur = clamp(
    Math.round(stylePack.tokens.surface.blur * glassScale),
    0,
    18,
  );
  const surfaceMix = `${clamp(
    Math.round(stylePack.tokens.surface.alpha + effectState.glass * 0.08),
    58,
    97,
  )}%`;
  const gridSize = `${Math.round(stylePack.tokens.spacing.base * densityScale * 3)}px`;
  const cardGap = `${Math.round(stylePack.tokens.spacing.base * densityScale)}px`;
  const sectionGap = `${Math.round(stylePack.tokens.spacing.section * densityScale)}px`;
  const contentWidth = `${Math.round(stylePack.tokens.spacing.container)}px`;
  const panelTilt = `${stylePack.tokens.shape.panelTilt * mix(0.4, 1.5, effectState.motion)}deg`;

  return {
    "--bg": stylePack.tokens.colors.background,
    "--surface": stylePack.tokens.colors.surface,
    "--surface-alt": stylePack.tokens.colors.surfaceAlt,
    "--text": stylePack.tokens.colors.text,
    "--text-muted": stylePack.tokens.colors.textMuted,
    "--primary": stylePack.tokens.colors.primary,
    "--secondary": stylePack.tokens.colors.secondary,
    "--accent": stylePack.tokens.colors.accent,
    "--line": stylePack.tokens.colors.line,
    "--canvas": stylePack.tokens.backgrounds.canvas,
    "--spotlight": stylePack.tokens.backgrounds.spotlight,
    "--mesh": stylePack.tokens.backgrounds.mesh,
    "--mesh-opacity": stylePack.tokens.backgrounds.textureOpacity.toString(),
    "--font-display": stylePack.tokens.typography.display,
    "--font-body": stylePack.tokens.typography.body,
    "--font-mono": stylePack.tokens.typography.mono,
    "--display-weight": stylePack.tokens.typography.displayWeight.toString(),
    "--body-weight": stylePack.tokens.typography.bodyWeight.toString(),
    "--tracking-display": stylePack.tokens.typography.tracking,
    "--space-unit": `${Math.round(stylePack.tokens.spacing.base * densityScale)}px`,
    "--section-space": sectionGap,
    "--content-width": contentWidth,
    "--radius-sm": `${Math.round(baseRadius * radiusScale * 0.55)}px`,
    "--radius-md": `${Math.round(baseRadius * radiusScale)}px`,
    "--radius-lg": `${Math.round(largeRadius * radiusScale)}px`,
    "--border-width": `${borderWidth}px`,
    "--border-style": stylePack.tokens.borders.style,
    "--shadow-soft": `0 ${softShadowY}px ${softShadowBlur}px ${stylePack.tokens.shadows.spread}px ${stylePack.tokens.shadows.color}`,
    "--shadow-strong": `${strongShadowX}px ${strongShadowY}px ${softShadowBlur}px ${stylePack.tokens.shadows.spread}px ${stylePack.tokens.shadows.color}`,
    "--surface-alpha": surfaceMix,
    "--glass-blur": `${glassBlur}px`,
    "--motion-duration": `${Math.max(150, motionDuration)}ms`,
    "--motion-easing": stylePack.tokens.motion.easing,
    "--hover-scale": stylePack.tokens.motion.hoverScale.toString(),
    "--motion-scale": motionScale.toString(),
    "--float-distance": `${Math.round(
      stylePack.tokens.motion.floatDistance * motionScale,
    )}px`,
    "--panel-tilt": panelTilt,
    "--grid-size": gridSize,
    "--card-gap": cardGap,
    "--spotlight-size": stylePack.tokens.shape.spotlightSize,
    "--glass-strength": glassScale.toString(),
  } as CSSProperties;
}
