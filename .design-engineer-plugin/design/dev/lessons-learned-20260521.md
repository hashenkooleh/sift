---
activity: digest-screen-phase-1-app-shell
date: 2026-05-21
phase: phase_6_development
deliverable_type: lessons_learned
component: dev_frontend
status: complete
severity: medium
tags: [digest-screen, app-shell, sidebar, page-header, routing-fix, dev-pipeline]
related_deliverables:
  - ".design-engineer-plugin/plans/2026-05-21-nifty-prancing-moore.md"
  - ".design-engineer-plugin/development/decisions.md"
  - ".design-engineer-plugin/design/exploration/references.md"
tools_used: [claude-code, playwright-mcp]
decisions:
  - "Active nav-item state: grey elevated surface + 2px indigo edge bar — keeps prototype/Linear fidelity, satisfies references.md 'indigo', and fixes a psych-scanner change-blindness finding"
  - "Design System nav item moved from the primary nav to the footer beside Settings — it is an internal/dev surface, not content; leaves Digest/Sources/Archive as a clean triage spine"
  - "Sift logo wrapped as a link to / — standard logo-as-home convention"
  - "PageHeader exposes a single actions prop (the redundant children alternative was removed in code review)"
  - "src/app/page.tsx deleted to resolve a Next.js parallel-route conflict — / is now served solely by (dashboard)/page.tsx"
failed_approaches:
  - "Playwright CLI test scripts target a playwright-cli binary not installed in this environment — phase verification switched to Playwright MCP + screenshots per user decision; tests/*.sh stand as a written behavior spec only"
---

## What was done

Phase 1 of the 5-phase Digest screen build covered the app shell: the persistent sidebar and the reusable page header.

`src/components/layout/sidebar.tsx` is a client component. It renders a 240px slate panel with a 1px right hairline border. The Sift logo at the top is wrapped in a link to `/`. The primary nav contains three items – Digest, Sources, Archive – with route-driven active state driven by `usePathname`. Active items receive `aria-current="page"`, an elevated grey surface, and a 2px indigo edge bar on the left. A footer group holds Design System and Settings. At ≤768px the sidebar collapses to a 56px icon rail; every link in that state carries an `aria-label` and `title` attribute to satisfy accessible-name requirements.

`src/components/layout/page-header.tsx` is a server component. It accepts a required `title` rendered as an `h1`, an optional Geist Mono meta line for contextual metadata, and a right-aligned `actions` prop for slot content.

The sidebar was wired into `src/app/(dashboard)/layout.tsx` as the persistent shell for all dashboard routes. `src/app/page.tsx` was deleted to resolve a Next.js parallel-route conflict; `/` is now served exclusively by `(dashboard)/page.tsx`. Both components were documented on the `/design-system` catalog page under a new "Layout" nav group.

Branch: `feat/nifty-prancing-moore`.

---

## Key decisions

**Active nav-item state: grey elevated surface + 2px indigo edge bar.** The prototype and Linear's own UI both use this treatment. It directly satisfies the "indigo" language in `references.md` while also resolving a change-blindness finding raised by the psych scanner – a pure indigo fill was too subtle against the dark sidebar at normal reading distance.

**Design System nav item moved to the footer.** The primary nav (Digest / Sources / Archive) is the user's content triage spine. Design System is an internal developer surface and does not belong alongside content destinations. Moving it to the footer beside Settings keeps the primary nav semantically clean without hiding the catalog page.

**Sift logo linked to /.** This is the standard logo-as-home convention across Linear, Vercel, and virtually every SaaS product the references cite. No deliberation required; it was added by default.

**PageHeader exposes a single `actions` prop.** An earlier draft accepted both `actions` and `children` for the right-hand slot. The 3-agent code review flagged this as an unnecessary ambiguity. The `children` alternative was removed; `actions` is the single, explicit API.

**`src/app/page.tsx` deleted.** Next.js App Router treats a top-level `page.tsx` and a route-group `(dashboard)/page.tsx` at the same URL as a conflict. Deleting the top-level file is the correct resolution – the route group owns the `/` route from this point forward.

---

## What worked

Translating the frozen prototype into themed components was clean and direct. The prototype's layout measurements, token references, and component boundaries mapped 1:1 to the implementation without renegotiation.

The 3-agent code review pipeline caught two real issues before commit: an arbitrary font-size value that bypassed the design system's type scale, and the redundant `children` prop on PageHeader. Catching both pre-commit rather than in a later review cycle saved time.

The psych scanner surfaced a genuine WCAG accessible-name gap in the collapsed 56px icon rail – links had no visible label and no `aria-label`. This was fixed in the same session. The scanner also confirmed the change-blindness concern with the active state, which directly informed the grey-surface-plus-indigo-bar decision.

Surfacing the grey-vs-indigo active-state conflict to the user explicitly – rather than silently resolving it – kept the decision traceable and in the log.

---

## What did not work

The planned Playwright CLI verification scripts require a `playwright-cli` binary that is not installed in this environment. The test scripts in `tests/*.sh` remain in the repository as a written behavior specification, but they cannot be executed directly. Phase verification was switched to Playwright MCP with screenshots, per user decision.

The implementer's first two agent responses were also truncated and had to be continued before the output was complete. This added friction during the implementation pass but had no effect on the final output.

---

## Deliverable

Four files were created or modified this phase:

- `src/components/layout/sidebar.tsx` – new
- `src/components/layout/page-header.tsx` – new
- `src/app/(dashboard)/layout.tsx` – modified to wire in sidebar
- `src/app/page.tsx` – deleted (routing conflict resolution)

Both components are documented on the live `/design-system` catalog page under the "Layout" group. The full implementation plan is at `.design-engineer-plugin/plans/2026-05-21-nifty-prancing-moore.md`.

---

## Dependencies

This phase builds on the design-system retheme landed in the previous commit: the 3-layer token system in `globals.css`, the `--midnight` / `--slate` / `--signal` / `--dawn-white` semantic tokens, and the customized ShadCN base components. It also draws directly from `references.md` for visual direction and from `prototype.html` for layout measurements.

Phases 2 through 5 are all pending and depend on this shell being in place:

- **Phase 2** – base primitives: Checkbox, Dialog, Popover (base-ui backed, themed dark, documented)
- **Phase 3** – DigestCard and PendingItem
- **Phase 4** – FilterDropdown and modals (YouTubeParseModal, TelegramForwardModal)
- **Phase 5** – Digest screen assembly

---

## Open questions

`references.md` currently states the active nav item is "підсвічений індиго" (highlighted indigo). That description is now stale – the implemented treatment is a grey elevated surface with a 2px indigo edge bar, not a solid indigo highlight. The file needs a one-line correction to reflect the shipped state. This is logged as a stale dependent; it does not block Phase 2.

PageHeader is built and documented on the `/design-system` page but is not yet wired into the placeholder Sources, Archive, or Settings pages. Those pages will wire it in when their screens are built. This is intentional and outside the scope of the current 5-phase plan, which covers the Digest screen only.

---

## Context for next session

Phase 1 is complete and ready to commit on branch `feat/nifty-prancing-moore`.

Next is Phase 2: base primitives – Checkbox, Dialog, and Popover. These will be backed by base-ui, themed dark to match the design system, and documented on `/design-system` before being used in any screen components. The governing constraint across all five phases is a pure UI/UX pass: light frontend, no backend wiring, visual-only interactivity throughout.

Dev server: `npm run dev`. Port 3002 when 3000 is already occupied.
