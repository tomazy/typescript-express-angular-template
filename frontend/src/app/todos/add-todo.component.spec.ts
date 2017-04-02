import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTodoComponent } from './add-todo.component';
import { By } from '@angular/platform-browser';

import 'rxjs/add/observable/of';

const elementFinder = fixture => predicate =>
  fixture.debugElement.query(predicate).nativeElement;

describe('AddTodoComponent', () => {
  let component: AddTodoComponent;
  let fixture: ComponentFixture<AddTodoComponent>;
  let findElement;

  beforeEach(async(() => {
    const dummyTodoService = {};

    TestBed.configureTestingModule({
      declarations: [ AddTodoComponent ],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTodoComponent);
    component = fixture.componentInstance;
    findElement = elementFinder(fixture);
    fixture.detectChanges();
  });

  it('should emit add event', () => {
    const spy = jasmine.createSpy('add listener');
    component.add.subscribe(spy);

    const input = findElement(By.css('input'));
    input.value = 'Get a beer';
    const button = findElement(By.css('button'));
    button.dispatchEvent(new Event('click'));

    expect(spy).toHaveBeenCalledWith('Get a beer');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
