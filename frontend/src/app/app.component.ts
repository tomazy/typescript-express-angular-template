import { Component } from '@angular/core';
import { TodoStoreService } from './todos/todo-store.service';
import { TodoBackendService } from './todos/todo-backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoStoreService, TodoBackendService],
})
export class AppComponent {
  title = 'todos';
}
