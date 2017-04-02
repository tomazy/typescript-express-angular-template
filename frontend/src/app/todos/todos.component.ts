import { Component, Input } from '@angular/core';
import { Todo } from './todo';

@Component({
  selector: 'app-todos',
  template: `
    <ul>
      <li *ngFor="let todo of todos">
        {{todo.description}}
      </li>
    </ul>
  `,
})
export class TodosComponent {
  @Input() todos: Todo[];
}
