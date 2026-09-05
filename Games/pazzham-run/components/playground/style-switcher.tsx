import { StylePack, StylePackId } from "@/lib/types";

export function StyleSwitcher({
  packs,
  activeStyle,
  onSelect,
  onCycle,
  onRandomize,
}: {
  packs: StylePack[];
  activeStyle: StylePackId;
  onSelect: (stylePack: StylePackId) => void;
  onCycle: (direction: 1 | -1) => void;
  onRandomize: () => void;
}) {
  return (
    <section className="panel panel-soft px-5 py-6 sm:px-6 sm:py-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Style rotator</p>
          <h2 className="display mt-2 text-3xl">Switch the whole visual language.</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[color:var(--text-muted)]">
            Each tile swaps tokens for typography, background atmosphere, surfaces,
            shadow logic, and motion personality. The canvas updates instantly.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="ghost-button" onClick={() => onCycle(-1)} type="button">
            Previous
          </button>
          <button className="ghost-button" onClick={() => onCycle(1)} type="button">
            Next
          </button>
          <button className="action-button" onClick={onRandomize} type="button">
            Shuffle
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {packs.map((pack) => {
          const isActive = pack.id === activeStyle;

          return (
            <button
              className={`style-tile ${isActive ? "style-tile-active" : ""}`}
              data-testid={`style-button-${pack.id}`}
              key={pack.id}
              onClick={() => onSelect(pack.id)}
              type="button"
            >
              <span
                aria-hidden
                className="style-swatch"
                style={{ background: pack.tokens.backgrounds.canvas }}
              />
              <span className="flex items-center justify-between gap-3">
                <span>
                  <span className="display block text-xl">{pack.label}</span>
                  <span className="mt-1 block text-sm text-[color:var(--text-muted)]">
                    {pack.description}
                  </span>
                </span>
                <span className="surface-chip">{pack.shortLabel}</span>
              </span>
              <span className="mt-4 flex flex-wrap gap-2">
                {pack.mood.map((item) => (
                  <span className="surface-chip" key={item}>
                    {item}
                  </span>
                ))}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
