import type { Publication } from './types';
import { newestPublicationFirst } from '../lib/publication-order.mjs';

// Shared examples for Research and Publications. Replace these with verified records.
// Add paper/video/code/project URLs only when the corresponding resource exists.
const records: Publication[] = [
  {
    id: 'example-locomotion',
    title: 'Example paper on perceptive locomotion',
    authors: ['First Author', 'Second Author', 'Corresponding Author'],
    year: 2026,
    date: '2026-06',
    venue: 'Conference or journal name',
    status: 'template',
    topics: ['locomotion'],
    summary:
      'Replace this paragraph with a concise description of the research question, the proposed method, and the main result.',
    keywords: ['legged robots', 'visual perception'],
    image: '/images/paper-placeholder.svg',
    imageWidth: 480,
    imageHeight: 270,
    citation:
      '@article{examplelocomotion,\n  title = {{Example paper on perceptive locomotion}},\n  author = {Author, First and Author, Second and Author, Corresponding},\n  journal = {Conference or journal name},\n  year = {2026},\n  note = {Template entry; replace with the verified citation}\n}',
  },
  {
    id: 'example-navigation',
    title: 'Example paper on autonomous navigation',
    authors: ['First Author', 'Second Author', 'Corresponding Author'],
    year: 2025,
    date: '2025-10',
    venue: 'Conference or journal name',
    status: 'template',
    topics: ['navigation'],
    summary:
      'Replace this paragraph with a concise description of the research question, the proposed method, and the main result.',
    keywords: ['navigation', 'mapping'],
    image: '/images/paper-placeholder.svg',
    imageWidth: 480,
    imageHeight: 270,
    citation:
      '@article{examplenavigation,\n  title = {{Example paper on autonomous navigation}},\n  author = {Author, First and Author, Second and Author, Corresponding},\n  journal = {Conference or journal name},\n  year = {2025},\n  note = {Template entry; replace with the verified citation}\n}',
  },
  {
    id: 'example-control',
    title: 'Example paper on robust locomotion and adaptation',
    authors: ['First Author', 'Second Author', 'Corresponding Author'],
    year: 2025,
    date: '2025-04',
    venue: 'Conference or journal name',
    status: 'template',
    topics: ['control'],
    summary:
      'Replace this paragraph with a concise description of the research question, the proposed method, and the main result.',
    keywords: ['robot learning', 'control'],
    image: '/images/paper-placeholder.svg',
    imageWidth: 480,
    imageHeight: 270,
    citation:
      '@article{examplecontrol,\n  title = {{Example paper on robust locomotion and adaptation}},\n  author = {Author, First and Author, Second and Author, Corresponding},\n  journal = {Conference or journal name},\n  year = {2025},\n  note = {Template entry; replace with the verified citation}\n}',
  },
];

export const publications = records.sort(newestPublicationFirst);
