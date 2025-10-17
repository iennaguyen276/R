import type { DesignTokens, ThemeTokens } from '@vyzzov/tokens';

function themeToCss(theme: ThemeTokens): string {
  const lines: string[] = [];
  const prefix = theme.mode === 'dark' ? '.theme-dark' : '.theme-light';

  const add = (name: string, value: string | number) => {
    lines.push(`  --${name}: ${value};`);
  };

  lines.push(`${prefix} {`);

  add('background', theme.color.background);
  add('foreground', theme.color.foreground);

  theme.color.primary.forEach((c: string, i: number) => add(`color-primary-${i + 1}`, c));
  theme.color.secondary.forEach((c: string, i: number) => add(`color-secondary-${i + 1}`, c));

  Object.entries(theme.color.semantic).forEach(([k, v]: [string, string]) => add(`color-${k}`, v));
  Object.entries(theme.color.neutral).forEach(([k, v]: [string, string]) => add(`color-neutral-${k}`, v));

  Object.entries(theme.color.gradients).forEach(([k, v]: [string, string]) => add(`gradient-${k}`, v));

  // Typography
  add('font-primary', theme.typography.fontFamilies.primary);
  add('font-secondary', theme.typography.fontFamilies.secondary);
  theme.typography.fontSizes.forEach((s: number) => add(`font-size-${s}`, `${s}px`));
  theme.typography.fontWeights.forEach((w: number) => add(`font-weight-${w}`, w));
  Object.entries(theme.typography.lineHeights).forEach(([k, v]: [string, number]) => add(`line-height-${k}`, `${v}px`));
  Object.entries(theme.typography.letterSpacing).forEach(([k, v]: [string, number]) => add(`letter-spacing-${k}`, `${v}px`));

  // Spacing
  theme.space.spacing.forEach((s: number) => add(`space-${s}`, `${s}px`));
  add('container-mobile', `${theme.space.containerWidths.mobile}px`);
  add('container-tablet', `${theme.space.containerWidths.tablet}px`);
  add('container-desktop', `${theme.space.containerWidths.desktop}px`);

  // Component sizes
  Object.entries(theme.space.componentHeights.button).forEach(([k, v]: [string, number]) => add(`button-${k}-height`, `${v}px`));
  Object.entries(theme.space.componentHeights.input).forEach(([k, v]: [string, number]) => add(`input-${k}-height`, `${v}px`));

  // Effects
  theme.effects.borderRadius.forEach((r: number) => add(`radius-${r}`, `${r}px`));
  Object.entries(theme.effects.shadows).forEach(([k, v]: [string, string]) => add(`shadow-${k}`, v));
  theme.effects.transitions.durations.forEach((d: number) => add(`transition-duration-${d}`, `${d}ms`));
  add('transition-easing', theme.effects.transitions.easing);

  lines.push('}');
  return lines.join('\n');
}

export function tokensToCss(tokens: DesignTokens): string {
  return [themeToCss(tokens.light), themeToCss(tokens.dark)].join('\n\n');
}

export function tokensToJson(tokens: DesignTokens): string {
  return JSON.stringify(tokens, null, 2);
}
