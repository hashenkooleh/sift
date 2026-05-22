"use client"

/*
 * DigestHeaderActions — the interactive cluster in the Digest PageHeader.
 *
 * This is the page's only client island. The Digest page itself stays a server
 * component; it renders the fixtures and drops this component into the
 * PageHeader `actions` slot. Kept co-located with the page (not in the design
 * system) because it is specific to the Digest header, not reusable.
 *
 * Contents: a "~15 min read" badge, the primary "Parse video" button, and a
 * "+" capture menu.
 *
 * Popover-then-Dialog nesting:
 * The "+" menu is a Popover; two of its rows open a Dialog. A Dialog trigger
 * living inside the Popover does not work — closing the Popover unmounts the
 * trigger mid-click and the Dialog never opens. So the menu and both modals are
 * controlled here: a row click closes the Popover and flips the modal's `open`
 * in one handler. The two state changes are ordered, not a race on one node.
 */

import { useState } from "react"
import { Link2, Plus, Send, SquarePlay, Upload } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { YouTubeParseModal } from "@/components/custom/youtube-parse-modal"
import { TelegramForwardModal } from "@/components/custom/telegram-forward-modal"

/** One row inside the "+" capture menu. */
function MenuRow({
  icon: Icon,
  children,
  disabled,
  hint,
  onSelect,
}: {
  icon: LucideIcon
  children: React.ReactNode
  disabled?: boolean
  hint?: string
  onSelect?: () => void
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSelect}
      className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground focus-visible:outline-none disabled:pointer-events-none disabled:text-faint"
    >
      <Icon className="size-3.5 shrink-0" />
      <span className="flex-1">{children}</span>
      {hint ? (
        <span className="font-mono text-[10px] text-faint">{hint}</span>
      ) : null}
    </button>
  )
}

/** Which modal, if any, is open. Only one surface is ever open. */
type OpenModal = "parse" | "forward" | null

export function DigestHeaderActions() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openModal, setOpenModal] = useState<OpenModal>(null)

  /** Close the "+" menu, then open a modal — ordered, never racing. */
  function selectFromMenu(modal: Exclude<OpenModal, null>) {
    setMenuOpen(false)
    setOpenModal(modal)
  }

  return (
    <>
      <span className="rounded-md bg-primary/15 px-2.5 py-1 font-mono text-xs text-primary">
        ~15 min read
      </span>

      {/* Primary capture action — a plain Dialog trigger, no Popover around it. */}
      <YouTubeParseModal
        trigger={
          <Button variant="outline" size="sm">
            <SquarePlay />
            Parse video
          </Button>
        }
      />

      {/* Secondary capture actions — tucked into a Popover menu. */}
      <Popover open={menuOpen} onOpenChange={setMenuOpen}>
        <PopoverTrigger
          render={
            <Button variant="outline" size="icon-sm" aria-label="Add content">
              <Plus />
            </Button>
          }
        />
        <PopoverContent align="end" className="min-w-[220px] p-1">
          <MenuRow icon={Link2} onSelect={() => selectFromMenu("parse")}>
            Parse URL (article, GitHub…)
          </MenuRow>
          <MenuRow icon={Upload} disabled hint="soon">
            Upload file (PDF, doc…)
          </MenuRow>
          <div className="my-1 h-px bg-border" />
          <MenuRow icon={Send} onSelect={() => selectFromMenu("forward")}>
            Forward via Telegram
          </MenuRow>
        </PopoverContent>
      </Popover>

      {/* Controlled modals — opened by the menu rows above. "Parse URL" reuses
       * the parse modal with article/GitHub wording (the prototype's "+" menu
       * re-titles the same modal this way). */}
      <YouTubeParseModal
        open={openModal === "parse"}
        onOpenChange={(open) => setOpenModal(open ? "parse" : null)}
        title="Parse URL"
        description="The agent extracts the text, writes a summary, and adds it to your digest."
        placeholder="Paste any URL (article, GitHub)..."
      />
      <TelegramForwardModal
        open={openModal === "forward"}
        onOpenChange={(open) => setOpenModal(open ? "forward" : null)}
      />
    </>
  )
}
