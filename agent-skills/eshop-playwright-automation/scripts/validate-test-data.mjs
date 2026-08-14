#!/usr/bin/env node

import { readFile } from 'node:fs/promises';

const files = process.argv.slice(2);

if (files.length === 0) {
  console.error('Usage: node validate-test-data.mjs <file.json> [...]');
  process.exit(2);
}

let hasError = false;

for (const file of files) {
  try {
    const cases = JSON.parse(await readFile(file, 'utf8'));
    if (!Array.isArray(cases)) {
      throw new Error('root value must be an array');
    }

    const ids = cases.map((testCase) => testCase?.id);
    const missingIds = ids.filter(
      (id) => typeof id !== 'string' || id.trim().length === 0,
    ).length;
    const duplicateCount = ids.length - new Set(ids).size;

    if (cases.length < 12 || missingIds > 0 || duplicateCount > 0) {
      hasError = true;
      console.error(
        `${file}: INVALID (cases=${cases.length}, missingIds=${missingIds}, duplicates=${duplicateCount})`,
      );
    } else {
      console.log(`${file}: OK (${cases.length} unique test cases)`);
    }
  } catch (error) {
    hasError = true;
    console.error(`${file}: INVALID (${error.message})`);
  }
}

process.exit(hasError ? 1 : 0);
