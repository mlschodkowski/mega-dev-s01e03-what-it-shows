<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import { groupByCause, uniqueById, type Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';

  const unique = uniqueById(reports as Report[]).filter((r) => r.mergedInto === 4471);
  const groups = groupByCause(unique, tenantOf);
  const mismatches = groups.reduce((n, g) => n + g.reports.filter((r) => r.meta.intakeTag !== g.cause).length, 0);
  const weeks = new Map<string, { received: number; merged: number }>();
  for (const r of unique) {
    for (const [field, date] of [['received', r.receivedAt], ['merged', r.mergedAt]] as const) {
      if (!date) continue;
      const day = new Date(`${date.slice(0, 10)}T00:00:00Z`);
      day.setUTCDate(day.getUTCDate() - (day.getUTCDay() + 6) % 7);
      const key = day.toISOString().slice(0, 10);
      const row = weeks.get(key) ?? { received: 0, merged: 0 };
      row[field]++;
      weeks.set(key, row);
    }
  }
  const peakMerge = [...weeks.entries()].sort((a, b) => b[1].merged - a[1].merged)[0];
  const peakReceived = [...weeks.entries()].sort((a, b) => b[1].received - a[1].received)[0];
  const anomalies = unique.filter((r) => notes.oneDayMove.includes(r.id));
</script>

<p>The export contains {reports.length} rows for <strong>{unique.length} unique reports</strong> in #4471.
  Export pages overlap: {reports.length - unique.length} repeated rows do not represent extra reports.
  Tenant locale and booking form separate these reports into {groups.length} causes.
  Intake tags disagree with that classification for {mismatches} reports.</p>

<table>
  <thead><tr><th>problem</th><th>reports</th><th>affected path</th></tr></thead>
  <tbody>
    {#each groups as g (g.cause)}
      <tr><td>{g.cause === 'parser' ? 'Shared parser reads day-first dates as month-first' : 'booking-v3 prints a month-first hint for a day-first reader'}</td>
        <td>{g.reports.length}</td>
        <td>{g.cause === 'parser' ? 'App, email and booking-v2 form; app and email on booking-v3 tenants too' : 'Form reports from alder.physio, copper.studio and pale.harbour'}</td></tr>
    {/each}
  </tbody>
</table>

<h2>Receipt time and merge time tell different stories</h2>
<p>The largest merge week starts {peakMerge[0]}: {peakMerge[1].merged} merges, but only {peakMerge[1].received} newly received reports.
  The largest intake week starts {peakReceived[0]}: {peakReceived[1].received} reports.
  The July merge peak is a desk backlog event. It does not date the start of the product problem.
  Reports began in April and continued through the export's last day.</p>

<h2>Unresolved symptoms</h2>
<p>{anomalies.length} reports are marked by the desk as possible one-day moves. The supplied model files them under parser by tenant and channel.
  They remain included in that count. Their text does not establish a timezone cause or prove the model correct.
  Obtain the input date, resulting date, timezone, locale, channel and form version before reclassifying them.</p>
<ul>{#each anomalies as r (r.id)}<li><code>{r.id}</code> — {r.body}</li>{/each}</ul>
