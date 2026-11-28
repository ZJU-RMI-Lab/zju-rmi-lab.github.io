import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { matchesPublication } from '../src/lib/publication-filter.mjs';
import { publications } from '../src/data/publications.ts';
import { research } from '../src/data/research.ts';
import { media } from '../src/data/media.ts';
import { homeCover, news } from '../src/data/home.ts';
import { peopleGroups, alumniCohorts } from '../src/data/people.ts';
import { newestPublicationFirst } from '../src/lib/publication-order.mjs';

const dist = resolve('dist');
const base = (process.env.BASE_PATH || '/').replace(/\/$/, '');
const origin = 'https://local.test';
const pages = ['', 'research', 'publications', 'people', 'media'];
const htmlPath = (path) => join(dist, path, 'index.html');

test('publication order uses dates across status and retains partial-date precision', () => {
  const entries = [
    { title: 'Published', date: '2026-02' },
    { title: 'Preprint', date: '2026-05-20' },
    { title: 'Older', date: '2025-12-30' },
  ];
  assert.deepEqual(
    entries.sort(newestPublicationFirst).map((p) => p.title),
    ['Preprint', 'Published', 'Older'],
  );
  assert.deepEqual(
    publications.map((p) => p.id),
    [...publications].sort(newestPublicationFirst).map((p) => p.id),
  );
  for (const area of research) {
    assert.deepEqual(
      area.publications,
      publications.filter((p) => p.topics.includes(area.id)).map((p) => p.id),
    );
  }
});

test('search combines words, Unicode normalization, and research area', () => {
  const title = 'SSR Humanoid traversal Ruiqi Yu 2026';
  assert.equal(
    matchesPublication(title, 'locomotion control', 'ＨＵＭＡＮＯＩＤ  yu', 'locomotion'),
    true,
  );
  assert.equal(matchesPublication(title, 'locomotion control', 'Yu 2025', 'all'), false);
  assert.equal(matchesPublication(title, 'locomotion control', 'Yu', 'navigation'), false);
  assert.equal(matchesPublication(title, 'locomotion control', '   ', 'all'), true);
  assert.equal(matchesPublication(title, 'locomotion control', '', 'motion'), false);
});

test('paper acronyms, author names and years match complete tokens', () => {
  assert.equal(matchesPublication('Conference on SSRR, 2022', 'navigation', 'SSR', 'all'), false);
  assert.equal(
    matchesPublication('SSR: Scaling Surefooted Traversal', 'locomotion', 'ssr', 'all'),
    true,
  );
  assert.equal(matchesPublication('Liang Wang', '', 'Li', 'all'), false);
  assert.equal(
    matchesPublication(
      'CReF, IEEE Robotics and Automation Letters (RA-L), 2026',
      '',
      'ra-l 2026',
      'all',
    ),
    true,
  );
  assert.equal(matchesPublication('研究地形重建方法', '', '地形', 'all'), true);
});

test('Research contains each paper once and configured thumbnails resolve', () => {
  const displayed = research.flatMap((area) => area.publications);
  assert.equal(new Set(displayed).size, displayed.length);
  for (const paper of publications) {
    assert.ok(paper.topics.length <= 1, paper.id);
    if (paper.image) assert.ok(existsSync(resolve('public', paper.image.slice(1))), paper.id);
  }
});

test('research references resolve and independent media links are valid', () => {
  const ids = new Set(publications.map((p) => p.id));
  const topics = new Set(research.map((r) => r.id));
  assert.equal(ids.size, publications.length, 'Duplicate publication IDs');
  for (const area of research)
    for (const id of area.publications) assert.ok(ids.has(id), `${area.id}: ${id}`);
  for (const entry of [...news, ...homeCover.clips])
    assert.equal(new URL(entry.href).protocol, 'https:');
  for (const entry of media) assert.equal(new URL(entry.paper).protocol, 'https:');
  for (const p of publications) {
    for (const topic of p.topics) assert.ok(topics.has(topic), topic);
    for (const field of ['paper', 'video', 'code', 'project'])
      if (p[field]) assert.equal(new URL(p[field]).protocol, 'https:');
  }
});

test('bibliography records have evidence, unique identifiers, and consistent research classifications', () => {
  const dois = new Set();
  for (const paper of publications) {
    assert.ok(Number.isInteger(paper.year), `Unexpected year: ${paper.id}`);
    if (paper.status !== 'template')
      assert.ok(paper.sources?.length, `Missing evidence: ${paper.id}`);
    assert.ok(paper.authors.length > 0, `Missing authors: ${paper.id}`);
    assert.equal(new Set(paper.authors).size, paper.authors.length, `Repeated author: ${paper.id}`);
    if (paper.doi) {
      const doi = paper.doi.toLowerCase();
      assert.ok(!dois.has(doi), `Duplicate DOI: ${doi}`);
      dois.add(doi);
    }
    for (const topic of paper.topics) {
      assert.ok(
        research.find((area) => area.id === topic)?.publications.includes(paper.id),
        `Classified paper absent from Research: ${paper.id}`,
      );
    }
  }
  for (const area of research) {
    assert.equal(new Set(area.publications).size, area.publications.length);
    for (const id of area.publications) {
      assert.ok(
        publications.find((paper) => paper.id === id)?.topics.includes(area.id),
        `Research paper has inconsistent topic: ${id}`,
      );
    }
  }
});

test('all five pages have one heading, unique IDs, accessible entry points, and draft protection', () => {
  for (const page of pages) {
    const html = readFileSync(htmlPath(page), 'utf8');
    assert.equal((html.match(/<h1\b/g) || []).length, 1, page);
    assert.match(html, /<html lang="en"/);
    assert.match(html, /id="main"/);
    assert.match(html, /aria-label="Main navigation"/);
    assert.match(html, /aria-current="page"/);
    if (process.env.PUBLIC_SITE_DRAFT !== 'false')
      assert.match(html, /name="robots" content="noindex, nofollow"/);
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
    assert.equal(new Set(ids).size, ids.length, `Duplicate HTML IDs: ${page}`);
  }
});

test('built internal routes, fragment links, scripts, and images resolve', () => {
  const files = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) walk(path);
      else if (path.endsWith('.html')) files.push(path);
    }
  };
  walk(dist);
  for (const file of files) {
    const html = readFileSync(file, 'utf8');
    const relative = file.slice(dist.length).replace(/index\.html$/, '');
    for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
      const link = match[1];
      if (/^(https?:|mailto:|tel:|data:|\/\/)/.test(link)) continue;
      const url = new URL(link, `${origin}${base}${relative}`);
      assert.ok(url.pathname.startsWith(`${base}/`), `Missing base prefix: ${link}`);
      let target = join(dist, decodeURIComponent(url.pathname.slice(base.length)));
      if (url.pathname.endsWith('/')) target = join(target, 'index.html');
      assert.ok(existsSync(target), `${file}: missing ${link}`);
      if (url.hash && target.endsWith('.html'))
        assert.ok(
          readFileSync(target, 'utf8').includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),
          `Missing anchor: ${link}`,
        );
    }
  }
});

test('video embeds are deferred and publication resources remain available without JavaScript', () => {
  const mediaPage = readFileSync(htmlPath('media'), 'utf8');
  assert.doesNotMatch(mediaPage, /<iframe\b/);
  for (const video of media)
    assert.ok(mediaPage.includes(`https://www.youtube.com/watch?v=${video.youtubeId}`));
  const publicationPage = readFileSync(htmlPath('publications'), 'utf8');
  for (const p of publications) {
    assert.ok(publicationPage.includes(`id="${p.id}"`));
    if (p.paper) assert.ok(publicationPage.includes(p.paper.replaceAll('&', '&amp;')), p.id);
    if (p.status === 'template') assert.match(publicationPage, /\(Template\)/);
  }
});

test('cover video sources and fallback posters resolve under the configured base path', () => {
  const html = readFileSync(htmlPath(''), 'utf8');
  if (homeCover.mode !== 'video') return;
  const serialized = html.match(/data-clips="([^"]+)"/)?.[1];
  assert.ok(serialized, 'Missing cover playlist');
  const clips = JSON.parse(serialized.replaceAll('&quot;', '"').replaceAll('&amp;', '&'));
  for (const clip of clips) {
    for (const key of ['src', 'poster']) {
      assert.ok(clip[key].startsWith(`${base}/`), `Missing base prefix: ${clip[key]}`);
      const file = join(dist, clip[key].slice(base.length));
      assert.ok(existsSync(file), `Missing cover asset: ${clip[key]}`);
      if (key === 'src') assert.equal(readFileSync(file).subarray(4, 8).toString(), 'ftyp');
    }
  }
});

test('Research and Publications render the same complete paper records', () => {
  const researchPage = readFileSync(htmlPath('research'), 'utf8');
  const publicationPage = readFileSync(htmlPath('publications'), 'utf8');
  const entries = (html) =>
    new Map(
      [
        ...html.matchAll(
          /<article\b[^>]*data-publication-id="([^"]+)"[^>]*>([\s\S]*?)<\/article>/g,
        ),
      ].map((match) => [match[1], match[2]]),
    );
  const selected = entries(researchPage);
  const all = entries(publicationPage);
  for (const area of research) {
    assert.ok(researchPage.includes(`href="#${area.id}"`));
    for (const id of area.publications) {
      assert.ok(selected.has(id), `Missing research paper: ${id}`);
      const normalizeCitationId = (html) =>
        html.replace(/(id|aria-controls)="[^"]+-citation"/g, '$1="citation"');
      assert.equal(
        normalizeCitationId(selected.get(id)),
        normalizeCitationId(all.get(id)),
        `Inconsistent paper record: ${id}`,
      );
      assert.match(selected.get(id), /class="publication-summary"/);
    }
  }
});

test('removed Contact page is absent from output and navigation', () => {
  assert.equal(existsSync(htmlPath('contact')), false);
  for (const page of pages) {
    assert.doesNotMatch(readFileSync(htmlPath(page), 'utf8'), /href="[^"]*\/contact\/"/);
  }
});

test('lab alumni keep the five board columns and do not repeat current members', () => {
  assert.equal(alumniCohorts.length, 5);
  const names = alumniCohorts.flatMap((cohort) => cohort.members);
  assert.ok(names.length > 0);
  assert.equal(new Set(names).size, names.length);
  const current = new Set(
    peopleGroups.flatMap((group) => group.members.map((person) => person.name)),
  );
  for (const name of names)
    assert.ok(!current.has(name), `Current member listed as alumnus: ${name}`);
});
