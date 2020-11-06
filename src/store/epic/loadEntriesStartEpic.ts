import { Epic, ofType } from 'redux-observable';
import { Observable, from, of } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { fetchData, FetchTypes } from '../../lib/fetchData';
import { LOAD_ENTRIES_START } from '../action/types';
import { LoadEntriesStartAction } from '../action/loadEntriesStart';
import { loadEntriesSucceeded } from '../action/loadEntriesSucceeded';
import { loadEntriesFailed } from '../action/loadEntriesFailed';

export const loadEntriesStartEpic: Epic<LoadEntriesStartAction> = (
  action$,
  _store$
): Observable<any> =>
  action$.pipe(
    ofType(LOAD_ENTRIES_START),
    mergeMap(action =>
      from(fetchData(FetchTypes.entries)).pipe(
        map(entries => loadEntriesSucceeded(entries?.entries)),
        catchError(e => {
          console.error(e);
          return of(loadEntriesFailed(e));
        })
      )
    )
  );
