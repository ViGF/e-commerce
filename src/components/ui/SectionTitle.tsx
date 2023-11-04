import { ComponentProps } from "react";

export function SectionTitle({ children, ...props }: ComponentProps<"p">) {
  return (
    <p className="font-bold uppercase pl-5" {...props}>{children}</p>
  );
}