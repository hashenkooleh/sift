"use client"

import type { ComponentProps } from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

/*
 * Dialog — wraps Base UI's Dialog. A centered modal, sanctioned to carry a
 * shadow (modals and popovers are the only two shadow exceptions). The
 * backdrop is a plain dimmed overlay — no blur, no glassmorphism.
 *
 * Composition (Base UI parts, re-exported):
 *   Dialog            → Dialog.Root      (open / defaultOpen / onOpenChange / modal)
 *   DialogTrigger     → Dialog.Trigger
 *   DialogClose       → Dialog.Close
 *   DialogContent     → Dialog.Portal + Backdrop + Popup, with a built-in
 *                       top-right close button
 *   DialogTitle       → Dialog.Title
 *   DialogDescription → Dialog.Description
 *   DialogHeader / DialogFooter → layout helpers
 */
function Dialog(props: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger(props: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogClose(props: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogContent({
  className,
  children,
  ...props
}: DialogPrimitive.Popup.Props) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop
        data-slot="dialog-backdrop"
        className={cn(
          "fixed inset-0 z-50 bg-black/60 transition-opacity duration-150",
          "data-starting-style:opacity-0 data-ending-style:opacity-0"
        )}
      />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid w-[480px] max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl border border-border bg-popover p-6 text-popover-foreground shadow-xl outline-none transition-all duration-150",
          "data-starting-style:scale-[0.98] data-starting-style:opacity-0",
          "data-ending-style:scale-[0.98] data-ending-style:opacity-0",
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          data-slot="dialog-close"
          aria-label="Close"
          className={cn(
            "absolute top-4 right-4 flex size-7 items-center justify-center rounded-md border border-transparent text-muted-foreground transition-colors outline-none",
            "hover:bg-muted hover:text-foreground",
            "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          )}
        >
          <X className="size-4" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Popup>
    </DialogPrimitive.Portal>
  )
}

function DialogHeader({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-1 pr-8", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn("flex items-center justify-end gap-2", className)}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-base font-semibold text-foreground", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
