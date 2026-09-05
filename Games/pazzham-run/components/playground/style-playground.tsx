"use client";

import { useDeferredValue, useEffect, useState } from "react";

import { ComponentGallery } from "@/components/playground/component-gallery";
import { EffectControls } from "@/components/playground/effect-controls";
import { LivePreview } from "@/components/playground/live-preview";
import { ShareLinkButton } from "@/components/playground/share-link-button";
import { StyleSwitcher } from "@/components/playground/style-switcher";
import { usePrefersReducedMotion } from "@/lib/hooks/use-prefers-reduced-motion";
import {
  DEFAULT_EFFECT_STATE,
  STYLE_PACKS,
  getStylePack,
} from "@/lib/styles/style-packs";
import { buildThemeVariables } from "@/lib/styles/theme";
import {
  parsePlaygroundState,
  serializePlaygroundState,
} from "@/lib/url/playground-query";
import {
  EFFECT_KEYS,
  EffectKey,
  PREVIEW_TABS,
  PlaygroundState,
  PreviewTab,
  StylePackId,
} from "@/lib/types";

const LAB_NOTES = [
  "Acid mode now leans into stacked poster typography instead of generic neon gradients.",
  "Liquid glass keeps the capsule glow, but only glass surfaces pay the blur cost.",
  "Minimal and maximal modes now shift framing and composition, not just the palette.",
];

function rotateStylePack(current: StylePackId, direction: 1 | -1) {
  const currentIndex = STYLE_PACKS.findIndex((pack) => pack.id === current);
  const nextIndex = (currentIndex + direction + STYLE_PACKS.length) % STYLE_PACKS.length;
  return STYLE_PACKS[nextIndex].id;
}

function buildRandomState(current: PlaygroundState): PlaygroundState {
  const nextStyle =
    STYLE_PACKS[Math.floor(Math.random() * STYLE_PACKS.length)]?.id ?? current.stylePack;
  const nextTab =
    PREVIEW_TABS[Math.floor(Math.random() * PREVIEW_TABS.length)] ?? current.previewTab;

  return {
    stylePack: nextStyle,
    previewTab: nextTab,
    effectState: EFFECT_KEYS.reduce(
      (accumulator, key) => {
        accumulator[key] = Math.floor(Math.random() * 101);
        return accumulator;
      },
      { ...DEFAULT_EFFECT_STATE },
    ),
  };
}

export function StylePlayground({
  initialState,
}: {
  initialState: PlaygroundState;
}) {
  const [state, setState] = useState(initialState);
  const deferredEffectState = useDeferredValue(state.effectState);
  const prefersReducedMotion = usePrefersReducedMotion();

  const activePack = getStylePack(state.stylePack);
  const themeVariables = buildThemeVariables(
    activePack,
    deferredEffectState,
    prefersReducedMotion,
  );

  useEffect(() => {
    const handlePopState = () => {
      setState(parsePlaygroundState(new URLSearchParams(window.location.search)));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const nextUrl = `${window.location.pathname}${serializePlaygroundState(state)}`;
      const currentUrl = `${window.location.pathname}${window.location.search}`;

      if (nextUrl !== currentUrl) {
        window.history.replaceState(null, "", nextUrl);
      }
    }, 140);

    return () => window.clearTimeout(timeoutId);
  }, [state]);

  const handleStyleChange = (stylePack: StylePackId) => {
    setState((current) => ({ ...current, stylePack }));
  };

  const handleCycle = (direction: 1 | -1) => {
    setState((current) => ({
      ...current,
      stylePack: rotateStylePack(current.stylePack, direction),
    }));
  };

  const handleEffectChange = (key: EffectKey, value: number) => {
    setState((current) => ({
      ...current,
      effectState: {
        ...current.effectState,
        [key]: value,
      },
    }));
  };

  const handlePreviewTabChange = (previewTab: PreviewTab) => {
    setState((current) => ({ ...current, previewTab }));
  };

  const handleRandomize = () => {
    setState((current) => buildRandomState(current));
  };

  return (
    <div
      className="theme-root"
      data-style={activePack.id}
      data-testid="theme-root"
      style={themeVariables}
    >
      <div className="content-shell pb-24 pt-6 sm:pt-8">
        <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="brand-mark">
              <span>SP</span>
            </div>
            <div>
              <p className="eyebrow">Style Playground</p>
              <p className="muted max-w-xl text-sm">
                Switch between poster-like acid graphics, ornate maximalism, quiet
                editorial minimalism, and floating liquid glass without rebuilding the page.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="surface-chip">
              {prefersReducedMotion ? "Reduced motion active" : "Preview tuned for speed"}
            </span>
            <ShareLinkButton state={state} />
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          <div className="panel panel-outline hero-panel overflow-hidden px-6 py-7 sm:px-8 sm:py-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`status-badge badge-${activePack.overrides?.badgeShape ?? "chip"}`}>
                {activePack.preview.eyebrow}
              </span>
              <span className="surface-chip">{activePack.label}</span>
              <span className="surface-chip">Preview {state.previewTab}</span>
            </div>

            <div className="mt-7 grid gap-8 xl:grid-cols-[1.12fr_0.88fr]">
              <div>
                <p className="eyebrow">Reference-led direction</p>
                <h1 className="display text-5xl leading-[0.92] sm:text-6xl xl:text-[5.25rem]">
                  Build a style lab that feels composed, collectible, and alive.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-[color:var(--text-muted)] sm:text-lg">
                  The new direction is less “theme switcher demo” and more “editorial
                  poster studio”: stacked type for acid graphics, ornate framing for
                  maximalism, whisper-quiet spacing for minimalism, and real capsule-like
                  glass surfaces for liquid mode.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button className="action-button" onClick={handleRandomize} type="button">
                    Shuffle the composition
                  </button>
                  <button className="ghost-button" onClick={() => handleCycle(1)} type="button">
                    Rotate the style family
                  </button>
                </div>
              </div>

              <div className="hero-stack">
                <div className="poster-note ambient-float">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="eyebrow">Active mood</p>
                      <p className="display mt-2 text-2xl">{activePack.label}</p>
                    </div>
                    <div className="hero-orb" />
                  </div>
                  <p className="mt-4 text-sm leading-6 text-[color:var(--text-muted)]">
                    {activePack.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {activePack.mood.map((item) => (
                      <span className="surface-chip" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="reference-grid">
                  {LAB_NOTES.map((note) => (
                    <div className="reference-card" key={note}>
                      <p className="eyebrow">Design note</p>
                      <p className="mt-3 text-sm leading-6">{note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <EffectControls
            effectState={state.effectState}
            onChange={handleEffectChange}
            prefersReducedMotion={prefersReducedMotion}
          />
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">
          <StyleSwitcher
            activeStyle={state.stylePack}
            onCycle={handleCycle}
            onRandomize={handleRandomize}
            onSelect={handleStyleChange}
            packs={STYLE_PACKS}
          />

          <LivePreview
            effectState={deferredEffectState}
            onTabChange={handlePreviewTabChange}
            pack={activePack}
            prefersReducedMotion={prefersReducedMotion}
            previewTab={state.previewTab}
          />
        </section>

        <ComponentGallery
          effectState={deferredEffectState}
          onSelectTab={handlePreviewTabChange}
          pack={activePack}
        />
      </div>
    </div>
  );
}
