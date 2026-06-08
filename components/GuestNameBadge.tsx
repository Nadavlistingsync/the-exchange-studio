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
      className={`inline-block rounded-sm bg-[#e8e4dc] px-2 py-1 text-[10px] font-normal leading-none tracking-[0.06em] text-black ${className}`}
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
