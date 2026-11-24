export type ResearchId = 'locomotion' | 'navigation' | 'manipulation' | 'whole-body' | 'control';

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  year: number;
  /** Publication date, or first preprint date; keep the precision of the source. */
  date: string;
  /** Author-confirmed relative chronology when a month is known but the exact day is not. */
  newerThan?: string[];
  venue: string;
  summary: string;
  /** One primary topic per paper; [] keeps historical work in Publications only. */
  topics: [] | [ResearchId];
  paper?: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  video?: string;
  code?: string;
  project?: string;
  citation: string;
  doi?: string;
  keywords?: string[];
  sources?: string[];
  status?: 'published' | 'accepted' | 'preprint' | 'editorial' | 'template';
}

export interface ResearchArea {
  id: ResearchId;
  title: string;
  shortTitle: string;
  description: string;
  publications: string[];
}

export type IconName = 'paper' | 'video' | 'website' | 'email' | 'scholar' | 'cite' | 'github';

export interface PersonLink {
  label: string;
  icon: IconName;
  href?: string;
}

export interface Person {
  name: string;
  role?: string;
  bio?: string;
  image?: string;
  year?: number;
  interests?: string;
  links: PersonLink[];
  isPlaceholder?: boolean;
}

export interface PeopleGroup {
  id: string;
  title: string;
  members: Person[];
}

export interface Alumnus {
  name: string;
  startYear: number;
  endYear: number;
  degree?: {
    title: string;
    year: number;
  };
  profile?: string;
  destination?: string;
  isPlaceholder?: boolean;
}

export interface AlumniGroup {
  id: 'alumni-phd' | 'alumni-master';
  title: string;
  members: Alumnus[];
}
