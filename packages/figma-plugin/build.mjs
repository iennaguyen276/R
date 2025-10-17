import { build } from 'esbuild';
import fs from 'fs/promises';

await fs.mkdir('dist', { recursive: true });
await build({
  entryPoints: ['src/main.ts'],
  outfile: 'dist/main.js',
  bundle: true,
  platform: 'browser',
  format: 'iife',
  target: ['es2020'],
});
console.log('Built Figma plugin');
