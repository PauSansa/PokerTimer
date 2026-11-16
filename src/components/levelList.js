import { useEffect, useRef } from "react";

export default function LevelList({ rounds, currentIndex, onSelect }) {
  const listRef = useRef(null);

  // Keep the current level in view inside the list, without scrolling the page
  useEffect(() => {
    const list = listRef.current;
    const item = list?.children[currentIndex];
    if (!list || !item) return;
    list.scrollTo({
      top: item.offsetTop - list.clientHeight / 2 + item.clientHeight / 2,
      behavior: "smooth",
    });
  }, [currentIndex]);

  return (
    <section aria-labelledby="levels-title" className="flex min-h-0 flex-col lg:relative">
      <h2 id="levels-title" className="mb-3 text-[15px] font-medium text-muted">
        Blind levels
      </h2>
      <ol
        ref={listRef}
        className="scrollbar-thin relative flex max-h-[26rem] flex-col overflow-y-auto rounded-[var(--radius-lg)] border border-line bg-card/70 p-1.5 lg:absolute lg:inset-x-0 lg:top-8 lg:bottom-0 lg:max-h-none"
      >
        {rounds.map((round, index) => {
          const isCurrent = index === currentIndex;
          const isPast = index < currentIndex;
          return (
            <li key={round.lvl}>
              <button
                onClick={() => onSelect(index)}
                aria-current={isCurrent ? "step" : undefined}
                aria-label={`Level ${round.lvl}: blinds ${round.sb} and ${round.bb}`}
                className={`flex min-h-11 w-full items-center gap-4 rounded-[var(--radius-sm)] px-3.5 text-left transition-colors duration-150 ${
                  isCurrent
                    ? "bg-action text-action-ink"
                    : isPast
                      ? "text-muted hover:bg-surface"
                      : "hover:bg-surface"
                }`}
              >
                <span
                  className={`w-6 text-sm tabular-nums ${
                    isCurrent ? "opacity-75" : "text-muted"
                  }`}
                >
                  {round.lvl}
                </span>
                <span className="flex-1 text-[17px] tabular-nums">
                  {round.sb} / {round.bb}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
