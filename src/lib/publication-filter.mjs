/** Match complete words, so paper acronyms do not match longer venue acronyms (SSR ≠ SSRR). */
export function matchesPublication(text, topics, query, topic) {
  const normalize = (value) => value.normalize('NFKC').toLocaleLowerCase();
  const normalizedText = normalize(text);
  const tokens = (value) => value.match(/[\p{L}\p{N}]+/gu) ?? [];
  const words = tokens(normalize(query));
  const textWords = new Set(tokens(normalizedText));
  return (
    words.every((word) =>
      /\p{Script=Han}/u.test(word) ? normalizedText.includes(word) : textWords.has(word),
    ) &&
    (topic === 'all' || topics.split(' ').includes(topic))
  );
}
