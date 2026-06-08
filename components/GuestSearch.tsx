type GuestSearchProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function GuestSearch({
  value,
  onChange,
  className = "",
}: GuestSearchProps) {
  return (
    <div className={`relative ${className}`}>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search guests"
        className="w-full rounded-full border border-white/20 bg-white/5 py-2.5 pl-4 pr-10 text-sm font-extralight text-white placeholder:text-white/30 outline-none transition-colors focus:border-white/40"
      />
      <svg
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
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
    </div>
  );
}
