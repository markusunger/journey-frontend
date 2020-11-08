import { Epic, ofType } from 'redux-observable';
import { Observable, from, of } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { favEntry } from '../../lib/fetchData';
import { FAV_ENTRY_START } from '../action/types';
import { FavEntryStartAction } from '../action/favEntryStart';
import { favEntryFailed } from '../action/favEntryFailed';
import { favEntrySucceeded } from '../action/favEntrySucceeded';

export const favEntryStartEpic: Epic<FavEntryStartAction> = (
  action$,
  _store$
): Observable<any> =>
  action$.pipe(
    ofType(FAV_ENTRY_START),
    mergeMap(action =>
      from(favEntry(action.payload.entryId)).pipe(
        map(entry => favEntrySucceeded(entry)),
        catchError(e => {
          console.error(e);
          return of(favEntryFailed(e));
        })
      )
    )
  );
