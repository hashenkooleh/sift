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
   * render prop. Phase 5 passes the header "Parse video" button here.
   */
  trigger: ReactElement
}

/**
 * The "Parse YouTube video" modal — a Dialog with a Geist Mono URL input and a
 * Parse action. Composes the Phase-2 Dialog primitive (centered slate surface,
 * 1px border, built-in close X, backdrop / Escape dismiss).
 *
 * Visual-only (development/decisions.md, Decision 3): the modal opens and
 * closes; Parse closes the modal but does not process a URL.
 */
export function YouTubeParseModal({ trigger }: YouTubeParseModalProps) {
  return (
    <Dialog>
      <DialogTrigger render={trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Parse YouTube video</DialogTitle>
          <DialogDescription>
            The agent extracts the transcript, captures key screenshots, writes
            a summary, and adds it to your digest.
          </DialogDescription>
        </DialogHeader>
        <Input
          type="url"
          placeholder="Paste YouTube URL..."
          className="font-mono"
        />
        <DialogFooter>
          <DialogClose render={<Button variant="ghost">Cancel</Button>} />
          <DialogClose render={<Button>Parse</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
