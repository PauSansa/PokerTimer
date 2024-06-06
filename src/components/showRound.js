export default function ShowRound({currentRound}) {
    return (
        <div className="flex flex-row gap-5 bg-secondary/40 p-3 w-full rounded-lg shadow-lg justify-center items-center">
        <div className="flex flex-col bg-gray-700/10 p-2 rounded-lg">
          <p className="text-red-500">S.Blind</p>
          <p className="text-white">{currentRound.sb}</p>
        </div>
        <div className="flex flex-col  bg-gray-700/10 p-2 rounded-lg">
          <p className="text-red-500">Round</p>
          <p className="text-white">{currentRound.lvl}</p>
        </div>
        <div className="flex flex-col  bg-gray-700/10 p-2 rounded-lg">
          <p className="text-red-500">B.Blind</p>
          <p className="text-white">{currentRound.bb}</p>
        </div>
      </div>
    )
}