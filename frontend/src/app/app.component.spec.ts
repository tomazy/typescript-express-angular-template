import 'rxjs/add/observable/of';

import { Component, Output, Input, EventEmitter } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Todo } from './todos/todo';
import { AddAction } from './todos/actions';

class MockStore {
  select: jasmine.Spy;
  dispatch: jasmine.Spy;

  constructor() {
    this.select = jasmine.createSpy('select');
    this.dispatch = jasmine.createSpy('dispatch');
  }
}

@Component({
  selector: 'app-add-todo',
  template: `<div>add todo stub component</div>`,
})
class AddTodoStubComponent {
  @Output() add = new EventEmitter<string>();
}

@Component({
  selector: 'app-todos',
  template: `<div>todos stub component</div>`,
})
class TodosStubComponent {
  @Input() todos: Todo[];
}

const elementFinder = fixture => predicate =>
  fixture.debugElement.query(predicate);

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let findElement;
  const todos = [
    new Todo('1', 'todo 1'),
    new Todo('2', 'todo 2'),
  ];

  beforeEach((() => {
    const mockStore = new MockStore();
    mockStore.select.and.callFake(() => Observable.of(todos));
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AddTodoStubComponent,
        TodosStubComponent,
      ],
      providers: [
        { provide: Store, useValue: mockStore },
      ],
    });
    fixture = TestBed.createComponent(AppComponent);
    findElement = elementFinder(fixture);
    fixture.detectChanges();
  }));

  it('adds todo', () => {
    const addTodoComp = findElement(By.css('app-add-todo')).componentInstance;
    addTodoComp.add.emit('hello');
    const store = TestBed.get(Store);
    expect(store.dispatch).toHaveBeenCalledWith(new AddAction('hello'));
  });

  it('renders todos', () => {
    const todosComp: TodosStubComponent = findElement(By.css('app-todos')).componentInstance;
    expect(todosComp.todos).toEqual(todos);
  });

  it('renders add todo component', (() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.textContent).toContain('add todo stub component');
  }));
});
