import { Epic, ofType } from 'redux-observable';
import { Observable, from, of } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { submitPassword } from '../../lib/fetchData';
import { SUBMIT_PASSWORD_START } from '../action/types';
import { SubmitPasswordStartAction } from '../action/submitPasswordStart';
import { setUserLogin } from '../action/setUserLogin';
import { submitPasswordFailed } from '../action/submitPasswordFailed';

export const submitPasswordStartEpic: Epic<SubmitPasswordStartAction> = (
  action$,
  _store$
): Observable<any> =>
  action$.pipe(
    ofType(SUBMIT_PASSWORD_START),
    mergeMap(action =>
      from(submitPassword(action.payload.password)).pipe(
        map(response =>
          response && response.login
            ? setUserLogin()
            : submitPasswordFailed(new Error())
        ),
        catchError(e => {
          console.error(e);
          return of(submitPasswordFailed(e));
        })
      )
    )
  );
