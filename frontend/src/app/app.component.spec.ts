import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

const DummyTodosComponent = dummyComponent('app-todos', 'dummy todos');
const DummyAddTodoComponent = dummyComponent('app-add-todo', 'dummy add todo');

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        DummyTodosComponent,
        DummyAddTodoComponent,
      ],
    });
  }));

  it('should render todos', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.textContent).toContain('dummy todos');
  }));

  it('should render add todo comp', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.textContent).toContain('dummy add todo');
  }));
});

function dummyComponent(selector: string, content: string) {
  @Component({
    selector: selector,
    template: `<div>${content}</div>`
  })
  class DummyComponent {}
  return DummyComponent;
}
