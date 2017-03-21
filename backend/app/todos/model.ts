interface Todo {
  id: string,
  description: string,
}

export async function findAll(): Promise<Todo[]> {
  return Promise.resolve([
    {id: '1', description: 'Get some milk'},
    {id: '2', description: 'Get some coffee'},
    {id: '3', description: 'Get some water'},
  ])
}
