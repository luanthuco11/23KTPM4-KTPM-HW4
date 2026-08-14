## Feature

FR-14 – Category management

## Severity

Medium

## Related tests

`TC_CAT_02`, `TC_CAT_03`

## Steps to reproduce

1. Log in as an administrator.
2. Submit an empty category name or a name containing spaces only.

## Expected result

The API returns HTTP 400 and the UI displays a validation error.

## Actual result

The API returns HTTP 200 and inserts a blank category.

## Evidence

![FR-14 Playwright report](https://raw.githubusercontent.com/luanthuco11/23KTPM4-KTPM-HW4/main/docs/bug-evidence/fr14-report-summary.png)
