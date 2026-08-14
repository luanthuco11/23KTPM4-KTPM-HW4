## Feature

FR-01 – Account registration

## Severity

High

## Related tests

`TC_REG_01`, `TC_BVA_01`

## Steps to reproduce

1. Open the registration page.
2. Enter a valid name and email.
3. Enter `Pass123!` or boundary value `Abc1234!`.
4. Submit the form.

## Expected result

Registration succeeds and redirects to the login page.

## Actual result

The UI reports a weak password. The password validation regex requires whitespace (`\s`) instead of a special character.

## Evidence

![FR-01 Playwright report](https://raw.githubusercontent.com/luanthuco11/23KTPM4-KTPM-HW4/main/docs/bug-evidence/fr01-report-summary.png)
