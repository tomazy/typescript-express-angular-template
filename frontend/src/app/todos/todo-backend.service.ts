import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import 'rxjs/add/operator/map';

import { Todo } from './todo';

const todosQuery = gql`
  query {
    todos {
      id,
      description
    }
  }
`;

interface TodosQueryResponse {
  todos: [Todo];
};

const addTodoMutation = gql`
  mutation ($description: String!) {
    addTodo(description: $description) {
      id,
      description,
    }
  }
`;

interface AddTodoMutationResult {
  addTodo: Todo;
}

@Injectable()
export class TodoBackendService {

  constructor(
    private apollo: Apollo,
  ) {}

  fetchTodos() {
    return this.apollo.watchQuery<TodosQueryResponse>({query: todosQuery})
      .map(({data: { todos }}) => todos);
  }

  add(description: String) {
    return this.apollo.mutate<AddTodoMutationResult>({
      mutation: addTodoMutation,
      variables: { description },
    }).map(({data: { addTodo }}) => addTodo);
  }
}
