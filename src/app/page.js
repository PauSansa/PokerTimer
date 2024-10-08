"use client";
import Game from "@/components/game";
import PreferencesSelector from "@/components/preferencesSelector";
import { useState } from "react";

export default function Home() {
  const [roundDuration, setRoundDuration] = useState(null);

  return (
    <main className="mt-6 w-full flex flex-col justify-center items-center">
      {roundDuration ? (
        <Game roundDuration={roundDuration} />
      ) : (
        <PreferencesSelector setRoundDuration={setRoundDuration} />
      )}
    </main>
  );
}
