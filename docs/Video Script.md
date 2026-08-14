# Vietnamese Demo Video Script (5–7 minutes)

## 0:00–0:30 – Identity evidence

Introduce yourself and HW04. Show a terminal and run:

```powershell
whoami
hostname
```

State student ID `23127414`.

## 0:30–1:20 – Repository and architecture

Show `tests/data`, `tests/pages`, `tests/specs`, `reports`, and `agent-skills/eshop-playwright-automation`. Explain that FR-01, FR-11, and FR-14 came from HW02 and that all test data is external JSON.

## 1:20–2:10 – Human correction of AI output

Open `tests/specs/fr11-order-history.spec.ts` and explain:

- AI-generated automation originally risked shared data and implicit waits.
- You changed setup to create unique users/orders per browser worker.
- You wait for the real `my-orders` response instead of using a fixed sleep.
- You retained the Vietnamese currency assertion because it exposes a real bug.

## 2:10–3:20 – Multi-browser run

Run:

```powershell
npm run test:fr11
```

Explain that Playwright runs Chromium, Firefox, and WebKit. Mention that three failed executions are expected for the same currency-format defect.

## 3:20–4:30 – HTML report

Open `reports/fr11/index.html`. Show:

- `Run by: 23127414`
- ISO timestamp
- 45 executions
- 42 passed and 3 failed
- screenshot, video, and trace for the failure

## 4:30–5:30 – Agent Skill demonstration

Open `agent-skills/eshop-playwright-automation/SKILL.md` and explain its workflow. Run:

```powershell
node agent-skills\eshop-playwright-automation\scripts\validate-test-data.mjs tests\data\registration.json tests\data\order-history.json tests\data\categories.json
```

Show that all three datasets contain at least 12 unique IDs.

## 5:30–6:00 – Conclusion

Summarize 39 automated cases, 117 browser executions, 72 passed, 45 failed, nine documented bugs, and eight counted test commits. Upload the video as **Unlisted** and paste its URL into README and the submission checklist.
