"use client";
import { useRef, useState, useEffect } from "react";
import MyTimer from "@/components/timer";
import { rounds } from "@/lib/round";
import ShowRound from "@/components/showRound";
import NextRounds from "@/components/nextRounds";
import sleep from "@/util/sleep";
import { useSpeechSynthesis } from "react-speech-kit";
import ButtonImage from "./ButtonImage/buttonImage";
import ChipAmounts from "@/components/chipAmounts";

export default function Game({ roundDuration }) {
  const { speak } = useSpeechSynthesis();

  const [chipsIsOpen, setChipsIsOpen] = useState(false);
  const [isChipsAnimating, setIsChipsAnimating] = useState(false);

  const audioRef = useRef(null);
  const [currentRound, setCurrentRound] = useState(rounds[0]);
  const [announce, setAnnounce] = useState("tts");

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.8; // Establecer volumen al 80%
    }
  }, []);

  function ttsNewRound(round) {
    speak({ text: `Ronda ${round.lvl}, Peque ${round.sb}, Big ${round.bb}` });
  }

  async function alarmNewRound() {
    audioRef.current.play();
    await sleep(5000);
    audioRef.current.pause();
  }

  async function handleTimeFinish() {
    const nextRound = rounds.find((r) => r.lvl === currentRound.lvl + 1);
    if (nextRound) {
      audioRef.current.currentTime = 0;
      await handleChangeRound(nextRound, true);
    }
  }

  async function handleChangeRound(round, timerFinished) {
    setCurrentRound(round);
    if (announce === "tts") {
      ttsNewRound(round);
    } else if (announce === "alarm" && timerFinished) {
      await alarmNewRound();
    }
  }

  function openChipsModal() {
    setIsChipsAnimating(false);
    setChipsIsOpen(true);
  }

  function closeChipsModal() {
    setIsChipsAnimating(true);
    setTimeout(() => {
      setChipsIsOpen(false);
    }, 500); // Asumiendo que la duración de jump-out es 500ms
  }

  return (
    <div className="flex md:mt-0 mt-6 flex-col gap-4 w-11/12 mb-8 md:max-w-3xl relative">
      {chipsIsOpen && (
        <ChipAmounts
          closeChips={closeChipsModal}
          isAnimating={isChipsAnimating}
        />
      )}
      <h1 className="md:text-5xl md:mb-6 font-bold text-3xl animate-wiggle mb-4 text-text z-0">
        Sansa&apos;s
        <br />
        Poker Timer
      </h1>
      <ButtonImage announce={announce} setAnnounce={setAnnounce} />
      <button
        onClick={openChipsModal}
        className="p-2 bg-accent rounded-lg shadow-lg w-full text-black font-bold"
      >
        Show Chips
      </button>
      <div>
        <ShowRound currentRound={currentRound} />
        <section className="flex flex-col items-center mt-6">
          <MyTimer roundDuration={roundDuration} nextRound={handleTimeFinish} />
        </section>
      </div>
      <h2> Next Rounds: </h2>
      <NextRounds
        rounds={rounds}
        currentRound={currentRound}
        setCurrentRound={handleChangeRound}
      />
      <audio ref={audioRef} src="/sounds/alarm.mp3" />
    </div>
  );
}
