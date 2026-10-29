import { hydrate, mount } from 'svelte';

const pages = import.meta.glob('/src/routes/**/+page.svx');
const path = location.pathname.replace(/\/$/, '') || '/kb';
const load = pages[`/src/routes${path}/+page.svx`];
if (!load) throw new Error(`Unknown KB page: ${path}`);
const { default: Page } = await load();
const target = document.getElementById('app');
if (target.hasChildNodes()) hydrate(Page, { target });
else mount(Page, { target });
