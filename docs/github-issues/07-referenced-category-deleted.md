## Feature

FR-14 – Category management

## Severity

High

## Related test

`TC_CAT_06`

## Steps to reproduce

1. Log in as an administrator.
2. Create a category.
3. Create a product assigned to that category.
4. Delete the category.

## Expected result

The API returns HTTP 409 and blocks deletion.

## Actual result

The API returns HTTP 200, deletes the category, and leaves an orphan product reference.

## Evidence

![FR-14 Playwright report](https://raw.githubusercontent.com/luanthuco11/23KTPM4-KTPM-HW4/main/docs/bug-evidence/fr14-report-summary.png)
