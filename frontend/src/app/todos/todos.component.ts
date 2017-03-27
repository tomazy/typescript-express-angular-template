import { Component, OnInit, Input } from '@angular/core';
import { TodoStoreService } from './todo-store.service';
import { Todo } from './todo';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  private todos$: Observable<Todo[]>;

  constructor(private todoStore: TodoStoreService) { }

  ngOnInit() {
    this.todos$ = this.todoStore.todos$;
    this.todoStore.load();
  }
}
