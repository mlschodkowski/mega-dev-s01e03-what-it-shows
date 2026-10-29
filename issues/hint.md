## What

Align the booking-v3 date hint with the tenant's day-first form reader.
This issue covers **33 reports** merged into #4471, after deduplicating by report ID.
The affected path is `form` on booking-v3 for alder.physio (de-DE), copper.studio (es-ES) and pale.harbour (pt-PT).
Their form prints `MM/DD/YYYY`, but its reader uses the tenant's day-first order.

Classify by the tenant directory and form channel. Intake guessed `parser` for 15 of these reports and `hint` for 18.
R-41230, R-41241 and R-41251 illustrate this path. Shared subjects and browser locales do not establish the cause.
App and email reports from these tenants belong to the separate parser issue.

**Engineering outcome (5 October 2026): won't fix.** The course reports that booking-v3 was retired. Close as not planned; retirement does not mean the hint was fixed.

Source: [course engineering update](https://hq.mega.dev/challenges/what-it-shows#engineering-update).
[Signed KB reassessment](https://github.com/mlschodkowski/mega-dev-s01e03-what-it-shows/blob/main/page.html); [other cause](https://github.com/mlschodkowski/mega-dev-s01e03-what-it-shows/issues/1).
The export counts remain historical. We did not verify a production deployment.

## Why

A customer who follows the displayed month-first hint supplies a date that the form reads in a different order.
The parser fix alone does not correct the misleading hint. Keeping this work inside one parser ticket hides a separate fix.
These reports span 17 April to 22 September 2026 in the export. Counts are an export snapshot, not a live total.

## Definition of Done

- Show a hint that matches the date order the booking-v3 form reader expects for each affected tenant.
- Confirm that following the hint produces the intended date for all three tenant locales.
- Verify a date whose day and month are both at most 12, a day above 12, and unchanged booking-v2 behavior.
- Keep booking-v3 app/email reports in the parser issue and reconcile later form reports separately.
- Link the signed KB reassessment and the separate parser issue.
