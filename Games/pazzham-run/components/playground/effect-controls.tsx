import { EffectKey, EffectState } from "@/lib/types";

const CONTROL_COPY: Record<
  EffectKey,
  { label: string; caption: string }
> = {
  motion: {
    label: "Motion",
    caption: "Animation tempo, hover lift, and transition energy.",
  },
  depth: {
    label: "Depth",
    caption: "Shadow presence and perceived dimensionality.",
  },
  border: {
    label: "Border weight",
    caption: "Outline strength and edge definition.",
  },
  radius: {
    label: "Corner roundness",
    caption: "How sharp or pill-like the components feel.",
  },
  density: {
    label: "Density",
    caption: "Tightness of spacing and grid rhythm.",
  },
  glass: {
    label: "Glass / blur",
    caption: "Translucency, diffusion, and polish on layered surfaces.",
  },
};

export function EffectControls({
  effectState,
  onChange,
  prefersReducedMotion,
}: {
  effectState: EffectState;
  onChange: (key: EffectKey, value: number) => void;
  prefersReducedMotion: boolean;
}) {
  return (
    <aside className="panel panel-soft px-5 py-6 sm:px-6 sm:py-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Effect controls</p>
          <h2 className="display mt-2 text-3xl">Tune the behavior layer.</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[color:var(--text-muted)]">
            These controls sit on top of the chosen style pack, so each aesthetic can
            become softer, denser, glassier, or more kinetic without hardcoded variants.
          </p>
        </div>
        <span className="surface-chip">
          {prefersReducedMotion ? "System is softening motion automatically" : "Full motion available"}
        </span>
      </div>

      <div className="mt-6 space-y-5">
        {(Object.keys(CONTROL_COPY) as EffectKey[]).map((key) => (
          <label className="slider-card" key={key}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="display text-lg">{CONTROL_COPY[key].label}</span>
                <p className="mt-1 text-sm leading-6 text-[color:var(--text-muted)]">
                  {CONTROL_COPY[key].caption}
                </p>
              </div>
              <output
                className="surface-chip text-sm"
                htmlFor={`slider-${key}`}
              >
                {effectState[key]}
              </output>
            </div>
            <input
              aria-label={CONTROL_COPY[key].label}
              className="slider"
              data-testid={`slider-${key}`}
              id={`slider-${key}`}
              max={100}
              min={0}
              onChange={(event) => onChange(key, Number(event.currentTarget.value))}
              type="range"
              value={effectState[key]}
            />
          </label>
        ))}
      </div>
    </aside>
  );
}
