import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { TodosComponent } from './todos.component';
import { Todo } from './todo';

import 'rxjs/add/observable/of';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;
  let todos: Todo[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosComponent ],
    });
  }));

  beforeEach(() => {
    todos = [
      new Todo('1', 'Get some tea'),
      new Todo('2', 'Wash the dishes'),
    ];

    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    component.todos = todos;
    fixture.detectChanges();
  });

  it('should render todos', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.textContent).toContain('Get some tea');
    expect(compiled.textContent).toContain('Wash the dishes');
  });
});
