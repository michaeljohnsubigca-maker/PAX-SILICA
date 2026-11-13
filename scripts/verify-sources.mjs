import fs from 'node:fs';
import path from 'node:path';

const DATA_FILES = [
  'src/data/dispatches.ts',
  'src/data/milestones.ts',
  'src/data/myths.ts',
];

const GENERIC_PATHS = new Set(['', '/', '/news', '/news/', '/business', '/business/']);

function extractCitations(filePath) {
  const src = fs.readFileSync(path.resolve(filePath), 'utf8');
  const entries = [];
  const blockRe = /id:\s*'([^']+)'[\s\S]*?citationUrl:\s*'([^']+)'/g;
  for (const match of src.matchAll(blockRe)) {
    entries.push({ file: filePath, id: match[1], url: match[2] });
  }
  return entries;
}

async function checkUrl(entry) {
  const parsed = new URL(entry.url);
  if (GENERIC_PATHS.has(parsed.pathname)) {
    return { ...entry, ok: false, status: 'GENERIC', title: `Generic path "${parsed.pathname}"` };
  }

  try {
    const res = await fetch(entry.url, {
      headers: { 'user-agent': 'Mozilla/5.0' },
      signal: AbortSignal.timeout(10000),
    });
    const html = await res.text();
    const title = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 80);
    return { ...entry, ok: res.status === 200, status: res.status, title };
  } catch (err) {
    return { ...entry, ok: false, status: 'ERR', title: err.message };
  }
}

const entries = DATA_FILES.flatMap(extractCitations);
if (entries.length === 0) {
  console.error('No citationUrl entries found.');
  process.exit(1);
}

const results = await Promise.all(entries.map(checkUrl));
let failures = 0;

for (const r of results) {
  const tag = r.ok ? 'PASS' : 'FAIL';
  if (!r.ok) failures += 1;
  console.log(`${tag} | ${r.file}#${r.id} | ${r.status} | ${r.title} | ${r.url}`);
}

console.log(`\nChecked ${results.length} source URLs: ${results.length - failures} passed, ${failures} failed.`);
process.exit(failures > 0 ? 1 : 0);
