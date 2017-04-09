jest.mock('mongodb');
import { Db, Server } from 'mongodb';

import { createGateway, TodoGateway } from './model';

describe('gateway', () => {
  let gateway: TodoGateway;
  let collectionMock: jest.Mock<{}>;
  let collection;

  beforeEach(() => {
    const db = createFakeDb();

    collection = {};
    collectionMock = db.collection as jest.Mock<{}>;
    collectionMock.mockReturnValue(collection);

    gateway = createGateway(db);
  });

  it('uses the right collection', () => {
    expect(collectionMock).toHaveBeenCalledWith('todos');
  });

  describe('find all', () => {
    it('works', async () => {
      collection.find = jest.fn(() => ({
        toArray: jest.fn(() => Promise.resolve([
          { _id: 'id-1', description: 'milk' },
          { _id: 'id-2', description: 'coffee' },
        ])),
      }));

      const todos = await gateway.findAll();
      expect(todos.map(t => t.id)).toEqual(['id-1', 'id-2']);
    });
  });

  describe('insert', () => {
    it('works', async () => {
      collection.insertOne = jest.fn(({ description }) => (
        Promise.resolve({
          ops: [
            { _id: 'id-xxx', description },
          ],
        })
      ));

      const todo = await gateway.insert({ id: null, description: 'yyy' });
      expect(todo).toEqual({ id: 'id-xxx', description: 'yyy' });
    });
  });
});

function createFakeDb(): Db {
  const server = new Server('http://example.com', 1234);
  return new Db('x', server);
}
