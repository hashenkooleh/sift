import type { ReactElement } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export interface YouTubeParseModalProps {
  /**
   * The element that opens the modal — projected into DialogTrigger via its
   * render prop. Omit it when driving the modal with the controlled
   * `open` / `onOpenChange` pair.
   */
  trigger?: ReactElement
  /** Controlled open state. When set, the modal is driven externally. */
  open?: boolean
  /** Open-state change handler, paired with `open`. */
  onOpenChange?: (open: boolean) => void
  /** Dialog title. Defaults to the Parse-video wording. */
  title?: string
  /** Helper line under the title. Defaults to the Parse-video wording. */
  description?: string
  /** URL input placeholder. Defaults to the Parse-video wording. */
  placeholder?: string
}

/**
 * The parse-a-source modal — a Dialog with a Geist Mono URL input and a Parse
 * action. Defaults to the "Parse YouTube video" wording; pass title /
 * description / placeholder to reuse it for the generic "Parse URL" path
 * (article, GitHub), the way the prototype's "+" menu re-titles it.
 *
 * Composes the Phase-2 Dialog primitive (centered slate surface, 1px border,
 * built-in close X, backdrop / Escape dismiss).
 *
 * Visual-only (development/decisions.md, Decision 3): the modal opens and
 * closes; Parse closes the modal but does not process a URL.
 */
export function YouTubeParseModal({
  trigger,
  open,
  onOpenChange,
  title = "Parse YouTube video",
  description = "The agent extracts the transcript, captures key screenshots, writes a summary, and adds it to your digest.",
  placeholder = "Paste YouTube URL...",
}: YouTubeParseModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogTrigger render={trigger} /> : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Input type="url" placeholder={placeholder} className="font-mono" />
        <DialogFooter>
          <DialogClose render={<Button variant="ghost">Cancel</Button>} />
          <DialogClose render={<Button>Parse</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
