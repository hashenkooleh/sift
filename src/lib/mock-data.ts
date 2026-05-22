/*
 * Typed fixtures for the Digest screen, populated from prototype.html.
 *
 * Light-frontend run: there is no Supabase yet, so the screen imports these
 * directly. Everything is typed against ./types — when the data layer ships,
 * these fixtures are replaced by real queries with no type changes.
 */

import type { DigestEntry, PendingEntry, Source } from "./types"

/** The five connected Telegram channels — Sources screen and filter list. */
export const sources: Source[] = [
  {
    id: "src-ux-unicorn",
    name: "UX Unicorn",
    type: "telegram",
    url: "@uxunicorn",
    priority: "high",
    enabled: true,
    createdAt: "2026-01-12T09:00:00Z",
  },
  {
    id: "src-ds-hub",
    name: "Design Systems Hub",
    type: "telegram",
    url: "@dshub",
    priority: "high",
    enabled: true,
    createdAt: "2026-01-20T09:00:00Z",
  },
  {
    id: "src-ai-design",
    name: "AI for Design",
    type: "telegram",
    url: "@aidesign",
    priority: "medium",
    enabled: true,
    createdAt: "2026-02-03T09:00:00Z",
  },
  {
    id: "src-design-ua",
    name: "Telegram Design UA",
    type: "telegram",
    url: "@designua",
    priority: "low",
    enabled: true,
    createdAt: "2026-02-15T09:00:00Z",
  },
  {
    id: "src-figma-tips",
    name: "Figma Tips",
    type: "telegram",
    url: "@figmatips",
    priority: "low",
    enabled: false,
    createdAt: "2026-03-01T09:00:00Z",
  },
]

/**
 * Today's digest feed — the four Telegram cards from the prototype.
 * Ordered high → medium → low; the feed renders this ranking.
 */
export const digestEntries: DigestEntry[] = [
  {
    id: "sum-figma-ai-components",
    sourceType: "telegram",
    sourceName: "UX Unicorn",
    sourceHandle: "@uxunicorn",
    priority: "high",
    title:
      "Figma оголосила нові AI-функції для автогенерації компонентів з текстових описів",
    summary:
      "Figma представила AI-асистента, який генерує компоненти дизайн-системи з текстових промптів. Підтримує auto-layout, variants і token mapping. Поки що в бета для Enterprise планів. Спільнота обговорює, наскільки це замінить ручне створення компонентів vs. буде стартовою точкою для ітерацій.",
    timestamp: "2h ago",
  },
  {
    id: "sum-design-tokens-api",
    sourceType: "telegram",
    sourceName: "Design Systems Hub",
    sourceHandle: "@dshub",
    priority: "high",
    title: "Новий підхід до design tokens: від статичних JSON до live API",
    summary:
      "Стаття про перехід від статичних design token файлів (JSON/YAML) до live token API, який оновлюється в реальному часі. Переваги: instant propagation змін, A/B тестування на рівні токенів, version control без ребілду. Недоліки: додаткова інфраструктура, latency при першому завантаженні.",
    timestamp: "5h ago",
  },
  {
    id: "sum-claude-code-46",
    sourceType: "telegram",
    sourceName: "AI for Design",
    sourceHandle: "@aidesign",
    priority: "medium",
    title: "Claude Code 4.6 — нові можливості для дизайнерів",
    summary:
      "Огляд нових фіч Claude Code для дизайн-workflow: покращений frontend-design skill, підтримка Figma MCP для code↔design sync, і новий prototype generation з ShadCN компонентами. Автор рекомендує оновити плагін design-engineer до останньої версії для повної сумісності.",
    timestamp: "8h ago",
    markedUseful: true,
  },
  {
    id: "sum-ui-trends-2026",
    sourceType: "telegram",
    sourceName: "Telegram Design UA",
    sourceHandle: "@designua",
    priority: "low",
    title: "Тренди UI 2026: мінімалізм повертається з темною темою",
    summary:
      "Огляд трендів — dark-first design стає дефолтом для productivity tools. Linear, Vercel, Raycast задали планку. Автор аналізує 15 нових SaaS продуктів і знаходить спільний патерн: 1px borders, Geist/Inter fonts, single accent color.",
    timestamp: "12h ago",
  },
]

/** Items the agent is still processing — rendered above the feed. */
export const pendingEntries: PendingEntry[] = [
  {
    id: "pending-youtube",
    sourceType: "youtube",
    label: "youtube.com/watch?v=dQw4w9W...",
    status: "Extracting transcript + screenshots...",
    eta: "~45s left",
  },
  {
    id: "pending-telegram",
    sourceType: "telegram",
    label: "Forwarded from Telegram",
    status: "Generating summary...",
    eta: "~10s left",
  },
]
