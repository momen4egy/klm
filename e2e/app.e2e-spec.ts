import { KlmPage } from './app.po';

describe('klm App', () => {
  let page: KlmPage;

  beforeEach(() => {
    page = new KlmPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
