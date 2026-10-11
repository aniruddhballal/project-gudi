export function AimsList({ aims }: { aims: readonly string[] }) {
  const highlightedStarts = [
    "To develop Penugonda",
    "To provide accommodation, free food, free Hostels and Hospitals",
    "To build Vasavi Rishi Gothra Suvarna Mandir",
    "To install the world",
    "To preach and spread the principles of non-violence, love, peace and sacrifice",
    "To inspire Vysyas spread all over the world",
    "To finalise the history of Penugonda",
    "To start Veda Patasala, Guru Peetam",
    "To perform free marriages and set up libraries",
  ];

  return (
    <ol className="grid gap-x-6 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
      {aims.map((aim, index) => (
        <li key={aim} className="border-t border-[#d6b681] py-5 first:border-t-0 sm:first:border-t-0 lg:first:border-t">
          <div className="flex gap-4">
            <span className="display-type text-3xl leading-none text-[#c58a43]">{String(index + 1).padStart(2, "0")}</span>
            <p className="pt-1 text-sm leading-7 text-[#634a3c]">{highlightAim(aim, highlightedStarts[index] ?? "")}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function highlightAim(aim: string, start: string) {
  if (!start || !aim.startsWith(start)) return aim;
  return <><strong className="font-bold text-[#8f3d1e]">{aim.slice(0, start.length)}</strong>{aim.slice(start.length)}</>;
}
