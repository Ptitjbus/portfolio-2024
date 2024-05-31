/* eslint-disable max-len */
export default function EmptyGridItem() {
  const delay = Math.floor(Math.random() * 1000);

  return (
    <div className="rounded-3xl flex relative w-36 h-24 sm:w-64 sm:h-36 group hover:scale-[1.01] transition-transform bg-zinc-100 ring-1 hover:ring-4 ring-zinc-400 hover:ring-sky-400 opacity-50 ">
      <div className="overflow-hidden flex relative w-full rounded-3xl">
        <p
          className={`m-auto text-lg sm:text-xl font-bold text-zinc-400 animate-pulse delay-[${delay}ms] select-none`}
        >
          more soon
        </p>
      </div>
    </div>
  );
}
