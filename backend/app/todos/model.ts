import { Db } from 'mongodb';

const debug = require('debug')('todos/model'); // tslint:disable-line no-unused-variable

interface TodoFields {
  description: string;
}

export interface Todo extends TodoFields {
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

function toDoc({ id, ...rest }: Todo): TodoDoc {
  return {
    _id: id,
    ...rest,
  };
}

export interface TodoGateway {
  findAll(): Promise<Todo[]>;
  insert(todo: Todo): Promise<Todo>;
}

export function createGateway(db: Db): TodoGateway {
  const collection = db.collection('todos');

  return {
    async findAll() {
      const docs: TodoDoc[] = await collection.find({}).toArray();
      const todos = docs.map(toModel);
      return todos;
    },

    async insert(todo: Todo): Promise<Todo> {
      const result = await collection.insertOne(toDoc(todo));
      return toModel(result.ops[0]);
    },
  };
}
