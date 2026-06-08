type GuestSearchProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  id?: string;
  resultCount?: number;
};

export function GuestSearch({
  value,
  onChange,
  className = "",
  id = "guest-search",
  resultCount,
}: GuestSearchProps) {
  const hasQuery = value.trim().length > 0;

  return (
    <div className={className}>
      <div className="relative">
        <input
          id={id}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search guests"
          aria-label="Search guests"
          className="w-full rounded-full border border-white/10 bg-transparent py-2 pl-4 pr-9 text-sm font-extralight text-white placeholder:text-white/30 outline-none transition-colors focus:border-white/20"
        />
        {hasQuery ? (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center text-white/40 transition-colors hover:text-white"
          >
            <span className="sr-only">Clear</span>
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        ) : (
          <svg
            className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        )}
      </div>
      {resultCount !== undefined && (
        <p className="mt-2 text-center text-[11px] font-extralight text-white/40">
          {resultCount} {resultCount === 1 ? "guest" : "guests"}
        </p>
      )}
    </div>
  );
}
