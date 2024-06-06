export default function NextRounds({ rounds, currentRound, setCurrentRound }) {

    return (
        <div className="flex flex-col gap-4 w-full mb-2 h-48 overflow-scroll">
            {rounds.map((round, index) => {
                const isCurrentRound = round.lvl === currentRound.lvl;
                return (
                    <div key={index} onClick={() => setCurrentRound(round)} className={`flex flex-row gap-4 items-center justify-center p-2 rounded-lg shadow-lg ${isCurrentRound ? 'bg-accent text-black' : 'bg-gray-800/15'}`}>
                        <p className="font-bold text-lg">Round {round.lvl}</p>
                        <p className="font-bold text-lg">BB: {round.bb}</p>
                        <p className="font-bold text-lg">SB: {round.sb}</p>
                    </div>
                );
            }
        )}
        </div>
    );
}
