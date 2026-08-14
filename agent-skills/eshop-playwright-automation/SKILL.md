---
name: eshop-playwright-automation
description: Build, review, execute, and maintain data-driven Playwright automation for EShop web features. Use when converting manual EShop test cases into external JSON/CSV data, Page Objects, multi-browser tests, evidence-rich HTML reports, or when reviewing AI-generated tests for weak assertions, fragile selectors, flaky waits, missing edge cases, and genuine SUT defects.
---

# EShop Playwright Automation

Create reproducible Playwright tests while preserving the distinction between automation defects and SUT defects.

## Workflow

1. Read the feature requirement, existing manual test cases, relevant UI component, and backend endpoint.
2. Define at least 12 single-purpose cases covering positive, negative, boundary, authorization, and state behavior where applicable.
3. Store all case inputs and expected outcomes in JSON or CSV. Do not embed test-case arrays in the spec.
4. Run `node scripts/validate-test-data.mjs <data files>` to reject undersized datasets, missing IDs, and duplicate IDs.
5. Create a Page Object using role, label, placeholder, or test-id locators. Use scoped CSS only when the SUT lacks accessible associations.
6. Create unique test data per browser and worker. Prefer public API setup for prerequisites; do not alter production code to make a test pass.
7. Use at least three assertion patterns across the feature, including a business-result assertion rather than only visibility checks.
8. Run the feature on Chromium, Firefox, and WebKit. Configure screenshots, video, and traces for failed tests.
9. Put `Run by: <StudentID>` and an ISO timestamp in report metadata. Verify the generated report contains both values.
10. Review every failure. Re-run across browsers, inspect the trace, and classify it as test defect, environment issue, or SUT defect.
11. Fix only automation defects. Keep assertions aligned with the requirement when a repeatable SUT defect is found.
12. Archive the HTML report and attach clear evidence to a Markdown bug report and GitHub Issue.

## Human Review Rules

- Replace positional selectors when a stable semantic selector exists.
- Replace fixed sleeps with condition-based waiting.
- Avoid assertions that can pass for the wrong reason, especially when another invalid input blocks the path first.
- Keep setup and expected results deterministic across repeated runs.
- Restore or isolate mutated demo data after execution.
- Record the prompt, AI output, human correction, and reason for the correction in the AI Audit Report.

Read [references/review-checklist.md](references/review-checklist.md) before finalizing a feature or report.

## Completion Gate

Do not mark a feature complete until it has separate data, at least 12 unique cases, three assertion patterns, three-browser execution, verified report metadata, human review notes, and defect evidence for every genuine failing behavior.
