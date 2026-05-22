"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

/*
 * Checkbox — wraps Base UI's Checkbox (Root + Indicator).
 * Flat by design: no shadow, it lives in the plane. The checked fill is the
 * single --signal accent — a ticked filter is an active signal.
 *
 * API (Base UI CheckboxRoot): checked / defaultChecked / onCheckedChange /
 * disabled / indeterminate.
 */
function Checkbox({
  className,
  ...props
}: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer flex size-3.5 shrink-0 items-center justify-center rounded-[3px] border border-muted-foreground/30 bg-muted transition-colors outline-none",
        "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "data-checked:border-primary data-checked:bg-primary",
        "data-indeterminate:border-primary data-indeterminate:bg-primary",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-primary-foreground"
      >
        <Check className="size-3" strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
