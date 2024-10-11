import { CloseIcon } from "@/lib/icons";

const chipAmounts = [
  { value: 10, quantity: 5, borderColor: "border-white" },
  { value: 20, quantity: 5, borderColor: "border-red-500" },
  { value: 50, quantity: 3, borderColor: "border-blue-500" },
  { value: 100, quantity: 2, borderColor: "border-green-500" },
  { value: 500, quantity: 1, borderColor: "border-black" },
];

export default function ChipAmounts({ closeChips, isAnimating }) {
  return (
    <div
      className={`absolute items-center justify-center flex top-0 left-0 right-0 bottom-1/4 sm:mt-14 ${
        isAnimating ? "animate-jump-out" : "animate-jump-in"
      }`}
    >
      <div className="relative bg-slate-800 w-2/3 h-2/3 rounded-xl  p-4 flex flex-col gap-6">
        <CloseIcon
          width={30}
          height={30}
          onClick={closeChips}
          className="absolute top-2 right-2 m-3 cursor-pointer"
        />
        <h3 className="font-bold text-3xl"> Chip Amounts </h3>
        <div className="grid grid-cols-2 gap-4">
          {chipAmounts.map((chip) => (
            <div
              key={chip.value}
              className={`flex items-center justify-between p-3 flex-1 bg-primary/10 rounded-lg border-b-8 ${chip.borderColor}`}
            >
              <span className="text-lg font-semibold">{chip.value}p</span>
              <span className="text-sm text-muted-foreground">
                x{chip.quantity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
