import { ArrowDownIcon } from "lucide-react";
import { Badge, BadgeProps } from "./badge";
import { cn } from "@/lib/utils";

export function DiscountsBadge({ children, className, ...props }: BadgeProps) {
  return (
    <Badge
      className={cn("px-2 py-[2px]", className)}
      {...props}
    >
      <ArrowDownIcon size={14} /> {children}%
    </Badge>
  )
}