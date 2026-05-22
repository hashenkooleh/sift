"use client"

import { Popover as PopoverPrimitive } from "@base-ui/react/popover"

import { cn } from "@/lib/utils"

/*
 * Popover — wraps Base UI's Popover. An anchored surface, sanctioned to carry
 * a shadow (modals and popovers are the only two shadow exceptions).
 *
 * Composition (Base UI parts, re-exported):
 *   Popover        → Popover.Root     (open / defaultOpen / onOpenChange)
 *   PopoverTrigger → Popover.Trigger
 *   PopoverClose   → Popover.Close
 *   PopoverContent → Popover.Portal + Positioner + Popup. `side`, `align`,
 *                    `sideOffset`, `alignOffset` go to the Positioner;
 *                    remaining props go to the Popup.
 */
function Popover(props: PopoverPrimitive.Root.Props) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger(props: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverClose(props: PopoverPrimitive.Close.Props) {
  return <PopoverPrimitive.Close data-slot="popover-close" {...props} />
}

function PopoverContent({
  className,
  side = "bottom",
  align = "start",
  sideOffset = 4,
  alignOffset,
  children,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<
    PopoverPrimitive.Positioner.Props,
    "side" | "align" | "sideOffset" | "alignOffset"
  >) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        className="z-50"
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            "min-w-[12rem] rounded-lg border border-border bg-popover p-1.5 text-popover-foreground shadow-lg outline-none transition-all duration-150",
            "data-starting-style:scale-[0.98] data-starting-style:opacity-0",
            "data-ending-style:scale-[0.98] data-ending-style:opacity-0",
            className
          )}
          {...props}
        >
          {children}
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  )
}

export { Popover, PopoverTrigger, PopoverClose, PopoverContent }
