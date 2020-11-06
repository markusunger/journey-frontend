export const formatAuthor = (tags: string[]): string => {
  if (!Array.isArray(tags) || tags?.length === 0) return 'John Doe';
  return `${tags[0][0].toUpperCase()}${tags[0].slice(1)}`;
};

export const formatDate = (date: number): string => {
  let parsedDate;
  try {
    parsedDate = new Date(date);
  } catch (e) {
    parsedDate = new Date(0);
  }
  return new Intl.DateTimeFormat('de-DE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(parsedDate);
};
