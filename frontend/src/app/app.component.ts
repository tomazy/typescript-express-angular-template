import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './reducer';

import { AddAction } from './todos/actions';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  template: `
    <h1>
      {{title}}
    </h1>
    <app-todos [todos]="todos$ | async"></app-todos>
    <app-add-todo (add)="add($event)"></app-add-todo>
  `,
})
export class AppComponent {
  title = 'todos';
  private todos$ = this.store.select(state => state.todos.items);

  constructor(private store: Store<fromRoot.State>) { }

  add(description) {
    this.store.dispatch(new AddAction(description));
  }
}
