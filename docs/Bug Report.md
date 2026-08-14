# EShop HW04 Bug Report

**Student ID:** 23127414  
**Environment:** Chromium, Firefox, WebKit; EShop local SUT; Playwright 1.62.1

All nine bugs below reproduced on all three browsers. The issue-ready versions are in `docs/GitHub Issue Drafts.md`.

## BUG-01 – Valid special-character passwords are rejected

- Feature: FR-01
- Severity: High
- Tests: `TC_REG_01`, `TC_BVA_01`
- Steps: Open registration, enter valid name/email, enter `Pass123!` or boundary value `Abc1234!`, submit.
- Expected: Registration succeeds and redirects to login.
- Actual: The UI reports a weak password.
- Cause observed: The regex requires whitespace (`\s`) instead of a special character.
- Evidence: [FR-01 report screenshot](bug-evidence/fr01-report-summary.png)

## BUG-02 – Whitespace-only names are accepted

- Feature: FR-01
- Severity: Medium
- Test: `TC_REG_03`
- Steps: Enter three spaces as the name, an email, and a value that reaches submission; submit.
- Expected: Name validation error; remain on registration.
- Actual: The account is created and the UI redirects to login.
- Evidence: [FR-01 report screenshot](bug-evidence/fr01-report-summary.png)

## BUG-03 – Invalid email formats are accepted

- Feature: FR-01
- Severity: High
- Tests: `TC_REG_05`–`TC_REG_09`
- Steps: Register using email values missing `@`, local part, domain, TLD, or containing spaces.
- Expected: The invalid email is rejected.
- Actual: The backend accepts the email and registration completes.
- Evidence: [FR-01 report screenshot](bug-evidence/fr01-report-summary.png)

## BUG-04 – Order totals use the wrong Vietnamese thousands separator

- Feature: FR-11
- Severity: Low
- Test: `TC_ORD_10`
- Steps: View an order with `total_amount = 1250000`.
- Expected: `1.250.000 ₫`.
- Actual: `1,250,000 ₫`.
- Cause observed: `toLocaleString()` is called without `vi-VN`.
- Evidence: [FR-11 report screenshot](bug-evidence/fr11-report-summary.png)

## BUG-05 – Empty and whitespace-only category names are accepted

- Feature: FR-14
- Severity: Medium
- Tests: `TC_CAT_02`, `TC_CAT_03`
- Steps: Submit an empty category name or spaces only.
- Expected: HTTP 400 and a visible validation error.
- Actual: HTTP 200; a blank category is inserted.
- Evidence: [FR-14 report screenshot](bug-evidence/fr14-report-summary.png)

## BUG-06 – Duplicate category names are accepted

- Feature: FR-14
- Severity: Medium
- Test: `TC_CAT_08`
- Steps: Create a category, then submit the same name again.
- Expected: HTTP 409 or a duplicate-name validation message.
- Actual: HTTP 200 and a second category is created.
- Evidence: [FR-14 report screenshot](bug-evidence/fr14-report-summary.png)

## BUG-07 – A category referenced by a product can be deleted

- Feature: FR-14
- Severity: High
- Test: `TC_CAT_06`
- Steps: Create a category, create a product assigned to it, then delete the category.
- Expected: HTTP 409; deletion is blocked.
- Actual: HTTP 200; the category is deleted and an orphan reference remains.
- Evidence: [FR-14 report screenshot](bug-evidence/fr14-report-summary.png)

## BUG-08 – Deleting a nonexistent category reports success

- Feature: FR-14
- Severity: Medium
- Test: `TC_CAT_07`
- Steps: Send `DELETE /api/categories/99999999` with an admin token.
- Expected: HTTP 404.
- Actual: HTTP 200 with `Category deleted`.
- Evidence: [FR-14 report screenshot](bug-evidence/fr14-report-summary.png)

## BUG-09 – Regular users can create categories through the admin API

- Feature: FR-14
- Severity: Critical
- Test: `TC_CAT_09`
- Steps: Log in as a normal user and call `POST /api/categories` with its JWT.
- Expected: HTTP 403.
- Actual: HTTP 200 and the category is created.
- Cause observed: Authentication is checked, but the admin role is not.
- Evidence: [FR-14 report screenshot](bug-evidence/fr14-report-summary.png)
