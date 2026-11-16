"use client";
import { useEffect, useRef, useState } from "react";
import { rounds } from "@/lib/round";
import { useCountdown } from "@/lib/useCountdown";
import ChipAmounts from "@/components/chipAmounts";
import AnnounceSelector from "@/components/announceSelector";
import LevelList from "@/components/levelList";
import { PauseIcon, PlayIcon, RestartIcon, StackIcon } from "@/lib/icons";

function formatClock(ms) {
  const total = Math.ceil(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function Game({ roundDuration, onNewGame }) {
  const durationMs = roundDuration * 60 * 1000;
  const [levelIndex, setLevelIndex] = useState(0);
  const [announce, setAnnounce] = useState("tts");
  const [chipsOpen, setChipsOpen] = useState(false);
  const audioRef = useRef(null);

  const currentRound = rounds[levelIndex];
  const nextRound = rounds[levelIndex + 1];

  const timer = useCountdown(durationMs, () => {
    if (nextRound) changeLevel(levelIndex + 1, true);
    timer.reset(true);
  });

  function speakRound(round) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const utterance = new SpeechSynthesisUtterance(
      `Ronda ${round.lvl}, Peque ${round.sb}, Big ${round.bb}`
    );
    utterance.lang = "es-ES";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  function ringAlarm() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
    setTimeout(() => audio.pause(), 5000);
  }

  function changeLevel(index, timerFinished = false) {
    setLevelIndex(index);
    const round = rounds[index];
    if (announce === "tts") speakRound(round);
    else if (announce === "alarm" && timerFinished) ringAlarm();
  }

  function toggleTimer() {
    if (timer.running) timer.pause();
    else timer.start();
  }

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.8;
  }, []);

  // Space starts and pauses the clock (Enter still activates buttons)
  const toggleRef = useRef(toggleTimer);
  useEffect(() => {
    toggleRef.current = toggleTimer;
  });
  useEffect(() => {
    function onKey(e) {
      if (e.code !== "Space" || e.repeat) return;
      if (e.target.closest("input, textarea, select, dialog")) return;
      e.preventDefault();
      toggleRef.current();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Keep the screen awake while the clock runs
  useEffect(() => {
    if (!timer.running || !("wakeLock" in navigator)) return;
    let lock = null;
    const acquire = () =>
      navigator.wakeLock
        .request("screen")
        .then((l) => (lock = l))
        .catch(() => {});
    const onVisible = () => document.visibilityState === "visible" && acquire();
    acquire();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      document.removeEventListener("visibilitychange", onVisible);
      lock?.release().catch(() => {});
    };
  }, [timer.running]);

  // Show the clock in the browser tab
  const clock = formatClock(timer.remaining);
  useEffect(() => {
    document.title = `${clock}, level ${currentRound.lvl}`;
    return () => {
      document.title = "Sansa's Poker Timer";
    };
  }, [clock, currentRound.lvl]);

  const progress = 1 - timer.remaining / durationMs;
  const finalMinute = timer.remaining <= 60_000;
  const notStarted = timer.remaining === durationMs;
  const isPaused = !timer.running && !notStarted;

  const levelLabel = (
    <>
      Level <span className="font-medium text-ink">{currentRound.lvl}</span> of{" "}
      {rounds.length}
    </>
  );

  return (
    <div className="flex flex-1 flex-col pt-5 pb-8 sm:pt-8">
      <header className="flex items-center justify-between gap-3">
        <p className="hidden text-[15px] font-medium lg:block">
          Sansa&apos;s Poker Timer
        </p>
        <p className="text-[15px] whitespace-nowrap text-muted lg:hidden">{levelLabel}</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setChipsOpen(true)}
            className="btn btn-secondary h-11 px-4 text-[15px]"
          >
            <StackIcon width={18} height={18} className="max-[359px]:hidden" />
            Chips
          </button>
          <button
            onClick={onNewGame}
            className="btn btn-secondary h-11 px-4 text-[15px]"
          >
            New game
          </button>
        </div>
      </header>

      <div className="mt-8 grid flex-1 gap-10 sm:mt-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-8">
        <section aria-label="Clock" className="flex min-w-0 flex-col lg:row-span-2">
          <p className="hidden text-lg text-muted lg:block">{levelLabel}</p>

          <div
            role="timer"
            aria-label={`${clock} left in level ${currentRound.lvl}`}
            className={`-ml-[0.04em] leading-none font-normal tracking-[-0.045em] tabular-nums transition-[color,opacity] duration-300 ${
              finalMinute ? "text-alert" : "text-ink"
            } ${isPaused ? "opacity-45" : ""}`}
            style={{ fontSize: "clamp(5.75rem, 29vw, 15rem)" }}
          >
            {clock}
          </div>

          <div
            className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-ink/10"
            role="progressbar"
            aria-label="Level progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
          >
            <div
              className={`h-full origin-left rounded-full transition-transform duration-200 ease-linear ${finalMinute ? "bg-alert" : "bg-ink"}`}
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <Blind label="Small blind" value={currentRound.sb} lvl={currentRound.lvl} />
            <Blind label="Big blind" value={currentRound.bb} lvl={currentRound.lvl} />
          </div>
          <p className="mt-3 text-[15px] text-muted">
            {nextRound ? (
              <>
                Next level:{" "}
                <span className="font-medium text-ink tabular-nums">
                  {nextRound.sb} / {nextRound.bb}
                </span>
              </>
            ) : (
              "This is the last level."
            )}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={toggleTimer}
              aria-keyshortcuts="Space"
              className="btn btn-primary btn-lg w-full sm:w-auto sm:min-w-52"
            >
              {timer.running ? (
                <>
                  <PauseIcon width={20} height={20} /> Pause clock
                </>
              ) : (
                <>
                  <PlayIcon width={20} height={20} />
                  {notStarted ? "Start clock" : "Resume clock"}
                </>
              )}
            </button>
            <button
              onClick={() => timer.reset(false)}
              className="btn btn-secondary btn-lg w-full sm:w-auto"
            >
              <RestartIcon width={18} height={18} /> Restart level
            </button>
          </div>
          <p className="mt-3 hidden text-sm text-muted sm:block">
            Press Space to{" "}
            {timer.running ? "pause" : notStarted ? "start" : "resume"} the
            clock.
          </p>
        </section>

        <AnnounceSelector value={announce} onChange={setAnnounce} />

        <LevelList
          rounds={rounds}
          currentIndex={levelIndex}
          onSelect={(index) => changeLevel(index)}
        />
      </div>

      <ChipAmounts open={chipsOpen} onClose={() => setChipsOpen(false)} />
      <audio ref={audioRef} src="/sounds/alarm.mp3" preload="auto" />
    </div>
  );
}

function Blind({ label, value, lvl }) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-felt-line bg-surface px-4 py-4 shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_14px_30px_-16px_rgb(0_0_0/0.9)] sm:px-6 sm:py-5">
      <p className="text-[15px] text-white/80">{label}</p>
      <p
        key={lvl}
        className="animate-swap mt-1 text-[2.75rem] leading-none tracking-[-0.035em] tabular-nums sm:text-6xl"
      >
        {value}
      </p>
    </div>
  );
}
