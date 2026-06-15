"use client";

export default function ConfirmProjectBar() {
  return (
    <div className="sticky bottom-6">
      <div className="rounded-[24px] border border-zinc-900 bg-zinc-950/90 backdrop-blur p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-medium">
              Review Complete?
            </h3>

            <p className="text-sm text-zinc-500">
              Confirm extracted constraints and
              continue to architecture reasoning.
            </p>
          </div>

          <button
            className="
              rounded-2xl
              bg-lime-300
              px-6
              py-3
              text-sm
              font-medium
              text-black
              hover:bg-lime-200
              transition
            "
          >
            Confirm Constraints
          </button>
        </div>
      </div>
    </div>
  );
}