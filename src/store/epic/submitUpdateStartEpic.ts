import { Epic, ofType } from 'redux-observable';
import { Observable, from, of } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { submitUpdate } from '../../lib/fetchData';
import { SUBMIT_UPDATE_START } from '../action/types';
import { SubmitUpdateStartAction } from '../action/submitUpdateStart';
import { submitUpdateFailed } from '../action/submitUpdateFailed';
import { submitUpdateSucceeded } from '../action/submitUpdateSucceeded';

export const submitUpdateStartEpic: Epic<SubmitUpdateStartAction> = (
  action$,
  _store$
): Observable<any> =>
  action$.pipe(
    ofType(SUBMIT_UPDATE_START),
    mergeMap(action =>
      from(submitUpdate(action.payload.entryId, action.payload.text)).pipe(
        map(entry => submitUpdateSucceeded(entry)),
        catchError(e => {
          console.error(e);
          return of(submitUpdateFailed(e));
        })
      )
    )
  );
