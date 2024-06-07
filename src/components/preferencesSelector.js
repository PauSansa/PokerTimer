import { preferences } from "@/lib/preference"

export default function PreferencesSelector({ setRoundDuration }) {
    function handleSubmit(e) {
        e.preventDefault();
        const time = parseInt(e.target[0].value);
        console.log(time);
        setRoundDuration(time);
    }

    return (
        <div className="absolute items-center justify-center flex flex-col gap-4 top-0 left-0 right-0 bottom-1/4 sm:mt-7 animate-jump-in">
            <h2 className="text-xl">Select the <br/><span className="font-bold text-3xl">Round Duration</span></h2>
            {preferences.map((preference, index) => {
                return (
                    <button key={index} className="py-2 px-4 bg-accent rounded-lg shadow-lg w-10/12" onClick={() => setRoundDuration(preference.time)}>
                        {preference.time}m ≈ {preference.estimatedDuration} game
                    </button>
                )
            })}
            <form onSubmit={handleSubmit} className="flex flex-row py-2 px-4 bg-secondary rounded-lg shadow-lg w-10/12 items-center justify-center">
                <label className="text-lg">Other:</label>
                <input type="number" min={1} step={1} className="ml-2 p-1 bg-gray-800/50 rounded-lg text-right w-24" />
                <p>m</p>
                <button type="submit" className="bg-purple-600/85 rounded-lg shadow-xl p-2 ml-2">Set</button>
            </form>
        </div>
    )
}