"use client";
import Game from "@/components/game";
import PreferencesSelector from "@/components/preferencesSelector";
import { useState } from "react";

export default function Home() {
  const [roundDuration, setRoundDuration] = useState(null);

  return (
    <main className="w-full flex flex-col h-screen justify-center items-center">
      {roundDuration ? (
        <Game roundDuration={roundDuration} />
      ) : (
        <PreferencesSelector setRoundDuration={setRoundDuration} />
      )}
    </main>
  );
}
