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
})
