import { EffectState, PREVIEW_TABS, PreviewTab, StylePack } from "@/lib/types";

const TAB_META: Record<
  PreviewTab,
  {
    label: string;
    caption: string;
    cards: { title: string; copy: string }[];
  }
> = {
  landing: {
    label: "Landing",
    caption: "Hero framing, hook, and first-scroll rhythm.",
    cards: [
      {
        title: "Opening move",
        copy: "Lead with a sharp type statement and one memorable visual device.",
      },
      {
        title: "Supporting block",
        copy: "Keep secondary content in a calmer frame so the headline can dominate.",
      },
      {
        title: "CTA treatment",
        copy: "Action surfaces should inherit the style pack without losing hierarchy.",
      },
    ],
  },
  commerce: {
    label: "Commerce",
    caption: "Offer cards, pricing, and call-to-action density.",
    cards: [
      {
        title: "Offer framing",
        copy: "Make the price block feel native to the style, not pasted on top.",
      },
      {
        title: "Comparison row",
        copy: "Use contrast and spacing shifts to separate tiers quickly.",
      },
      {
        title: "Action pacing",
        copy: "Buttons should feel stronger than the surrounding decorative layer.",
      },
    ],
  },
  forms: {
    label: "Forms",
    caption: "Inputs, drawers, and practical UI under the active art direction.",
    cards: [
      {
        title: "Input shell",
        copy: "Even expressive modes need readable fields and stable focus states.",
      },
      {
        title: "Side drawer",
        copy: "Treat utility panels like part of the composition, not boring chrome.",
      },
      {
        title: "Feedback tone",
        copy: "Confirmation states should match the pack mood while staying calm.",
      },
    ],
  },
  showcase: {
    label: "Showcase",
    caption: "Modal moments, gallery cells, and editorial storytelling.",
    cards: [
      {
        title: "Modal reveal",
        copy: "The hero treatment should collapse elegantly into smaller surfaces.",
      },
      {
        title: "Gallery crop",
        copy: "Use framing and labels so images still feel designed without assets.",
      },
      {
        title: "Caption system",
        copy: "Keep the supporting copy restrained so the art direction can breathe.",
      },
    ],
  },
};

const STYLE_SCENES: Record<
  StylePack["id"],
  {
    lead: string;
    lines: string[];
    emphasisIndex: number;
    caption: string;
    accents: string[];
    note: string;
  }
> = {
  "neo-brutalism": {
    lead: "Sticker logic / hard shadow / bright board",
    lines: ["How can I", "design in the", "Neobrutalism", "style?"],
    emphasisIndex: 2,
    caption:
      "Yellow framing, crisp outlines, lilac capsule type, and playful starbursts pulled from your reference.",
    accents: ["yellow field", "black outline", "lilac pill"],
    note: "Treat every block like a sticker on a poster board.",
  },
  "acid-graphics": {
    lead: "Layered poster type / collision color / vertical energy",
    lines: ["ACID", "TYPO", "PLAY"],
    emphasisIndex: 1,
    caption:
      "Large stacked type, offset shadows, and hot orange-magenta contrast inspired by contemporary expressive posters.",
    accents: ["stacked letterforms", "offset shadows", "vivid contrast"],
    note: "Think rave flyer meets gallery poster, not glassy app chrome.",
  },
  maximalism: {
    lead: "Festival warmth / ornate frame / collected texture",
    lines: ["Festival", "Poster", "Ritual"],
    emphasisIndex: 1,
    caption:
      "An arched frame, ornamental rhythm, and warm theatrical contrast pull this closer to decorative poster design.",
    accents: ["arched frame", "warm ornament", "deep navy"],
    note: "Use decoration as structure, not as a random extra layer.",
  },
  minimalism: {
    lead: "Quiet grid / editorial margin / careful cadence",
    lines: ["Quiet", "Spacing", "System"],
    emphasisIndex: 1,
    caption:
      "Less visual noise, more proportion, serif restraint, and clean rhythm so the page breathes.",
    accents: ["editorial spacing", "hairline grid", "soft ivory"],
    note: "Minimal should feel expensive and precise, never empty.",
  },
  "liquid-glass-inspired": {
    lead: "Soft sky / floating capsule / frosted edge",
    lines: ["Liquid", "Glass", "Surface"],
    emphasisIndex: 1,
    caption:
      "The hero uses translucent capsules, gentle bloom, and float without blurring the entire page.",
    accents: ["frosted capsule", "sky wash", "soft bloom"],
    note: "Reserve blur for the glass elements so motion stays smooth.",
  },
  "material-expressive-inspired": {
    lead: "Friendly blocks / rounded rhythm / bright clarity",
    lines: ["Expressive", "Material", "System"],
    emphasisIndex: 1,
    caption:
      "Rounded cards, playful chips, and structured color hierarchy keep the system warm without losing order.",
    accents: ["rounded modules", "clear chips", "soft contrast"],
    note: "The composition should feel systematic and approachable at once.",
  },
};

function previewBadgeClass(shape?: "burst" | "pill" | "chip") {
  return `status-badge badge-${shape ?? "chip"}`;
}

export function LivePreview({
  pack,
  effectState,
  previewTab,
  onTabChange,
  prefersReducedMotion,
}: {
  pack: StylePack;
  effectState: EffectState;
  previewTab: PreviewTab;
  onTabChange: (previewTab: PreviewTab) => void;
  prefersReducedMotion: boolean;
}) {
  const scene = STYLE_SCENES[pack.id];
  const activeTab = TAB_META[previewTab];

  return (
    <section className="panel panel-outline overflow-hidden preview-lab" data-testid="preview-shell">
      <div className="flex flex-col gap-5 border-b border-[color:var(--line)]/18 px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Live preview canvas</p>
            <h2 className="display mt-2 text-3xl">{pack.preview.headline}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[color:var(--text-muted)]">
              {pack.preview.subhead}
            </p>
          </div>
          <span className={previewBadgeClass(pack.overrides?.badgeShape)}>
            {prefersReducedMotion ? "Low-motion rendering" : "Poster-first composition"}
          </span>
        </div>

        <div className="flex flex-wrap gap-3">
          {PREVIEW_TABS.map((tab) => {
            const isActive = tab === previewTab;

            return (
              <button
                className={`tab-button ${isActive ? "tab-button-active" : ""}`}
                key={tab}
                onClick={() => onTabChange(tab)}
                type="button"
              >
                <span className="display text-base">{TAB_META[tab].label}</span>
                <span className="mt-1 block text-xs text-[color:var(--text-muted)]">
                  {TAB_META[tab].caption}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="preview-lab-grid px-5 py-5 sm:px-6">
        <div className="stage-shell">
          <div className="stage-toolbar">
            <div className="flex items-center gap-3">
              <div className="brand-mark brand-mark-small">
                <span>{pack.shortLabel.slice(0, 2)}</span>
              </div>
              <div>
                <p className="display text-lg">{pack.label}</p>
                <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--text-muted)]">
                  {scene.lead}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {scene.accents.map((item) => (
                <span className="surface-chip" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="poster-board">
            <div className="poster-grid">
              <div className="poster-copy">
                <p className="eyebrow">Stage study</p>
                <div className="poster-type-stack">
                  {scene.lines.map((line, index) => (
                    <span
                      className={`poster-line ${
                        index === scene.emphasisIndex ? "poster-emphasis" : ""
                      }`}
                      key={line}
                    >
                      {line}
                    </span>
                  ))}
                </div>
                <p className="poster-caption">{scene.caption}</p>
                <div className="poster-badges">
                  {pack.mood.map((item) => (
                    <span className="poster-chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="poster-ornament">
                <div className="poster-avatar">{pack.shortLabel}</div>
                <div className="ornament-card">
                  <p className="eyebrow">Reference note</p>
                  <p className="mt-3 text-sm leading-6">{scene.note}</p>
                </div>
                <div className="ornament-card ornament-card-alt">
                  <p className="eyebrow">{activeTab.label}</p>
                  <p className="mt-3 text-sm leading-6">{activeTab.caption}</p>
                </div>
                <span className="burst-mark burst-one" />
                <span className="burst-mark burst-two" />
              </div>
            </div>
          </div>

          <div className="specimen-strip">
            {activeTab.cards.map((card) => (
              <div className="specimen-card" key={card.title}>
                <p className="eyebrow">{activeTab.label}</p>
                <p className="display mt-3 text-xl">{card.title}</p>
                <p className="mt-3 text-sm leading-6 text-[color:var(--text-muted)]">
                  {card.copy}
                </p>
              </div>
            ))}
          </div>
        </div>

        <aside className="stage-rail">
          <div className="rail-card">
            <p className="eyebrow">Effect diagnostics</p>
            <div className="mt-4 space-y-3">
              {Object.entries(effectState).map(([key, value]) => (
                <div className="effect-meter" key={key}>
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="capitalize">{key}</span>
                    <span>{value}%</span>
                  </div>
                  <span className="effect-bar-track">
                    <span className="effect-bar-fill" style={{ width: `${value}%` }} />
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rail-card">
            <p className="eyebrow">Composition note</p>
            <p className="mt-4 text-sm leading-6 text-[color:var(--text-muted)]">
              {scene.note}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {scene.accents.map((item) => (
                <span className="surface-chip" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rail-card">
            <p className="eyebrow">Performance</p>
            <p className="mt-4 text-sm leading-6 text-[color:var(--text-muted)]">
              Heavy blur now stays in the glass mode, the URL sync is debounced, and lower
              sections use content-visibility to reduce repaint work.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
