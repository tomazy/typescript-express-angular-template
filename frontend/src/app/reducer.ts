import { ActionReducer, combineReducers } from '@ngrx/store';
import { environment } from '../environments/environment';

import * as fromTodos from './todos/reducer';

export interface State {
  todos: fromTodos.State;
}

const reducers = {
  todos: fromTodos.reducer,
};

const productionReducer: ActionReducer<State> = combineReducers(reducers);

// unfortunately this causes a compilation error :-/
// export const reducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: State, action) {
  return productionReducer(state, action);
}
