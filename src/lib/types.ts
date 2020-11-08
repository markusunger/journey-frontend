export type EntryType = 'html' | '';

export interface EntryWeather {
  id: number;
  degree_c: number;
  description: string;
  icon: string;
  place: string;
}

export interface JourneyFile {
  text: string;
  date_mofified: number;
  date_journal: number;
  id: string;
  preview_text: string;
  address: string;
  music_artist: string;
  music_title: string;
  lat: string;
  lon: string;
  mood: number;
  label: string;
  folder: string;
  sentiment: number;
  timezone: string;
  favourite: boolean;
  type: EntryType;
  weather: EntryWeather;
  photos: string[];
  tags: string[];
  updateFromAuthor?: string;
}

export enum EntrySortKeys {
  DATE_ASC = 'date_ascending',
  DATE_DESC = 'date_descending',
  AUTHOR_ASC = 'author_ascending',
  AUTHOR_DESC = 'author_descending',
  FAV_ASC = 'favorite_ascending',
  FAV_DESC = 'favorite_descending',
}
