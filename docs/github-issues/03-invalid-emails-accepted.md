## Feature

FR-01 – Account registration

## Severity

High

## Related tests

`TC_REG_05`–`TC_REG_09`

## Steps to reproduce

1. Open the registration page.
2. Enter an email missing `@`, local part, domain, or TLD, or containing spaces.
3. Complete the remaining fields and submit.

## Expected result

The invalid email is rejected.

## Actual result

The backend accepts the invalid email and registration completes.

## Evidence

![FR-01 Playwright report](https://raw.githubusercontent.com/luanthuco11/23KTPM4-KTPM-HW4/main/docs/bug-evidence/fr01-report-summary.png)
