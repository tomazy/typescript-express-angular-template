import { browser, element, by } from 'protractor';
import { WebPage } from './app.po';

describe('web App', () => {
  let page: WebPage;

  beforeEach(() => {
    page = new WebPage();
  });

  it('should display todos', async () => {
    page.navigateTo();
    expect(await page.getTodosText()).toContain('Get some milk');
  });
});
