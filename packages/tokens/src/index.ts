export type ThemeMode = 'light' | 'dark';

export interface ColorScale {
  [key: string]: string;
}

export interface SemanticColors {
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface TypographyTokens {
  fontFamilies: { primary: string; secondary: string };
  fontSizes: number[];
  fontWeights: number[];
  lineHeights: { [px: number]: number };
  letterSpacing: { [px: number]: number };
}

export interface SpacingTokens {
  spacing: number[];
  containerWidths: { mobile: number; tablet: number; desktop: number };
  componentHeights: { button: { sm: number; md: number; lg: number }; input: { sm: number; md: number; lg: number } };
}

export interface EffectsTokens {
  borderRadius: number[];
  shadows: { subtle: string; medium: string; large: string };
  transitions: { durations: number[]; easing: string };
}

export interface ThemeTokens {
  mode: ThemeMode;
  color: {
    primary: string[];
    secondary: string[];
    semantic: SemanticColors;
    neutral: ColorScale;
    gradients: { [name: string]: string };
    background: string;
    foreground: string;
  };
  typography: TypographyTokens;
  space: SpacingTokens;
  effects: EffectsTokens;
}

export interface DesignTokens {
  light: ThemeTokens;
  dark: ThemeTokens;
}

export function createTokens(brandConfig?: {
  primary?: { [k: string]: string };
  accent?: { [k: string]: string };
  neutral?: ColorScale;
  typography?: { primary: string; secondary: string };
}): DesignTokens {
  const semantic: SemanticColors = {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  };

  const neutral = brandConfig?.neutral ?? {
    '50': '#F9FAFB',
    '100': '#F3F4F6',
    '200': '#E5E7EB',
    '300': '#D1D5DB',
    '400': '#9CA3AF',
    '500': '#6B7280',
    '600': '#4B5563',
    '700': '#374151',
    '800': '#1F2937',
    '900': '#111827',
  };

  const primaryArray = Object.values(brandConfig?.primary ?? {
    blue: '#1D4ED8',
    violet: '#6D28D9',
    cyan: '#06B6D4',
  });
  const secondaryArray = Object.values(brandConfig?.accent ?? {
    yellow: '#F59E0B',
    green: '#10B981',
  });

  const gradients = {
    spectrum: `linear-gradient(135deg, ${primaryArray[0]} 0%, ${primaryArray[1]} 50%, ${primaryArray[2] ?? primaryArray[0]} 100%)`,
    aurora: `radial-gradient(circle at 20% 20%, ${secondaryArray[0]}, transparent 60%), radial-gradient(circle at 80% 80%, ${secondaryArray[1]}, transparent 60%)`,
  };

  const typography: TypographyTokens = {
    fontFamilies: {
      primary: brandConfig?.typography?.primary ?? 'Inter',
      secondary: brandConfig?.typography?.secondary ?? 'IBM Plex Sans',
    },
    fontSizes: [12, 14, 16, 18, 20, 24, 28, 32, 40, 48, 56, 64],
    fontWeights: [400, 500, 600, 700, 800],
    lineHeights: { 12: 16, 14: 20, 16: 24, 18: 26, 20: 28, 24: 32, 28: 36, 32: 40, 40: 48, 48: 56, 56: 64, 64: 72 },
    letterSpacing: { 12: 0, 14: 0, 16: 0, 18: 0, 20: 0, 24: -0.2, 28: -0.2, 32: -0.2, 40: -0.4, 48: -0.4, 56: -0.4, 64: -0.6 },
  };

  const space: SpacingTokens = {
    spacing: [4, 8, 12, 16, 24, 32, 48, 64, 96],
    containerWidths: { mobile: 375, tablet: 768, desktop: 1200 },
    componentHeights: { button: { sm: 32, md: 40, lg: 48 }, input: { sm: 36, md: 40, lg: 48 } },
  };

  const effects: EffectsTokens = {
    borderRadius: [4, 8, 12, 16, 24],
    shadows: {
      subtle: '0 1px 2px rgba(0,0,0,0.06), 0 1px 1px rgba(0,0,0,0.04)',
      medium: '0 4px 12px rgba(0,0,0,0.08)',
      large: '0 12px 24px rgba(0,0,0,0.12)',
    },
    transitions: { durations: [150, 250], easing: 'ease-in-out' },
  };

  const light: ThemeTokens = {
    mode: 'light',
    color: {
      primary: primaryArray,
      secondary: secondaryArray,
      semantic,
      neutral,
      gradients,
      background: '#ffffff',
      foreground: '#0B1220',
    },
    typography,
    space,
    effects,
  };

  const dark: ThemeTokens = {
    mode: 'dark',
    color: {
      primary: primaryArray,
      secondary: secondaryArray,
      semantic,
      neutral,
      gradients,
      background: '#0B1220',
      foreground: '#F5F7FA',
    },
    typography,
    space,
    effects,
  };

  return { light, dark };
}
