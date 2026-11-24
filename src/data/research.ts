import type { ResearchArea } from './types';
import { publications } from './publications.ts';

// Topics are assigned once in publications.ts; both pages share the same chronological order.
const areas: Omit<ResearchArea, 'publications'>[] = [
  {
    id: 'locomotion',
    title: 'Perceptive locomotion',
    shortTitle: 'Perceptive locomotion',
    description:
      'Visual perception and terrain representations for legged robots traversing uneven ground, sparse footholds, and obstacles.',
  },
  {
    id: 'navigation',
    title: 'Autonomous navigation',
    shortTitle: 'Navigation',
    description:
      'Spatial representations, localization, planning, and multi-robot exploration for autonomous navigation.',
  },
  {
    id: 'manipulation',
    title: 'Vision-language-action for manipulation',
    shortTitle: 'VLA manipulation',
    description:
      'Connecting visual observations and language instructions to robot actions for generalizable manipulation.',
  },
  {
    id: 'whole-body',
    title: 'Humanoid whole-body control',
    shortTitle: 'Whole-body control',
    description:
      'Coordinating balance, posture, and multi-limb motion for whole-body humanoid skills and interaction.',
  },
  {
    id: 'control',
    title: 'Robust locomotion & adaptation',
    shortTitle: 'Locomotion & adaptation',
    description:
      'Reinforcement learning, state estimation, and adaptation for robust and efficient legged locomotion from proprioceptive feedback.',
  },
];

export const research: ResearchArea[] = areas.map((area) => ({
  ...area,
  publications: publications
    .filter((paper) => paper.topics[0] === area.id)
    .map((paper) => paper.id),
}));
