# Automation Review Checklist

## Test design

- At least 12 unique test IDs for the feature.
- Positive, negative, boundary, and authorization/state cases where relevant.
- One behavior per test and a clear expected result.
- External JSON or CSV data; no inline test-case collection.

## Implementation

- Page Object separates interaction from assertions.
- Unique data prevents collisions between browsers and repeated runs.
- Preconditions use supported UI/API behavior.
- At least three assertion patterns are present.
- No fixed sleep is used for application synchronization.

## Multi-browser evidence

- Chromium, Firefox, and WebKit all execute the feature.
- HTML report contains `Run by: <StudentID>` and an ISO timestamp.
- Failure screenshot, trace, and video are retained.
- Report is archived outside the transient `playwright-report` directory.

## Human review

- Verify selectors are not unnecessarily positional.
- Verify assertions fail for the intended reason.
- Reproduce genuine defects consistently.
- Explain what AI missed and why.
- Restore the SUT database after a mutating run.
- Record defects in Markdown and GitHub Issues.
