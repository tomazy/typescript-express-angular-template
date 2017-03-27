import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoStoreService } from './todo-store.service';

import { AddTodoComponent } from './add-todo.component';

import 'rxjs/add/observable/of';

describe('AddTodoComponent', () => {
  let component: AddTodoComponent;
  let fixture: ComponentFixture<AddTodoComponent>;

  beforeEach(async(() => {
    const dummyTodoService = {};

    TestBed.configureTestingModule({
      declarations: [ AddTodoComponent ]
    })
    .overrideComponent(AddTodoComponent, {
      set: {
        providers: [
          { provide: TodoStoreService, useValue: dummyTodoService }
        ]
      }
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
