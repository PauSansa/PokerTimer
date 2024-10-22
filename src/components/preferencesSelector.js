import { preferences } from "@/lib/preference";

export default function PreferencesSelector({ setRoundDuration }) {
  function handleSubmit(e) {
    e.preventDefault();
    const time = parseInt(e.target[0].value);
    console.log(time);
    setRoundDuration(time);
  }

  return (
    <div className="md:w-1/3 w-full items-center justify-center flex flex-col gap-4 sm:mt-7 animate-jump-in mb-44">
      <h2 className="md:text-3xl text-xl">
        Select the <br />
        <span className="md:text-5xl font-bold text-3xl">Round Duration</span>
      </h2>
      <section className="flex flex-col items-center justify-center w-full gap-4 mt-5">
        {preferences.map((preference, index) => {
          return (
            <button
              key={index}
              className="py-2 px-4 bg-accent rounded-lg shadow-lg w-10/12"
              onClick={() => setRoundDuration(preference.time)}
            >
              <p className="md:text-lg md:font-medium font-bold">
                {preference.time}m = {preference.estimatedDuration} game
              </p>
            </button>
          );
        })}
        <form
          onSubmit={handleSubmit}
          className="py-2 px-4 bg-secondary rounded-lg shadow-lg w-10/12"
        >
          <div className="flex flex-col gap-3 pt-2">
            <div className="flex flex-row items-center justify-center text-center w-full">
              <label className="text-lg">Other:</label>
              <input
                type="number"
                min={1}
                step={1}
                className="ml-2 p-1 bg-gray-800/50 rounded-lg text-right w-24"
              />
              <p className="ml-2">m</p>
            </div>
            <button
              type="submit"
              className="bg-purple-600/85 rounded-lg shadow-xl p-2 ml-2 mb-2"
            >
              Set
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
