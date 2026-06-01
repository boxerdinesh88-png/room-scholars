import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#D4A24C] text-[#081F4D] hover:bg-[#c08e38] shadow-lg shadow-[#D4A24C]/25 hover:shadow-xl hover:shadow-[#D4A24C]/30 hover:-translate-y-0.5",
        primary: "bg-[#081F4D] text-white hover:bg-[#0a2d6b] shadow-lg shadow-[#081F4D]/20 hover:shadow-xl hover:shadow-[#081F4D]/25 hover:-translate-y-0.5",
        outline: "border-2 border-white/30 text-white hover:bg-white hover:text-[#081F4D]",
        "outline-dark": "border-2 border-[#081F4D] text-[#081F4D] hover:bg-[#081F4D] hover:text-white",
        ghost: "text-[#081F4D] hover:bg-[#081F4D]/5",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2 text-sm",
        lg: "h-14 px-8 py-4 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
