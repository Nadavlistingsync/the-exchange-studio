type GuestNameBadgeProps = {
  firstName: string;
  name: string;
  className?: string;
};

export function GuestNameBadge({
  firstName,
  name,
  className = "",
}: GuestNameBadgeProps) {
  return (
    <span
      className={`inline-grid grid-cols-1 grid-rows-1 rounded-sm bg-[#e8e4dc] px-2 py-1 text-[10px] font-normal leading-none tracking-[0.06em] text-black ${className}`}
    >
      <span
        className="invisible col-start-1 row-start-1 whitespace-nowrap uppercase"
        aria-hidden
      >
        {name}
      </span>
      <span className="col-start-1 row-start-1 whitespace-nowrap uppercase transition-opacity duration-200 group-hover:opacity-0 group-has-[:focus-visible]:opacity-0">
        {firstName}
      </span>
      <span className="col-start-1 row-start-1 whitespace-nowrap uppercase opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-has-[:focus-visible]:opacity-100">
        {name}
      </span>
    </span>
  );
}
