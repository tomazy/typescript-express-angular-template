import {withCollection} from '../db';

const debug = require('debug')('todos/model')

const withTodosCollection = withCollection.bind(undefined, 'todos');

interface TodoFields {
  description: string;
}

interface Todo extends TodoFields {
  id: string;
}

interface TodoDoc extends TodoFields {
  _id: string;
}

function toModel({ _id, ...rest }: TodoDoc): Todo {
  return {
    id: _id,
    ...rest,
  }
}

export function findAll(): Promise<Todo[]> {
  return withTodosCollection(async (collection) => {
    const docs: TodoDoc[] = await collection.find({}).toArray()
    const todos = docs.map(toModel);
    return todos;
  })
}
