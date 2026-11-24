# Design direction, November 2026

Design direction: restrained academic typography, consistent blue accents, and compact shared publication rows.

## Brief and design plan

The audience is robotics researchers, potential collaborators, and prospective students. The site should make the lab's research and papers easy to discover, using real experimental media and restrained academic typography.

Retain the approved palette: white `#ffffff`, body text `#26313a`, link blue `#07558c`, secondary text `#65717a`, surface `#f2f6f9`, and control border `#d6dfe5`. Source Serif 4 carries headings and the italic mission; Source Sans 3 carries body text and bibliographic records. Controls have a 3px radius; media stays rectangular. Use natural spacing and left alignment.

```text
[ RMI Lab                   Home Research Publications People Media ]
[                         experimental video                       ]
[                                  italic mission over blue panel  ]
[ Robotics & Machine Intelligence Lab                               ]
[ Lab introduction                                                  ]
[ News                                                              ]
[                         YouTube  GitHub                           ]
```

Research follows a compact topic directory, then full-width topic headings and descriptions. Each topic contains the same thumbnail-and-bibliography rows used by Publications. The topic itself needs no image. Publications remains grouped by year and searchable. No separate Contact page.

## Review against the brief

The video is the single dominant visual element. Do not add badges, numbered sections, decorative panels, or generic promotional copy. Preserve the existing quiet navigation and blue link color. Research entries should be readable citations with a short method description, not acronym-only links or promotional cards.

MARS informs topic indexing; LeCAR informs complete selected-paper entries. The homepage video-and-mission composition follows the user's CRL reference. These are layout references, not sources of copied code or lab identity.

## Implementation

- Home places the video directly below navigation, with the lab name above the introduction and centered footer icons.
- The mission uses Source Serif 4's real italic font, a 72% opaque blue panel, and reduced padding. On phones it follows the video to keep the robot unobstructed.
- The user requested removal of visible pause and clip controls. Automatic rotation remains, with reduced-motion, off-screen pause, background-tab pause, and a poster fallback.
- Research and Publications share `PublicationEntry.astro` and `publications.ts`, including summaries, images, resources, and citation behavior.
- Research adds a topic prefix to each paper's HTML anchor so the same paper can appear under multiple topics without duplicate IDs.
- The five-page navigation, topic directory, bibliography, and resource links remain usable without JavaScript. Contact and its unused styles have been removed.
- The static-photo cover remains selectable in `home.ts` during review.

Content remains a local draft. This revision does not deploy the site or expand the six-paper sample into a complete lab bibliography.

## Research and people refinement (v0.5)

Keep the approved white, ink, blue, muted, surface, and border palette and the two existing type families. The user's card references now guide two specific structures: three compact research theme cards and a growing member directory. Use subtle borders, 3px corners, no shadows or decorative badges. Each research card contains a title and one sentence; the paper sections repeat only the title. A short introduction explains how the three themes connect.

Faculty read vertically as portrait / name, academic role, short research biography, icon links. Member cards center a portrait above a name, joining year, short interests, and icon links. Fictional members are clearly identified as examples with neutral portrait placeholders and inactive sample links. Real faculty photos and biographical facts come from their university profiles.

Paper entries use equal image widths with natural aspect ratios, centered in the media column, compact bibliographic spacing, true italic venue text, and thin separators. Resource icons supplement labels; person links use icons with accessible names. These changes stay in shared components so Research and Publications remain identical.

## Topic index and compact people directory (v0.6)

The bordered theme cards and padded member cards were rejected. Retain the established palette (white #ffffff, ink #26313a, blue #07558c, muted #65717a, surface #f2f6f9, line #d6dfe5) and Source Serif 4 / Source Sans 3 typography.

The revised research index follows the plain aligned rows on MARS: topic name at left, a short explanation at right, with the whole row as an anchor. No box, decorative icon, numbering, shadow, or tinted hover panel. On phones each explanation follows its title. This preserves the explanatory content requested earlier while making the index read like an academic overview.

Research's heading-to-introduction space becomes smaller; the gap after the index and between paper groups becomes slightly larger. The final paper in each topic has no trailing rule. Native smooth anchor scrolling keeps normal URL/history behavior and yields to reduced-motion preferences.

People follows the compact photographic directory structure seen at LeCAR and MARS. Every portrait uses the same square size, including faculty. Member entries are 160px wide on desktop, have no outer frame or padding, and use short spacing between their photo, name, year, interests, and icon links. A two-column mobile layout shares a smaller portrait size with faculty. Preserve the existing faculty biographies, member groups, and explicit sample-content note.

## Shared footer alignment (v0.6.1)

All pages use the same centered social footer and bottom spacing. A flex column page shell places the footer at the viewport bottom when content is short, and after content when it is long. Home adds 20px of space between the header divider and either cover mode.

## Alumni directory (v0.7)

Add Alumni after Master Students, with PhD and Master as subordinate headings. Follow LeCAR's compact text directory: a name, departure year, and optional destination. Keep the existing type, blue links, and modest whitespace; no new cards or portraits. Explicit sample records allow local layout review until the lab supplies verified names.
