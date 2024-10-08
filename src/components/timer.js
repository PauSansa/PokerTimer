import React, { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import sleep from "@/util/sleep";

function MyTimer({ roundDuration, nextRound }) {
  const expiryTimestamp = new Date();
  expiryTimestamp.setMinutes(expiryTimestamp.getMinutes() + roundDuration); // Temporizador inicial de 10 segundos

  const { seconds, minutes, hours, isRunning, start, pause, resume, restart } =
    useTimer({
      expiryTimestamp,
      onExpire: () => handleExpire(),
      autoStart: false,
    });

  const handleRestart = async () => {
    await sleep(1000);
    const time = new Date();
    time.setMinutes(time.getMinutes() + roundDuration); // Reiniciar a 10 segundos
    restart(time);
  };

  const handleExpire = async () => {
    await nextRound();
    handleRestart();
  };

  return (
    <div className="flex flex-col w-full bg-primary text-black items-center text-center justify-center rounded-lg shadow-lg gap-5 p-5">
      <section className="flex flex-row justify-center items-center gap-2 rounded-lg w-full font-bold text-2xl">
        <p className="p-2 bg-gray-800/15 rounded-lg shadow-sm">{minutes}m</p>:
        <p className="p-2 bg-gray-800/15 rounded-lg shadow-sm">{seconds}s</p>
      </section>
      <section className="flex flex-row gap-2">
        <button
          className="p-2 bg-gray-800/15 rounded-lg shadow-sm"
          onClick={resume}
        >
          Play
        </button>
        <button
          className="p-2 bg-gray-800/15 rounded-lg shadow-sm"
          onClick={pause}
        >
          Pause
        </button>
        <button
          className="p-2 bg-gray-800/15 rounded-lg shadow-sm"
          onClick={handleRestart}
        >
          Restart
        </button>
      </section>
    </div>
  );
}

export default MyTimer;
