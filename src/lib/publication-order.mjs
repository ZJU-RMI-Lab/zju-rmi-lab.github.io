/** Dates retain the precision supplied by the publisher (YYYY, YYYY-MM or YYYY-MM-DD). */
export function newestPublicationFirst(a, b) {
  // A partial date must not silently become the first day of its month.
  // Keep an explicitly confirmed relationship without inventing a publication day.
  if (a.date.slice(0, 7) === b.date.slice(0, 7)) {
    if (a.newerThan?.includes(b.id)) return -1;
    if (b.newerThan?.includes(a.id)) return 1;
  }
  const date = (paper) => paper.date.split('-').map(Number);
  const left = date(a);
  const right = date(b);
  for (let part = 0; part < 3; part++) {
    const difference = (right[part] ?? 0) - (left[part] ?? 0);
    if (difference) return difference;
  }
  return a.title.localeCompare(b.title, 'en');
}

/** The bibliography year stays with its citation; chronological groups use the verified date. */
export function publicationGroupYear(paper) {
  return Number(paper.date.slice(0, 4));
}
