"use client";
import Game from "@/components/game";
import PreferencesSelector from "@/components/preferencesSelector";
import { useState } from "react";

export default function Home() {
  const [roundDuration, setRoundDuration] = useState(null);

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-4 sm:px-6 lg:px-10">
      {roundDuration ? (
        <Game
          roundDuration={roundDuration}
          onNewGame={() => setRoundDuration(null)}
        />
      ) : (
        <PreferencesSelector setRoundDuration={setRoundDuration} />
      )}
    </main>
  );
}
