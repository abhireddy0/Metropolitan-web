import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

// Filled buttons draw their edge with a 2.5px ring plus inner highlights instead of a border; hover dims the fill.
const filled =
  "border-0 bg-cta text-white [box-shadow:0px_1px_8px_0px_color-mix(in_oklab,white_7%,transparent)_inset,0px_0px_4.3px_0px_color-mix(in_oklab,var(--cta)_11%,transparent)_inset,0px_0px_0px_2.5px_var(--cta),0px_9px_21.7px_3px_color-mix(in_oklab,var(--cta)_28%,transparent),0px_-1px_0px_1px_color-mix(in_oklab,white_18%,transparent)_inset,0px_4px_4px_0px_color-mix(in_oklab,var(--cta)_16%,transparent)] hover:bg-cta/85 hover:opacity-95 active:[box-shadow:0px_1px_8px_0px_color-mix(in_oklab,white_7%,transparent)_inset,0px_0px_4.3px_0px_color-mix(in_oklab,var(--cta)_11%,transparent)_inset,0px_0px_0px_2.5px_var(--cta),0px_7px_12px_0px_color-mix(in_oklab,var(--cta)_45%,transparent),0px_-1px_0px_1px_color-mix(in_oklab,white_18%,transparent)_inset,0px_4px_4px_0px_color-mix(in_oklab,var(--cta)_16%,transparent)]"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border bg-clip-padding font-semibold whitespace-nowrap transition-all active:scale-[0.97] outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-60 aria-busy:pointer-events-none aria-busy:opacity-70 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[18px]",
  {
    variants: {
      variant: {
        default: filled,
        green: filled,
        outline: "border-[color-mix(in_oklab,var(--cta)_30%,var(--card))] bg-[color-mix(in_oklab,var(--cta)_10%,var(--card))] text-soft-foreground hover:bg-[color-mix(in_oklab,var(--cta)_15%,var(--card))]",
        light: "border-white/70 bg-white text-forest-dark hover:bg-white/85",
        "ghost-light": "border-white/30 bg-white/10 text-white hover:bg-white/5 hover:text-white/85",
        ghost: "border-transparent hover:bg-accent hover:text-accent-foreground",
        link: "h-auto border-transparent px-0 text-leaf hover:text-forest-dark",
      },
      size: {
        default: "h-12 px-6 text-base",
        sm: "h-10 px-4 text-[0.9375rem]",
        lg: "h-13 px-7 text-base",
        icon: "size-11",
        "icon-sm": "size-9 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
