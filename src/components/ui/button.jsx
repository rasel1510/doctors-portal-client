import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-sky-500 to-cyan-500 text-white hover:from-sky-600 hover:to-cyan-600 shadow-md hover:shadow-lg",
        destructive: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
        outline: "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 text-slate-700",
        secondary: "bg-slate-900 text-white hover:bg-slate-800",
        ghost: "hover:bg-slate-100 hover:text-slate-900 text-slate-600 shadow-none",
        link: "text-sky-600 underline-offset-4 hover:underline shadow-none",
        gradient: "bg-gradient-to-r from-sky-500 via-cyan-500 to-indigo-500 text-white hover:opacity-90 shadow-md",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-xl px-8 text-base font-semibold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }
