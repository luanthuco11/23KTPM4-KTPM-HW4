#!/usr/bin/env node

import { readFile } from 'node:fs/promises';

const files = process.argv.slice(2);

if (files.length === 0) {
  console.error('Cách dùng: node validate-test-data.mjs <file.json> [...]');
  process.exit(2);
}

let hasError = false;

for (const file of files) {
  try {
    const cases = JSON.parse(await readFile(file, 'utf8'));
    if (!Array.isArray(cases)) {
      throw new Error('giá trị gốc phải là một mảng');
    }

    const ids = cases.map((testCase) => testCase?.id);
    const missingIds = ids.filter(
      (id) => typeof id !== 'string' || id.trim().length === 0,
    ).length;
    const duplicateCount = ids.length - new Set(ids).size;

    if (cases.length < 12 || missingIds > 0 || duplicateCount > 0) {
      hasError = true;
      console.error(
        `${file}: KHÔNG HỢP LỆ (số test=${cases.length}, thiếu ID=${missingIds}, trùng ID=${duplicateCount})`,
      );
    } else {
      console.log(`${file}: HỢP LỆ (${cases.length} test case có ID duy nhất)`);
    }
  } catch (error) {
    hasError = true;
    console.error(`${file}: KHÔNG HỢP LỆ (${error.message})`);
  }
}

process.exit(hasError ? 1 : 0);
