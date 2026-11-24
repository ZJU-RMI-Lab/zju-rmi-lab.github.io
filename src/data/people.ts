import type { Person, PersonLink, PeopleGroup, AlumniGroup } from './types';

// Faculty facts and portraits are sourced from their Zhejiang University profiles.
export const faculty: Person[] = [
  {
    name: 'Qiuguo Zhu',
    role: 'Professor, Zhejiang University',
    bio: 'Qiuguo Zhu is a professor in the College of Control Science and Engineering at Zhejiang University. His research focuses on legged robotics and learning and control for intelligent robots.',
    image: '/images/qiuguo-zhu.jpg',
    links: [
      {
        label: 'University profile',
        icon: 'website',
        href: 'https://person.zju.edu.cn/0011353/0.html',
      },
      { label: 'Email', icon: 'email', href: 'mailto:qgzhu@zju.edu.cn' },
    ],
  },
  {
    name: 'Jun Wu',
    role: 'Professor, Zhejiang University',
    bio: 'Jun Wu is a professor in the College of Control Science and Engineering at Zhejiang University. His research interests include humanoid robot planning and control, multi-agent systems, and networked control.',
    image: '/images/jun-wu.jpg',
    links: [
      { label: 'University profile', icon: 'website', href: 'https://person.zju.edu.cn/0094198' },
      { label: 'Email', icon: 'email', href: 'mailto:junwuapc@zju.edu.cn' },
    ],
  },
];

// Fictional examples requested for layout review. Replace with confirmed members.
// Missing href values deliberately render inactive icons, never invented URLs.
const sampleLinks: PersonLink[] = [
  { label: 'Website', icon: 'website' },
  { label: 'Email', icon: 'email' },
  { label: 'Google Scholar', icon: 'scholar' },
  { label: 'GitHub', icon: 'github' },
];
const example = (name: string, year: number, interests: string): Person => ({
  name,
  year,
  interests,
  isPlaceholder: true,
  links: sampleLinks,
});

export const peopleGroups: PeopleGroup[] = [
  {
    id: 'postdocs',
    title: 'Postdocs',
    members: [example('Alex Chen', 2026, 'Robot learning, whole-body control')],
  },
  {
    id: 'phd-students',
    title: 'PhD Students',
    members: [
      example('Maya Lin', 2024, 'Visual locomotion, terrain perception'),
      example('Daniel Xu', 2025, 'Humanoid control, reinforcement learning'),
    ],
  },
  {
    id: 'master-students',
    title: 'Master Students',
    members: [
      example('Emma Zhou', 2025, 'Visual navigation, spatial representations'),
      example('Leo Wang', 2026, 'State estimation, sim-to-real transfer'),
    ],
  },
];
// Fictional layout examples; lab membership dates and degree dates are recorded separately.
// Add a verified profile URL and destination when the real alumni directory is ready.
export const alumniGroups: AlumniGroup[] = [
  {
    id: 'alumni-phd',
    title: 'PhD',
    members: [
      {
        name: 'Nora Wang',
        startYear: 2020,
        endYear: 2025,
        degree: { title: 'PhD', year: 2025 },
        isPlaceholder: true,
      },
      {
        name: 'Evan Li',
        startYear: 2019,
        endYear: 2024,
        degree: { title: 'PhD', year: 2024 },
        isPlaceholder: true,
      },
    ],
  },
  {
    id: 'alumni-master',
    title: 'Master',
    members: [
      {
        name: 'Iris Chen',
        startYear: 2022,
        endYear: 2025,
        degree: { title: "master's degree", year: 2025 },
        isPlaceholder: true,
      },
      {
        name: 'Owen Zhang',
        startYear: 2021,
        endYear: 2024,
        degree: { title: "master's degree", year: 2024 },
        isPlaceholder: true,
      },
    ],
  },
];
