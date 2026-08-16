# HW04 – AI Automation Testing

**Student ID:** 23127414

**System Under Test:** EShop

**Framework:** Playwright

**Browsers:** Chromium, Firefox, WebKit

## Selected features

| Pool | Feature |
|---|---|
| A | FR-01 – Account registration |
| B | FR-11 – User order history |
| C | FR-14 – Category management |

## Test summary

| Feature | Automated test cases | Browser executions | Passed | Failed |
|---|---:|---:|---:|---:|
| FR-01 | 12 | 36 | 12 | 24 |
| FR-11 | 15 | 45 | 42 | 3 |
| FR-14 | 12 | 36 | 18 | 18 |
| **Total** | **39** | **117** | **72** | **45** |

- Feature–browser runs: **9**
- Distinct bugs documented: **9**
- GitHub Issues: [#1–#9](https://github.com/luanthuco11/23KTPM4-KTPM-HW4/issues)
- Test-script commits counted: **8**
- Task 2 demo video: [YouTube – Unlisted](https://youtu.be/wVz2drOVd2E)
- Agent Skill demo video: [YouTube – Unlisted](https://youtu.be/lPOh3j1v4oU)
- Public repository: <https://github.com/luanthuco11/23KTPM4-KTPM-HW4>

Failed assertions are retained when they consistently expose a genuine SUT defect. See [Bug Report](docs/Bug%20Report.md) and the archived HTML reports.

## Reports

- [FR-01 HTML report](reports/fr01/index.html)
- [FR-11 HTML report](reports/fr11/index.html)
- [FR-14 HTML report](reports/fr14/index.html)
- [Main Report](Main%20Report.md)
- [AI Audit Report](AI%20Audit%20Report.md)
- [AI Critique](AI%20Critique.md)
- [Git Commit Log](Git%20Commit%20Log.txt)
- [Agent Skill](agent-skills/eshop-playwright-automation/SKILL.md)

## Run the automation

```bash
npm install
npx playwright install chromium firefox webkit
npm run test:fr01
npm run test:fr11
npm run test:fr14
```

Playwright starts the backend, storefront, and admin frontend automatically when they are not already running.

## Self-assessment

| No. | Criterion | Maximum | Self-assessed |
|---:|---|---:|---:|
| 1 | Task 1 – Feature A (FR-01) | 25 | 25 |
| 2 | Task 1 – Feature B (FR-11) | 25 | 25 |
| 3 | Task 1 – Feature C (FR-14) | 25 | 25 |
| 4 | Task 2 – Demo video | 15 | 15 |
| 5 | Agent Skill | 10 | 10 |
|  | **Total** | **100** | **100** |

Suggested submission filename: `23127414_HW04_AI_Automation_100.zip`.
