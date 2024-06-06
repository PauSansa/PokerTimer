import { preferences } from "@/lib/preference"

export default function PreferencesSelector({ setRoundDuration }) {
    return (
        <div className="absolute items-center justify-center flex flex-col gap-4 top-0 left-0 right-0 bottom-1/4">
            <h2 className="text-xl">Select your <br/><span className="font-bold text-3xl">Preferences</span></h2>
            {preferences.map((preference, index) => {
                return (
                    <button key={index} className="py-2 px-4 bg-accent rounded-lg shadow-lg w-10/12" onClick={() => setRoundDuration(preference.time)}>
                        {preference.time} ≈ {preference.estimatedDuration} de partida
                    </button>
                )
            })}
        </div>
    )
}