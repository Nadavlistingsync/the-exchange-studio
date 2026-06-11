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
      className={`inline-block rounded-sm bg-[#e8e4dc] px-2.5 py-[5px] text-[9.5px] font-normal leading-none tracking-[0.14em] text-[#1a1815] shadow-[0_2px_14px_rgba(0,0,0,0.4)] ${className}`}
    >
      <span className="whitespace-nowrap uppercase group-hover:hidden group-has-[:focus-visible]:hidden">
        {firstName}
      </span>
      <span className="hidden whitespace-nowrap uppercase group-hover:inline group-has-[:focus-visible]:inline">
        {name}
      </span>
    </span>
  );
}
