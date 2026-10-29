# kb — the support knowledge base

**kb** = knowledge base. What the support desk knows about how our products break, written
down where the code can keep it honest.

One desk takes reports for every product we run: `sched-prod` (calendar invites for about
300k people) and the rest. When something
goes wrong, the reports reach the desk first. This kb is how the desk triages them, what each
incident turned out to be, and why we decided what we decided.

## What's here

```
src/routes/kb/      the pages (.svx: Markdown with components)
  triage/           how the desk handles incoming reports
  incidents/        one page per big ticket
  decisions/        numbered decision records
src/lib/kb/         components and the logic they run
src/lib/layouts/    the frame every page shares
src/lib/data/       exports from the ticket system
```

## Conventions

- Words in the page, logic in `src/lib` (imported as `#lib/…`). A number that can be computed belongs in a component.
- Every page starts with frontmatter: `title`, `owner`, `status`, `reviewed`.
- A decision is never edited after it is accepted. A new record replaces it.
- A page you add is signed: its frontmatter carries your `signature` and it ends with `<RenderStamp {signature} />`, so the desk knows who wrote it.

## Owners

Support desk. Decision records: whoever signed them.

---

Exported 2026-10-04 from the `support` repo, `apps/kb/` → `src/`.

## S01E03 reassessment

The new source page is `src/routes/kb/incidents/4471-reassessment/+page.svx`.
`page.html` is its standalone rendered copy. `dist/` contains all KB routes with
interactive components. The original pages and classification logic are unchanged.

Run `npm ci --ignore-scripts`, then `npm run build` to reproduce the rendered files.
Run `npm run dev` and open `/kb/incidents/4471-reassessment` to inspect the page.
The build runs the supplied Svelte components, including `RenderStamp`; the desk ref
is derived from the frontmatter signature. Counts are computed from report IDs,
tenant locale and form, using the supplied `causeOf` logic.

Issue drafts are in `issues/parser.md` and `issues/hint.md`. They cover 379 and 33
unique reports respectively. Five unresolved symptoms remain within the parser
count pending further evidence. No production product code has been changed.

The course's later engineering update reports #4471 closed on 5 October 2026:
parser fixed (`fix(dates): parse dd/mm for eu locales`); hint won't fix because
booking-v3 was retired. These are distinct outcomes. The new page records both.
