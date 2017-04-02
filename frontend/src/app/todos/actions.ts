import { Action } from '@ngrx/store';
import { stringLiteralType } from '../util';
import { Todo } from './todo';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'stringLiteralType' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
  LOAD:         stringLiteralType('[Todos] Load Request'),
  LOAD_SUCCESS: stringLiteralType('[Todos] Load Success'),
  LOAD_FAIL:    stringLiteralType('[Todos] Load Fail'),
  ADD:          stringLiteralType('[Todos] Add Request'),
  ADD_SUCCESS:  stringLiteralType('[Todos] Add Success'),
  ADD_FAIL:     stringLiteralType('[Todos] Add Fail'),
};

export class LoadAction implements Action {
  type = ActionTypes.LOAD;
  constructor() { }
}

export class LoadSuccessAction implements Action {
  type = ActionTypes.LOAD_SUCCESS;
  constructor(public payload: Todo[]) { }
}

export class LoadFailAction implements Action {
  type = ActionTypes.LOAD_FAIL;
  constructor(public payload: any) { }
}

export class AddAction implements Action {
  type = ActionTypes.ADD;
  constructor(public payload: string) { }
}

export class AddSuccessAction implements Action {
  type = ActionTypes.ADD_SUCCESS;
  constructor(public payload: Todo) { }
}

export class AddFailAction implements Action {
  type = ActionTypes.ADD_FAIL;
  constructor(public payload: any) { }
}

export type Actions
  = LoadAction
  | LoadSuccessAction
  | LoadFailAction
  | AddAction
  | AddSuccessAction
  | AddFailAction;
