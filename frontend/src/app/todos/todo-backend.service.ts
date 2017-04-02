import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

import { Todo } from './todo';

@Injectable()
export class TodoBackendService {

  constructor(
    private http: Http,

    @Inject('apiEndpoint')
    private apiEndpoint: string,
  ) {}

  fetchTodos() {
    return this.http.get(`${this.apiEndpoint}/todos`)
      .map(response => response.json() as Todo[]);
  }

  add(todo: Todo) {
    return this.http.post(`${this.apiEndpoint}/todos`, todo)
      .map(response => response.json() as Todo);
  }
}
