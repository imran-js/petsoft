import { cn } from "@/lib/utils";

type Props = { children: React.ReactNode; className?: string };

function ContentBlock({ children, className }: Props) {
  return (
    <div
      className={cn(
        "w-full h-full bg-[#f7f8fa] shadow-sm rounded-md overflow-hidden ",
        className
      )}
    >
      {children}
    </div>
  );
}

export default ContentBlock;
