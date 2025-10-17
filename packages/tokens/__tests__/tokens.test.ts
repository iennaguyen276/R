import { describe, it, expect } from '@jest/globals';
import { createTokens } from '../src';

describe('tokens', () => {
  it('creates both light and dark themes', () => {
    const tokens = createTokens();
    expect(tokens.light.mode).toBe('light');
    expect(tokens.dark.mode).toBe('dark');
  });
});
