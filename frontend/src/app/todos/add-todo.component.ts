import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-todo',
  template: `
    <input type="text" #newTodo>
    <button (click)="add.emit(newTodo.value); newTodo.value = ''">add</button>
  `,
})
export class AddTodoComponent {
  @Output() add = new EventEmitter<string>();
}
