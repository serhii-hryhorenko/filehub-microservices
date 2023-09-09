import {Router} from '../../src/routing/router.js';
import {RouterConfig} from '../../src/routing/router-config.js';
import {ApplicationContext} from '../../src/application-context.js';

describe('Router', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('Should be called an event when switching to an existing hash', async () => {
    return new Promise((resolve) => {
      let testPage = false;

      window.location.hash = '#';

      const config = RouterConfig.builder()
          .addRoute({
            pageIdentifier: 'test',
            pageCreator: () => testPage = true,
          })
          .setDefaultPage(() => {})
          .setNotFoundHandler(() => {})
          .build();

      new Router(applicationStub, config);

      window.location.hash = '#test';

      setTimeout(() => {
        expect(testPage).toBeTruthy();
        resolve();
      });
    });
  });

  test('Should be called an event when switching to a none existing hash', async () => {
    return new Promise( (resolve) => {
      let notFoundPage = false;

      window.location.hash = '#';

      const config = RouterConfig.builder()
          .addRoute('test', () => {})
          .setDefaultPage(() => {})
          .setNotFoundHandler(() => notFoundPage = true)
          .build();

      new Router(document.body, config);

      window.location.hash = '#filehub';

      setTimeout(() => {
        expect(notFoundPage).toBeTruthy();
        resolve();
      });
    });
  });

  test('Should be called for default page', async () => {
    return new Promise((resolve) => {
      let defaultPage = false;

      window.location.hash = '#';

      const config = RouterConfig.builder()
          .addRoute('test', () => {})
          .setDefaultPage(() => defaultPage = true)
          .setNotFoundHandler(() => {})
          .build();

      new Router(document.body, config);

      setTimeout(() => {
        expect(defaultPage).toBeTruthy();
        resolve();
      });
    });
  });
});
