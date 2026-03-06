// Basic usage of the PCP validate API
// Install: npm install pcp-engine
// Import from the lightweight validate path (zero MCP dependency)

import { validate, quickScore } from 'pcp-engine/validate';

// Simple pass/fail check
const result = validate('Fix the bug in auth.ts');
console.log(`Score: ${result.score}/100`);
console.log(`Pass: ${result.pass}`);
console.log(`Task type: ${result.task_type}`);
console.log(`Risk: ${result.risk_level}`);

if (!result.pass) {
  console.log('Issues:');
  result.issues.forEach(i => console.log(`  - ${i.rule}: ${i.message}`));
}

// With custom threshold
const strict = validate('Refactor the database layer', { threshold: 75 });
console.log(`Strict check: ${strict.pass ? 'PASS' : 'FAIL'}`);

// Quick score (just the number)
const score = quickScore('Write comprehensive unit tests for the payment module');
console.log(`Quick score: ${score}/100`);
