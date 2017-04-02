import { reducer } from './reducer';
import { Todo } from './todo';
import * as actions from './actions';

describe('todos reducer', () => {
  it('can load todos', () => {
    const todos = [
      new Todo('id-1', 'Get milk'),
      new Todo('id-2', 'Get beer'),
    ];
    expect(reducer({}, new actions.LoadSuccessAction(todos)))
      .toEqual({ items: todos });
  });

  it('can add todos', () => {
    const todos = [
      new Todo('id-1', 'Get milk'),
    ];
    const newTodo = new Todo('id-2', 'Get food');

    const state = reducer({}, new actions.LoadSuccessAction(todos));
    expect(reducer(state, new actions.AddSuccessAction(newTodo)))
      .toEqual({ items: [...todos, newTodo] });
  });
});
