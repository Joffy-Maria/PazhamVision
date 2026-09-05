import { EffectState, PreviewTab, StylePack } from "@/lib/types";

const GALLERY_JUMPS: { label: string; tab: PreviewTab }[] = [
  { label: "Hero stage", tab: "landing" },
  { label: "Offer row", tab: "commerce" },
  { label: "Input flow", tab: "forms" },
  { label: "Showcase panel", tab: "showcase" },
];

export function ComponentGallery({
  pack,
  effectState,
  onSelectTab,
}: {
  pack: StylePack;
  effectState: EffectState;
  onSelectTab: (previewTab: PreviewTab) => void;
}) {
  return (
    <section className="gallery-wrap mt-20 space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow">Component gallery</p>
          <h2 className="display mt-2 text-4xl">Three specimen zones, fewer generic blocks.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[color:var(--text-muted)]">
            Instead of a long grid of interchangeable cards, this gallery focuses on a
            tighter set of specimens that show how the active style handles navigation,
            content framing, and practical UI.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {GALLERY_JUMPS.map((item) => (
            <button
              className="ghost-button"
              key={item.tab}
              onClick={() => onSelectTab(item.tab)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
        <div className="panel panel-soft specimen-sheet p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow">Specimen sheet</p>
              <p className="display mt-2 text-2xl">The active pack in small components.</p>
            </div>
            <span className="surface-chip">{pack.shortLabel}</span>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="specimen-column">
              <div className="specimen-mini-card">
                <p className="eyebrow">Navigation</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Work", "Process", "Library"].map((item) => (
                    <span className="surface-chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="specimen-mini-card">
                <p className="eyebrow">Primary card</p>
                <p className="display mt-3 text-2xl">Distinctive but still shippable.</p>
                <p className="mt-3 text-sm leading-6 text-[color:var(--text-muted)]">
                  Design language changes, but hierarchy and legibility stay intact.
                </p>
              </div>
            </div>

            <div className="specimen-column">
              <div className="specimen-mini-card">
                <p className="eyebrow">Offer row</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    ["Launch", "$24"],
                    ["Studio", "$68"],
                  ].map(([title, price]) => (
                    <div className="mini-stat" key={title}>
                      <p className="display text-xl">{title}</p>
                      <p className="mt-3 text-3xl font-semibold">{price}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="specimen-mini-card">
                <p className="eyebrow">Action row</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button className="action-button" type="button">
                    Use this direction
                  </button>
                  <button className="ghost-button" type="button">
                    Compare styles
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="panel panel-soft p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="eyebrow">Form flow</p>
                <p className="display mt-2 text-2xl">Utility surfaces with style.</p>
              </div>
              <span className="surface-chip">Glass {effectState.glass}</span>
            </div>

            <div className="mt-5 grid gap-4">
              <label className="field-group">
                <span>Project title</span>
                <input defaultValue="Poster-first launch page" type="text" />
              </label>
              <label className="field-group">
                <span>Summary</span>
                <textarea
                  defaultValue="Push the visual direction harder while keeping the interface fast."
                  rows={4}
                />
              </label>
              <button className="action-button" type="button">
                Save current mix
              </button>
            </div>
          </div>

          <div className="panel panel-soft p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="eyebrow">Style notes</p>
                <p className="display mt-2 text-2xl">Current pack readout.</p>
              </div>
              <span className="surface-chip">Motion {effectState.motion}</span>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {pack.mood.map((item) => (
                <span className="surface-chip" key={item}>
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm leading-6 text-[color:var(--text-muted)]">
              Density is {effectState.density}, border weight is {effectState.border}, and
              radius is {effectState.radius}. The intent is to let these knobs tune the
              pack rather than replace its core character.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
