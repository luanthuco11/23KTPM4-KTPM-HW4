## Feature

FR-14 – Category management

## Severity

Medium

## Related test

`TC_CAT_08`

## Steps to reproduce

1. Log in as an administrator.
2. Create a category.
3. Submit the same category name again.

## Expected result

The API returns HTTP 409 or the UI displays a duplicate-name validation message.

## Actual result

The API returns HTTP 200 and creates a second category with the same name.

## Evidence

![FR-14 Playwright report](https://raw.githubusercontent.com/luanthuco11/23KTPM4-KTPM-HW4/main/docs/bug-evidence/fr14-report-summary.png)
