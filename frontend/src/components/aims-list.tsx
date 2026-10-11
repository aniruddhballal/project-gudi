export function AimsList({ aims }: { aims: readonly string[] }) {
  return (
    <ol className="grid gap-x-6 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
      {aims.map((aim, index) => (
        <li key={aim} className="border-t border-[#d6b681] py-5 first:border-t-0 sm:first:border-t-0 lg:first:border-t">
          <div className="flex gap-4">
            <span className="display-type text-3xl leading-none text-[#c58a43]">{String(index + 1).padStart(2, "0")}</span>
            <p className="pt-1 text-sm leading-7 text-[#634a3c]">{aim}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
