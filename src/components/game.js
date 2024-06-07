"use client";
import { useRef, useState, useEffect } from "react";
import MyTimer from "@/components/timer";
import { rounds } from '@/lib/round';
import ShowRound from "@/components/showRound";
import NextRounds from "@/components/nextRounds";
import sleep from "@/util/sleep";
import Chips from "@/components/chips";

export default function Game({ roundDuration }) {
  console.log(roundDuration);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.8; // Establecer volumen al 80%
    }
  }, []);
  const audioRef = useRef(null);
  const [ currentRound, setCurrentRound ] = useState(rounds[0]);
  const [ showChips, setShowChips  ] = useState(false);

  async function handleNextRound() {
    const nextRound = rounds.find(r => r.lvl === currentRound.lvl + 1);
    if (nextRound) {
      audioRef.current.play()
      await sleep(5000)
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setCurrentRound(nextRound);
    }
  }

  async function handleChangeRound( round ){
    setCurrentRound(round);
  }

  return (
    <div className="flex flex-col gap-4 w-11/12 mb-8 md:max-w-3xl">
        {showChips && <Chips closeChips={() => setShowChips(false)}/> }
        <h1 className="font-bold text-3xl animate-wiggle text-text z-0">
            Sansa&apos;s 
            <br />
            Poker Timer
        </h1>
        <button onClick={() => setShowChips(true)} className="p-2 bg-accent rounded-lg shadow-lg w-full text-black font-bold" >
            Show Chips
        </button>
        <div>
        <ShowRound currentRound={currentRound} />
        <section className="flex flex-col items-center mt-6">
            <MyTimer roundDuration={roundDuration} nextRound={handleNextRound}/>
        </section>   
        </div>
        <h2> Next Rounds: </h2>
        <NextRounds rounds={rounds} currentRound={currentRound} setCurrentRound={handleChangeRound}/>
        <audio ref={audioRef} src="/sounds/alarm.mp3" />
        </div>
  );
}
