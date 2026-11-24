// Set mode to 'photos' to compare the previous still-photo cover.
export const homeCover = {
  mode: 'video' as 'video' | 'photos',
  mission: 'Learning and control for robots in the real world.',
  clips: [
    {
      src: '/videos/ssr-stairs.mp4',
      poster: '/images/ssr-stairs_1.jpg',
      title: 'Stair traversal',
      href: 'https://ssr-humanoid.github.io/',
    },
    {
      src: '/videos/ssr-platform.mp4',
      poster: '/images/ssr-platform.jpg',
      title: 'Platform traversal',
      href: 'https://ssr-humanoid.github.io/',
    },
    {
      src: '/videos/ssr-slope.mp4',
      poster: '/images/ssr-slope.jpg',
      title: 'Grassy slope traversal',
      href: 'https://ssr-humanoid.github.io/',
    },
  ],
};

// Still-photo alternative, retained while the video cover is being reviewed.
export const photos = [
  {
    image: '/images/ssr-stairs_1.jpg',
    alt: 'A humanoid robot at the foot of a wide staircase in an SSR field experiment.',
    href: 'https://ssr-humanoid.github.io/',
  },
  {
    image: '/images/ssr-outdoor.jpg',
    alt: 'A humanoid robot walking along an outdoor passage in an SSR field experiment.',
    href: 'https://ssr-humanoid.github.io/',
  },
];

// Dates refer to the preprint update or publication, not an acceptance announcement.
export const news = [
  {
    date: '2026-11',
    displayDate: 'Nov 2026',
    text: 'An updated SSR preprint is available.',
    href: 'https://ssr-humanoid.github.io/',
  },
  {
    date: '2026-02',
    displayDate: 'Feb 2026',
    text: 'START is published in IEEE Robotics and Automation Letters.',
    href: 'https://arxiv.org/abs/2512.13153',
  },
  {
    date: '2025',
    displayDate: '2025',
    text: 'MOVE is published at ICRA 2025.',
    href: 'https://arxiv.org/abs/2412.03353',
  },
];
