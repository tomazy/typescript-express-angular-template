import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Todo } from './todo';
import { TodoBackendService } from './todo-backend.service';

@Injectable()
export class TodoStoreService {
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todosSubject.asObservable();

  constructor(
    private todoBackend: TodoBackendService,
  ) { }

  load(): void {
    this.todoBackend.fetchTodos()
      .subscribe(todos => this.todosSubject.next(todos));
  }

  add(todo: Todo) {
    this.todoBackend.add(todo)
      .subscribe(t => {
        const todos = this.todosSubject.getValue();
        this.todosSubject.next([...todos, t]);
      });
  }
}
