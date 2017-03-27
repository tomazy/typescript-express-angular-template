import { TestBed, inject } from '@angular/core/testing';

import { TodoStoreService } from './todo-store.service';
import { TodoBackendService } from './todo-backend.service';

describe('TodoStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoStoreService,
        { provide: TodoBackendService, useValue: {} }
      ]
    });
  });

  it('should ...', inject([TodoStoreService], (service: TodoStoreService) => {
    expect(service).toBeTruthy();
  }));
});
