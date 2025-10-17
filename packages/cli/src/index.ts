#!/usr/bin/env node
import 'dotenv/config';
import { promises as fs } from 'fs';
import path from 'path';
import { PerplexityClient } from '@vyzzov/analysis';
import { createTokens } from '@vyzzov/tokens';
import { tokensToCss, tokensToJson } from '@vyzzov/exporters';

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'out');

async function ensureOutDir(): Promise<void> {
  await fs.mkdir(OUT_DIR, { recursive: true });
}

async function runAnalyze(): Promise<void> {
  const prompt = `Проанализируй данные проекта премии ВЫЗОВ:

БРИФ: Национальная премия в области будущих технологий, целевая аудитория 20-70 лет, основные разделы: о премии, номинации, подача заявок, результаты, новости.

ТЕКУЩИЕ ПРОБЛЕМЫ САЙТА: Устаревший дизайн, плохая навигация, отсутствие адаптивности, медленная загрузка, сложная подача заявок.

ТЕХНИЧЕСКИЕ ТРЕБОВАНИЯ: CMS MODX Revolution, адаптивность, WCAG 2.1 AA, интеграция с внешними системами, AI-автоматизация процессов.

ЦЕЛЕВЫЕ ПОЛЬЗОВАТЕЛИ:
- Соискатели премии (ученые, стартапы)
- Эксперты и члены жюри  
- Администраторы системы
- Медиа и общественность

Создай структурированный анализ:
1. Ключевые пользовательские сценарии
2. Функциональные требования к интерфейсу
3. Визуальные принципы и стиль
4. Архитектура информации
5. Компоненты дизайн-системы
6. Брендовые элементы премии ВЫЗОВ`;

  const client = new PerplexityClient();
  const analysis = await client.analyze(prompt);
  await ensureOutDir();
  const outPath = path.join(OUT_DIR, 'analysis.json');
  await fs.writeFile(outPath, JSON.stringify(analysis, null, 2), 'utf8');
  console.log(`Saved analysis to ${outPath}`);
}

async function loadBrandConfig(): Promise<any> {
  const cfgPath = process.env.BRAND_CONFIG_PATH || './brand.config.json';
  const abs = path.isAbsolute(cfgPath) ? cfgPath : path.join(ROOT, cfgPath);
  const raw = await fs.readFile(abs, 'utf8');
  return JSON.parse(raw);
}

async function runTokens(): Promise<void> {
  const brand = await loadBrandConfig().catch(() => ({}));
  const tokens = createTokens(brand);
  await ensureOutDir();
  await fs.writeFile(path.join(OUT_DIR, 'tokens.json'), tokensToJson(tokens), 'utf8');
  await fs.writeFile(path.join(OUT_DIR, 'tokens.css'), tokensToCss(tokens), 'utf8');
  console.log('Generated tokens: out/tokens.json and out/tokens.css');
}

async function main(): Promise<void> {
  const cmd = process.argv[2] || 'help';
  if (cmd === 'help' || cmd === '--help' || cmd === '-h') {
    console.log(`Usage: vyzzov <command>\n\nCommands:\n  analyze      Run Perplexity analysis and save JSON\n  tokens       Generate tokens and export CSS/JSON\n  all          Run analyze and tokens`);
    return;
  }

  if (cmd === 'analyze') {
    await runAnalyze();
    return;
  }
  if (cmd === 'tokens') {
    await runTokens();
    return;
  }
  if (cmd === 'all') {
    await runAnalyze();
    await runTokens();
    return;
  }

  console.error(`Unknown command: ${cmd}`);
  process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
