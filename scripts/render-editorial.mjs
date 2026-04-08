/**
 * render-editorial.mjs
 *
 * Reads an editorial JSON file and renders an editable Markdown template
 * with field delimiters. The Markdown is the editing surface for
 * non-technical reviewers; it compiles back to JSON via compile-editorial.mjs.
 *
 * Usage:
 *   node scripts/render-editorial.mjs --system mui --version v3.1
 *
 * Input:
 *   audit/{system}/{version}/{system}-editorial-{version}.json
 *
 * Output:
 *   audit/{system}/{version}/{system}-editorial-{version}.md
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, '..');

// --- Parse args ---

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--system' && argv[i + 1]) {
      args.system = argv[++i];
    } else if (argv[i] === '--version' && argv[i + 1]) {
      args.version = argv[++i];
    }
  }
  return args;
}

const args = parseArgs(process.argv);
if (!args.system || !args.version) {
  console.error('Usage: node scripts/render-editorial.mjs --system <slug> --version <version>');
  console.error('  e.g. node scripts/render-editorial.mjs --system mui --version v3.1');
  process.exit(1);
}

const { system, version } = args;

// --- Resolve paths ---

// Map system slugs to directory names used in audit output.
const systemDirMap = {
  mui: 'material-ui',
  carbon: 'carbon',
};
const systemDir = systemDirMap[system] || system;

const jsonPath = join(repoRoot, 'audit', systemDir, version, `${system}-editorial-${version}.json`);
const mdPath = join(repoRoot, 'audit', systemDir, version, `${system}-editorial-${version}.md`);

// --- Read editorial JSON ---

const editorial = JSON.parse(readFileSync(jsonPath, 'utf-8'));

// --- Render helpers ---

function field(path, content) {
  const text = (content || '').trim();
  return `<!-- field: ${path} -->\n${text}\n<!-- /field -->`;
}

// --- Build Markdown ---

const lines = [];

lines.push(`# Editorial: ${editorial.meta.audit_ref}`);
lines.push(`<!-- audit_ref: ${editorial.meta.audit_ref} -->`);
lines.push('');
lines.push('> This file is the editing surface for non-technical reviewers.');
lines.push('> Edit the content between `<!-- field: ... -->` and `<!-- /field -->` delimiters.');
lines.push('> Run `node scripts/compile-editorial.mjs --system ' + system + ' --version ' + version + '` to compile back to JSON.');
lines.push('');
lines.push('---');
lines.push('');

// Report section
if (editorial.report) {
  lines.push('## Report');
  lines.push('');

  if (editorial.report.title !== undefined) {
    lines.push('### Title');
    lines.push('');
    lines.push(field('report.title', editorial.report.title));
    lines.push('');
  }

  if (editorial.report.executive_summary !== undefined) {
    lines.push('### Executive Summary');
    lines.push('');
    lines.push(field('report.executive_summary', editorial.report.executive_summary));
    lines.push('');
  }

  if (editorial.report.methodology_note !== undefined) {
    lines.push('### Methodology Note');
    lines.push('');
    lines.push(field('report.methodology_note', editorial.report.methodology_note));
    lines.push('');
  }

  lines.push('---');
  lines.push('');
}

// Clusters section
if (editorial.clusters && Object.keys(editorial.clusters).length > 0) {
  lines.push('## Clusters');
  lines.push('');

  for (const [key, cluster] of Object.entries(editorial.clusters)) {
    lines.push(`### ${key}`);
    lines.push('');

    if (cluster.narrative !== undefined) {
      lines.push('#### Narrative');
      lines.push('');
      lines.push(field(`clusters.${key}.narrative`, cluster.narrative));
      lines.push('');
    }

    if (cluster.value_framing !== undefined) {
      lines.push('#### Value Framing');
      lines.push('');
      lines.push(field(`clusters.${key}.value_framing`, cluster.value_framing));
      lines.push('');
    }
  }

  lines.push('---');
  lines.push('');
}

// Dimensions section
if (editorial.dimensions && Object.keys(editorial.dimensions).length > 0) {
  lines.push('## Dimensions');
  lines.push('');

  for (const [key, dim] of Object.entries(editorial.dimensions)) {
    lines.push(`### ${key}`);
    lines.push('');

    if (dim.narrative !== undefined) {
      lines.push('#### Narrative');
      lines.push('');
      lines.push(field(`dimensions.${key}.narrative`, dim.narrative));
      lines.push('');
    }
  }

  lines.push('---');
  lines.push('');
}

// Findings section
if (editorial.findings && Object.keys(editorial.findings).length > 0) {
  lines.push('## Findings');
  lines.push('');

  for (const [id, finding] of Object.entries(editorial.findings)) {
    lines.push(`### ${id}`);
    lines.push('');

    if (finding.summary !== undefined) {
      lines.push('#### Summary');
      lines.push('');
      lines.push(field(`findings.${id}.summary`, finding.summary));
      lines.push('');
    }

    if (finding.description !== undefined) {
      lines.push('#### Description');
      lines.push('');
      lines.push(field(`findings.${id}.description`, finding.description));
      lines.push('');
    }

    if (finding.recommendation !== undefined) {
      lines.push('#### Recommendation');
      lines.push('');
      lines.push(field(`findings.${id}.recommendation`, finding.recommendation));
      lines.push('');
    }
  }

  lines.push('---');
  lines.push('');
}

// Remediation section
if (editorial.remediation && Object.keys(editorial.remediation).length > 0) {
  lines.push('## Remediation');
  lines.push('');

  for (const [id, item] of Object.entries(editorial.remediation)) {
    lines.push(`### ${id}`);
    lines.push('');

    if (item.action !== undefined) {
      lines.push('#### Action');
      lines.push('');
      lines.push(field(`remediation.${id}.action`, item.action));
      lines.push('');
    }

    if (item.value_framing !== undefined) {
      lines.push('#### Value Framing');
      lines.push('');
      lines.push(field(`remediation.${id}.value_framing`, item.value_framing));
      lines.push('');
    }
  }
}

// --- Write ---

writeFileSync(mdPath, lines.join('\n') + '\n', 'utf-8');

const fieldCount = (lines.join('\n').match(/<!-- field:/g) || []).length;
console.log(`Rendered ${fieldCount} editable fields to ${mdPath}`);
