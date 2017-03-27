import { Db } from 'mongodb';

const debug = require('debug')('todos/model');

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
  };
}

export interface TodoGateway {
  findAll(): Promise<Todo[]>;
}

export function createGateway(db: Db): TodoGateway {
  const collection = db.collection('todos');

  return {
    async findAll() {
      const docs: TodoDoc[] = await collection.find({}).toArray();
      const todos = docs.map(toModel);
      return todos;
    },
  };
}
