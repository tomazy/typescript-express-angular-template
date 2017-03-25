import {withCollection} from '../db';

const debug = require('debug')('todos/model')

const withTodosCollection = withCollection.bind(undefined, 'todos');

interface Todo {
  id: string,
  description: string,
}

export function findAll(): Promise<Todo[]> {
  return withTodosCollection(async (collection) => {
    const todos = await collection.find({}).toArray();
    debug('findAll', todos)
    return todos;
  })
}
