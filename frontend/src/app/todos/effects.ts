import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/mergeMap';

import 'rxjs/add/observable/of';

import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { TodoBackendService } from './todo-backend.service';

import { Todo } from './todo';
import * as actions from './actions';

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 * The `toPayload` helper function returns just
 * the payload of the currently dispatched action, useful in
 * instances where the current state is not necessary.
 *
 * Documentation on `toPayload` can be found here:
 * https://github.com/ngrx/effects/blob/master/docs/api.md#topayload
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class TodosEffects {

  @Effect()
  load$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.LOAD)
    .startWith(new actions.LoadAction())
    .switchMap(() =>
      this.backend.fetchTodos()
        .map((todos: Todo[]) => new actions.LoadSuccessAction(todos))
        .catch(e => Observable.of(new actions.LoadFailAction(e))),
    );

  @Effect()
  add$: Observable<Action> = this.actions$
    .ofType(actions.ActionTypes.ADD)
    .map(toPayload)
    .mergeMap(description =>
      this.backend.add(new Todo(null, description))
        .map(todo => new actions.AddSuccessAction(todo))
        .catch(e => Observable.of(new actions.AddFailAction(e))),
    );

  constructor(
    private actions$: Actions,
    private backend: TodoBackendService,
  ) {}
}
