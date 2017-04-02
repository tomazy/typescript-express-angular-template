import { combineReducers } from '@ngrx/store';
import { Todo } from './todo';
import * as actions from './actions';

export interface State {
  items: Todo[];
}

const initialState: State = {
  items: [],
};

function items(state: Todo[] = [], action: actions.Actions): Todo[] {
  switch (action.type) {
    case actions.ActionTypes.LOAD_SUCCESS:
      return (action as actions.LoadSuccessAction).payload;
    case actions.ActionTypes.ADD_SUCCESS: {
      const todo = (action as actions.AddSuccessAction).payload;
      return [...state, todo];
    }
    default:
      return state;
  }
}

export const reducer = combineReducers({ items });
