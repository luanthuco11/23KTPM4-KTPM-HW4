## Feature

FR-14 – Category management

## Severity

Medium

## Related test

`TC_CAT_07`

## Steps to reproduce

1. Log in as an administrator.
2. Send `DELETE /api/categories/99999999` with the administrator token.

## Expected result

The API returns HTTP 404.

## Actual result

The API returns HTTP 200 with `Category deleted`.

## Evidence

![FR-14 Playwright report](https://raw.githubusercontent.com/luanthuco11/23KTPM4-KTPM-HW4/main/docs/bug-evidence/fr14-report-summary.png)
