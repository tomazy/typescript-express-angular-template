import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { AddTodoComponent } from './todos/add-todo.component';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    AddTodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [{ provide: 'apiEndpoint', useValue: environment.apiEndpoint }],
  bootstrap: [AppComponent]
})
export class AppModule { }
