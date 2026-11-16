import { BellIcon, SilentIcon, VoiceIcon } from "@/lib/icons";

const modes = [
  { value: "tts", label: "Voice", Icon: VoiceIcon },
  { value: "alarm", label: "Alarm", Icon: BellIcon },
  { value: "muted", label: "Silent", Icon: SilentIcon },
];

export default function AnnounceSelector({ value, onChange }) {
  return (
    <div>
      <p id="announce-label" className="mb-2 text-[15px] font-medium text-muted">
        Announce new levels
      </p>
      <div
        role="radiogroup"
        aria-labelledby="announce-label"
        className="grid grid-cols-3 gap-1 rounded-full border border-line bg-card/70 p-1 sm:inline-grid lg:grid"
      >
        {modes.map(({ value: mode, label, Icon }) => {
          const selected = value === mode;
          return (
            <button
              key={mode}
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(mode)}
              className={`flex h-11 items-center justify-center gap-2 rounded-full px-3 text-[15px] font-medium transition-colors duration-150 ${
                selected
                  ? "bg-ink text-bg"
                  : "text-muted hover:text-ink"
              }`}
            >
              <Icon width={18} height={18} />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
