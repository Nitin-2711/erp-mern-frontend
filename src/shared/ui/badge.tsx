import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-indigo-100 text-indigo-700 hover:bg-indigo-200/80 dark:bg-indigo-900/40 dark:text-indigo-400",
        secondary:
          "border-transparent bg-slate-100 text-slate-800 hover:bg-slate-200/80 dark:bg-slate-800 dark:text-slate-300",
        destructive:
          "border-transparent bg-rose-100 text-rose-700 hover:bg-rose-200/80 dark:bg-rose-900/40 dark:text-rose-400",
        success:
          "border-transparent bg-emerald-100 text-emerald-700 hover:bg-emerald-200/80 dark:bg-emerald-900/40 dark:text-emerald-400",
        outline: "text-slate-950 dark:text-slate-100 border-slate-200 dark:border-slate-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
