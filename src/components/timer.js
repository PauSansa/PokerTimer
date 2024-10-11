import React, { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import sleep from "@/util/sleep";
import { PlayIcon, PauseIcon, RestartIcon } from "@/lib/icons";

function MyTimer({ roundDuration, nextRound }) {
  const expiryTimestamp = new Date();
  expiryTimestamp.setMinutes(expiryTimestamp.getMinutes() + roundDuration); // Temporizador inicial de 10 segundos

  const { seconds, minutes, hours, isRunning, start, pause, resume, restart } =
    useTimer({
      expiryTimestamp,
      onExpire: () => handleExpire(),
      autoStart: false,
    });

  const handleNewRound = async () => {
    await sleep(500);
    const time = new Date();
    time.setMinutes(time.getMinutes() + roundDuration); // Reiniciar a la roundDuration inicial
    restart(time);
  };

  const handleRestart = async () => {
    await handleNewRound();
    pause();
  };

  const handleExpire = async () => {
    await nextRound();
    handleNewRound();
  };

  return (
    <div className="flex flex-col w-full bg-primary text-black items-center text-center justify-center rounded-lg shadow-lg gap-5 p-5">
      <section className="flex flex-row justify-center items-center gap-2 rounded-lg w-full font-bold text-4xl">
        <p className="p-2 bg-gray-800/15 rounded-lg shadow-sm">{minutes}m</p>:
        <p className="p-2 bg-gray-800/15 rounded-lg shadow-sm">{seconds}s</p>
      </section>
      <section className="flex flex-row gap-3">
        {isRunning ? (
          <button
            className="p-2 bg-gray-800/15 rounded-lg shadow-sm"
            onClick={pause}
          >
            <PauseIcon width={30} height={30} />
          </button>
        ) : (
          <button
            className="p-2 bg-gray-800/15 rounded-lg shadow-sm"
            onClick={resume}
          >
            <PlayIcon width={30} height={30} />
          </button>
        )}

        <button
          className="p-2 bg-gray-800/15 rounded-lg shadow-sm"
          onClick={handleRestart}
        >
          <RestartIcon width={30} height={30} />
        </button>
      </section>
    </div>
  );
}

export default MyTimer;
