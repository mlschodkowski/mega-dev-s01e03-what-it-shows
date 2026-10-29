import { render } from 'svelte/server';
import { readFileSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const pages = import.meta.glob('/src/routes/**/+page.svx', { eager: true });
const template = readFileSync('dist/index.html', 'utf8');
const styles = readdirSync('dist/assets').filter((name) => name.endsWith('.css'))
  .map((name) => readFileSync(`dist/assets/${name}`, 'utf8')).join('\n');

for (const [path, mod] of Object.entries(pages)) {
  const route = path.replace('/src/routes', '').replace('/+page.svx', '');
  const { body, head } = render(mod.default);
  const dest = `dist${route}/index.html`;
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, template.replace('<div id="app"></div>', `<div id="app">${body}</div>`)
    .replace('</head>', `${head}<style>${styles}</style></head>`));
  if (route === '/kb/incidents/4471-reassessment') {
    writeFileSync('page.html', `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">${head}<style>${styles}</style></head><body>${body}</body></html>`);
  }
  console.log(`Rendered ${route}`);
}
