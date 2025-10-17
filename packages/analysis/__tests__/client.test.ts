import { describe, it, expect } from '@jest/globals';
import { AnalysisSchema } from '../src';

describe('Analysis schema', () => {
  it('validates minimal structure', () => {
    const data = {
      userScenarios: ['Submit application'],
      functionalRequirements: ['Multi-step form'],
      visualPrinciples: ['High contrast'],
      informationArchitecture: ['Home', 'About'],
      components: ['Button'],
      brandElements: ['Logo'],
    };
    expect(() => AnalysisSchema.parse(data)).not.toThrow();
  });
});
