import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Todo } from './todo';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';

const { apiEndpoint } = environment;

@Injectable()
export class TodoService {
  constructor(private http: Http) { }

  getTodos(): Promise<Todo[]> {
    return this.http.get(`${apiEndpoint}/todos`)
      .toPromise()
      .then(response => response.json() as Todo[])
      .catch(this._handleError);
  }

  _handleError(error) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
