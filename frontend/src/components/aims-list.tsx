import type { Aim } from "@/lib/site-content-types";

export function AimsList({ aims }: { aims: readonly Aim[] }) {
  return (
    <ol className="grid gap-x-6 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
      {aims.map((aim, index) => (
        <li key={aim.text} className="border-t border-[#cdb98c] py-5 first:border-t-0 sm:first:border-t-0 lg:first:border-t">
          <div className="flex gap-4">
            <span className="display-type text-3xl leading-none text-[#bd9458]">{String(index + 1).padStart(2, "0")}</span>
            <p className="pt-1 text-sm leading-7 text-[#4d5b52]">{highlightAim(aim)}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function highlightAim(aim: Aim) {
  if (!aim.emphasis || !aim.text.startsWith(aim.emphasis)) return aim.text;
  return <><strong className="font-bold text-[#8c3c2e]">{aim.emphasis}</strong>{aim.text.slice(aim.emphasis.length)}</>;
}
