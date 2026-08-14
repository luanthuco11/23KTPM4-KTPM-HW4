## Feature

FR-14 – Category management

## Severity

Critical

## Related test

`TC_CAT_09`

## Steps to reproduce

1. Log in as a normal user.
2. Send `POST /api/categories` with that user's JWT and a valid category name.

## Expected result

The API returns HTTP 403 and does not create a category.

## Actual result

The API returns HTTP 200 and creates the category. Authentication is checked, but the administrator role is not enforced.

## Evidence

![FR-14 Playwright report](https://raw.githubusercontent.com/luanthuco11/23KTPM4-KTPM-HW4/main/docs/bug-evidence/fr14-report-summary.png)
