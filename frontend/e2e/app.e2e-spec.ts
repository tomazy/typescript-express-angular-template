import { browser, element, by } from 'protractor';
import { WebPage } from './app.po';

const fixtures = require('pow-mongodb-fixtures').connect('e2e');

describe('web App', () => {
  let page: WebPage;

  beforeAll(done => {
    fixtures.load({
      todos: [
        { description: 'GET SOME MILK' },
        { description: 'GET SOME BEER' },
      ],
    }, done);
  });

  afterAll(done => {
    fixtures.clear(done);
  });

  beforeEach(() => {
    page = new WebPage();
  });

  it('should display todos', async () => {
    page.navigateTo();
    expect(await page.getTodosText()).toContain('GET SOME BEER');
  });
});
