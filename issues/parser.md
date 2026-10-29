## What

Fix the shared month-first parser for tenants that write dates day first.
This issue covers **379 reports** merged into #4471, after deduplicating the export by report ID.
The scope includes app and email reports for all 11 tenants, and booking-v2 form reports.
booking-v3 app and email reports also use this path; its separate form hint issue covers 33 reports.

The supplied `causeOf` rule uses tenant locale, determined with `Intl.DateTimeFormat`, and report channel.
Do not classify from browser locale or intake tags: 23 of these reports were tagged `hint` at intake.
For example, R-41200 reports 7 April becoming 4 July; R-41201 reports the reverse direction.
These are separate report IDs, so both count even though the reporter corrects their wording.

**Engineering outcome (5 October 2026): fixed.** The course reports `fix(dates): parse dd/mm for eu locales`. Close as completed.

Source: [course engineering update](https://hq.mega.dev/challenges/what-it-shows#engineering-update).
[Signed KB reassessment](https://github.com/mlschodkowski/mega-dev-s01e03-what-it-shows/blob/main/page.html); [other cause](https://github.com/mlschodkowski/mega-dev-s01e03-what-it-shows/issues/2).
The export counts remain historical. We did not verify a production deployment.

## Why

Dates such as `07/04/2026` can be read as 4 July instead of 7 April. People miss appointments and receive incorrect reminders.
Reports began on 1 April and continued through 4 October 2026. A July merge spike reflects desk backlog processing, not a new July onset.

Five included reports need further evidence: R-41202, R-41209, R-41236, R-41344 and R-41620.
Their text describes a one-day move or an unclear symptom. The supplied model files them under parser, but does not prove their root cause.
Keep them included in 379 pending investigation; do not invent a timezone diagnosis or count them twice.
These counts describe the 4 October export, not a live production total.

## Definition of Done

- Parse dates using the tenant's intended date order and preserve the intended calendar date in app, email and booking-v2 form paths.
- Verify both directions of a day/month flip, a day greater than 12, and an unambiguous ISO date.
- Confirm that booking-v3 app and email paths receive the parser fix; track its form hint separately.
- Investigate the five unresolved reports with exact input/output dates, timezone, locale, channel and form version. Reclassify only with evidence.
- Reconcile new reports since the export, and link the signed KB reassessment and the separate hint issue.
