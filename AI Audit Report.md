# AI Audit Report

## Declaration

**I use AI tools for the following tasks:** interpreting HW04 requirements, identifying the three features selected in HW02, transferring the SUT, planning the workflow, generating and reviewing Playwright automation, analysing execution failures, creating reports, drafting documentation, and creating an Agent Skill.

AI tool: **OpenAI Codex (GPT-5 family)**  
Session date: **2026-08-14**  
Timezone: **Asia/Saigon (UTC+07:00)**

## Interaction log

### Interaction 1 – 18:30–18:39

- Prompt: `Hãy đọc file 2026.HW04.Automation Testing_En, dịch sang tiếng việt và giải thích cho tôi phải làm những gì`
- AI output: Extracted all eight PDF pages, translated the requirements, and produced a checklist including three features, at least 36 cases, three browsers, eight test-script commits, reports, video, audit, critique, and Agent Skill.
- Human review/action: Confirmed that HW04 uses the same Pool A–C features from HW02 and that Pool D is excluded.

### Interaction 2 – approximately 18:39

- Prompt: `hãy đọc HW2 để biết tôi đã làm những chức năng nào`
- AI output: Read the HW02 Main Report and identified FR-01, FR-11, FR-14, and the excluded mobile feature.
- Human review/action: Selected FR-01, FR-11, and FR-14 for HW04.

### Interaction 3 – approximately 18:40–18:45

- Prompt: `hãy chuyển`
- AI output: Copied 66 tracked SUT files from the lecturer repository into HW4 while preserving the current `.git`; stored the original SUT README as `ESHOP_README.md`.
- Human review/action: Confirmed the current repository remote and retained the HW4 README.

### Interaction 4 – approximately 18:45–19:01

- Prompt: `Giờ tôi cần làm gì tiếp theo`, followed by student ID `23127414` and `làm đi`.
- AI output: Proposed the implementation order, configured Playwright for three browsers, added report metadata, created 12 data-driven FR-01 tests, installed browsers, ran the suite, and committed the result.
- Human review/action: Supplied the student ID. The first run exposed an `import.meta` module error; the generated path logic was corrected to use `process.cwd()`.
- Evidence: commit `4d4fdd2`; `reports/fr01`.

### Interaction 5 – 19:29–19:34

- Prompt: `làm tiếp đi`
- AI output: Implemented 15 FR-11 cases using unique API fixtures, status transitions, ownership assertions, Page Objects, and multi-browser evidence.
- Human review/action: Kept the Vietnamese currency assertion aligned with the requirement after all browsers rendered commas.
- Evidence: commits `570603f`, `bc0b6c8`, `57297df`; `reports/fr11`.

### Interaction 6 – 19:36–19:40

- Prompt: continuation of `làm tiếp đi`.
- AI output: Implemented 12 FR-14 cases covering creation, listing, deletion, validation, authorization, and boundaries; retained consistent SUT failures.
- Human review/action: Strengthened negative tests to assert 400/403/404/409 status codes and used controlled fixtures for deterministic 0/1 UI boundaries.
- Evidence: commits `b94db66`, `fb04aed`, `73faecf`; `reports/fr14`.

### Interaction 7 – 19:41–19:43

- Prompt: continuation of the automation request.
- AI output: Added completeness guards requiring at least 12 unique case IDs per feature, archived the FR-01 report, and created the eighth counted test commit.
- Human review/action: Verified 39 unique cases, 117 browser executions, report metadata, and a clean database/worktree.
- Evidence: commit `d913bfa`.

### Interaction 8 – after 19:43

- Prompt: `Làm đi, cái nào bạn ko làm được thì để lại`
- AI output: Created the Main Report, Bug Report, issue drafts, AI Audit Report, AI Critique, README summary, Git log, submission/video checklists, evidence screenshots, PDFs, and a validated reusable Agent Skill.
- Human review/action required: Record and upload the real video, authenticate GitHub, create Issues, add final URLs, and review the self-assessed grade before submission.

## Review summary

AI-generated material was not accepted blindly. Corrections included path loading, selector scoping, test-data isolation, response-based waits, API prerequisite setup, exact negative status assertions, controlled boundary fixtures, database restoration, and preserving requirement-based assertions for repeatable SUT defects.

The original Codex conversation remains the authoritative raw interaction transcript. This appendix summarizes each material interaction and links the resulting files and commits.
