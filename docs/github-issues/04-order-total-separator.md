## Feature

FR-11 – User order history

## Severity

Low

## Related test

`TC_ORD_10`

## Steps to reproduce

1. Log in as a user with an order whose `total_amount` is `1250000`.
2. Open the order history page.

## Expected result

The amount is displayed as `1.250.000 ₫` for the Vietnamese locale.

## Actual result

The amount is displayed as `1,250,000 ₫`. `toLocaleString()` is called without the `vi-VN` locale.

## Evidence

![FR-11 Playwright report](https://raw.githubusercontent.com/luanthuco11/23KTPM4-KTPM-HW4/main/docs/bug-evidence/fr11-report-summary.png)
