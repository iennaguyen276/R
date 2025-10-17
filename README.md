## ВЫЗОВ — Автоматическая дизайн‑система (Cursor + Perplexity + Figma)

Проект генерирует полную дизайн‑систему и макеты сайта премии «ВЫЗОВ» в Figma, используя Cursor AI, Perplexity API и Figma Plugin API.

### Пакеты
- `packages/analysis`: анализ через Perplexity API, структурированные инсайты
- `packages/tokens`: генерация дизайн‑токенов (светлая/тёмная темы)
- `packages/exporters`: экспорт токенов в CSS и JSON
- `packages/figma-plugin`: Figma плагин (стили, компоненты, страницы, прототипы)
- `packages/cli`: CLI‑оркестратор

### Быстрый старт
1. Скопируйте `.env.example` в `.env` и заполните ключи
2. Установите зависимости: `npm i`
3. Запустите: `npm run cli` и следуйте подсказкам

### Переменные окружения
См. `.env.example`.

### Лицензия
MIT
