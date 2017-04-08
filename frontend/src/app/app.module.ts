import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { ApolloModule } from 'apollo-angular';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { TodosComponent } from './todos/todos.component';
import { AddTodoComponent } from './todos/add-todo.component';
import { TodoBackendService } from './todos/todo-backend.service';

import { reducer } from './reducer';
import { TodosEffects } from './todos/effects';

const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: environment.graphqlEndpoint,
  }),
});

// has to be exported to make the tsc compile this file :/
export function provideClient(): ApolloClient {
  return apolloClient;
}

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
    ApolloModule.forRoot(provideClient),
  ],
  providers: [
    TodoBackendService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
