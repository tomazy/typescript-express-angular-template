import {
  HttpModule,
  BaseRequestOptions,
  Http,
  Response,
  ResponseOptions,
  XHRBackend
} from '@angular/http';

import {
  TestBed,
  inject,
  async
} from '@angular/core/testing';

import { Subject } from 'rxjs/Subject';

import {
  MockBackend,
  MockConnection
} from '@angular/http/testing';

import { TodoBackendService } from './todo-backend.service';

describe('TodoBackendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        TodoBackendService,
        MockBackend,
        { provide: 'apiEndpoint', useValue: '/test-api' },
        { provide: XHRBackend, useClass: MockBackend },
      ]
    });
  });

  describe('fetching todos', () => {
    it('uses the api', async(inject([TodoBackendService], (service: TodoBackendService) => {
      const http = TestBed.get(Http) as Http;
      spyOn(http, 'get').and.returnValue(new Subject());

      service.fetchTodos();
      expect(http.get).toHaveBeenCalledWith('/test-api/todos');
    })));

    it('parses the response', async(inject([TodoBackendService, MockBackend], (service: TodoBackendService, backend) => {
      const json = [{
        id: '1',
        description: 'Buy some milk',
      }, {
        id: '2',
        description: 'Do laundry',
      }];

      mockResponse({
        body: json,
      }, backend);

      service.fetchTodos().subscribe(todos => {
        expect(todos).toEqual(json);
      });
    })));
  });
});

function mockResponse(options: any, backend: MockBackend) {
  backend.connections.subscribe((conn: MockConnection) => {
    const ro = new ResponseOptions(options);
    const r = new Response(ro);
    conn.mockRespond(r);
  });
}
