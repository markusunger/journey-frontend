import { JourneyFile } from '../lib/types';

export interface AppState {
  entries: JourneyFile[];
  activeEntry?: JourneyFile;
  isLoggedIn: boolean;
}
