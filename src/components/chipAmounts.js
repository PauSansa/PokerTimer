import { useEffect, useRef } from "react";
import { CloseIcon } from "@/lib/icons";

const chipAmounts = [
  { value: 10, quantity: 5, colour: "#e9e6df", name: "White" },
  { value: 20, quantity: 5, colour: "#c8323f", name: "Red" },
  { value: 50, quantity: 3, colour: "#22825a", name: "Green" },
  { value: 100, quantity: 2, colour: "#2b5fb4", name: "Blue" },
  { value: 500, quantity: 1, colour: "#1b1d1e", name: "Black" },
];

const stackTotal = chipAmounts.reduce((t, c) => t + c.value * c.quantity, 0);

export default function ChipAmounts({ open, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-labelledby="chips-title"
      className="m-auto mb-0 w-full max-w-none rounded-t-[var(--radius-lg)] border border-line bg-bg p-0 text-ink shadow-2xl sm:mb-auto sm:max-w-md sm:rounded-[var(--radius-lg)]"
    >
      <div className="px-5 pt-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="chips-title" className="text-2xl tracking-[-0.02em]">
              Starting stack
            </h2>
            <p className="mt-1 text-muted">
              Each player starts with {stackTotal.toLocaleString("en")} in
              chips.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close starting stack"
            className="btn btn-secondary btn-icon -mt-1 -mr-1 shrink-0"
          >
            <CloseIcon width={20} height={20} />
          </button>
        </div>

        <ul className="mt-6 flex flex-col divide-y divide-line">
          {chipAmounts.map((chip) => (
            <li key={chip.value} className="flex items-center gap-4 py-3">
              <span
                aria-hidden
                className="size-9 shrink-0 rounded-full"
                style={{
                  background: chip.colour,
                  boxShadow: `inset 0 0 0 3px ${chip.colour}, inset 0 0 0 5px rgb(255 255 255 / 0.55), 0 0 0 1px var(--p-line-strong)`,
                }}
              />
              <span className="flex-1">
                <span className="text-lg tabular-nums">{chip.value}</span>
                <span className="sr-only"> ({chip.name})</span>
                <span className="text-muted"> × {chip.quantity}</span>
              </span>
              <span className="tabular-nums text-muted">
                {(chip.value * chip.quantity).toLocaleString("en")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </dialog>
  );
}
