jest.mock('../db')
import {findAll} from './model';
import {withCollection} from '../db';

describe('find all', () => {
  let mocked

  beforeEach(() => {
    mocked = withCollection as jest.Mock<any>;
    mocked.mockReset();
  })

  it('uses db', () => {
    findAll()
    expect(mocked).toHaveBeenCalledTimes(1)
  })

  it('uses todos collection', () => {
    findAll()
    expect(mocked.mock.calls[0][0]).toEqual('todos')
  })

  it('fixes the ids', async () => {
    const collection = {
      find: jest.fn(() => ({
        toArray: jest.fn(() => Promise.resolve([
          { _id: 'id-1', description: 'milk' },
          { _id: 'id-2', description: 'coffee' },
        ])),
      })),
    };

    mocked.mockImplementation((_, cb) => {
      return cb(collection)
    })

    const todos = await findAll()
    expect(todos.map(t => t.id)).toEqual(['id-1', 'id-2'])
  })
})
