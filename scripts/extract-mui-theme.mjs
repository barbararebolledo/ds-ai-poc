/**
 * extract-mui-theme.mjs
 *
 * Installs @mui/material, calls createTheme() with default options,
 * and serialises the full resulting theme object to JSON.
 *
 * Usage:
 *   node scripts/extract-mui-theme.mjs
 *
 * Output:
 *   scripts/output/mui-default-theme.json
 *
 * The theme object contains functions (transitions.create, breakpoints.up, etc.)
 * that cannot be serialised to JSON. This script replaces functions with a
 * descriptor string so the output is valid JSON and the function's existence
 * is recorded.
 */

import { createTheme } from '@mui/material/styles';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputDir = join(__dirname, 'output');
const outputPath = join(outputDir, 'mui-default-theme.json');

// Create the default MUI theme with no overrides.
const theme = createTheme();

/**
 * Recursively process the theme object for JSON serialisation.
 * - Functions are replaced with "[Function: name]" descriptors.
 * - Circular references are caught and replaced with "[Circular]".
 * - Everything else passes through unchanged.
 */
function serialise(obj, seen = new WeakSet()) {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === 'function') return `[Function: ${obj.name || 'anonymous'}]`;
  if (typeof obj !== 'object') return obj;

  if (seen.has(obj)) return '[Circular]';
  seen.add(obj);

  if (Array.isArray(obj)) {
    return obj.map((item) => serialise(item, seen));
  }

  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = serialise(value, seen);
  }
  return result;
}

const serialisable = serialise(theme);

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, JSON.stringify(serialisable, null, 2), 'utf-8');

// Summary statistics for verification.
const keys = Object.keys(serialisable);
console.log(`Theme extracted successfully.`);
console.log(`Top-level keys: ${keys.join(', ')}`);
console.log(`Output: ${outputPath}`);
