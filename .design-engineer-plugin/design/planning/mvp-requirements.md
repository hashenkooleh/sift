# MVP requirements

## Validation goal

Перевірити, чи щоденний дайджест з Telegram-каналів замінить ранкове гортання Telegram і допоможе швидше знаходити підходи до клієнтських задач. Success = щоденне використання протягом 90 днів.

## Architecture

- **Frontend:** Next.js + ShadCN UI
- **Database:** Supabase (PostgreSQL)
- **AI layer:** Claude Code agent (scheduled, використовує існуючу підписку)
- **Content source:** Telegram API (user account, not bot)
- **Hosting:** Vercel free tier
- **Trigger:** Cron job о 08:00

## ICE prioritization

| # | Feature | Impact | Confidence | Ease | ICE | Tier |
|---|---------|--------|------------|------|-----|------|
| 1 | Telegram aggregation (5–10 каналів) | 10 | 10 | 9 | 900 | MVP |
| 2 | Supabase schema (з полями для майбутнього AI) | 9 | 10 | 8 | 720 | MVP |
| 3 | Dashboard UI (головний екран з дайджестом) | 10 | 9 | 7 | 630 | MVP |
| 4 | Daily trigger о 08:00 | 8 | 9 | 8 | 576 | MVP |
| 5 | Claude Code agent для саммарі | 9 | 8 | 6 | 432 | MVP |
| 6 | Schema fields for future AI (tags, embeddings) | 5 | 8 | 9 | 360 | MVP |
| 7 | Source priority levels | 7 | 7 | 7 | 343 | MVP |
| 8 | "Mark useful" feedback button | 6 | 7 | 8 | 336 | MVP |
| 9 | YouTube integration | 8 | 7 | 4 | 224 | Post-MVP |
| 10 | AI clustering | 8 | 6 | 4 | 192 | Post-MVP |
| 11 | Onboarding flow | 5 | 5 | 5 | 125 | Parking lot |
| 12 | Trend detection | 7 | 5 | 3 | 105 | Parking lot |
| 13 | X/Threads integration | 6 | 4 | 3 | 72 | Parking lot |
| 14 | Contradiction spotting | 8 | 4 | 2 | 64 | Parking lot |

## MVP features (8 items, 2-week scope)

### 1. Telegram aggregation

**Acceptance criteria:**
- Читає нові повідомлення з 5–10 підключених каналів через Telegram API (user account)
- Зберігає повідомлення в Supabase з metadata (канал, дата, автор, текст)
- Список каналів конфігурується (додавання/видалення)

### 2. Supabase schema

**Acceptance criteria:**
- Таблиці: sources, messages, summaries, user_feedback
- Поля для майбутнього AI: tags (JSONB), embedding (vector), cluster_id
- Row-level security налаштовано для одного користувача

### 3. Dashboard UI

**Acceptance criteria:**
- Головний екран показує дайджест за сьогодні
- Картки з саммарі, source attribution, timestamp
- Фільтр по джерелах і пріоритетах
- Responsive (працює на ноутбуці і телефоні)
- ShadCN компоненти, чистий мінімальний дизайн

### 4. Daily trigger о 08:00

**Acceptance criteria:**
- Cron job запускається о 08:00 щодня
- Збирає нові повідомлення з Telegram з останніх 24 годин
- Передає їх Claude Code agent для обробки
- Результат зберігається в Supabase

### 5. Claude Code agent для саммарі

**Acceptance criteria:**
- Отримує batch нових повідомлень
- Генерує саммарі для кожного каналу (3–5 речень)
- Виділяє ключові теми і тренди
- Зберігає саммарі в Supabase

### 6. Source priority levels

**Acceptance criteria:**
- Кожне джерело має рівень пріоритету (high / medium / low)
- Дайджест сортується за пріоритетом
- UI для зміни пріоритету

### 7. "Mark useful" feedback button

**Acceptance criteria:**
- На кожній картці дайджесту є кнопка "корисно"
- Натискання зберігається в user_feedback таблиці
- Дані використовуються пізніше для AI training

### 8. Schema fields for future AI

**Acceptance criteria:**
- tags (JSONB) на кожному message і summary
- embedding (vector) column — пустий на MVP, заповниться пізніше
- cluster_id — пустий на MVP

## Post-MVP (тижні 3–4)

### YouTube integration
- Парсинг транскрипцій + періодичні скріншоти
- AI аналіз відео через Claude Code agent
- Збереження в ту ж Supabase schema

### AI clustering
- Групування схожих тем з різних джерел
- Візуальне відображення кластерів на dashboard

## Parking lot

| Feature | Reason deferred |
|---------|----------------|
| Onboarding flow | Один користувач на MVP — onboarding не потрібен |
| Trend detection | Потребує накопичених даних за кілька тижнів |
| X/Threads integration | API обмеження, низький пріоритет порівняно з Telegram |
| Contradiction spotting | Найскладніша AI фіча, потребує working AI layer |

## Constraints

- Час не обмежений — якість важливіше за швидкість. Орієнтовно 2+ місяці
- Один розробник (автор) з Claude Code як інструментом
- Безкоштовні тарифи для всієї інфраструктури
- Один користувач на MVP
- Custom design system на базі ShadCN з вбудованою Design System page (Storybook-like)

## Kill criteria

- **День 30:** Якщо не відкриваєш дайджест щодня — pivot або stop
- **День 60:** Якщо жодного разу не знайшов підхід до задачі швидше — AI layer не вирішить проблему, яка не існує
