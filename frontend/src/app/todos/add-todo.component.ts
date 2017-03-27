import { Component } from '@angular/core';
import { TodoStoreService } from './todo-store.service';
import { Todo } from './todo';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css'],
})
export class AddTodoComponent {
  constructor(private todoStore: TodoStoreService) { }

  add(description) {
    this.todoStore.add(new Todo(null, description));
  }
}
