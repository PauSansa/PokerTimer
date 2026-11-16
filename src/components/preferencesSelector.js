import { useState } from "react";
import { preferences } from "@/lib/preference";
import { rounds } from "@/lib/round";
import { ChevronIcon } from "@/lib/icons";

const first = rounds[0];
const last = rounds[rounds.length - 1];

export default function PreferencesSelector({ setRoundDuration }) {
  const [custom, setCustom] = useState("");
  const customMinutes = parseInt(custom, 10);
  const customIsValid = customMinutes >= 1 && customMinutes <= 180;

  function handleSubmit(e) {
    e.preventDefault();
    if (customIsValid) setRoundDuration(customMinutes);
  }

  return (
    <div className="flex flex-1 flex-col pt-5 pb-8 sm:pt-8">
      <header className="flex h-11 items-center">
        <p className="text-[15px] font-medium">Sansa&apos;s Poker Timer</p>
      </header>

      <div className="animate-enter flex flex-1 flex-col justify-center gap-10 py-8 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
        <section>
          <h1 className="text-[2.5rem] leading-[1.05] font-normal tracking-[-0.035em] sm:text-6xl lg:text-7xl lg:tracking-[-0.04em]">
            Blind timer for your home poker game
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
            Choose how long each level lasts. When the clock hits zero the
            blinds go up: {rounds.length} levels, from {first.sb}/{first.bb} to{" "}
            {last.sb}/{last.bb}.
          </p>
        </section>

        <section aria-labelledby="length-title">
          <h2 id="length-title" className="mb-3 text-[15px] font-medium text-muted">
            Minutes per level
          </h2>
          <ul className="flex flex-col gap-2">
            {preferences.map((preference) => (
              <li key={preference.time}>
                <button
                  onClick={() => setRoundDuration(preference.time)}
                  className="card-link flex min-h-16 w-full items-center gap-4 px-5 text-left"
                >
                  <span className="flex flex-1 items-baseline gap-1.5">
                    <span className="text-3xl tracking-[-0.03em] tabular-nums">
                      {preference.time}
                    </span>
                    <span className="text-[15px]">min</span>
                  </span>
                  <span className="text-sm whitespace-nowrap text-muted sm:text-[15px]">
                    About {preference.estimatedDuration} game
                  </span>
                  <ChevronIcon width={20} height={20} className="text-signal" />
                </button>
              </li>
            ))}
          </ul>

          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end"
          >
            <label className="flex flex-1 flex-col gap-2">
              <span className="text-[15px] font-medium text-muted">
                Custom length
              </span>
              <span className="flex h-12 items-center rounded-full border border-line-strong bg-card/70 pr-5 focus-within:border-signal">
                <input
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={180}
                  step={1}
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  placeholder="25"
                  className="h-full w-full min-w-0 rounded-full bg-transparent pl-5 text-lg tabular-nums placeholder:text-muted/60 focus:outline-none"
                />
                <span className="text-muted">min</span>
              </span>
            </label>
            <button
              type="submit"
              disabled={!customIsValid}
              className="btn btn-primary w-full sm:w-auto"
            >
              Start game
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
