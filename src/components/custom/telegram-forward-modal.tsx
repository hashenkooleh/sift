import type { ReactElement } from "react"
import { Info } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export interface TelegramForwardModalProps {
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
}

/**
 * The three forwarding steps. A step title is an array of runs; a run with
 * `mono` set renders in Geist Mono indigo — that is how the @SiftBot relay is
 * highlighted, without a stringly-typed match against the copy.
 */
const STEPS: { title: { text: string; mono?: boolean }[]; description: string }[] = [
  {
    title: [{ text: "Open any content in Telegram" }],
    description: "A post, link, video, article, file — anything.",
  },
  {
    title: [{ text: "Forward it to " }, { text: "@SiftBot", mono: true }],
    description: "Long press, Forward, then search for SiftBot.",
  },
  {
    title: [{ text: "It appears in your digest" }],
    description:
      "The agent processes it and adds a summary card to Pending, then to your feed.",
  },
]

/**
 * The "Forward via Telegram" modal — a Dialog walking the user through the
 * three-step forward flow, with the @SiftBot relay called out. Composes the
 * Phase-2 Dialog primitive (centered slate surface, 1px border, built-in close
 * X, backdrop / Escape dismiss).
 *
 * Visual-only (development/decisions.md, Decision 3): the modal opens and
 * closes; the steps are instructional, there is no submit.
 */
export function TelegramForwardModal({
  trigger,
  open,
  onOpenChange,
}: TelegramForwardModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogTrigger render={trigger} /> : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Forward via Telegram</DialogTitle>
        </DialogHeader>

        <ol className="flex flex-col gap-4">
          {STEPS.map((step, index) => (
            <li key={step.description} className="flex items-start gap-3">
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-xs font-semibold text-primary">
                {index + 1}
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {step.title.map((run, index) =>
                    run.mono ? (
                      <span key={index} className="font-mono text-primary">
                        {run.text}
                      </span>
                    ) : (
                      run.text
                    )
                  )}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-2.5">
          <Info aria-hidden className="size-3.5 shrink-0 text-primary" />
          <span className="text-xs text-muted-foreground">
            Works with links, text, files, forwarded messages — any content
            type.
          </span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
