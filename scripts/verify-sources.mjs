import fs from 'node:fs';
import path from 'node:path';
import { extractCitationEntries, verifyCitationUrl } from './verify-sources-core.mjs';

const DATA_FILES = [
  'src/data/dispatches.ts',
  'src/data/milestones.ts',
  'src/data/myths.ts',
];

const entries = DATA_FILES.flatMap((filePath) => {
  const src = fs.readFileSync(path.resolve(filePath), 'utf8');
  return extractCitationEntries(src).map((entry) => ({ ...entry, file: filePath }));
});

if (entries.length === 0) {
  console.error('No citationUrl entries found.');
  process.exit(1);
}

const results = await Promise.all(
  entries.map(async (entry) => ({
    ...entry,
    ...(await verifyCitationUrl(entry.url)),
  })),
);

let failures = 0;

for (const r of results) {
  const tag = r.ok ? 'PASS' : 'FAIL';
  if (!r.ok) failures += 1;
  const hopSummary =
    r.hops.length === 0
      ? '0 hops'
      : `${r.hops.length} hop(s): ${r.hops.map((h) => `${h.status} -> ${h.to}`).join(' | ')}`;
  const detail = r.ok ? r.title : `${r.reason}: ${r.title}`;
  console.log(`${tag} | ${r.file}#${r.id} | ${r.status} | ${hopSummary} | ${detail} | ${r.url}`);
}

console.log(`\nChecked ${results.length} source URLs: ${results.length - failures} passed, ${failures} failed.`);
process.exit(failures > 0 ? 1 : 0);
