import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { AddTodoComponent } from './todos/add-todo.component';
import { TodoBackendService } from './todos/todo-backend.service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducer } from './reducer';
import { TodosEffects } from './todos/effects';

@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    AddTodoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5,
    }),
    EffectsModule.run(TodosEffects),
  ],
  providers: [
    { provide: 'apiEndpoint', useValue: environment.apiEndpoint },
    TodoBackendService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
