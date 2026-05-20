# Business plan

## Value proposition

Intelligence layer для дизайнерів поверх Telegram, YouTube і веб-джерел. Агрегує контент з обраних каналів, структурує в ранковий дайджест, допомагає знаходити релевантні підходи до робочих задач. Не "ще одне сховище" — а простір, де збережене залишається корисним.

## Business model

**Модель: безкоштовний pet-проект з можливістю масштабування.**

Phase 1 (0–3 місяці): Особисте використання. Автор — єдиний користувач. Нуль витрат окрім хостингу (Vercel free tier, Supabase free tier).

Phase 2 (3–6 місяців): Відкрити доступ для 3–5 колег-дизайнерів. Безкоштовно. Витрати покриває автор.

Phase 3 (6+ місяців, якщо є попит): Оцінити, чи варто вводити платний tier. Рішення приймається на основі реальних витрат і фідбеку, не заздалегідь.

**Чому не монетизація з першого дня:** Це learning project. Цінність для автора — навчання (Claude Code, Next.js, ShadCN, product design process) + особиста продуктивність. Грошова окупність не є метрикою успіху.

## Tech stack

- **Frontend:** Next.js + ShadCN UI library
- **Hosting:** Vercel (free tier для MVP)
- **Database:** Supabase (free tier для MVP)
- **Telegram:** Bot API (безкоштовний)
- **YouTube:** Data API (безкоштовна квота достатня)
- **AI layer:** TBD — без API на MVP, визначиться після dogfooding
- **Development:** Claude Code як основний інструмент розробки

## Cost structure

| Категорія | MVP (Phase 1) | Phase 2 (5 users) |
|-----------|--------------|-------------------|
| Хостинг (Vercel) | $0 (free tier) | $0–20/мо |
| База даних (Supabase) | $0 (free tier) | $0–25/мо |
| Telegram Bot API | $0 | $0 |
| YouTube Data API | $0 (quota sufficient) | $0 |
| AI layer | TBD — без API на MVP | TBD |
| Домен | ~$12/рік | ~$12/рік |
| **Разом** | **~$1/мо** | **$0–45/мо** |

Найбільший ризик по costs — AI layer. Якщо додати Claude/OpenAI API для кластеризації і trend detection, це $20–100/мо залежно від обсягу контенту. Рішення відкладено до post-MVP.

## Success criteria

Продукт успішний, якщо протягом 90 днів:

1. Автор кожен ранок відкриває дайджест замість Telegram (щоденна звичка сформована)
2. Хоча б раз на тиждень знаходить підхід до клієнтської задачі швидше завдяки продукту
3. Збережена інформація не перетворюється на звалище — база залишається navigable
4. Автор не витрачає більше 2 годин на тиждень на підтримку (решта 6 годин — нові фічі)

## Timeline

| Milestone | Час |
|-----------|-----|
| MVP (Telegram aggregation + basic digest) | 2 тижні |
| YouTube integration | +1 тиждень |
| Daily digest format (structured, prioritized) | +1 тиждень |
| Dogfooding (30 днів особистого використання) | +4 тижні |
| Відкрити для колег | Після dogfooding |

## Risks

1. **P5: продукт стає звалищем.** Mitigation: daily digest format з лімітом на кількість items, автоматичний archive після 30 днів
2. **Telegram API обмеження.** Mitigation: автор вже перевірив — працює; але rate limits можуть вплинути при масштабуванні
3. **Час на підтримку з'їдає час на фічі.** Mitigation: ShadCN + Next.js мінімізують boilerplate; Claude Code прискорює розробку
4. **AI layer costs при масштабуванні.** Mitigation: відкладено до post-MVP; спочатку ручна курація

## Competitive pricing context

Якщо колись знадобиться монетизація:

- Brief Digest: $2.99/мо (AI clustering включено безкоштовно)
- Feedly Pro: $6.99/мо (без AI), Pro+: $12.99/мо (з AI)
- Readwise: $9.99/мо
- Sweet spot для нашого продукту: $5–9/мо (Telegram moat + designer vertical + cross-source intelligence)
- Free tier має включати AI clustering — інакше програємо Brief Digest

Ці дані з competitor-analysis.md — не pricing decisions, а context для майбутнього.
