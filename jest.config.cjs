/** @type {import('jest').Config} */
module.exports = {
  roots: ['<rootDir>/packages'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: {
          target: 'ES2022',
          module: 'commonjs',
          moduleResolution: 'node',
          esModuleInterop: true,
          resolveJsonModule: true,
          strict: true,
        },
      },
    ],
  },
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts', '**/?(*.)+(spec|test).ts'],
  moduleNameMapper: {
    '^(.*)\\.js$': '$1',
  },
};
