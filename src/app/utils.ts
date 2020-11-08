import { EntryWeather } from '../lib/types';

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

export const getMoodEmoji = (sentiment: number): string => {
  switch (sentiment) {
    case 1.75:
      return '😃';
    case 1.25:
      return '🙂';
    case 1:
      return '😐';
    case 0.75:
      return '🙁';
    case 0.25:
      return '😣';
    default:
      return '-';
  }
};

export const getWeatherString = (weather: EntryWeather): string | undefined => {
  if (!weather.description) return;

  let weatherString = `${weather.degree_c} °C  `;
  switch (weather.icon) {
    case '01d':
    case '01n':
      weatherString += '☀️';
      break;
    case '02n':
    case '02d':
      weatherString += '⛅️';
      break;
    case '03d':
    case '03n':
    case '04d':
    case '04n':
      weatherString += '☁️';
      break;
    case '09d':
    case '09n':
      weatherString += '🌧';
      break;
    case '10d':
    case '10n':
      weatherString += '🌦';
      break;
    default:
      break;
  }

  return weatherString;
};
