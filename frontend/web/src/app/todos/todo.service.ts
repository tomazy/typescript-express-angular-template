import { Injectable } from '@angular/core'
import { Headers, Http } from '@angular/http';
import { Todo } from './todo'

import 'rxjs/add/operator/toPromise'

const TODOS: Todo[] = [
  new Todo('Buy the milk'),
  new Todo('Go to sleep'),
  new Todo('Take shower'),
]

@Injectable()
export class TodoService {
  constructor(private http: Http) { }

  getTodos(): Promise<Todo[]> {
    // return Promise.resolve(TODOS)
    return this.http.get('/api/todos')
      .toPromise()
      .then(response => response.json().data as Todo[])
      .catch(this._handleError)
  }

  _handleError(error) {
    console.error('An error occurred', error)
    return Promise.reject(error.message || error)
  }
}
